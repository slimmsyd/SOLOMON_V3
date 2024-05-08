"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [responses, setResponses] = useState(() => {
    if (typeof window !== "undefined") {

    // Attempt to recover state from sessionStorage on initial load
    const savedResponses = sessionStorage.getItem("chatResponses");
    return savedResponses ? JSON.parse(savedResponses) : [];
    }
  });
  const [message, setMessage] = useState(""); // Current message being typed
  const [isFetchLoading, setIsFetchLoading] = useState(false); // New state to track loading status

  useEffect(() => {
        // Persist responses to sessionStorage whenever they change

    if (typeof window !== "undefined") {
      sessionStorage.setItem("chatResponses", JSON.stringify(responses));
    }
  }, [responses]);

  return (
    <ConversationContext.Provider
      value={{
        responses,
        setResponses,
        message,
        setMessage,
        isFetchLoading,
        setIsFetchLoading,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useChatConversation = () => useContext(ConversationContext);
