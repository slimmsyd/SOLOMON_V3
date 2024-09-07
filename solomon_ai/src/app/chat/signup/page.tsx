"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import React, {
  useState,
  useEffect,
  useRef,
  use,
  useId,
  FormEvent,
} from "react";
import { useSession, getSession } from "next-auth/react";
import { Session } from "next-auth";

import dynamic from "next/dynamic";
import Video from "@/app/components/Vidoe";

import { MessageProvider } from "@/utilis/MessageContext";
//Utilis and helper functions
import { isClient } from "@/utilis/isClient";
import { useSessionStorage } from "@/app/hooks/useSessionStorage";
import { checkSession } from "@/utilis/CheckSession";
import { fetchUserInfo } from "@/utilis/fetchUserInfo";

import ButtonLoadingComponent from "@/app/components/helper/buttonComponentLoading";
import { Header } from "@/app/components/Header";
// Dashboard

import { useChatConversation } from "@/app/hooks/ConversationContext";
import useCreateConversation from "@/app/hooks/createConversation";
import useConversations from "@/app/hooks/useConversations";
import { Dashboard } from "../app/Dashboard";

//Chat Container
import { ChatContainer } from "../app/ChatContainer";
import { ChatMessagesContainer } from "../app/ChatMessage";
import { Guidelines } from "../app/components/Guidelines";

import { PayForAppPopup } from "./useAppPopup";

const SignupDashboard: React.FC = () => {
  //Introduction Guidelines.

  const [showGuidelines, setShowGuidelines] = useState(true);

  useEffect(() => {}, []);

  const handleGuidelinesComplete = () => {};

  //First introduction From
  const {
    userName,
    setUserName,
    splitUserName,
    email,
    setEmail,
    setSplitUserName,
  } = useSessionStorage();

  const { data: session, status } = useSession();
  // Form Ref
  const formRef = useRef<HTMLFormElement>(null);
  const [editTitleId, setEditTitleId] = useState<null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const [titleUpdated, setTitleUpdated] = useState<boolean>(false); // New state for title updates

  const [currentConversationId, setCurrentConversationId] = useState<
    number | string | null
  >(null);

  const [messagesIsLoading, setMessagesIsLoading] = useState<null | boolean>(
    null
  );

  //Stores the Chat
  const {
    responses,
    setResponses,
    message,
    setMessage,
    isFetchLoading,
    setIsFetchLoading,
  } = useChatConversation();

  const { conversations, isLoading, setConversations } = useConversations(
    session as Session
  );

  const {
    createConversation,
    newTitle,
    setNewTitle,
    isCreateLoading,
    error,
    dataId,
  } = useCreateConversation(
    session as Session,
    setConversations as any,
    setCurrentConversationId
  );

  //This function shifts and shows the mobile Chat ccontainer
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isAtZero, setIsAtZero] = useState<boolean>(false); // State to track the position

  const handleMobileChatBtnClick = () => {};

  // Effect to handle viewport resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 950 && chatContainerRef.current) {
        chatContainerRef.current.style.transform = "translateX(0px)";
        setIsAtZero(false); // Reset the state
      } else if (chatContainerRef.current) {
        chatContainerRef.current.style.transform = "translateX(-100%)";
        setIsAtZero(true); // Reset the state
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Clear the conversation ID on component mount
  useEffect(() => {
    //Removed the border Classes From LocalStorage
    localStorage.removeItem("borderClasses");
    localStorage.removeItem("currentQuestion");

    // console.log("clearing the current conversation ID");
    setResponses([]);
    setCurrentConversationId(null);
  }, []);

  // Update session storage whenever userName or splitUserName changes
  useEffect(() => {
    if (isClient()) {
      sessionStorage.removeItem("greetingSent");
      sessionStorage.removeItem("currentConvoId");
      if (userName !== null) {
        sessionStorage.setItem("userName", userName);
      }

      if (splitUserName !== "") {
        sessionStorage.setItem("splitUserName", splitUserName);
      }

      if (email !== null) {
        sessionStorage.setItem("email", email);
      }
    }
  }, [userName, splitUserName]);

  // Update session storage whenever userName or splitUserName changes

  let sessionRef = useRef(0);
  useEffect(() => {}, [sessionRef]);

  //Submit the Inquiry
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  // Where we are going to send the Chat Data Request

  function updateLocalStorage(
    updatedConversation: any,
    conversationId: number
  ) {
    if (isClient()) {
      let cachedConversations = sessionStorage.getItem("conversations");

      if (cachedConversations) {
        try {
          // Parse the cached conversations
          const parsedConversations = JSON.parse(cachedConversations);

          // Ensure that parsedConversations is an array
          if (Array.isArray(parsedConversations)) {
            const updatedCache = parsedConversations.map((convo) =>
              convo.conversationId === conversationId
                ? { ...convo, title: updatedConversation.title }
                : convo
            );

            sessionStorage.setItem(
              "conversations",
              JSON.stringify(updatedCache)
            );

            console.log("Logging the updated Cache", updatedCache);
          } else {
            console.error("Parsed cached conversations is not an array");
          }
        } catch (e) {
          console.error("Error parsing cached conversations:", e);
        }
      }
    }
  }

  useEffect(() => {});

  async function getConversation(conversationId: any) {
    try {
      const response = await fetch(`/api/${conversationId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch conversation");
      }

      const updatedConversation = await response.json();
      console.log(
        "Logging the converations before errorw",
        updatedConversation
      );
      setConversations([]);
      // Update local state

      updateLocalStorage(updatedConversation, conversationId);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      throw error; // Re-throw to handle it in the UI layer
    }
  }

  const handleSubmitTitle = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission
  };
  //Gets the key down change
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {};

  //Editing the ability to change the existing title.
  const handleTitleClick = (convoId: string) => {};

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  // Logging the responses temp
  useEffect(() => {}, [responses]);

  // sessionStorage.clear();

  const handleConversationClick = (convoId: string) => {};

  //Lets clear the chat Responses when we first load in

  //This function Deletes the cvonersation
  async function deleteConversation(conversationId: string) {}

  //Send an automated Message on load

  const handleCardClick = (text: string) => {};

  const handleButtonClick = (event: any) => {};



  return (
    <MessageProvider>
      <div className="overlay flex items-center ">
        <div className="overlay blur"></div>

        <PayForAppPopup />
      </div>

      {/* ADUDIO reF  */}



      {/* ADUDIO reF  */}

      {showGuidelines && <Guidelines onComplete={handleGuidelinesComplete} />}

      <div className="chatDashboard pointer-events-none">
        {/* Chat Container Componet  */}

        <ChatContainer
          setConversations={setConversations}
          conversations={conversations}
          currentConversationId={currentConversationId}
          splitUserName={splitUserName}
          userName={userName || ""}
          email={email || ""}
          onConversationClick={handleConversationClick}
          onDeleteConvo={deleteConversation}
          onChangeConvoTitle={handleSubmitTitle}
          handleTitleClick={handleTitleClick}
          editTitleId={editTitleId}
          editedTitle={editedTitle}
          handleTitleChange={handleTitleChange}
          editingTitle={editingTitle}
          titleUpdated={titleUpdated}
          handleKeyDown={handleKeyDown}
          chatContainerRef={chatContainerRef as any}
          handleMobileChatBtnClick={handleMobileChatBtnClick}
        />

        {/* Chat Container Componet  */}

        <div className="chatDashboardWrapper w-full text-left">
          <Header
            showGuidelines={showGuidelines}
            setShowGuidelines={setShowGuidelines}
            handleMobileChatBtnClick={handleMobileChatBtnClick}
          />

          <div className="chatDashBoardContainer">
            {/* Dashboard Component  */}
            {currentConversationId ? (
              <ChatMessagesContainer responses={responses || "null"} />
            ) : (
              <Dashboard
                userName={userName || ""}
                handleButtonClick={handleButtonClick}
              />
            )}
          </div>

          <form ref={formRef} aria-disabled className="chatFormSubmit">
            <div className="relative textAreaContainer">
              <textarea
                disabled
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    formRef.current?.requestSubmit();
                  }
                }}
                value={message}
                placeholder="Ask Thou Question..."
              ></textarea>

              <div className="textAreaIconWrapper flex flex-row gap-[11px]">
                <button disabled className="textAreaIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M9 7a5 5 0 0 1 10 0v8a7 7 0 1 1-14 0V9a1 1 0 0 1 2 0v6a5 5 0 0 0 10 0V7a3 3 0 1 0-6 0v8a1 1 0 1 0 2 0V9a1 1 0 1 1 2 0v6a3 3 0 1 1-6 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>

                <button disabled type="submit" className="textAreaIcon">
                  {messagesIsLoading ? (
                    <ButtonLoadingComponent />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 32 32"
                      className=""
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </MessageProvider>
  );
};

export default dynamic(() => Promise.resolve(SignupDashboard), { ssr: false });
