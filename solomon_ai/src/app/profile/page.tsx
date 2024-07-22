"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import arrowLeft from "../../../public/assets/Chat/arrowLeft.png";
import dynamic from "next/dynamic";

import { Dashboard } from "../chat/app/Dashboard";
import { ChatContainer } from "../chat/app/ChatContainer";
import { isClient } from "@/utilis/isClient";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { Conversation } from "../../../types";

import { checkSession } from "@/utilis/CheckSession";
import { fetchUserInfo } from "@/utilis/fetchUserInfo";
import { getChineseZodiac } from "@/utilis/textExtractor";
import { getYearFromDateString } from "@/utilis/textExtractor";

import { Header } from "../components/Header";
import { Guidelines } from "../chat/app/components/Guidelines";
import { Feedbackform } from "./FeedbackForm";

import axios from "axios";

const Profile: React.FC = () => {
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };


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

  const {
    userName,
    setUserName,
    splitUserName,
    email,
    setEmail,
    setSplitUserName,
  } = useSessionStorage();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();
  const [sessionStatus, setSessionStatus] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);

  const [birthday, setBirthDay] = useState<string>("");
  const [zodiac, setZodiac] = useState<string>("Enter");
  const [lifePath, setLifePathNumber] = useState<string>("Enter");
  const [nameNumerologyNumber, setNameNumerolgyNumber] =
    useState<string>("Enter");
  // const [practice, setPractice] = useState<null>(null);
  const [ennealogy, setEnnealogyNumber] = useState<string>("Enter");
  // const [birthday, setBirthDay] = useState<string>("Enter");
  // const [chineseZodiac, setChineseZodiac] = useState<string>("Enter");
  const [cardologyNumber, setCardologyNumber] = useState("Enter");
  const [mylesBridgeType, setMylesBridgeType] = useState("Enter");

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
      userName: "",
      splitUserName,
    });
  }, [status]);

  //This funcitno shifts and shows the mobile Chat ccontainer
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

  //Run the fetchUserInfo on Remout only
  useEffect(() => {
    fetchUserInfo(session?.user.id);
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await fetchUserInfo(userId);

      console.log("Just loggigng the user Info Here", userInfo);

      if (userInfo) {
        const {
          lifePathNumber,
          zodiacSign,
          ennealogy,
          birthday,
          cardologyNumber,
          mylesBridgeType,
          nameNumerolgyNumber,
        } = userInfo;
        setLifePathNumber(lifePathNumber);
        setZodiac(zodiacSign);
        setEnnealogyNumber(ennealogy);
        setCardologyNumber(cardologyNumber);
        setMylesBridgeType(mylesBridgeType);
        setNameNumerolgyNumber(nameNumerolgyNumber);
        setBirthDay(formatDate(birthday));
      }
    };

    getUserInfo();
  }, [userId]);

  function formatDate(isoString: string) {
    // Create a new Date object from the ISO string
    const date = new Date(isoString);

    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const day = String(date.getUTCDate()).padStart(2, "0");
    const year = date.getUTCFullYear();

    // Format the date as MM/DD/YYYY
    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
  }

  // Update user progress with the extracted vales
  const updateUserProgress = async (
    userId,
    cardologyNumber: string,
    mylesBridgeType: string,
    nameNumerolgyNumber: string,
    birthday: string
  ): Promise<void> => {
    try {
      const response = await axios.post("/api/updateUser", {
        userId,
        cardologyNumber: cardologyNumber ?? undefined,
        mylesBridgeType: mylesBridgeType ?? undefined,
        nameNumerolgyNumber: nameNumerolgyNumber ?? undefined,
        birthday: birthday ?? undefined,
      });

      //Going to save into Session to prevent the asynh loading issues
      if (isClient()) {
        sessionStorage.setItem("cardologyNumber", cardologyNumber);

        sessionStorage.setItem("mylesBridgeType", mylesBridgeType);
        sessionStorage.setItem("mylesBridgeType", nameNumerolgyNumber);
        // Sign out and redirect
      }

      console.log("User progress updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating user progress:", error);
    }
  };

  const handleSave = () => {
    // Update state
    updateUserProgress(
      userId,
      cardologyNumber,
      mylesBridgeType,
      nameNumerologyNumber,
      birthday
    );

    window.alert("Profile Update");
    // Optionally, stop editing mode
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  // Update session storage whenever userName or splitUserName changes
  useEffect(() => {
    if (isClient()) {
      if (userName !== null) {
        sessionStorage.setItem("userName", userName || session?.user.name);
      }

      if (splitUserName !== "") {
        sessionStorage.setItem("splitUserName", splitUserName);
      }

      if (email !== null) {
        sessionStorage.setItem("email", email);
      }
    }
  }, [userName, splitUserName]);

  const handleConversationClick = (convoId: string) => {
    console.log("Activating conversation with ID:", convoId);
    const targetPath = `/chat/app/${session?.user.id}/${convoId}`;

    router.push(targetPath, undefined);
    setCurrentConversationId(convoId);

    console.log("Logging hte current conversation ID", currentConversationId);
    console.log("Logging hte current The ConvoID", convoId);
  };

  const handleSignOut = async () => {
    // Clear any client-side session data if necessary
    if (isClient()) {
      sessionStorage.clear();

      // Sign out and redirect
      await signOut({ redirect: true });
      window.location.href = "/login"; // Or any other page you want to redirect to
    }
  };

  useEffect(() => {
    // Retrieve the conversations from session storage
    const localStorageConversations = sessionStorage.getItem("conversations");

    console.log("Logging the localStorage Convos", localStorageConversations);

    if (localStorageConversations) {
      const conversationArray: Conversation[] = JSON.parse(
        localStorageConversations
      );
      if (conversationArray.length > 0) {
        setConversations?.(conversationArray); // Safe call with optional chaining
        console.log("Logging the conversations array", conversationArray);
      }
    }
  }, [setConversations]);

  //Run a function that updates all the Character Traits right on reload

  useEffect(() => {
    console.log(
      "Logging the change of the Myles brider number",
      mylesBridgeType
    );
    console.log("Logging the name numerical sig", nameNumerologyNumber);
  }, [
    lifePath,
    ennealogy,
    mylesBridgeType,
    cardologyNumber,
    birthday,
    nameNumerologyNumber,
  ]);

  return (
    <>
      {showGuidelines && <Guidelines onComplete={handleGuidelinesComplete} />}

      {showPopup && <Feedbackform togglePopup={togglePopup} />}
      <div className="chatDashboard">
        <ChatContainer
          setConversations={setConversations}
          conversations={conversations}
          splitUserName={splitUserName}
          userName={userName || ""}
          email={email || ""}
          onConversationClick={handleConversationClick}
          chatContainerRef={chatContainerRef as any}
          handleMobileChatBtnClick={handleMobileChatBtnClick}
        />
        {/* Chat Container Componet  */}

        <div className="chatDashboardWrapper !h-full w-full text-left">
          {/* Guidelines Hader */}

          <Header
            showGuidelines={showGuidelines}
            setShowGuidelines={setShowGuidelines}
            handleMobileChatBtnClick={handleMobileChatBtnClick}
          />

          <div className="chatDashBoardContainer text-[16px] ">
            <div className="flex flex-col gap-[54px] pb-[70px]">
              <div className="flex flex-row gap-[24px] items-center">
                <div className="mainIcon flex items-center justify-center iconBorder">
                  {splitUserName}
                </div>

                <div className="flex flex-col text-white">
                  <p>{userName}</p>
                  <p>{email}</p>
                </div>
              </div>

              <div className="flex flex-col gap-[5px] w-[310px]">
                <div className="flex flex-row w-full justify-between">
                  <p id="greyText">Zodiac Sign</p>
                  {isEditing ? (
                    <input
                      className="profileInput"
                      type="text"
                      value={
                        sessionStorage.getItem("zodiacSign") || (zodiac as any)
                      }
                      onChange={(e) => setZodiac(e.target.value)}
                    />
                  ) : (
                    <p className="profileInput">
                      {sessionStorage.getItem("zodiacSign")
                        ? sessionStorage.getItem("zodiacSign")
                        : "Enter..." || (zodiac as any)
                        ? (zodiac as any)
                        : "Enter..."}
                    </p>
                  )}
                </div>
                <div className="flex flex-row w-full justify-between">
                  <p id="greyText">Life path number</p>
                  {isEditing ? (
                    <input
                      className="profileInput"
                      type="text"
                      value={
                        sessionStorage.getItem("lifePathNumber") ||
                        (lifePath as any)
                      }
                      onChange={(e) => setLifePathNumber(e.target.value)}
                    />
                  ) : (
                    <p className="profileInput">
                      {sessionStorage.getItem("lifePathNumber")
                        ? sessionStorage.getItem("lifePathNumber")
                        : "Enter..." || lifePath
                        ? lifePath
                        : "Enter..."}
                    </p>
                  )}
                </div>
                <div className="flex flex-row w-full justify-between">
                  <p id="greyText">Name Numerical Signature</p>
                  {isEditing ? (
                    <input
                      className="profileInput"
                      type="text"
                      value={nameNumerologyNumber as any}
                      onChange={(e) => setNameNumerolgyNumber(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    <input
                      onClick={() => setIsEditing(true)}
                      className="profileInput"
                      type="text"
                      placeholder="Add"
                      value={
                        (sessionStorage.getItem("nameNumerolgyNumber") as any)
                          ? (sessionStorage.getItem(
                              "nameNumerolgyNumber"
                            ) as any)
                          : nameNumerologyNumber
                          ? nameNumerologyNumber
                          : "Loading..."
                      }
                      readOnly
                    />
                  )}
                </div>
                <div className="flex flex-row w-full justify-between">
                  <p id="greyText">Ennealogy Number</p>
                  {isEditing ? (
                    <input
                      className="profileInput"
                      type="text"
                      value={ennealogy as any}
                      onChange={(e) => setEnnealogyNumber(e.target.value)}
                    />
                  ) : (
                    <p className="profileInput">
                      {sessionStorage.getItem("ennealogy")
                        ? sessionStorage.getItem("ennealogy")
                        : "Enter..." || ennealogy
                        ? ennealogy
                        : "Enter..."}
                    </p>
                  )}
                </div>

                <div className="flex flex-row w-full justify-between">
                  <p id="greyText">Cardology Number</p>
                  {isEditing ? (
                    <input
                      className="profileInput outline-none"
                      type="text"
                      value={cardologyNumber as any}
                      onChange={(e) => setCardologyNumber(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    <input
                      onClick={() => setIsEditing(true)}
                      className="profileInput"
                      type="text"
                      placeholder="Add"
                      value={
                        (sessionStorage.getItem("cardologyNumber") as any)
                          ? (sessionStorage.getItem("cardologyNumber") as any)
                          : cardologyNumber
                          ? cardologyNumber
                          : "Loading..."
                      }
                      readOnly
                    />
                  )}
                </div>

                <div className="flex flex-row w-full justify-between">
                  <p id="greyText">Myles Bridge Personality Type</p>
                  {isEditing ? (
                    <input
                      className="profileInput"
                      type="text"
                      value={mylesBridgeType as any}
                      onChange={(e) => setMylesBridgeType(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    <input
                      onClick={() => setIsEditing(true)}
                      className="profileInput"
                      type="text"
                      placeholder="Add"
                      value={
                        (sessionStorage.getItem("mylesBridgeType") as any)
                          ? (sessionStorage.getItem("mylesBridgeType") as any)
                          : mylesBridgeType
                          ? mylesBridgeType
                          : "Loading..."
                      }
                    />
                  )}
                </div>

                <div className="flex flex-row w-full justify-between">
                  <p id="greyText">Date Of Birth</p>
                  {isEditing ? (
                    <input
                      className="profileInput"
                      type="text"
                      value={birthday as any}
                      onChange={(e) => setBirthDay(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    <input
                      onClick={() => setIsEditing(true)}
                      className="profileInput"
                      type="text"
                      placeholder="Add"
                      value={birthday ? birthday : "Enter..."}
                    />
                  )}
                </div>
                {/* <div className="flex flex-row w-full justify-between">
        <p id="greyText">Spiritual Practice</p>
        {isEditing ? (
          <input
            type="text"
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
          />
        ) : (
          <p>{religion}</p>
        )}
      </div> */}
                {/* <div className="flex flex-row w-full justify-between mt-[5px]">
                {isEditing ? (
                  <button
                    className="text-[14px] newChat flex flex-row items-center justify-center gap-[13px]"
                    onClick={handleSave}
                  >
                    <p>Save</p>
                  </button>
                ) : (
                  <button
                    className="text-[14px] newChat flex flex-row items-center justify-center gap-[13px]"
                    onClick={() => setIsEditing(true)}
                  >
                    <p>Edit Profile</p>
                  </button>
                )}
              </div> */}
              </div>

              <hr className="greyDivider"></hr>

              <div className="flex flex-col gap-[15px] w-[310px] ">
                <div className="flex flex-row w-full justify-between items-center">
                  <p id="greyText">Subscription plan</p>
                  <button className=" text-[14px] newChat flex flex-row items-center justify-center gap-[13px] ">
                    <div className="mainIcon">
                      <Image
                        alt="chatIcon"
                        src={arrowLeft}
                        width={100}
                        height={100}
                      />
                    </div>
                    <p>Learn more</p>
                  </button>{" "}
                </div>
                <div className="flex flex-row w-full justify-between">
                  <p id="greyText">Limits</p>
                  {/* <p>Unselected</p> */}
                </div>
              </div>

              <hr className="greyDivider"></hr>

              <div className="accountContainer">
                <div className="flex md:flex-row flex-col gap-[15px] md:gap-[0px] justify-between accountDiv">
                  <div className="flex flex-col">
                    <p className="text-white">Active Account</p>
                    <p className="text-[12px]" id="greyText">
                      Signed in as {email}
                    </p>
                  </div>
                  <button className=" text-[14px] newChat   !flex flex-row items-center justify-center gap-[13px] ">
                    <div className="mainIcon">
                      <Image
                        alt="chatIcon"
                        src={arrowLeft}
                        width={100}
                        height={100}
                      />
                    </div>
                    <p onClick={handleSignOut}>Sign out</p>
                  </button>{" "}
                </div>
                <hr className="greyDivider"></hr>

                <div className="flex md:flex-row flex-col gap-[15px] md:gap-[0px] justify-between accountDiv">
                  <div className="flex flex-col">
                    <p className="text-white">Sessions</p>
                    <p className="text-[12px]" id="greyText">
                      Devices or browsers where you are signed in
                    </p>
                  </div>
                  <button className=" text-[14px] newChat !w-[220px] !flex flex-row items-center justify-center gap-[13px] ">
                    <div className="mainIcon">
                      <Image
                        alt="chatIcon"
                        src={arrowLeft}
                        width={100}
                        height={100}
                      />
                    </div>
                    <p>Sign out of all sessions</p>
                  </button>{" "}
                </div>
                <hr className="greyDivider"></hr>

                <div className="flex flex-col   md:flex-row gap-[15px] md:gap-[0px justify-between accountDiv">
                  <div className="flex flex-col ">
                    <p className="text-white">Delete Account</p>
                    <p className="text-[12px]" id="greyText">
                      Permanently delete your account and data
                    </p>
                  </div>
                  <button className=" text-[14px] newChat !flex flex-row items-center justify-center gap-[13px] ">
                    <div className="mainIcon">
                      <Image
                        alt="chatIcon"
                        src={arrowLeft}
                        width={100}
                        height={100}
                      />
                    </div>
                    <p>Learn more</p>
                  </button>{" "}
                </div>
              </div>

              {/* FeedBack Container */}

              <div className="accountContainer max-h-[60px] h-[60px]">
                <div className="flex flex-row justify-between accountDiv">
                  <button className="flex flex-row items-center gap-[8px]">
                    <div className="mainIcon">
                      <svg
                        width="14px"
                        height="14px"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="far"
                        data-icon="file-pen"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M64 464H262.6l-5.1 20.5c-2.3 9.2-1.8 18.8 1.3 27.5H64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V285.7l-48 48V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16zM549.8 235.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z"
                        ></path>
                      </svg>
                    </div>
                    <p
                    onClick={togglePopup} 
                    className="hover:text-[#807f7f] text-[12px]">
                      Give us Feedback
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* <form className="chatFormSubmit">
              <div className="relative textAreaContainer">
                <textarea placeholder="Ask Thou Question..."></textarea>

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

                  <button 
                  
                  type ="submit"
                  className="textAreaIcon">
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
            </form> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
