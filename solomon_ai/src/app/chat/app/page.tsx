"use client";

import DashboardNav from "../../components/DashboardNav";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";
import { Session } from "next-auth";

import ErrorPage from "../../error/page";

import Image from "next/image";
import arrowLeft from "../../../../public/assets/Chat/arrowLeft.png";
import searchIcon from "../../../../public/assets/Chat/searchIcon.png";
import chatIcon from "../../../../public/assets/Chat/chatIcon.png";
import iconChat from "../../../../public/assets/Chat/iconChat.png";
import settingsIcon from "../../../../public/assets/Chat/settingsIcon.png";

// Dashboard

import { useChatConversation } from "@/app/hooks/ConversationContext";
import useCreateConversation from "@/app/hooks/createConversation";
import useConversations from "@/app/hooks/useConversations";
import { Dashboard } from "./Dashboard";
//Chat Container
import { ChatContainer } from "./ChatContainer";
import ChatMessage from "@/app/components/Chatmessage";
import { ChatMessagesContainer } from "./ChatMessage";

export default function ChatDashboard() {
  //getting the user name

  const [userName, setUserName] = useState<string | null>(null);
  const [splitUserName, setSplitUserName] = useState<string>("");
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  // Form Ref
  const formRef = useRef<HTMLFormElement>(null);

  const [currentConversationId, setCurrentConversationId] = useState<
    number | null
  >(null);

  //Stores the Chat
  const {
    responses,
    setResponses,
    message,
    setMessage,
    isFetchLoading,
    setIsFetchLoading,
  } = useChatConversation();

  const { conversations, isLoading, setConversations } =
    useConversations(session);

  //Get access to the current conversation Name and Id

  useEffect(() => {
    console.log("Loggin the conversations in the app useEffect", conversations);
  }, [conversations]);

  const {
    createConversation,
    newTitle,
    setNewTitle,
    isCreateLoading,
    error,
    dataId,
  } = useCreateConversation(
    session as Session,
    setConversations,
    setCurrentConversationId
  );

  //Getting  access to the currnet conversation ID
  useEffect(() => {
    console.log("Logging current conversation Id", currentConversationId);
  }, []);

  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName");
    const storedSplitUserName = sessionStorage.getItem("splitUserName");
    const storedEmail = sessionStorage.getItem("email");

    if (storedUserName) {
      setUserName(storedUserName);
    }

    if (email) {
      setEmail(storedEmail);
    }

    if (storedSplitUserName) {
      setSplitUserName(storedSplitUserName);
    }
  }, []);

  // Update session storage whenever userName or splitUserName changes
  useEffect(() => {
    if (userName !== null) {
      sessionStorage.setItem("userName", userName);
    }

    if (splitUserName !== "") {
      sessionStorage.setItem("splitUserName", splitUserName);
    }
  }, [userName, splitUserName]);

  useEffect(() => {
    async function checkSession() {
      console.log("Logging ession", session);
      if (status === "loading") {
        console.log("Session is loading...");
        return;
      }

      if (status === "unauthenticated") {
        console.log("No session found, redirecting...");
        router.push("/");
      } else if (status === "authenticated") {
        console.log(
          "Session is authenticated, confirming session data...",
          status
        );
        const currentSession = await getSession();
        console.log("Current session data:", currentSession);
        setUserName(currentSession?.user.username);
        if (!currentSession?.user.user) {
          setUserName(currentSession?.user.email.split("@")[0]);

          //We want to get Just to logo of the userName
          setSplitUserName(currentSession?.user.email[0].toUpperCase());
        }
        console.log("Logging session user name", currentSession?.user.username);
      }
    }

    checkSession();
  }, [status, router]);

  useEffect(() => {
    // This effect runs only on the client side
    const storedUsername =
      typeof window !== "undefined" ? localStorage.getItem("username") : null;
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, []);

  // if (!userName || !session) {
  //   return <ErrorPage />;
  // }

  // Where we are going to send the Chat Data Request
  const saveMessageToStorage = (message: string) => {
    sessionStorage.setItem("initialMessage", JSON.stringify(message));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Handle submit is being sent ");
    saveMessageToStorage(message); // Save the message right before or after sending it
    setIsFetchLoading(true);
    // Optimistically update the UI to show the user message
    const newResponse = { question: message, response: "" };
    setResponses((prevResponses) => [...prevResponses, newResponse]);
    setMessage("");

    let conversationId = currentConversationId;

    // If there is no current conversation, create one
    if (!currentConversationId) {
      console.log("Creating a Converation Before no convo");
      console.log("No conversation selected.");
      const newConversationId = await createConversation(); // Make sure to await the result

      console.log(
        "Logging the conversation Id in the await",
        newConversationId
      );

      conversationId = newConversationId;

      if (newConversationId) {
        console.log("Returning the Data Id", newConversationId);
        // setCurrentConversationId(newConversationId);
        localStorage.setItem("currentConversationId", newConversationId);

        // Navigate to the new conversation UR
      } else {
        console.log("Failed to create new conversation.");
        setIsFetchLoading(false); // Reset loading state if conversation creation fails
        return; // Exit if creation failed
      }
    } else {
      console.log("LOgging an errow when creating an conversation ID");
    }

    console.log(
      "Logging the current conversatoin Id after we send the request",
      conversationId
    );

    try {
      // Fetch bot reply from the API
      const botReply = await fetch("http://localhost:3001/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ message }),
      }).then((res) => res.json());

      if (!currentConversationId && conversationId) {
        console.log("LOgging the responses in the change UI if statement");
        console.log("This is where the conversation will be redirceted");
        console.log("Logging to see if new convo was created", conversationId);
      }

      // Update the responses array with the bot's reply
      setResponses((prevResponses) =>
        prevResponses.map((resp) => {
          if (resp.question === message) {
            return { ...resp, response: botReply.message };
          }
          return resp;
        })
      );

      // Send the user question and bot response to the database
      // If a new conversation was created, navigate to that page

      console.log("Logging the responses before we changed UI", responses);

      // await fetch("/api/messages", {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     userId: Number(session.user.id),
      //     conversationId: conversationId,
      //     userContent: message,
      //     botResponse: botReply.message,
      //   }),
      // });
    } catch (error) {
      console.error("Error handling submission:", error);
      setIsFetchLoading(false); // Reset loading state after response is handled
    }
  };

  // Logging the responses temp
  useEffect(() => {
    console.log("Logging hte current repssones", responses);
  }, [responses]);

  // sessionStorage.clear();

  const handleConversationClick = (convoId: number) => {
    console.log("Activating conversation with ID:", convoId);
    const targetPath = `/chat/app/${session?.user.id}/${convoId}`;

    router.push(targetPath, undefined)

    // Check if we're already viewing the requested conversation to avoid unnecessary routing actions
    // if (router.asPath !== targetPath) {
    //   router.push(targetPath, undefined);
    // }

    setCurrentConversationId(convoId);

    console.log("Logging hte current conversation ID", currentConversationId);
    console.log("Logging hte current The ConvoID", convoId);
  };

  return (
    <div className="chatDashboard">
      {/* Chat Container Componet  */}

      <ChatContainer
        splitUserName={splitUserName}
        userName={userName || ""}
        onConversationClick={handleConversationClick}
      />

      {/* Chat Container Componet  */}

      <div className="chatDashboardWrapper w-full text-left">
        {/* Guidelines Hader */}

        <header className=" text-[14px] guideLinesContainer gap-[8px] h-[70px] flex flex-row items-center justify-end w-full px-[22px] mb-[50px]">
          <div className="flex flex-row gap-[18px] items-center justify-center">
            <button className="hover:text-[#807f7f]">Tour</button>

            <button className="flex flex-row guideLinesBtn gap-[10px] hover:bg-[#4B4B4B]">
              <svg
                width="15"
                height="15"
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="compass"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#2F0FFD"
                  d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm306.7 69.1L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
                ></path>
              </svg>
              Guidlines
            </button>
          </div>
        </header>

        <div className="chatDashBoardContainer">
          {/* Dashboard Component  */}
          {currentConversationId ? (
            <ChatMessagesContainer responses={responses || "null"} />
          ) : (
            <Dashboard userName={userName || ""} />
          )}
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className="chatFormSubmit">
          <div className="relative textAreaContainer">
            <textarea
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
              <button className="textAreaIcon">
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

              <button type="submit" className="textAreaIcon">
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
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
