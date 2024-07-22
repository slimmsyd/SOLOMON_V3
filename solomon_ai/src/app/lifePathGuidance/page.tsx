"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import arrowLeft from "../../../public/assets/Chat/arrowLeft.png";
import dynamic from "next/dynamic";

import LoadingComponent from "../components/helper/Loading";
import ButtonLoadingComponent from "../components/helper/buttonComponentLoading";

import { Dashboard } from "../chat/app/Dashboard";
import { ChatContainer } from "../chat/app/ChatContainer";
import { isClient } from "@/utilis/isClient";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { Conversation } from "../../../types";

import { checkSession } from "@/utilis/CheckSession";
import { fetchUserInfo } from "@/utilis/fetchUserInfo";
import { getChineseZodiac } from "@/utilis/textExtractor";
import { getYearFromDateString } from "@/utilis/textExtractor";
import { getEgyptianZodiac } from "@/utilis/textExtractor";
import { getCelticZodiac } from "@/utilis/textExtractor";
import { getNativeAmericanZodiac } from "@/utilis/textExtractor";
import { getZodiacImage } from "@/utilis/zodiacArray";

import { calculatePersonalYearNumber } from "@/utilis/updateUserUtils";
import { getPersonalMonth } from "@/utilis/updateUserUtils";
import { getAllPersonalMonths } from "@/utilis/updateUserUtils";
//Supporting Arrays
import { personalYear } from "@/utilis/zodiacArray";
import { personalDestiny } from "@/utilis/zodiacArray";
import { personalMonthArray } from "@/utilis/zodiacArray";
import { calculatePersonalMonthForIndex } from "@/utilis/updateUserUtils";

import ChatMessage from "../components/Chatmessage";

import styles from "../../styles/chat.module.css";
import { ZodiacImages } from "@/utilis/zodiacArray";
import { getZodiacDescription } from "@/utilis/zodiacArray";

import axios from "axios";
import { Header } from "../components/Header";
import { Guidelines } from "../chat/app/components/Guidelines";

//Images to Channel
const Profile: React.FC = () => {
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

  //Capture the loading of the infrmation
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const [zodiac, setZodiac] = useState<string>("");
  const [lifePath, setLifePathNumber] = useState<string>("");
  const [practice, setPractice] = useState<null>(null);
  const [ennealogy, setEnnealogyNumber] = useState<string>("");
  const [birthday, setBirthDay] = useState<string>("");
  //Get the personal year
  const [personalYearNumber, setPersonalYear] = useState<number | null>(null);
  const [personalMonthNumber, setPersonalMonthNumber] = useState<number | null>(
    null
  );

  const [chineseZodiac, setChineseZodiac] = useState<string>("");
  const [egyptianZodiac, setEgyptianZodiac] = useState<string>("");
  const [celticZodiacSign, setCelticZodiac] = useState<string>("");
  const [nativeAmericanZodiacSign, setNativeAmericanZodiac] =
    useState<string>("");

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
      setDataLoading(true);

      console.log("Just loggigng the user Info Here", userInfo);

      if (userInfo) {
        const { lifePathNumber, zodiacSign, ennealogy, birthday } = userInfo;

        setLifePathNumber(lifePathNumber);
        setZodiac(zodiacSign);
        setEnnealogyNumber(ennealogy);
        setBirthDay(birthday);

        setDataLoading(false);

        const personalYear = calculatePersonalYearNumber(birthday);

        setPersonalYear(personalYear);
        setPersonalMonthNumber(getPersonalMonth(personalYear as number));

        //Set the Chinese Zodiac year and others etc.
        const birthYear = getYearFromDateString(birthday);
        if (birthYear !== null) {
          setChineseZodiac(getChineseZodiac(birthYear));
          setEgyptianZodiac(getEgyptianZodiac(birthday));
          setCelticZodiac(getCelticZodiac(birthday));
          setNativeAmericanZodiac(getNativeAmericanZodiac(birthday));
        }
      }
    };

    getUserInfo();
  }, [userId]);

  //catpure the updates of data loading
  useEffect(() => {}, [dataLoading]);

  //Log the chinese and the egyptian

  useEffect(() => {}, [chineseZodiac, egyptianZodiac]);

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
    const targetPath = `/chat/app/${session?.user.id}/${convoId}`;

    router.push(targetPath, undefined);
    setCurrentConversationId(convoId);
  };

  useEffect(() => {
    // Retrieve the conversations from session storage
    const localStorageConversations = sessionStorage.getItem("conversations");

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

  //Handling the peroannl year
  const getPersonalYearContent = (personalYearNumber: number) => {
    return personalYear[personalYearNumber] || {};
  };
  //Handling the peroannl year
  const getDesinyYear = (lifePathNumber: number) => {
    const result = personalDestiny.find(
      (destiny) => destiny.number === lifePathNumber
    );
    return result;
  };

  const getMonthContent = (monthNumber: number) => {
    const result = personalMonthArray.find(
      (destiny) => destiny.number === monthNumber
    );
    return result;
  };

  const [personalYearTheme, setPersonalYearTheme] = useState<{
    theme?: string;
    career?: string;
    travel?: string;
    description?: string;
  }>({});

  const [personalDestinyTheme, setPersonalDestinyTheme] = useState<{
    number?: number;
    description?: string;
  }>();

  const [personalMonthTheme, setPersonalMonthTheme] = useState<{
    number?: number;
    description?: string;
  }>();

  useEffect(() => {
    const yearContent = getPersonalYearContent(personalYearNumber as number);
    setPersonalYearTheme(yearContent);

    //Get the life path year aswell
    const destinyYear = getDesinyYear(Number(lifePath) as number);
    setPersonalDestinyTheme(destinyYear);

    const month = getMonthContent(personalMonthNumber as number);
    setPersonalMonthTheme(month);
    console.log("Logging the prsonal month theme", personalMonthNumber);

    //get all presonal months
    const result = getAllPersonalMonths(personalYearNumber as number);

    console.log("logging the result", result.personalMonths);
  }, [personalYearNumber]);

  const months = [
    "Personsal Destiny",
    "Personal Year",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //Render the text based on the index
  const renderTextForIndex = (index: number, personalYear: number) => {
    if (index < 2) {
      switch (index) {
        case 0:
          return personalDestinyTheme?.description ?? "No theme available";
        case 1:
          return personalYearTheme?.theme ?? "No theme available";
        default:
          return "No theme available";
      }
    } else {
      const personalMonthNumber = calculatePersonalMonthForIndex(
        personalYear,
        index
      );
      const personalMonth = personalMonthArray.find(
        (pm) => pm.number === personalMonthNumber
      );
      return personalMonth?.description ?? "No theme available";
    }
  };

  const renderNumberForIndex = (index: number, personalYear) => {
    if (index < 2) {
      switch (index) {
        case 0:
          return `Personal Destiny ${lifePath}`;
        case 1:
          return `Personal Year ${personalYearNumber}`;

        default:
          return `Failed to render in`;
      }
    } else {
      const personalMonthNumber = calculatePersonalMonthForIndex(
        personalYear,
        index
      );
      const personalMonth = personalMonthArray.find(
        (pm) => pm.number === personalMonthNumber
      );
      return personalMonth?.number ?? "No theme available";
    }
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacImages | null>(
    null
  );
  const [isGuidelinesVisible, setIsGuidelinesVisible] =
    useState<boolean>(false);

  const handleZodiacClick = (zodiac: ZodiacImages) => {
    setSelectedZodiac(zodiac);
    setIsGuidelinesVisible(true);
  };
  const closePopup = () => {
    setIsGuidelinesVisible(!isGuidelinesVisible);
  };

  const handleExpandClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      {showGuidelines && <Guidelines onComplete={handleGuidelinesComplete} />}

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

          <div className="chatDashBoardContainer ">
            <div className={styles.chat_container}>
              <div className={styles.chat_box}>
                <div className={styles.chat_flex}>
                  <div className={styles.chat_Messages}>
                    <div className={styles.response_Flex}>
                      <ChatMessage
                        shouldAnimate={false}
                        response={{
                          question: "",
                          id: "",
                          response:
                            "Based on your information provided, Solomon the wise was able to draw more conclusion on your across varies of culture to gain a more wholistic perspective Below or Images generated of your zodiac signs and there personality trains across different cultures. Best choice of action, take this information and ask me more in chat for more guidance on your unique being. You can click on each image to get a more in depth understanding of what they symbolized.",
                        }}
                      />

                      {dataLoading ? (
                        <div className="w-full flex  justify-center items-center align-middle">
                          <LoadingComponent />
                        </div>
                      ) : (
                        <>
                          {isGuidelinesVisible && selectedZodiac && (
                            <div className="guideLinesPopupContainer">
                              <div className="guideLinesPopUpWrapper">
                                <div
                                  onClick={closePopup}
                                  className=" zodiacPopup"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="black"
                                      fill-rule="evenodd"
                                      d="M2.293 2.293a1 1 0 0 1 1.414 0l18 18a1 1 0 0 1-1.414 1.414l-2.514-2.514C16.204 20.24 14.274 21 12 21c-3.154 0-5.64-1.459-7.441-3.12-1.797-1.658-2.974-3.568-3.547-4.624a2.63 2.63 0 0 1 0-2.513c.578-1.065 1.78-3.017 3.624-4.693L2.293 3.707a1 1 0 0 1 0-1.414m3.759 5.173c-1.645 1.473-2.745 3.241-3.281 4.23a.63.63 0 0 0 0 .607c.518.955 1.57 2.656 3.143 4.106C7.482 17.855 9.506 19 12 19c1.65 0 3.09-.5 4.33-1.256l-1.934-1.934A4.502 4.502 0 0 1 8.19 9.604zm3.62 3.62 3.242 3.242a2.5 2.5 0 0 1-3.242-3.242"
                                      clip-rule="evenodd"
                                    ></path>
                                    <path
                                      fill="black"
                                      d="M10.223 5.2c.56-.128 1.152-.2 1.777-.2 2.494 0 4.518 1.146 6.086 2.591 1.572 1.45 2.625 3.15 3.144 4.106a.63.63 0 0 1-.002.608 17 17 0 0 1-1.344 2.095 1 1 0 0 0 1.6 1.2 19 19 0 0 0 1.503-2.342 2.63 2.63 0 0 0 0-2.514c-.572-1.056-1.749-2.966-3.546-4.623C17.64 4.459 15.154 3 12 3c-.779 0-1.52.09-2.223.25a1 1 0 0 0 .446 1.95"
                                    ></path>
                                  </svg>
                                </div>

                                <div>
                                  <Image
                                    src={selectedZodiac.link}
                                    width={300}
                                    height={300}
                                    alt={`${selectedZodiac.name} Image`}
                                  />
                                </div>

                                <h3 className="text-white">
                                  {selectedZodiac.category} -{" "}
                                  {selectedZodiac.name}
                                </h3>
                                <p>
                                  Here are the guidelines for the{" "}
                                  {selectedZodiac.name}
                                  ...
                                </p>

                                <p>{selectedZodiac.description}</p>
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {/* Images generated to showcase the informatian about them */}

                      <div className=" zodiacCardsWrapper flex-wrap !mt-[0px] !mb-[105px] flex flex-row gap-[23px] justify-start relative">
                        {egyptianZodiac && (
                          <div
                            onClick={() =>
                              handleZodiacClick({
                                category: "Egyptian",
                                name: egyptianZodiac,
                                link:
                                  getZodiacImage("Egyptian", egyptianZodiac) ||
                                  "",
                                description: getZodiacDescription(
                                  "Egyptian",
                                  egyptianZodiac
                                ),
                              })
                            }
                            className="zodiacCards
                        
                        w-full relative !p-0"
                          >
                            <div className="zodiacOverlay">
                              <p className="text-white">{egyptianZodiac}</p>
                            </div>
                            <Image
                              src={
                                getZodiacImage("Egyptian", egyptianZodiac) || ""
                              }
                              width={100}
                              height={100}
                              alt={`${egyptianZodiac} Image`}
                            />
                          </div>
                        )}
                        {nativeAmericanZodiacSign && (
                          <div
                            onClick={() =>
                              handleZodiacClick({
                                category: "Native American",
                                name: nativeAmericanZodiacSign,
                                link:
                                  getZodiacImage(
                                    "Native American",
                                    nativeAmericanZodiacSign
                                  ) || "",
                                description: getZodiacDescription(
                                  "Native American",
                                  nativeAmericanZodiacSign
                                ),
                              })
                            }
                            className="zodiacCards relative !p-0"
                          >
                            <div className="zodiacOverlay">
                              <p className="text-white">
                                {nativeAmericanZodiacSign}
                              </p>
                            </div>
                            <Image
                              src={
                                getZodiacImage(
                                  "Native American",
                                  nativeAmericanZodiacSign
                                ) || ""
                              }
                              width={100}
                              height={100}
                              alt={`${nativeAmericanZodiacSign} Image`}
                            />
                          </div>
                        )}

                        {celticZodiacSign && (
                          <div
                            onClick={() =>
                              handleZodiacClick({
                                category: "Celtic",
                                name: celticZodiacSign,
                                link:
                                  getZodiacImage("Celtic", celticZodiacSign) ||
                                  "",
                                description: getZodiacDescription(
                                  "Celtic",
                                  celticZodiacSign
                                ),
                              })
                            }
                            className="zodiacCards relative !p-0"
                          >
                            <div className="zodiacOverlay">
                              <p className="text-white">{celticZodiacSign}</p>
                            </div>
                            <Image
                              src={
                                getZodiacImage("Celtic", celticZodiacSign) || ""
                              }
                              width={100}
                              height={100}
                              alt={`${celticZodiacSign} Image`}
                            />
                          </div>
                        )}
                        {chineseZodiac && (
                          <div
                            onClick={() =>
                              handleZodiacClick({
                                category: "Chinese",
                                name: chineseZodiac,
                                link:
                                  getZodiacImage("Chinese", chineseZodiac) ||
                                  "",
                                description: getZodiacDescription(
                                  "Chinese",
                                  chineseZodiac
                                ),
                              })
                            }
                            className="zodiacCards relative !p-0"
                          >
                            <div className="zodiacOverlay">
                              <p className="text-white">{chineseZodiac}</p>
                            </div>
                            <Image
                              src={
                                getZodiacImage("Chinese", chineseZodiac) || ""
                              }
                              width={100}
                              height={100}
                              alt={`${chineseZodiac} Image`}
                            />
                          </div>
                        )}
                      </div>

                      {/* Images generated to showcase the informatian about them */}

                      <ChatMessage
                        shouldAnimate={false}
                        response={{
                          response:
                            "Based on your Life Path number, we have gave an syntheses on what the expect of the overall energies that will be effecting your unique being each month of the year. Give credit to the great lloyd strayhorn for the valuable knowledge in curating this .",

                          question: "",
                          id: "",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[26px]">
              {months.map((month, index) => (
                <div
                  key={index}
                  className={`accountContainer relative ${
                    expandedIndex === index ? "max-h-[300px]" : "max-h-[82px]"
                  }`}
                >
                  <div className="flex flex-row  gap-[15px] md:gap-[0px] justify-between accountDiv">
                    <div className="flex flex-col gap-[8px]">
                      <p className="text-white">{month}</p>
                      <p className="text-[12px]" id="greyText">
                        {dataLoading ? (
                          <ButtonLoadingComponent />
                        ) : (
                          <p>{`Personal Month | ${renderNumberForIndex(
                            index,
                            personalYearNumber as number
                          )}`}</p>
                        )}
                      </p>
                      <p className="text-[12px] text-white">
                        {renderTextForIndex(
                          index,
                          personalYearNumber as number
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => handleExpandClick(index)}
                      className="textAreaIcon max-h-[30px] max-w-[30px] absolute top-[15px] right-[10px] "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 32 32"
                        className={`transition-transform duration-300 ease-in-out  ${
                          expandedIndex === index ? "rotate-0" : "rotate-180"
                        }`}
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
