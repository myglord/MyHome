import React, { useEffect } from 'react';
import { useVoiceCommand } from '../contextApi/VoiceCommandContext';

const VoiceFab = () => {
  const { isListening, isSupported, toggleListening } = useVoiceCommand();

  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7814/ingest/6cfe6c78-4ab3-491d-9a75-e9a192fd1add',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'ec3e71'},body:JSON.stringify({sessionId:'ec3e71',location:'VoiceFab.jsx:render',message:'VoiceFab mounted/isSupported changed',data:{isSupported,isListening},timestamp:Date.now(),hypothesisId:'H-E1 H-E3'})}).catch(()=>{});
  }, [isSupported]);
  // #endregion

  const handleClick = () => {
    // #region agent log
    fetch('http://127.0.0.1:7814/ingest/6cfe6c78-4ab3-491d-9a75-e9a192fd1add',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'ec3e71'},body:JSON.stringify({sessionId:'ec3e71',location:'VoiceFab.jsx:handleClick',message:'handleClick fired',data:{isSupported,isListening},timestamp:Date.now(),hypothesisId:'H-E1 H-E2'})}).catch(()=>{});
    // #endregion
    if (isSupported) {
      toggleListening();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="voice-fab-wrapper">
      <button
        type="button"
        className={`voice-fab ${isListening ? 'voice-fab--listening' : ''} ${!isSupported ? 'voice-fab--unsupported' : ''}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={!isSupported}
        aria-label={isSupported ? (isListening ? 'Stop voice command' : 'Start voice command') : 'Voice not supported in this browser'}
        title={isSupported ? (isListening ? 'Listening… Click to stop' : 'Say a page name to navigate') : 'Voice not supported in this browser'}
      >
        <span className="voice-fab__icon" aria-hidden="true">
          {isSupported ? (
            <i className={isListening ? 'las la-stop-circle' : 'las la-microphone'} />
          ) : (
            <i className="las la-microphone-slash" />
          )}
        </span>
        {isListening && <span className="voice-fab__pulse" aria-hidden="true" />}
      </button>
      <span className="voice-fab__label">
        {isListening ? 'Listening…' : 'Voice'}
      </span>
    </div>
  );
};

export default VoiceFab;
