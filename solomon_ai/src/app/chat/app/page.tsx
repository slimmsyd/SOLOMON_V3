"use client";

import DashboardNav from "../../components/DashboardNav";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import React, { useState, useEffect, useRef, use, useId } from "react";
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";
import { Session } from "next-auth";
import { Message } from "../../../../types";

import dynamic from "next/dynamic";
import axios from "axios";

import ErrorPage from "../../error/page";

import Image from "next/image";
import arrowLeft from "../../../../public/assets/Chat/arrowLeft.png";
import searchIcon from "../../../../public/assets/Chat/searchIcon.png";
import chatIcon from "../../../../public/assets/Chat/chatIcon.png";
import iconChat from "../../../../public/assets/Chat/iconChat.png";
import settingsIcon from "../../../../public/assets/Chat/settingsIcon.png";

import { isClient } from "@/utilis/isClient";
import { useSessionStorage } from "@/app/hooks/useSessionStorage";

// Dashboard

import { useChatConversation } from "@/app/hooks/ConversationContext";
import useCreateConversation from "@/app/hooks/createConversation";
import useConversations from "@/app/hooks/useConversations";
import { Dashboard } from "./Dashboard";
//Chat Container
import { ChatContainer } from "./ChatContainer";
import ChatMessage from "@/app/components/Chatmessage";
import { ChatMessagesContainer } from "./ChatMessage";
import { SignupForm } from "./Signupform";

const ChatDashboard: React.FC = () => {
  //getting the user name

  //First introduction From
  const { userName, splitUserName, email, setEmail, setSplitUserName } = useSessionStorage();

  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [sessionStatus, setSessionStatus] = useState<string>("");
  const [userId, setUserId] = useState<null>(null);
  // Form Ref
  const formRef = useRef<HTMLFormElement>(null);

  const [showTitleInput, setShowTitleInput] = useState(false);
  const [editTitleId, setEditTitleId] = useState<null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const [titleUpdated, setTitleUpdated] = useState<boolean>(false); // New state for title updates

  const [currentConversationId, setCurrentConversationId] = useState<
    number| string | null
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

  // Clear the conversation ID on component mount
  useEffect(() => {

    //Removed the border Classes From LocalStorage 
    localStorage.removeItem("borderClasses")
    localStorage.removeItem("currentQuestion")
    console.log("clearing the current conversation ID");
    setResponses([])
    setCurrentConversationId(null);
  }, []);



 


  // Update session storage whenever userName or splitUserName changes
  useEffect(() => {
    if (isClient()) {
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


  let sessionRef = useRef(0);
  useEffect(() => { 
    console.log("useEffect: Checking to see if the session ref changed", sessionRef.current);
  },[sessionRef])

  useEffect(() => {
    console.log("useEffect: Checking session status:", status);
    sessionRef.current += 1;

    if(sessionRef.current === 1 ) { 
          return
    }

    async function checkSession() {

      if (status === "loading") {
        console.log("Session is loading...");
        // return;
      }

      if (status === "unauthenticated") {
        console.log("No session found, redirecting...");
        router.push("/");
      } else if (status === "authenticated") {

        console.log(
          "Session is authenticated, confirming session data...",
          status
        );

        //For the first converation, we get the first ConvoId

        setUserId(session.user.id);
        setSessionStatus(status);
        const currentSession = await getSession();
        console.log("Loggin session", session)
        console.log("Current session data:", currentSession);

        if (!currentSession?.user.user) {
          // setEmail(currentSession?.user.email.split("@")[0]);
          setEmail(currentSession?.user.email.split("@")[0]);

          //Just a back up just in case

          if (isClient()) {
            if (email !== null) {
              sessionStorage.setItem("email", email);
              console.log("Is the email beign set here", email);
            }
            if (userName !== null) {
              sessionStorage.setItem("userName", userName);
            }
            if (splitUserName !== "") {
              sessionStorage.setItem("splitUserName", splitUserName);
            }
          }
          //We want to get Just to logo of the userName
          setSplitUserName(currentSession?.user.email[0].toUpperCase());
        }
        console.log("Logging session user name", currentSession?.user.name);
      }
    }

    if (status === "authenticated") {
      checkSession();
    }
  }, [status]);



  //Submit the Inquiry
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging jfljsflkf", currentConversationId);
    if (isClient()) {
      if (!currentConversationId) {
        console.log("No conversation selected.");

        await createConversation()
        .then(convoID => {
          console.log("Logging the CONVO ID", convoID);

          setCurrentConversationId(convoID); // Store the convo ID if needed
            sessionStorage.setItem("currentConversationId", convoID);
            let localStorageConvoId: any;
            localStorage.setItem("currentConversationId", convoID);
            localStorageConvoId = localStorage.getItem("currentConversationId");

        
        })

       
      console.log("Logging the Current converattion id in the await convo created", currentConversationId)
        
      }

        // Ensure that currentConversationId is updated before proceeding
    const updatedConversationId = sessionStorage.getItem("currentConversationId");
    console.log("Logging the Current conversation id in the await convo created", updatedConversationId);

      // 1. Set up the new response without any bot response yet.
      const newResponse = { question: message, response: "" };

      setResponses((responses) => [...responses, newResponse]); // Use functional update for state


      
      setMessage("");

      try {
        // 2. Fetch bot reply from the API
        const botReply = await fetch("http://localhost:3002/", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ message }),
        }).then((res) => res.json());

        // 3. Update the responses array with the bot's reply
        setResponses((prevResponses) =>
          prevResponses.map((resp) => {
            if (resp.question === message) {
              return { ...resp, response: botReply.message };
            }
            return resp;
          })
        );

        // 4. Send the user question and bot response to the database

        console.log(
          "logging the creation of a new chat in here",
          session?.user.id
        );

        console.log("Logging the conversation id when i sent out the message", currentConversationId)

        await fetch("/api/messages", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            userId: session?.user.id, // Ensure you have the current user's ID
            conversationId: Number(updatedConversationId),
            userContent: message, // User's message
            botResponse: botReply.message, // Bot's response, obtained separately
          }),
        });

        console.log(
          "Loggign the current Conversation on a new click ",
          currentConversationId
        );

        //Add the conversations arrawy or update
      } catch (error) {
        console.error("Error handling submission:", error);
      }
    }
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

  async function getConversation(conversationId: any) {
    console.log(
      "Logging the converatation ID in the getConversation",
      conversationId
    );
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
      // Update local state
      setConversations((prevConversations) => {
        return prevConversations.map((convo) =>
          convo === conversationId
            ? { ...convo, title: updatedConversation.title }
            : convo
        );
      });

      updateLocalStorage(updatedConversation, conversationId);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      throw error; // Re-throw to handle it in the UI layer
    }
  }
  const handleSubmitTitle = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission

    let titleChange: string = "";

      if (isClient()) {
        console.log("seeing if the function worked!!! ");

        event.preventDefault(); // Prevent form submission
        const newTitle = editedTitle; // Capture the title at the time of submission
        titleChange = editTitleId ?? "";
        console.log("New title to be set:", newTitle);
        console.log("New title Id being logged", editTitleId);

        if (editTitleId !== null && editTitleId !== "") {
          const updatedConversations = conversations.map((convo) =>
            (convo as any).conversationId === editTitleId
              ? { ...convo, title: newTitle }
              : convo
          );
          setConversations(updatedConversations);
          console.log("Updated conversations:", updatedConversations);

          sessionStorage.setItem(
            "conversations",
            JSON.stringify(updatedConversations)
          );

          setEditTitleId(null); // Exit edit mode
          setEditedTitle(""); // Clear the edited title state
          setEditingTitle(false);

          console.log(
            "logging the title change within the thing before ",
            titleChange
          );
        }
        console.log(
          "logging the title change within the after before ",
          titleChange
        );

        try {
          const response = await fetch(`/api/${editTitleId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: editedTitle }), // Send editedTitle directly
          });

          console.log("Are you sending the new Title", editedTitle);

          if (response.ok) {
            await getConversation(editTitleId);
            setEditingTitle(false);
            setTitleUpdated((prev) => !prev); // Toggle the titleUpdated state
          }

          if (!response.ok) {
            throw new Error("Failed to update title");
          }
        } catch (error) {
          console.error("Error updating title:", error);

          // If the update fails, revert the change in the UI and alert the user
          const originalConversations = conversations.map((convo) =>
            convo.id === editTitleId
              ? { ...convo, title: (convo as any).title }
              : convo
          );
          // console.log(
          //   "Reverting to original conversations:",
          //   originalConversations
          // );
          setConversations(originalConversations);
          sessionStorage.setItem(
            "conversations",
            JSON.stringify(originalConversations)
          );

          alert("Failed to update title, please try again."); // Inform the user
        }
      }
    
  };
  //Gets the key down change 
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmitTitle(event as any); // Cast to any to satisfy FormEvent type
    }
  }

  //Editing the ability to change the existing title.
  const handleTitleClick = (convoId: string) => {
    const conversation = conversations.find(
      (convo) => (convo as any).conversationId === convoId
    );

    if (conversation) {
      setEditTitleId((conversation as any).conversationId);
      console.log("Logging the converatsion", conversation);
      setEditedTitle((conversation as any).title);
      setEditingTitle(true as boolean);
    } else {
      console.log(`Conversation with ID ${convoId} not found`);
    }
  };
  useEffect(() => {}, [editTitleId, editedTitle]);

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  // Logging the responses temp
  useEffect(() => {}, [responses]);

  // sessionStorage.clear();

  const handleConversationClick = (convoId: string) => {
    console.log("Activating conversation with ID:", convoId);
    localStorage.setItem("currentConversationId", convoId);
    sessionStorage.setItem("currentConversationId", convoId);

    const targetPath = `/chat/app/${session?.user.id}/${convoId}`;

    router.push(targetPath, undefined);

    setCurrentConversationId(convoId);
  };

  //Lets clear the chat Responses when we first load in
  // Function to remove the first index of chatResponses
  const removeFirstChatResponse = () => {
    if (isClient()) {
      const chatResponses = JSON.parse(
        sessionStorage.getItem("chatResponses") || "[]"
      );
      if (chatResponses.length > 0) {
        chatResponses.shift(); // Remove the first element
        sessionStorage.setItem("chatResponses", JSON.stringify(chatResponses));
        console.log("First chat response removed");
      } else {
        console.log("No chat responses to remove");
      }
    }
  };
  useEffect(() => {
    removeFirstChatResponse();
  }, [pathname]);

  //This function Deletes the cvonersation
  async function deleteConversation(conversationId: string) {
    if (isClient()) {
      const currentConversations = conversations;

      // Optimistically remove the conversation from UI
      const updatedConversations = currentConversations.filter(
        (convo) => (convo as any).conversationId !== conversationId
      );

      setConversations(updatedConversations);
      sessionStorage.setItem(
        "conversations",
        JSON.stringify(updatedConversations)
      );

      try {
        const response = await fetch(`/api/${conversationId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete the conversation");
        }

        // Filter out the deleted conversation
        const updatedConversations = conversations.filter(
          (convo) => (convo as any).converatoinID !== conversationId
        );
        console.log("Logging out the Conversation Filter", conversations);

        // Update state and local storage
        setConversations(updatedConversations); // Update React state
        sessionStorage.setItem(
          "conversations",
          JSON.stringify(updatedConversations)
        ); // Update local storage

        console.log("Conversations after deletion:", updatedConversations);
        console.log(
          "Local storage after deletion:",
          sessionStorage.getItem("conversations")
        );

        if (response.ok) {
          // Update the conversations state
          const updatedConversations = conversations.filter(
            (convo) => (convo as any).conversationId !== conversationId
          );
          setConversations(updatedConversations);

          // Update the session storage
          sessionStorage.setItem(
            "conversations",
            JSON.stringify(updatedConversations)
          );
          router.push(`/chat/app`);
        }
      } catch (error) {
        console.error("Error deleting conversation:", error.message);
        alert("Could not delete the conversation. Please try again.");
      }
    }
  }

  //Send an automated Message on load


  //Interface for this
  interface ConversationData {
    id: number;
    firstConvo: boolean;
  }


 
  //Get access to the current conversation Name and Id

  useEffect(() => {
    console.log("Loggin the conversations in the app useEffect", conversations);
  }, [conversations]);

  return (
    <div className="chatDashboard">
      {/* Chat Container Componet  */}

      <ChatContainer
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
        handleKeyDown = {handleKeyDown}
      />

      {/* Chat Container Componet  */}

      <div className="chatDashboardWrapper w-full text-left">
        <Header />

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
};

function Header() {
  return (
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
  );
}
export default dynamic(() => Promise.resolve(ChatDashboard), { ssr: false });
