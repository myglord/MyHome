import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { toast } from 'react-toastify';
import { navMenus } from '../data/CommonData/CommonData';

export const VoiceCommandContext = createContext();

const PREFIXES = ['open', 'go to', 'navigate to', 'show', 'take me to', 'go']; // this should be refined by us because people can be unpredictable with their speech

/**
 * Flatten navMenus (including submenus) into { phrase, path, label } entries.
 * Skip path "#". Add optional aliases. Sort by phrase length descending so
 * "home two" matches before "home".
 */
function buildCommandMap() {
  const entries = [];
  const add = (text, path, label = text) => {
    if (!path || path === '#') return;
    const phrase = text.toLowerCase().trim();
    if (phrase && !entries.some(e => e.phrase === phrase && e.path === path)) {
      entries.push({ phrase, path, label });
    }
  };

  const aliases = [
    ['home', '/', 'Home'],
    ['properties', '/property', 'Property'],
    ['listings', '/property', 'Property'],
    ['map', '/map-location', 'Map Location'],
    ['about', '/about-us', 'About Us'],
    ['projects', '/project', 'Project'],
  ];

  navMenus.forEach(menu => {
    if (menu.path && menu.path !== '#') {
      add(menu.text, menu.path);
    }
    (menu.submenus || []).forEach(sub => {
      add(sub.text, sub.path);
    });
  });
  aliases.forEach(([phrase, path, label]) => add(phrase, path, label));

  entries.sort((a, b) => b.phrase.length - a.phrase.length);
  return entries;
}

function normalizeTranscript(str) {
  return (str || '').toLowerCase().trim();
}

function stripPrefix(text) {
  let t = text.trim();
  for (const p of PREFIXES) {
    if (t.startsWith(p + ' ')) {
      t = t.slice(p.length).trim();
      break;
    }
  }
  return t;
}

function matchTranscriptToPath(transcript, cmdMap) {
  const normalized = normalizeTranscript(transcript);
  if (!normalized) return null;
  const withoutPrefix = stripPrefix(normalized);

  for (const { phrase, path, label } of cmdMap) {
    if (withoutPrefix === phrase || withoutPrefix.includes(phrase)) {
      return { path, label };
    }
  }
  return null;
}

const commandMap = buildCommandMap();

const VoiceCommandProvider = ({ children }) => {
  const navigate = useNavigate();
  const lastMatchedRef = useRef('');
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const isSupported = Boolean(browserSupportsSpeechRecognition);

  const toggleListening = useCallback(() => {
    // #region agent log
    fetch('http://127.0.0.1:7814/ingest/6cfe6c78-4ab3-491d-9a75-e9a192fd1add',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'ec3e71'},body:JSON.stringify({sessionId:'ec3e71',location:'VoiceCommandContext.jsx:toggleListening',message:'toggleListening called',data:{isSupported,listening},timestamp:Date.now(),hypothesisId:'H-E'})}).catch(()=>{});
    // #endregion
    if (!isSupported) return;
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      lastMatchedRef.current = '';
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
    }
  }, [isSupported, listening, resetTranscript]);

  useEffect(() => {
    const t = transcript.trim();
    // #region agent log
    fetch('http://127.0.0.1:7814/ingest/6cfe6c78-4ab3-491d-9a75-e9a192fd1add',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'ec3e71'},body:JSON.stringify({sessionId:'ec3e71',location:'VoiceCommandContext.jsx:useEffect',message:'transcript effect fired',data:{transcript,t,lastMatched:lastMatchedRef.current},timestamp:Date.now(),hypothesisId:'H-A H-B H-C'})}).catch(()=>{});
    // #endregion
    if (!t || lastMatchedRef.current === t) return;
    const match = matchTranscriptToPath(t, commandMap);
    // #region agent log
    fetch('http://127.0.0.1:7814/ingest/6cfe6c78-4ab3-491d-9a75-e9a192fd1add',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'ec3e71'},body:JSON.stringify({sessionId:'ec3e71',location:'VoiceCommandContext.jsx:useEffect:match',message:'matchTranscriptToPath result',data:{t,match},timestamp:Date.now(),hypothesisId:'H-B H-D'})}).catch(()=>{});
    // #endregion
    if (match) {
      lastMatchedRef.current = t;
      // #region agent log
      fetch('http://127.0.0.1:7814/ingest/6cfe6c78-4ab3-491d-9a75-e9a192fd1add',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'ec3e71'},body:JSON.stringify({sessionId:'ec3e71',location:'VoiceCommandContext.jsx:useEffect:navigate',message:'calling navigate',data:{path:match.path,label:match.label},timestamp:Date.now(),hypothesisId:'H-D'})}).catch(()=>{});
      // #endregion
      navigate(match.path);
      resetTranscript();
      toast.success(`Navigated to ${match.label}`, { theme: 'colored' });
    }
  }, [transcript, navigate, resetTranscript]);

  const value = useMemo(
    () => ({
      isListening: listening,
      isSupported,
      isMicrophoneAvailable: isMicrophoneAvailable ?? true,
      toggleListening,
      transcript,
      resetTranscript,
    }),
    [listening, isSupported, isMicrophoneAvailable, toggleListening, transcript]
  );

  return (
    <VoiceCommandContext.Provider value={value}>
      {children}
    </VoiceCommandContext.Provider>
  );
};

export function useVoiceCommand() {
  const ctx = useContext(VoiceCommandContext);
  if (!ctx) {
    throw new Error('useVoiceCommand must be used within VoiceCommandProvider');
  }
  return ctx;
}

export default VoiceCommandProvider;
