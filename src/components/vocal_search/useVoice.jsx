import { useState, useEffect } from "react";

export const useVoice = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      setVoiceSupported(true);
    }
  }, []);

  const handleVoiceCommand = (command) => {
    const lowerCaseCommand = command.toLowerCase();

    if (lowerCaseCommand.includes("go to home")) {
      window.location.href = "/";
    } else if (lowerCaseCommand.includes("go to cats")) {
      window.location.href = "/cats";
    } else if (lowerCaseCommand.includes("go to dogs")) {
      window.location.href = "/dogs";
    } else if (lowerCaseCommand.includes("go to birds")) {
      window.location.href = "/birds";
    } else if (lowerCaseCommand.includes("go to fish")) {
      window.location.href = "/fish";
    } else if (lowerCaseCommand.includes("go to reptiles")) {
      window.location.href = "/reptiles";
    } else if (lowerCaseCommand.includes("go to rodents")) {
      window.location.href = "/rodents";
    }
  };

  const listen = () => {
    const recognition = new (window.webkitSpeechRecognition ||
      window.SpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const { transcript } = event.results[0][0];
      setText(transcript);
      handleVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return { text, isListening, listen, voiceSupported };
};
