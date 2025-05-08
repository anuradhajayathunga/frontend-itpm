import React, { useState } from 'react';

const VoiceInputField = ({ name, placeholder, value, onChange }) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onChange({ target: { name, value: transcript } });
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  return (
    <div className="relative flex">
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full border border-gray-300 rounded-lg p-2"
      />
      <button
        type="button"
        onClick={startListening}
        className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded ${
          isListening ? 'text-red-500' : 'text-green-500'
        } hover:text-green-600 transition-colors`}
        title="Click to speak"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default VoiceInputField;