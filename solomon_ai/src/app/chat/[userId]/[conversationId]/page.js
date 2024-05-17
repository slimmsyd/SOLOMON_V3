"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import CloseIcon from "../../../../../public/assets/close-arrow.png";
import Plus from "../../../../../public/assets/plus-icon.png";
import ChatIcon from "../../../../../public/assets/chat-icon.png";
import Dots from "../../../../../public/assets/dots.png";
import { useEffect, useState, useRef } from "react";
import { useSession, getSession } from "next-auth/react";
import styles from "../../../../styles/chat.module.css";
import ChatMessage from '../../../components/Chatmessage'
import DashboardNav from "../../../components/DashboardNav";
import DeleteComponent from '../../../components/helper/DeleteComponent'
import LoadingComponent from "../../../components/helper/Loading";

import useConversations from '../../../hooks/useConversations'
import useCreateConversation from "../../../hooks/createConversation";
import { useChatConversation } from "@/app/hooks/ConversationContext";
import { useTogglePosition } from "../../../hooks/useTogglePosition";
import Link from "next/link";
export default function ConversationPage() {
  const router = useRouter();
  const pathName = usePathname();

  const { responses, setResponses, message, setMessage } =
    useChatConversation();
  const localStorageConvoId = localStorage.getItem("currentConversationId");

  const close_chat = useRef();
  const chat_selection = useRef();
  const app_wrapper = useRef();
  const mobile_chat_button = useRef();
  const form = useRef();
  const { data: session, status } = useSession();
  const [messagesIsLoading, setMessagesIsLoading] = useState(null);
  //Set the conversation
  // const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);

  // const [newTitle, setNewTitle] = useState("");

  const { conversations, isLoading, setConversations } =
    useConversations(session);

  //Creating a new Conversation.
  const { createConversation, newTitle, setNewTitle, isCreateLoading, error } =
    useCreateConversation(session, setConversations, setCurrentConversationId);

  const [selectionRef, togglePosition, isExpanded] = useTogglePosition();

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

  // Opening the Menu Codebase
  const [isVisible, setIsVisble] = useState(null);

  const handleMenuClick = () => {
    setIsVisble(!isVisible);
  };

  function adjustHeight(el) {
    // Reset the height to 'auto' to get the real scrollHeight
    // and then set it back to that scrollHeight
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }

  const closeChat = () => {
    let wrapper = app_wrapper.current;
    let chat = chat_selection.current;
    let mobileChat = mobile_chat_button.current;
    let form_btn = form.current;
    chat.style.width = "0px";
    chat.style.padding = "0px";
    mobileChat.style.visibility = "visible";
    wrapper.style.gridTemplateColumns = "0px 3fr 1fr";
    form_btn.style.width = "700px%";
  };

  const openChat = () => {
    let wrapper = app_wrapper.current;
    let chat = chat_selection.current;
    let mobileChat = mobile_chat_button.current;
    let form_btn = form.current;

    mobileChat.style.visibility = "hidden";
    chat.style.width = "335px";
    chat.style.padding = "20px 32px";
    wrapper.style.gridTemplateColumns = "335px 1fr 0.55fr ";
    form_btn.style.width = "615px";
  };

  const [showTitleInput, setShowTitleInput] = useState(false);
  const [editTitleId, setEditTitleId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    async function checkSession() {
      if (status === "loading") {
        // Log that the session is loading, wait for session check to complete
        console.log("Session is loading...");
        return;
      }

      if (status === "unauthenticated") {
        // Handle unauthenticated status by redirecting to the home page
        console.log("No session found, redirecting...");
        router.push("/");
      } else if (status === "authenticated") {
        // If authenticated, fetch the session to ensure it's up to date
        // console.log('Session is authenticated, confirming session data...', status);
        const currentSession = await getSession();
        await getSession();
        // console.log('Current session data:', currentSession);
        // console.log("Logging session user name", currentSession.user.username)
        // Optionally, handle the session data here, e.g., setting user state
      }
    }

    checkSession();
  }, [status, router]);

  const handleNewChatClick = () => {
    setShowTitleInput(true);
  };

  const handleBlur = () => {
    setEditTitleId(null); // Exit edit mode when input loses focus
  };
  //Editing the ability to change the existing title.
  const handleTitleClick = (convo) => {
    setEditTitleId(convo.conversationId);

    setEditedTitle(convo.title);
    // console.log("Logging the Convo Id", convo.conversationId);
    // console.log("Loggin the convo Title", convo.title);
    // console.log("Logging the edit Tittle ID", editTitleId);
    // console.log("Logging the Edit title", editedTitle);
    // console.log("LOgging the convo ID", convo.conversationId)
    // console.log("Logging the convo", convo)
    // console.log("Logging the Edit title to be changed", convo.title)
  };

  useEffect(() => {}, [editTitleId, editedTitle]);

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  async function getConversation(conversationId) {
    console.log("Logging the converatation ID in the get", conversationId);
    try {
      const response = await fetch(`/api/conversations/${conversationId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch conversation");
      }

      const updatedConversation = await response.json();
      console.log("Logging the converations before errorw");
      // Update local state
      setConversations((prevConversations) => {
        return prevConversations.map((convo) =>
          convo.conversationId === conversationId
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

  async function deleteConversation(conversationId) {
    const currentConversations = conversations;
    // Optimistically remove the conversation from UI
    const updatedConversations = currentConversations.filter(
      (convo) => convo.conversationId !== conversationId.conversationId
    );

    setConversations(updatedConversations);
    localStorage.setItem("conversations", JSON.stringify(updatedConversations));

    try {
      const response = await fetch(
        `/api/conversations/${conversationId.conversationId}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the conversation");
      }

      // Filter out the deleted conversation
      const updatedConversations = conversations.filter(
        (convo) => convo.conversationId !== conversationId.conversationId
      );
      console.log("Logging out the Conversation Filter", conversations);

      // Update state and local storage
      setConversations(updatedConversations); // Update React state
      localStorage.setItem(
        "conversations",
        JSON.stringify(updatedConversations)
      ); // Update local storage

      console.log("Conversations after deletion:", updatedConversations);
      console.log(
        "Local storage after deletion:",
        localStorage.getItem("conversations")
      );
    } catch (error) {
      console.error("Error deleting conversation:", error.message);
      alert("Could not delete the conversation. Please try again.");
    }
  }

  function updateLocalStorage(updatedConversation, conversationId) {
    let cachedConversations = localStorage.getItem("conversations");
    if (cachedConversations) {
      cachedConversations = JSON.parse(cachedConversations);
      const updatedCache = cachedConversations.map((convo) =>
        convo.conversationId === conversationId
          ? { ...convo, title: updatedConversation.title }
          : convo
      );
      localStorage.setItem("conversations", JSON.stringify(updatedCache));
    }
  }

  const handleSubmitTitle = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      const newTitle = editedTitle; // Capture the title at the time of submission
      // console.log("New title to be set:", newTitle);
      // console.log("New title Id being logged", editTitleId);

      // Optimistically update the UI before the API call
      const updatedConversations = conversations.map((convo) =>
        convo.id === editTitleId ? { ...convo, title: newTitle } : convo
      );

      // console.log("Updated conversations:", updatedConversations);
      setConversations(updatedConversations);

      // Update local storage immediately after updating state
      localStorage.setItem(
        "conversations",
        JSON.stringify(updatedConversations)
      );

      setEditTitleId(null); // Exit edit mode
      setEditedTitle(""); // Clear the edited title state

      // Attempt to update the backend
      try {
        const response = await fetch(`/api/conversations/${editTitleId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: newTitle }),
        });

        if (response.ok) {
          await getConversation(editTitleId);
        }

        if (!response.ok) {
          throw new Error("Failed to update title");
        }
      } catch (error) {
        console.error("Error updating title:", error);

        // If the update fails, revert the change in the UI and alert the user
        const originalConversations = conversations.map((convo) =>
          convo.id === editTitleId ? { ...convo, title: convo.title } : convo
        );
        // console.log(
        //   "Reverting to original conversations:",
        //   originalConversations
        // );
        setConversations(originalConversations);
        localStorage.setItem(
          "conversations",
          JSON.stringify(originalConversations)
        );

        alert("Failed to update title, please try again."); // Inform the user
      }
    }
  };
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

      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: Number(session.user.id), // Ensure you have the current user's ID
          conversationId: Number(currentConversationId),
          userContent: message, // User's message
          botResponse: botReply.message, // Bot's response, obtained separately
        }),
      });

      // console.log(
      //   "LOgging the user data to be sent",
      //   session.user.id,
      //   currentConversationId,
      //   message
      // );
    } catch (error) {
      console.error("Error handling submission:", error);
    }
  };

  //Get the associated ids with the current user on inital load.

  useEffect(() => {
    // possibly set an initial conversation ID here if needed
    if (conversations.length > 0 && !currentConversationId) {
      setCurrentConversationId(conversations[0].id);
      // console.log("Logging the ueser conversatoin", conversations);
      // console.log(
      //   "Setting initial conversation ID:",
      //   conversations[0].conversationId
      // );
    }
  }, [conversations]);

  const handleConversationClick = (convoId) => {
    console.log("Activating conversation with ID:", convoId.conversationId);
    console.log("HandleConversationClick has been clicked", convoId);

    //Store the Current converatoinID in local to persit on chaning the navigation
    let localStorageConvoId;
    localStorage.setItem(
      "currentConversationId",
      convoId.conversationId
        ? convoId.conversationId.toString()
        : convoId.id.toString()
    );

    localStorageConvoId = localStorage.getItem("currentConversationId");
    setCurrentConversationId(convoId.conversationId);

    console.log("Logging the localstorage id", localStorageConvoId);

    console.log(
      "Are we fetching Conversations again on each click handle click button",
      convoId.conversationId
    );
    router.push(
      `/chat/${session.user.id}/${convoId.conversationId || convoId.id}`,
      undefined,
      {
        shallow: true,
      }
    );

    console.log("Logging the CONversation Id in the convoId chnage", convoId);
  };

  useEffect(() => {
    const savedConvoId = localStorage.getItem("currentConversationId");
    console.log("Logging the SavedConvoID", savedConvoId);
    if (savedConvoId) {
      setCurrentConversationId(savedConvoId);
    }
  }, []);

  //Get the full Message Conversation.
  const fetchMessagesForConversation = async (conversationId) => {
    setMessagesIsLoading(true);
    console.log(
      "Logging the converationID in fetch Messages for conversation",
      conversationId
    );
    if (!session || !session.user || !session.user.id) {
      console.log("NO user session avaible");
      setMessagesIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/storedMessages?userId=${Number(
          session.user.id
        )}&conversationId=${currentConversationId}`
      );

      if (!response.ok) {
        setMessagesIsLoading(true);
        throw new Error("Failed to fetch messages");
      }

      const messages = await response.json();

      console.log(
        `Logging the Messsages for the ${conversationId} messages`,
        messages
      );

      // Map API response to expected format in state
      const formattedMessages = messages.map((msg) => ({
        question: msg.userContent,
        response: msg.botResponse,
      }));

      setResponses(formattedMessages);
      setMessagesIsLoading(false);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const getMessageFromStorage = () => {
    const savedMessage = sessionStorage.getItem("initialMessage");

    return savedMessage ? JSON.parse(savedMessage) : null;
  };

  const clearStorage = () => {
    sessionStorage.removeItem("initialMessage");
  };

  useEffect(() => {
    setResponses([]); // Clear previous messages
    if (currentConversationId) {
      fetchMessagesForConversation(currentConversationId);
    }
  }, [currentConversationId]); // Depend on currentConversationId

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

  useEffect(() => {
    const initialMessage = getMessageFromStorage();
    if (initialMessage && !responses.length) {
      setResponses([initialMessage]);
    }
  }, [responses.length, setResponses]);

  useEffect(() => {
    console.log("Logging the current responses", responses);
  }, [responses]);

  useEffect(() => {
    console.log("logging The isLoading state", isLoading);
  }, [isLoading]);

  //Checking if Chat conversations is loading
  useEffect(() => {
    console.log(
      "LOgging the state to see if hte messages is loading",
      messagesIsLoading
    );
  }, [messagesIsLoading]);

  if (!conversations) {
    return <p>No conversation found.</p>;
  }

  return (
    <div className={styles.app_container}>
      <DashboardNav togglePosition={togglePosition} isExpanded={isExpanded} />
      <div
        className={`${styles.holder} ${isVisible === true ? "visible" : ""}`}
      ></div>
      <div ref={app_wrapper} className={styles.app_wrapper}>
        <div ref={chat_selection} className={styles.chat_selection}>
          <div className={`${styles.flex_col} ${isLoading ? "" : ""}`}>
            <div className={styles.flex_row}>
              <Link
                href="/chat"
                className={`${styles.new_chat} ${styles.chat_btn}`}
              >
                <div
                  onClick={() => {
                    createConversation();
                  }}
                  className={styles.button_image}
                >
                  <Image src={Plus} width={100} height={100} />
                </div>
                New Chat
              </Link>
              <button
                ref={close_chat}
                onClick={closeChat}
                className={`${styles.close_chat} ${styles.chat_btn}`}
              >
                <Image src={CloseIcon} width={100} height={100} />
              </button>
            </div>
            {conversations.length > 0 ? (
              conversations.map((convo, index) => (
                <div
                  key={convo.id || index}
                  className={`${styles.flex_row} ${styles.new_chat_div} ${
                    isLoading
                      ? "!justify-center flex flex-row items-center"
                      : ""
                  }`}
                >
                  {editTitleId === convo.conversationId ? (
                    // Input for editing a title
                    <div className="flex flex-row justify-center items-center gap-3">
                      <Image src={ChatIcon} width={32} height={32} />
                      <input
                        value={editedTitle}
                        onChange={handleTitleChange}
                        disabled={editTitleId === null}
                        onKeyDown={handleSubmitTitle}
                        onBlur={handleBlur}
                      />
                    </div>
                  ) : isLoading ? (
                    // Show loading where the conversation would be
                    <LoadingComponent isLoading={isLoading} />
                  ) : (
                    // Regular conversation display
                    <>
                      <div className="flex flex-row justify-start items-center gap-3 w-[60%]">
                        <Image src={ChatIcon} width={32} height={32} />
                        <span onClick={() => handleConversationClick(convo)}>
                          {convo.title}
                        </span>
                      </div>
                      <div className="flex flex-row justify-center items-center gap-3">
                        <Image
                          onClick={() => handleTitleClick(convo)}
                          src={Dots}
                          width={16}
                          height={16}
                        />
                        <DeleteComponent
                          onDelete={() => deleteConversation(convo)}
                          conversationId={convo}
                        />
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <></>
              // Render the LoadingComponent if no conversations are present
              // <LoadingComponent />
            )}
          </div>
        </div>
        <div className={styles.chat_conversation}>
          {localStorageConvoId ? (
            <>
              <button
                onClick={openChat}
                className={`${styles.close_chat} ${styles.chat_btn} ${styles.fixed_chat_btn}`}
              >
                <Image
                  src={CloseIcon}
                  width={100}
                  height={100}
                  alt="Close Chat"
                />
              </button>
              <div className={styles.chat_name}>
                <div className={styles.chat_container}>
                  <div className={styles.chat_box}>
                    <div className={styles.chat_flex}>
                      <div
                        className={`${styles.chat_Messages}  ${
                          messagesIsLoading
                            ? "items-center justify-center flex"
                            : ""
                        }`}
                      >
                        {messagesIsLoading || !currentConversationId ? (
                          <></>
                        ) : (
                          // <LoadingComponent /> // Assuming LoadingComponent is the component you use for loading indication
                          responses.map((r, i) => (
                            <div className={styles.response_Flex} key={i}>
                              <p
                                className={`${styles.bot_Messages} ${styles.new_bot_message}`}
                              >
                                {r.question}
                              </p>
                              {r.response && (
                                <p className={styles.user_Messages}>
                                  <ChatMessage
                                    message={r.response}
                                    shouldAnimate={r.isNew}
                                  />
                                </p>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  <form
                    ref={form}
                    className={styles.form}
                    onSubmit={handleSubmit}
                  >
                    <textarea
                      onChange={(e) => {
                        setMessage(e.target.value);
                        adjustHeight(e.target);
                      }}
                      value={message}
                      id={styles.chatInput}
                      placeholder="Ask Thou Question..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          form.current.requestSubmit();
                        }
                      }}
                    ></textarea>
                    <button type="submit">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        class="text-white"
                      >
                        <path
                          d="M7 11L12 6L17 11M12 18V7"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>




   <div
          ref={selectionRef}
          className={`${styles.chat_selection} ${styles.chat_selection_mobile}`}
        >
          <div className={styles.flex_col}>
            <div className={styles.flex_row}>
              {/* {showTitleInput && (
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter chat title or press enter for default"
                  onKeyDown={(e) => e.key === "Enter" && createConversation()}
                />
              )} */}
              <Link
                href="/chat"
                className={`${styles.new_chat} ${styles.chat_btn}`}
              >
                <div
                  onClick={() => {
                    createConversation();
                  }}
                  className={styles.button_image}
                >
                  <Image src={Plus} width={100} height={100} />
                </div>
                New Chat
              </Link>
              <button
                ref={close_chat}
                onClick={closeChat}
                className={`${styles.close_chat} ${styles.chat_btn}`}
              >
                <Image src={CloseIcon} width={100} height={100} />
              </button>
            </div>

            {conversations.length > 0 ? (
              conversations.map((convo) => (
                <div
                  key={convo.id}
                  className={`${styles.flex_row} ${styles.new_chat_div} ${
                    isLoading
                      ? "!justify-center flex flex-row items-center"
                      : ""
                  }`}
                >
                  {editTitleId === convo.conversationId ? (
                    // Input for editing a title
                    <div className="flex flex-row justify-center items-center gap-3">
                      <Image src={ChatIcon} width={32} height={32} />
                      <input
                        value={editedTitle}
                        onChange={handleTitleChange}
                        disabled={editTitleId === null}
                        onKeyDown={handleSubmitTitle}
                        onBlur={handleBlur}
                      />
                    </div>
                  ) : isLoading ? (
                    // Show loading where the conversation would be
                    <LoadingComponent isLoading={isLoading} />
                  ) : (
                    // Regular conversation display
                    <>
                      <div className="flex flex-row justify-start items-center gap-3 w-[60%]">
                        <Image src={ChatIcon} width={32} height={32} />
                        <span onClick={() => handleConversationClick(convo)}>
                          {convo.title}
                        </span>
                      </div>
                      <div className="flex flex-row justify-center items-center gap-3">
                        <Image
                          onClick={() => handleTitleClick(convo)}
                          src={Dots}
                          width={16}
                          height={16}
                        />
                        <DeleteComponent
                          onDelete={() => deleteConversation(convo)}
                          conversationId={convo}
                        />
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              // Render the LoadingComponent if no conversations are present
              <LoadingComponent />
            )}
          </div>
        </div>

        <div className={styles.chat_guidelines}>
          <div className={`${styles.flex_col} ${styles.flex_start}`}>
            <div className={`${styles.flex_row} `}>Guidance Tours...</div>

            <div className={styles.guidance_div}></div>

            <div className={styles.guidance_div}></div>

            <div className={styles.guidance_div}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
