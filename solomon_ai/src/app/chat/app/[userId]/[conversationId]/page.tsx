"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import CloseIcon from "../../../../../public/assets/close-arrow.png";
import Plus from "../../../../../public/assets/plus-icon.png";
import ChatIcon from "../../../../../public/assets/chat-icon.png";
import Dots from "../../../../../public/assets/dots.png";
import { useEffect, useState, useRef, FormEvent } from "react";
import { useSession, getSession } from "next-auth/react";
import { Session } from "next-auth";
import styles from "../../../../styles/chat.module.css";
import ChatMessage from "../../../../components/Chatmessage";
import DashboardNav from "../../../../components/DashboardNav";
import DeleteComponent from "../../../../components/helper/DeleteComponent";

import { Conversation } from "../../../../../../types";
import { Message } from "../../../../../../types";

import { ChatContainer } from "../../ChatContainer";
import { ChatMessagesContainer } from "../../ChatMessage";
import { Dashboard } from "../../Dashboard";
import LoadingComponent from "../../../../components/helper/Loading";

import useConversations from "../../../../hooks/useConversations";
import useCreateConversation from "../../../../hooks/createConversation";
import { useChatConversation } from "@/app/hooks/ConversationContext";
import { useTogglePosition } from "../../../../hooks/useTogglePosition";

import Link from "next/link";
import { title } from "process";

export default function ConversationPage() {
  const router = useRouter();
  const pathName = usePathname();
  const formRef = useRef<HTMLFormElement>(null);

  const [userName, setUserName] = useState<string | null>(null);
  const [splitUserName, setSplitUserName] = useState<string>("");
  const [email, setEmail] = useState<string | null>(null);

  const { responses, setResponses, message, setMessage } =
    useChatConversation();
  const localStorageConvoId = localStorage.getItem("currentConversationId");

  const form = useRef();
  const { data: session, status } = useSession();
  const [messagesIsLoading, setMessagesIsLoading] = useState<null | boolean>(
    null
  );
  //Set the conversation
  const [currentConversationId, setCurrentConversationId] = useState<
    number | null
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

  // const [isLoading, setLoading] = useState(false);

  //Extract the variable name
  function extractNumber(url) {
    const regex = /(\d+)(?!.*\d)/; // Regular expression to match the last number in the string
    const match = url.match(regex); // Apply the regex to the input string

    if (match && match.length > 0) {
      return match[0]; // Return the matched number
    }

    return null; // Return null if no match is found
  }

  useEffect(() => {
    if (userName !== null) {
      sessionStorage.setItem("userName", userName);
    }

    if (splitUserName !== "") {
      sessionStorage.setItem("splitUserName", splitUserName);
    }
  }, [userName, splitUserName]);

  const [showTitleInput, setShowTitleInput] = useState(false);
  const [editTitleId, setEditTitleId] = useState<null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const [titleUpdated, setTitleUpdated] = useState<boolean>(false); // New state for title updates

  const handleNewChatClick = () => {
    setShowTitleInput(true);
  };

  const handleBlur = () => {
    setEditTitleId(null); // Exit edit mode when input loses focus
  };
  //Editing the ability to change the existing title.
  const handleTitleClick = (convoId: number) => {
    console.log("Title is clicking!!!", convoId);
    console.log("Logging the title Id in the click function", editTitleId);
    console.log("Logging the conversations", conversations);



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
    console.log("Logging the converatation ID in the getConversation", conversationId);
    try {
      const response = await fetch(`/api/${conversationId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch conversation");
      }

      const updatedConversation = await response.json();
      console.log("Logging the converations before errorw", updatedConversation);
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

  async function deleteConversation(conversationId: number) {
    const currentConversations = conversations;

    console.log("logging The Convo Id On Delet", conversationId);
    console.log("logging The Convo Id On Delet", conversationId);

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

          console.log("Logging the updated Cache", updatedCache)
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
          (convo as any).conversationId === editTitleId ? { ...convo, title: newTitle } : convo
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
  
        console.log("logging the title change within the thing before ", titleChange);
      }
    }
    console.log("logging the title change within the after before ", titleChange)

      try {
        const response = await fetch(`/api/${editTitleId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: editedTitle }), // Send editedTitle directly
        });

        console.log("Are you sending the new Title", editedTitle)


        if (response.ok) {
          await getConversation(editTitleId);
          setEditingTitle(false);
          setTitleUpdated(prev => !prev); // Toggle the titleUpdated state
        }

        if (!response.ok) {
          throw new Error("Failed to update title");
        }
      } catch (error) {
        console.error("Error updating title:", error);

        // If the update fails, revert the change in the UI and alert the user
        const originalConversations = conversations.map((convo) =>
          convo.id === editTitleId ? { ...convo, title: (convo as any).title } : convo
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentConversationId) {
      console.log("No conversation selected.");

      await createConversation(); // Make sure there is a conversation ID
    }

    // 1. Set up the new response without any bot response yet.
    const newResponse = { question: message, response: "" };

    setResponses((responses) => [...responses, newResponse]); // Use functional update for state
    setMessage("");

    try {
      // 2. Fetch bot reply from the API
      const botReply = await fetch("http://localhost:3001/", {
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

      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user.id, // Ensure you have the current user's ID
          conversationId: currentConversationId,
          userContent: message, // User's message
          botResponse: botReply.message, // Bot's response, obtained separately
        }),
      });

      //Add the conversations arrawy or update
    } catch (error) {
      console.error("Error handling submission:", error);
    }
  };

  //Get the associated ids with the current user on inital load.

  // useEffect(() => {
  //   // possibly set an initial conversation ID here if needed
  //   if (conversations.length > 0 && !currentConversationId) {
  //     setCurrentConversationId(conversations[0].id);
  //     console.log("Logging the conversations in useEffect", conversations);
  //   }
  // }, [conversations]);

  const handleConversationClick = (convoId: number) => {
    console.log("Activating conversation with ID:", convoId);
    const targetPath = `/chat/app/${session?.user.id}/${convoId}`;

    router.push(targetPath, undefined);

    //Store the Current converatoinID in local to persit on chaning the navigation
    let localStorageConvoId: any;
    localStorage.setItem("currentConversationId", convoId.toString());

    localStorageConvoId = localStorage.getItem("currentConversationId");
    setCurrentConversationId(convoId);


    console.log("Logging hte current conversation ID", currentConversationId);
    console.log("Logging hte current The ConvoID", convoId);
  };



  //Get the full Message Conversation.

  const getMessageFromStorage = () => {
    const savedMessage = sessionStorage.getItem("initialMessage");

    return savedMessage ? JSON.parse(savedMessage) : null;
  };

  const clearStorage = () => {
    sessionStorage.removeItem("initialMessage");
  };

  useEffect(() => {
    // Code that should run when currentConversationId changes
    console.log("Current Conversation ID has updated:", currentConversationId);
  }, [currentConversationId]); // Make sure this is in the dependency list

  //Another Hook Check for the local storage
  useEffect(() => {
    console.log("Logging the localstorage id", localStorageConvoId);
    clearStorage();
  }, [currentConversationId]); // Dependency array includes state that triggers this effect

  // Call this function when you know the message has been successfully handled

  // useEffect(() => {
  //   const initialMessage = getMessageFromStorage();
  //   if (initialMessage && !responses.length) {
  //     setResponses([initialMessage]);
  //   }

  //   console.log("Logging to see if the responses change", responses);
  // }, [responses.length, setResponses]);

  // useEffect(() => {}, [responses]);

  useEffect(() => {}, [isLoading]);

  //Checking if Chat conversations is loading
  useEffect(() => {}, [messagesIsLoading]);

  //Fetch Message for this converations
  const fetchMessagesForConversation = async (conversationId: number) => {
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
          `/api/storedMessages?userId=${session?.user.id}&conversationId=${conversationId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const messages = await response.json();

        console.log("logging the MEssages in the joint", messages, session.user.id, conversationId)

        // Map API response to expected format in state
        const formattedMessages = messages.map((msg: Message) => ({
          question: msg.userContent,
          response: msg.botResponse,
        }));

        console.log("Logging the formatted message", formattedMessages);
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

  useEffect(() => {
    async function checkSession() {
      if (status === "loading") {
        console.log("Session is loading...");
        return;
      }

      if (status === "unauthenticated") {
        console.log("No session found, redirecting...");
        router.push("/");
      } else if (status === "authenticated") {
        const currentSession = await getSession();
        setUserName(currentSession?.user.name);
        if (!currentSession?.user.user) {
          // setEmail(currentSession?.user.email.split("@")[0]);
          setEmail(currentSession?.user.email.split("@")[0]);

          //We want to get Just to logo of the userName
          setSplitUserName(currentSession?.user.email[0].toUpperCase());
        }
        console.log("Logging session user name", currentSession?.user.name);
      }
    }

    checkSession();
  }, [status, router, session]);

  // useEffect(() => {
  //   setResponses([]); // Clear previous messages
  //   if (currentConversationId) {
  //     fetchMessagesForConversation(currentConversationId as number);
  //   }
  // }, [currentConversationId]); // Depend on currentConversationId

  useEffect(() => {
    setResponses([]); // Clear previous messages


    console.log("Logging the CUrrent in the Fetch Resposnes", currentConversationId)
    console.log("Loggin the local stroage iddd", localStorageConvoId)
    if (status === "authenticated" && session) {
      // Fetch messages for the current conversation if needed
      if(currentConversationId === null) {
        console.log("Fetch is Null fetch is nul", currentConversationId)
        fetchMessagesForConversation(currentConversationId as any || Number(localStorageConvoId));


      }else { 
        console.log("Fech is doing good", currentConversationId)

        // fetchMessagesForConversation(Number(localStorageConvoId))
      }
    }
  }, [currentConversationId]);

  if (!conversations) {
    return <p>No conversation found.</p>;
  }

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
        editingTitle = {editingTitle}
        titleUpdated={titleUpdated}
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

        <div className={`chatDashBoardContainer `}>
          {/* Dashboard Component  */}

          {responses.length > 0 ? (
            <ChatMessagesContainer responses={responses || "null"} />
          ) : (
            <div className="w-full flex items-center justify-center">
              <LoadingComponent />
            </div>
            // <Dashboard userName={userName || ""} />
          )}

          {/* Dashboard Component  */}
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
