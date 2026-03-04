import React from 'react';
import { useVoiceCommand } from '../contextApi/VoiceCommandContext';

const VoiceFab = () => {
  const { isListening, isSupported, toggleListening } = useVoiceCommand();

  const handleClick = () => {
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
  );
};

export default VoiceFab;
