import { FormEvent, useEffect, useRef, useState } from "react";
import React, { FC, RefObject } from "react";
import Link from "next/link";
import Image from "next/image";
import arrowLeft from "../../../../public/assets/Chat/arrowLeft.png";
import searchIcon from "../../../../public/assets/Chat/searchIcon.png";
import chatIcon from "../../../../public/assets/Chat/chatIcon.png";
import iconChat from "../../../../public/assets/Chat/iconChat.png";
import settingsIcon from "../../../../public/assets/Chat/settingsIcon.png";
import { Conversation } from "../../../../types";

interface ChatContainerProps {
  conversations?: Conversation[];
  splitUserName: string;
  userName: string;
  email?: string;
  onConversationClick?: (convoId: string) => void;
  onDeleteConvo?: (convoId: number | string) => void;
  onChangeConvoTitle?: (event: any) => void;
  handleTitleClick?: (event: any) => void;
  handleTitleChange?: (event: any) => void;
  editTitleId?: null;
  editedTitle?: string;
  editingTitle?: boolean;
  titleUpdated?: boolean,
  handleKeyDown?: (event: any) => void;

}

export const ChatContainer: FC<ChatContainerProps> = ({
  splitUserName,
  userName,
  email,
  onConversationClick,
  onDeleteConvo,
  onChangeConvoTitle,
  handleTitleClick,
  editTitleId,
  editedTitle,
  handleTitleChange,
  editingTitle,
  titleUpdated,
  handleKeyDown
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);



  //Controlling hte hover state of the Delete SVG
  const [hoveredConversationId, setHoveredConversationId] = useState<
    null | string
  >(null);

  const [showDeleteContainer, setShowDeleteContainer] =
    useState<boolean>(false);
  useState<boolean>(false);
  const deleteContainerRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      deleteContainerRef.current &&
      !deleteContainerRef.current.contains(event.target as Node)
    ) {
      setShowDeleteContainer(false);
    }
  };


  useEffect(() => {}, [editTitleId, editedTitle, editingTitle]);




  useEffect(() => {
    if (showDeleteContainer) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showDeleteContainer]);

  //Checking hte hover VOneration ID
  useEffect(() => {
  }, [hoveredConversationId]);

  //Want to get access to the conversatiosn and display in local chat
  useEffect(() => {
    // Retrieve the conversations from local storage
    const localStorageConversations = sessionStorage.getItem("conversations");

    if (localStorageConversations) {
      const conversationArray: Conversation[] = JSON.parse(
        localStorageConversations
      );
      setConversations(conversationArray); // Set the conversations state as an array
      console.log("Loggin the conversations array", conversationArray)
    }

  }, [titleUpdated]);



  useEffect(() => { 


  })



  return (
    <div className="chatContainer flex flex-col flex-1">
      <div className="flex flex-col gap-[22px]  h-full">
        {" "}
        <div className="flex flex-row">
          <div className="logoCircle"></div>
          <h3>Logo</h3>
        </div>
        <button className=" text-[14px] newChat flex flex-row items-center justify-center gap-[13px]">
          <div className="mainIcon">
            <Image alt="arrowLeft" src={arrowLeft} width={100} height={100} />
          </div>
          <p>New Chat</p>
        </button>
        <button className=" text-[14px] flex flex-row items-center justify-start gap-[13px] w-[135px] chatSearchIcon ">
          <div className="mainIcon">
            <Image alt="searchIcon" src={searchIcon} width={100} height={100} />
          </div>

          <Link href="/chat/app">
            <p>Dashboard</p>
          </Link>
        </button>
        <button className=" text-[14px] flex flex-row items-center justify-start gap-[13px] w-[135px] pl-[17px] ">
          <div className="mainIcon !w-[20px] !h-[20px]">
            <Image alt="chatIcon" src={chatIcon} width={100} height={100} />
          </div>

          <p>Chats</p>
        </button>
        {/* Chat ICON layered right here  */}
        <div className="chatRenderWrapper relative flex flex-col items-start justify-start gap-[13px] w-full">
          {/* Clear all Chats Div */}
          <div className="absolute w-[10px] h-[10px] left-[-20px] cursor-pointer	 ">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="xmark"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"
              ></path>
            </svg>
          </div>

          <div className="flex flex-col gap-[13px] overflow-scroll w-[95%] chatScrollbar ">
            {conversations.map((conversation) => (
              <div key={conversation.conversationId} className="relative">
                <button
                onClick={() => {
                  if (!editingTitle) {
                    onConversationClick && onConversationClick(conversation.conversationId);
                  }
                }}
                  onMouseEnter={() =>
                    setHoveredConversationId(conversation.conversationId)
                  }
                  // onMouseLeave={() => setHoveredConversationId()}
                  className="flex flex-row pl-[19px] gap-[13px] items-center w-full"
                >
                  <div className="mainIcon !w-[18px] !h-[18px]">
                    <Image
                      alt="iconChat"
                      src={iconChat}
                      width={18}
                      height={18}
                    />
                  </div>

                {editTitleId === (conversation as any).conversationId && editingTitle === true  ? (
                    <form 
                      onSubmit={onChangeConvoTitle}
                    className="flex flex-row justify-center items-center gap-3">

                      <input
                      type = "text"
                        value={editedTitle}
                        onChange={handleTitleChange}
                        disabled={editTitleId === null}
                        onKeyDown={handleKeyDown}
                        // onBlur={handleBlur}
                      />
                    </form>
                        
                  ) : (

                    <div className="flex flex-row justify-between items-center w-full pr-[5px]">
                    <p className="hover:text-white  text-left">{conversation.title}</p>
                    {hoveredConversationId === conversation.conversationId && (
                      <svg
                        width={10}
                        height={10}
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="far"
                        data-icon="layer-group"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        className="ml-2"
                        onMouseDown={() => setShowDeleteContainer(true)}
                      >
                        <path
                          fill="currentColor"
                          d="M288 0c-8.5 0-17 1.7-24.8 5.1L53.9 94.8C40.6 100.5 32 113.5 32 128s8.6 27.5 21.9 33.2l209.3 89.7c7.8 3.4 16.3 5.1 24.8 5.1s17-1.7 24.8-5.1l209.3-89.7c13.3-5.7 21.9-18.8 21.9-33.2s-8.6-27.5-21.9-33.2L312.8 5.1C305 1.7 296.5 0 288 0zm-5.9 49.2C284 48.4 286 48 288 48s4 .4 5.9 1.2L477.7 128 293.9 206.8c-1.9 .8-3.9 1.2-5.9 1.2s-4-.4-5.9-1.2L98.3 128 282.1 49.2zM53.9 222.8C40.6 228.5 32 241.5 32 256s8.6 27.5 21.9 33.2l209.3 89.7c7.8 3.4 16.3 5.1 24.8 5.1s17-1.7 24.8-5.1l209.3-89.7c13.3-5.7 21.9-18.8 21.9-33.2s-8.6-27.5-21.9-33.2l-31.2-13.4L430 235.5 477.7 256 293.9 334.8c-1.9 .8-3.9 1.2-5.9 1.2s-4-.4-5.9-1.2L98.3 256 146 235.5 85.1 209.4 53.9 222.8zm0 128C40.6 356.5 32 369.5 32 384s8.6 27.5 21.9 33.2l209.3 89.7c7.8 3.4 16.3 5.1 24.8 5.1s17-1.7 24.8-5.1l209.3-89.7c13.3-5.7 21.9-18.8 21.9-33.2s-8.6-27.5-21.9-33.2l-31.2-13.4L430 363.5 477.7 384 293.9 462.8c-1.9 .8-3.9 1.2-5.9 1.2s-4-.4-5.9-1.2L98.3 384 146 363.5 85.1 337.4 53.9 350.8z"
                        ></path>
                      </svg>
                    )}
                  </div>                  )}

                 
                </button>
              </div>
            ))}

            {showDeleteContainer && (
              <div
                className="deleteChatContainer flex flex-col gap-[13px] absolute right-[-90px] justify-center"
                ref={deleteContainerRef}
              >
                <button className="flex flex-row gap-[5px] items-center hover:bg-[#39393973] rounded p-[4px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M13.293 4.293a4.536 4.536 0 1 1 6.414 6.414l-1 1-7.094 7.094A5 5 0 0 1 8.9 20.197l-4.736.79a1 1 0 0 1-1.15-1.151l.789-4.736a5 5 0 0 1 1.396-2.713zM13 7.414l-6.386 6.387a3 3 0 0 0-.838 1.628l-.56 3.355 3.355-.56a3 3 0 0 0 1.628-.837L16.586 11zm5 2.172L14.414 6l.293-.293a2.536 2.536 0 0 1 3.586 3.586z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p 
                  onClick={() => handleTitleClick && hoveredConversationId !== null && handleTitleClick(hoveredConversationId)}
                  className="text-white">Rename</p>
                </button>
                <button
                  onClick={() =>
                    onDeleteConvo &&
                    hoveredConversationId !== null &&
                    onDeleteConvo(hoveredConversationId)
                  }
                  className="flex flex-row gap-[5px] items-center hover:bg-[#39393973] rounded p-[4px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4c35de"
                      fillRule="evenodd"
                      d="M10.556 4a1 1 0 0 0-.97.751l-.292 1.14h5.421l-.293-1.14A1 1 0 0 0 13.453 4zm6.224 1.892-.421-1.639A3 3 0 0 0 13.453 2h-2.897A3 3 0 0 0 7.65 4.253l-.421 1.639H4a1 1 0 1 0 0 2h.1l1.215 11.425A3 3 0 0 0 8.3 22H15.7a3 3 0 0 0 2.984-2.683l1.214-11.425H20a1 1 0 1 0 0-2zm1.108 2H6.112l1.192 11.214A1 1 0 0 0 8.3 20H15.7a1 1 0 0 0 .995-.894zM10 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-[#4c35de]">Delete</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Container */}

      <div className="flex flex-col gap-[22px]">
        {" "}
        <button className=" text-[14px] flex flex-row items-center justify-start gap-[13px] w-full pl-[17px] ">
          <div className="mainIcon !w-[20px] !h-[20px]">
            <Image alt="chatIcon" src={chatIcon} width={100} height={100} />
          </div>

          <p className="hover:text-[#807f7f]">About Me</p>
        </button>
        <button className=" text-[14px] flex flex-row items-center justify-start gap-[13px] w-full pl-[17px] ">
          <div className="mainIcon !w-[20px] !h-[20px]">
            <Image alt="chatIcon" src={chatIcon} width={100} height={100} />
          </div>

          <p className="hover:text-[#807f7f]">Numerology Guidance</p>
        </button>
        <button className=" text-[14px] flex flex-row items-center justify-start gap-[13px] w-full pl-[17px] ">
          <div className="mainIcon !w-[20px] !h-[20px]">
            <Image alt="chatIcon" src={chatIcon} width={100} height={100} />
          </div>

          <p className="hover:text-[#807f7f]">Life path guidance </p>
        </button>
      </div>

      {/* Settings  Container */}

      <div className="flex flex-col gap-[4px] pt-[25px]">
        {" "}
        <button className=" text-[16px] flex flex-row items-center justify-start gap-[13px] w-full ">
          <p>Upgrade to pro</p>
        </button>
        <p id="greyText" className="text-[14px]">
          Upgrade for image upload, smarter AI, and more Pro Search.
        </p>
        <button className=" text-[14px] newChat flex flex-row items-center justify-center gap-[13px] mt-[12px]">
          <div className="mainIcon">
            <Image alt="chatIcon" src={arrowLeft} width={100} height={100} />
          </div>
          <p>Learn more</p>
        </button>
      </div>

      {/* Profile  Container */}
      <div className="flex flex-row gap-[4px]  settingsContainer ">
        <Link
          href="/profile"
          className="  hoverBgBtn   text-[14px]   flex flex-row items-center justify-center gap-[13px] w-[135px]    "
        >
          <div className="mainIcon flex items-center justify-center">
            {sessionStorage.getItem("splitUserName") || splitUserName}
          </div>
          <p>{sessionStorage.getItem("email") || email}</p>
        </Link>

        <Link href="/profile" className="mainIcon !w-[20px] !h-[20px]">
          <Image alt="chatIcon" src={settingsIcon} width={100} height={100} />
        </Link>
      </div>
      <div className="flex flex-row gap-[4px] justify-end self-end   settingsContainer !border-none !mt-0 ">
        <Link href="/" className="mainIcon !w-[20px] !h-[20px] cursor-pointer">
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3117_1799)">
              <path
                d="M10 1.80078C12.6719 1.80078 12.9883 1.8125 14.0391 1.85937C15.0156 1.90234 15.543 2.06641 15.8945 2.20313C16.3594 2.38281 16.6953 2.60156 17.043 2.94922C17.3945 3.30078 17.6094 3.63281 17.7891 4.09766C17.9258 4.44922 18.0898 4.98047 18.1328 5.95312C18.1797 7.00781 18.1914 7.32422 18.1914 9.99219C18.1914 12.6641 18.1797 12.9805 18.1328 14.0313C18.0898 15.0078 17.9258 15.5352 17.7891 15.8867C17.6094 16.3516 17.3906 16.6875 17.043 17.0352C16.6914 17.3867 16.3594 17.6016 15.8945 17.7813C15.543 17.918 15.0117 18.082 14.0391 18.125C12.9844 18.1719 12.668 18.1836 10 18.1836C7.32813 18.1836 7.01172 18.1719 5.96094 18.125C4.98438 18.082 4.45703 17.918 4.10547 17.7813C3.64063 17.6016 3.30469 17.3828 2.95703 17.0352C2.60547 16.6836 2.39063 16.3516 2.21094 15.8867C2.07422 15.5352 1.91016 15.0039 1.86719 14.0313C1.82031 12.9766 1.80859 12.6602 1.80859 9.99219C1.80859 7.32031 1.82031 7.00391 1.86719 5.95312C1.91016 4.97656 2.07422 4.44922 2.21094 4.09766C2.39063 3.63281 2.60938 3.29688 2.95703 2.94922C3.30859 2.59766 3.64063 2.38281 4.10547 2.20313C4.45703 2.06641 4.98828 1.90234 5.96094 1.85937C7.01172 1.8125 7.32813 1.80078 10 1.80078ZM10 0C7.28516 0 6.94531 0.0117187 5.87891 0.0585938C4.81641 0.105469 4.08594 0.277344 3.45313 0.523438C2.79297 0.78125 2.23438 1.12109 1.67969 1.67969C1.12109 2.23438 0.78125 2.79297 0.523438 3.44922C0.277344 4.08594 0.105469 4.8125 0.0585938 5.875C0.0117188 6.94531 0 7.28516 0 10C0 12.7148 0.0117188 13.0547 0.0585938 14.1211C0.105469 15.1836 0.277344 15.9141 0.523438 16.5469C0.78125 17.207 1.12109 17.7656 1.67969 18.3203C2.23438 18.875 2.79297 19.2188 3.44922 19.4727C4.08594 19.7188 4.8125 19.8906 5.875 19.9375C6.94141 19.9844 7.28125 19.9961 9.99609 19.9961C12.7109 19.9961 13.0508 19.9844 14.1172 19.9375C15.1797 19.8906 15.9102 19.7188 16.543 19.4727C17.1992 19.2188 17.7578 18.875 18.3125 18.3203C18.8672 17.7656 19.2109 17.207 19.4648 16.5508C19.7109 15.9141 19.8828 15.1875 19.9297 14.125C19.9766 13.0586 19.9883 12.7188 19.9883 10.0039C19.9883 7.28906 19.9766 6.94922 19.9297 5.88281C19.8828 4.82031 19.7109 4.08984 19.4648 3.45703C19.2188 2.79297 18.8789 2.23438 18.3203 1.67969C17.7656 1.125 17.207 0.78125 16.5508 0.527344C15.9141 0.28125 15.1875 0.109375 14.125 0.0625C13.0547 0.0117188 12.7148 0 10 0Z"
                fill="currentColor"
              ></path>
              <path
                d="M10 4.86328C7.16406 4.86328 4.86328 7.16406 4.86328 10C4.86328 12.8359 7.16406 15.1367 10 15.1367C12.8359 15.1367 15.1367 12.8359 15.1367 10C15.1367 7.16406 12.8359 4.86328 10 4.86328ZM10 13.332C8.16016 13.332 6.66797 11.8398 6.66797 10C6.66797 8.16016 8.16016 6.66797 10 6.66797C11.8398 6.66797 13.332 8.16016 13.332 10C13.332 11.8398 11.8398 13.332 10 13.332Z"
                fill="currentColor"
              ></path>
              <path
                d="M16.5391 4.66016C16.5391 5.32422 16 5.85938 15.3398 5.85938C14.6758 5.85938 14.1406 5.32031 14.1406 4.66016C14.1406 3.99609 14.6797 3.46094 15.3398 3.46094C16 3.46094 16.5391 4 16.5391 4.66016Z"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_3117_1799">
                <rect width="20" height="20" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>{" "}
        </Link>
      </div>
    </div>
  );
};
