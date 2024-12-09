import React, { useState, useEffect } from "react";
import "./voice.css";
import { useVoice } from "./useVoice";
import Mic from "./microphone-black-shape.svg";

export const Voice = () => {
  const { text, isListening, listen, voiceSupported } = useVoice();

  useEffect(() => {
    if (text !== "") {
      redirectToPage(text);
    }
  }, [text]);

  const redirectToPage = (command) => {
    const keywords = ["go to", "search", "open"];
    let targetPage = null;

    keywords.forEach((keyword) => {
      if (command.includes(keyword)) {
        const startIndex = command.indexOf(keyword) + keyword.length;
        const pageName = command.substring(startIndex).trim();

        if (pageName === "cats") {
          targetPage = "/cats";
        } else if (pageName === "dogs") {
          targetPage = "/dogs";
        } else if (pageName === "birds") {
          targetPage = "/birds";
        } else if (pageName === "fish") {
          targetPage = "/fish";
        } else if (pageName === "reptiles") {
          targetPage = "/reptiles";
        } else if (pageName === "rodents") {
          targetPage = "/rodents";
        }
      }
    });

    if (targetPage) {
      window.location.href = targetPage;
    }
  };

  if (!voiceSupported) {
    return (
      <div className="Voice">
        <h1>Voice search is not supported in this browser</h1>
      </div>
    );
  }

  return (
    <div className="vocala">
      <div className="Voice">
        <h2>Voice Search</h2>
        <h3>Click the microphone and say your command</h3>
        <div>
          <img
            className={`microphone ${isListening && "isListening"}`}
            src={Mic}
            alt="microphone"
            onClick={listen}
          />
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
};
