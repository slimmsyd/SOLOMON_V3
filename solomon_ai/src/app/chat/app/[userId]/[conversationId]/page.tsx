"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

import { Message } from "../../../../../../types";

import { Header } from "@/app/components/Header";

import { ChatContainer } from "../../ChatContainer";
import { ChatMessagesContainer } from "../../ChatMessage";
import LoadingComponent from "../../../../components/helper/Loading";

import useConversations from "../../../../hooks/useConversations";
import useCreateConversation from "../../../../hooks/createConversation";
import { useChatConversation } from "@/app/hooks/ConversationContext";
import { useSessionStorage } from "@/app/hooks/useSessionStorage";
import FloatingScrollButton from "@/app/components/ScrollToBottomButton";

import OpenChatContainer from "@/app/components/helper/openChatContainerComponent";

//Utilis
import { checkSession } from "@/utilis/CheckSession";
import ButtonLoadingComponent from "@/app/components/helper/buttonComponentLoading";

import { isClient } from "@/utilis/isClient";
import { debug } from "console";

export default function ConversationPage() {
  const chatBotUrl =
    "https://biewq9aeo5.execute-api.us-east-1.amazonaws.com/dev/solomonAPI";

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  //Should wrap these in a bigger function since being used multiple times?

  const [sessionStatus, setSessionStatus] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [showGuidelines, setShowGuidelines] = useState(true);

  const {
    userName,
    setUserName,
    splitUserName,
    email,
    setEmail,
    setSplitUserName,
  } = useSessionStorage();

  const { responses, setResponses, message, setMessage } =
    useChatConversation();

  let localStorageConvoId: any;

  useEffect(() => {
    if (localStorage.getItem("currentConversationId")) {
      localStorageConvoId = localStorage.getItem("currentConversationId");
      setCurrentConversationId(localStorageConvoId);
    }
  }, []);

  const form = useRef();
  const { data: session, status } = useSession();
  const [messagesIsLoading, setMessagesIsLoading] = useState<null | boolean>(
    null
  );

  const [isReponseLoading, setResponseLoading] = useState<boolean>(false);

  //Set the conversation
  const [currentConversationId, setCurrentConversationId] = useState<
    number | string | null
  >(null);

  // const [newTitle, setNewTitle] = useState("");

  const { conversations, isLoading, setConversations } = useConversations(
    session as any
  );

  //Creating a new Conversation.
  const { createConversation, newTitle, setNewTitle, isCreateLoading, error } =
    useCreateConversation(
      session as Session,
      setConversations as any,
      setCurrentConversationId
    );

  useEffect(() => {
    checkSession(status, {
      setUserId,
      setUserName,
      setSessionStatus,
      setEmail,
      setSplitUserName,
      isClient,
      session,
      router,
      email,
      userName,
      splitUserName,
    });
  }, [status]);
  //This funcitno shifts and shows the mobile Chat ccontainer
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isAtZero, setIsAtZero] = useState<boolean>(false); // State to track the position

  const handleMobileChatBtnClick = () => {
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

  useEffect(() => {
    if (userName !== null) {
      sessionStorage.setItem("userName", userName);
    }

    if (splitUserName !== "") {
      sessionStorage.setItem("splitUserName", splitUserName);
    }
  }, [userName, splitUserName]);

  const [editTitleId, setEditTitleId] = useState<null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const [titleUpdated, setTitleUpdated] = useState<boolean>(false); // New state for title updates

  //Editing the ability to change the existing title.
  const handleTitleClick = (convoId: string | number) => {
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

  async function deleteConversation(conversationId: string | number) {
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

  function updateLocalStorage(
    updatedConversation: any,
    conversationId: number
  ) {
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

          sessionStorage.setItem("conversations", JSON.stringify(updatedCache));
        } else {
          console.error("Parsed cached conversations is not an array");
        }
      } catch (e) {
        console.error("Error parsing cached conversations:", e);
      }
    }
  }

  const handleSubmitTitle = async (event: any) => {
    event.preventDefault(); // Prevent form submission
    let titleChange: string = "";

    if (event.key === "Enter") {
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
      }
    }

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
  };

  const chatDashBoardRef = useRef<HTMLDivElement>(null);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      console.error("Message is empty. Please enter a message.");
      return;
    }

    setResponseLoading(true);
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

      let currentConvoId = sessionStorage.getItem("currentConvoId");
      if (currentConvoId) setCurrentConversationId(currentConversationId);

      // 1. Set up the new response without any bot response yet.
      const newResponse = {
        question: message,
        response: "",
        id: "temp",
      };

      // Use functional update for state
      setResponses((responses) => [...responses, newResponse]);

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
            conversationId: currentConvoId || currentConversationId,
          }),
        }).then((res) => res.json());
        setResponseLoading(false);

        // 3. Update the responses array with the bot's reply
        setResponses((prevResponses) =>
          prevResponses.map((resp) => {
            if (resp.question === message) {
              return { ...resp, response: botReply.message };
            }
            return resp;
          })
        );

        console.log("Logging the new Responses", responses);

        // 4. Send the user question and bot response to the database

        await fetch("/api/messages", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            userId: session?.user.id, // Ensure you have the current user's ID
            conversationId: updatedConversationId,
            userContent: message, // User's message
            botResponse: botReply.message, // Bot's response, obtained separately
          }),
        });

        //Add the conversations arrawy or update
      } catch (error) {
        console.error("Error handling submission:", error);
      }
    }
  };

  const handleConversationClick = (convoId: string) => {
    const targetPath = `/chat/app/${session?.user.id}/${convoId}`;

    router.push(targetPath, undefined);

    //Store the Current converatoinID in local to persit on chaning the navigation
    let localStorageConvoId: any;
    localStorage.setItem("currentConversationId", convoId);

    localStorageConvoId = localStorage.getItem("currentConversationId");
    setCurrentConversationId(convoId);
  };

  //Get the full Message Conversation.

  const clearStorage = () => {
    sessionStorage.removeItem("initialMessage");
  };

  //Another Hook Check for the local storage
  useEffect(() => {
    if (currentConversationId) {
      handleConversationClick(currentConversationId as string);
    }
    clearStorage();
  }, [currentConversationId]); // Dependency array includes state that triggers this effect

  useEffect(() => {}, [isLoading]);

  //Checking if Chat conversations is loading
  useEffect(() => {}, [messagesIsLoading]);
  useEffect(() => {}, [isReponseLoading]);

  //Fetch Message for this converations
  const messagesRefCounter = useRef(0);
  useEffect(() => {}, [messagesRefCounter]);
  const fetchMessagesForConversation = async (conversationId: string) => {
    messagesRefCounter.current += 1;
    if (messagesRefCounter.current > 1) {
      return;
    }

    if (!session || !session.user || !session.user.id) {
      console.error("No user session available");
      return;
    }
    setMessagesIsLoading(true);

    if (!conversationId) {
      console.error("no conversatoin ID");
      return;
    } else {
      try {
        const response = await fetch(
          `/api/storedMessages?authorId=${session?.user.id}&conversationId=${conversationId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const messages = await response.json();

        // console.log("Add the IDS",messages.map(msgs => msgs.id))

        // Map API response to expected format in state
        //Naming conventions matter
        const formattedMessages = messages.map((msg: Message) => ({
          question: msg.userContent,
          response: msg.botResponse,
          id: msg.id,
        }));

        setResponses([]);

        if (response.ok) {
          setResponses(formattedMessages);
        }
        setMessagesIsLoading(false);
      } catch (error) {
        setMessagesIsLoading(true);
        console.error("Error fetching messages:", error);
      }
    }
  };

  useEffect(() => {}, [responses]);

  useEffect(() => {
    setResponses([]); // Clear previous messages

    if (status === "authenticated" && session) {
      // Fetch messages for the current conversation if needed
      if (currentConversationId === null) {
        fetchMessagesForConversation(
          (currentConversationId as any) || localStorageConvoId
        );
      } else {
        // console.log("Fech is doing good", currentConversationId);
      }
    }
  }, [currentConversationId]);

  if (!conversations) {
    return <p>No conversation found.</p>;
  }

  const [chatContainerShown, setChatContainerShown] = useState<boolean>(false);
  const chatContainerToggle = () => {
    console.log("IS this being clicked??? Showon yes or no");
    setChatContainerShown(!chatContainerShown);
  };

  //Function takes you to the bottom of the div by clicking the floating button.

  return (
    <div className="chatDashboard">
      {/* Chat Container Componet  */}

      <ChatContainer
        setConversations={setConversations}
        conversations={conversations}
        currentConversationId = {currentConversationId}
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
        chatContainerRef={chatContainerRef as any}
        handleMobileChatBtnClick={handleMobileChatBtnClick}
      />

      {/* Chat Container Componet  */}

      <div
        ref={chatDashBoardRef}
        className="chatDashboardWrapper w-full text-left"
      >
        <OpenChatContainer
          chatContainerToggle={chatContainerToggle}
          chatContainerShown={chatContainerShown}
        />
        {/* Guidelines Hader */}

  
        <Header
          showGuidelines={showGuidelines}
          setShowGuidelines={setShowGuidelines}
          handleMobileChatBtnClick={handleMobileChatBtnClick}
        />

        <div className={`chatDashBoardContainer `}>
          {/* Dashboard Component  */}

          {responses.length > 0 ? (
            <ChatMessagesContainer responses={(responses as any) || []} />
          ) : (
            <div className="w-full flex items-center justify-center">
              <LoadingComponent />
            </div>
            // <Dashboard userName={userName || ""} />
          )}


          {/* Dashboard Component  */}


     

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="chatFormSubmit"
          >
              <FloatingScrollButton chatDashBoardRef={chatDashBoardRef} />


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
                  {isReponseLoading ? (
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
    </div>
  );
}
