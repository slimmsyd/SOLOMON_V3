"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ChatMessage {
  question: string;
  response: string;
  id: string;

}

interface ConversationContextType {
  responses: ChatMessage[];
  setResponses: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  isFetchLoading: boolean;
  setIsFetchLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConversationContext = createContext<ConversationContextType | undefined>(
  undefined
);

export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [responses, setResponses] = useState<ChatMessage[]>(() => {
    if (typeof window !== "undefined") {
      // Attempt to recover state from sessionStorage on initial load
      const savedResponses = sessionStorage.getItem("chatResponses");
      // return savedResponses ? JSON.parse(savedResponses) : [];
    }
    return [];
  });
  const [message, setMessage] = useState<string>(""); // Current message being typed

  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false); // New state to track loading status

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

export const useChatConversation = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error(
      "useChatConversation must be used within a ConversationProvider"
    );
  }
  return context;
};
