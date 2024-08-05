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

  useEffect(() => {
    const hasViewedGuidelines = localStorage.getItem("hasViewedGuidelines");
    if (hasViewedGuidelines) {
      setShowGuidelines(false);
    }
  }, []);

  const handleGuidelinesComplete = () => {
    localStorage.setItem("hasViewedGuidelines", "true");
    setShowGuidelines(false);
  };

  const chatBotUrl =
    "https://biewq9aeo5.execute-api.us-east-1.amazonaws.com/dev/solomonAPI";

  //First introduction From
  const {
    userName,
    setUserName,
    splitUserName,
    email,
    setEmail,
    setSplitUserName,
  } = useSessionStorage();

  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [sessionStatus, setSessionStatus] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
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

  // Update session storage whenever userName or splitUserName changes
  // useEffect(() => {
  //   checkSession(status, {
  //     setUserId,
  //     setUserName,
  //     setSessionStatus,
  //     setEmail,
  //     setSplitUserName,
  //     isClient,
  //     session,
  //     router,
  //     email,
  //     userName: "",
  //     splitUserName,
  //   });
  // }, [status]);

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

  const handleMobileChatBtnClick = () => {
    console.log(
      "Logging the chat container Ref current state",
      chatContainerRef.current
    );

    if (chatContainerRef.current) {
      if (isAtZero) {
        chatContainerRef.current.style.transform = "translateX(-100%)";
      } else {
        chatContainerRef.current.style.transform = "translateX(0px)";
      }
      setIsAtZero(!isAtZero); // Toggle the state
    }
  };

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
  useEffect(() => {
   
  }, [sessionRef]);

  //Submit the Inquiry
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      console.error("Message is empty. Please enter a message.");
      return;
    }

    setMessagesIsLoading(true);
    console.log("Logging Conversation Id in the Submit", currentConversationId);
    if (isClient()) {
      if (!currentConversationId) {
        console.log("No conversation selected.");

        await createConversation().then((convoID) => {
          console.log("Logging the CONVO ID", convoID);

          setCurrentConversationId(convoID); // Store the convo ID if needed
          sessionStorage.setItem("currentConversationId", convoID);
          let localStorageConvoId: any;
          localStorage.setItem("currentConversationId", convoID);
          localStorageConvoId = localStorage.getItem("currentConversationId");
        });
      }

      // Ensure that currentConversationId is updated before proceeding
      const updatedConversationId = sessionStorage.getItem(
        "currentConversationId"
      );

      // 1. Set up the new response without any bot response yet.
      // 1. Set up the new response without any bot response yet.
      const newResponse = {
        question: message,
        response: "",
        id: "temp",
      };

      // Use functional update for state
      setResponses((responses) => [...responses, newResponse]);

      // Fetch user information if not available in session storage
      const userInfo = await fetchUserInfo(userId);

      setMessage("");

      try {
        // 2. Fetch bot reply from the API
        const botReply = await fetch(chatBotUrl, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            userId,
            message,
            conversationId: updatedConversationId,
            userInfo, // Send userInfo object
          }),
        }).then((res) => res.json());
        setMessagesIsLoading(false);

        setResponses((prevResponses) =>
          prevResponses.map((resp) => {
            if (resp.question === message) {
              return { ...resp, response: botReply.message, id: botReply };
            }
            return resp;
          })
        );

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

  useEffect(() => {});

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
          convo.conversationId === editTitleId
            ? { ...convo, title: (convo as any).title }
            : convo
        );

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
    if (event.key === "Enter") {
      handleSubmitTitle(event as any); // Cast to any to satisfy FormEvent type
    }
  };

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
        // console.log("No chat responses to remove");
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

  const handleCardClick = (text: string) => {
    setMessage(text);
  };

  const handleButtonClick = (event: any) => {
    const buttonElement = event.target as HTMLElement;
    const cardElement = buttonElement.closest("div");
    const text = cardElement?.querySelector("p")?.textContent || "";
    handleCardClick(text);
  };

  useEffect(() => {
    // console.log("Current message:", message);
  }, [message]);

  //Get access to the current conversation Name and Id

  useEffect(() => {
    // console.log("Loggin the conversations in the app useEffect", conversations);
  }, [conversations]);

  return (
    <MessageProvider>

      <div className = "overlay flex items-center ">
          <div className = "overlay blur">
            
          </div>

            <PayForAppPopup />
      </div>


      {showGuidelines && <Guidelines onComplete={handleGuidelinesComplete} />}

      <div className="chatDashboard">
        {/* Chat Container Componet  */}

        <ChatContainer
          setConversations={setConversations}
          conversations={conversations}
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

          <form
            ref={formRef}
            aria-disabled
            onSubmit={handleSubmit}
            className="chatFormSubmit"
          >
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
