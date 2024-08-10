"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import arrowLeft from "../../../public/assets/Chat/arrowLeft.png";
import dynamic from "next/dynamic";

import { ChatContainer } from "../chat/app/ChatContainer";
import { isClient } from "@/utilis/isClient";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { Conversation } from "../../../types";

import { checkSession } from "@/utilis/CheckSession";
import { fetchUserInfo } from "@/utilis/fetchUserInfo";


import { Header } from "../components/Header";
import { Feedbackform } from "./FeedbackForm";
import { UserDeleteAlert } from "./deleteUserAlert";
import { ProfileGuidelines } from "./profileGuidelines";

import EditProfileSettings from "./editProfile";
import EditProfileSettingsBtn from "./editProfileSettingsButton";

import axios from "axios";
import Link from "next/link";

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
  }, []);

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

      console.log("Logging the User INfo In The git", userInfo)
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
  //Keep track of the updating the backend process
  const [profileProgresLoading, setProileProgressLoading] =
    useState<boolean>(false);
  const updateUserProgress = async (
    userId,
    zodiacSign: string,
    cardologyNumber: string,
    mylesBridgeType: string,
    nameNumerolgyNumber: string,
    ennealogy: string,
    lifePath: string,
    birthday: string
  ): Promise<void> => {
    try {
      setProileProgressLoading(true);

      const response = await axios.post("/api/updateUser", {
        userId,
        zodiacSign: zodiacSign ?? undefined,
        cardologyNumber: cardologyNumber ?? undefined,
        mylesBridgeType: mylesBridgeType ?? undefined,
        nameNumerolgyNumber: nameNumerolgyNumber ?? undefined,
        ennealogy: ennealogy ?? undefined,
        lifePath: lifePath,
        birthday: birthday ?? undefined,
      });

      //Going to save into Session to prevent the asynh loading issues
      if (isClient()) {
        sessionStorage.setItem("cardologyNumber", cardologyNumber);
        sessionStorage.setItem("mylesBridgeType", mylesBridgeType);
        sessionStorage.setItem("nameNumerolgyNumber", nameNumerolgyNumber);
        sessionStorage.setItem("ennealogy", ennealogy);
        sessionStorage.setItem("lifePathNumber", lifePath)

        // Sign out and redirect
      }


      console.log("Logging the Response")
      if (response.status === 201) {
        setProileProgressLoading(false);
      }

      console.log("User progress updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating user progress:", error);
    }
  };

  const handleSave = () => {
    // Update state ter
    updateUserProgress(
      userId,
      zodiac,
      cardologyNumber,
      mylesBridgeType,
      nameNumerologyNumber,
      ennealogy,
      lifePath,
      birthday
    );

    window.alert("Profile Update");
    if(zodiac !== ""){ 
      setZodiac(zodiac)
    }
    if(cardologyNumber !== ""){ 
      setCardologyNumber(cardologyNumber)
    }
    if(mylesBridgeType !== ""){ 
      setMylesBridgeType(mylesBridgeType)
    }
    if(nameNumerologyNumber !== ""){ 
      setNameNumerolgyNumber(nameNumerologyNumber)
    }
    if(ennealogy !== ""){ 
      setEnnealogyNumber(ennealogy)
    }
    if(lifePath !== ""){ 
      setLifePathNumber(ennealogy)
    }
    // Optionally, stop editing mode
    setIsEditing(false);
  };

  useEffect(() => {
    console.log("Did the state of loading change? ", profileProgresLoading);
  }, [profileProgresLoading]);
  const handleKeyDown= (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting and causing a page reload
    console.log("Submission has been made");
      handleSave();
  };


  //Remove user form the data
  const [deletingUser, setDeleteUser] = useState<boolean>(false);
  const [deleteUserFinal, setDeleteUserFinal] = useState<boolean>(false);
  const beginDeletingUser = async () => {
    setDeleteUser(true);

    if (deletingUser) {
      console.log("THe Deleting Users is True");
    }

    // try {
    //   const response = await axios.post("/api/deleteUser", {
    //     userId
    //   });

    //   console.log("The delete has been successfully updated", response.data)

    // }catch(e) {
    //   console.error(e)

    // }
  };

  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  const [subcriptionSessionID, setSubscriptionSessionID] = useState<string>("");
  const [activeSubscription, setActiveSubscription] = useState<boolean>(false);
  const [canceledSubscription, setCanceledSubscription] =
    useState<boolean>(false);

  const getSubscriptionID = async (userId: string) => {
    try {
      const res = await fetch("/api/get-subscription-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });
      const data = await res.json();

      setSubscriptionSessionID(data.paymentIntentId);
      console.log("Logging the data.paymentID", data.paymentIntentId);
    } catch (error) {
      console.error("Error fetching subscription ID:", error);
    }
  };

  useEffect(() => {
    if (subcriptionSessionID) {
      setActiveSubscription(true);
      console.log("Logging the active subscriptin", activeSubscription);
    }
  }, [subcriptionSessionID, activeSubscription, canceledSubscription]);

  const cancelUserSubscription = async (subscriptionID: string) => {
    console.log("Logging the ID in console Function", subscriptionID);

    try {
      const response = await axios.post("/api/cancel-stripe-subscription", {
        subscriptionID: subscriptionID,
      });

      if (response.data.cancel_at_period_end === true) {
        //Keeping Tabs if User is Still being active in this joint
        setCanceledSubscription(true);
      } else {
        setCanceledSubscription(false);
      }

      console.log("Logging the Data on return", response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const renewUserSubscription = async (subscriptionID: string) => {
    console.log("Renewing the subscription with ID:", subscriptionID);

    try {
      const response = await axios.post("/api/renew-subscription", {
        subscriptionID: subscriptionID,
      });

      const data = response.data;

      if (response.data.cancel_at_period_end === false) {
        //Keeping Tabs if User is Still being active in this joint
        setCanceledSubscription(false);
      } else {
        setCanceledSubscription(true);
      }

      console.log("Subscription Details After Renewal:", data);
    } catch (e) {
      console.error("Error renewing subscription:", e);
    }
  };

  //Combines the above two functions, if renew or cancel
  const handleSubscriptionAction = async (subscriptionID: string) => {
    if (canceledSubscription) {
      await renewUserSubscription(subscriptionID);
    } else {
      await cancelUserSubscription(subscriptionID);
    }
    // Toggle the subscription state after the action
    setCanceledSubscription(!canceledSubscription);
  };

  const getSubscriptionDetails = async (subscriptionID: string) => {
    console.log("Logging the SUbscription ID in the request", subscriptionID);

    try {
      const response = await axios.post("/api/get-subscription-details", {
        subscriptionID: subscriptionID,
      });

      const data = response.data;

      console.log("Logging the From Get Subscription details", data);

      if (response.data.cancel_at_period_end === true) {
        //Keeping Tabs if User is Still being active in this joint
        setCanceledSubscription(true);
      } else {
        setCanceledSubscription(false);
      }

      console.log("Subscription Details:", data);
    } catch (e) {
      console.error("Error retrieving subscription details:", e);
    }
  };

  //W
  useEffect(() => {
    //Logging to see if user is cancleing there subscription
    console.log(
      "Logging the current status of the cancled subscirption",
      canceledSubscription
    );
  }, [canceledSubscription]);

  useEffect(() => {
    console.log("Is this joint running");
    if (subcriptionSessionID) {
      console.log("Is the joint running in here?");
      getSubscriptionDetails(subcriptionSessionID as string);
    }
  }, [subcriptionSessionID]);

  useEffect(() => {
    console.log("Logging the Delete UserFinal", deleteUserFinal);
    if (deleteUserFinal) {
      window.alert("User is being deleted");

      const deleteUserPerm = async () => {
        try {
          const response = await axios.delete("/api/deleteUser", {
            data: {
              userId,
            },
          });

          console.log(
            "The delete has been successfully updated",
            response.data
          );

          if (isClient()) {
            sessionStorage.clear();

            // Sign out and redirect
            await signOut({ redirect: true });
            window.location.href = "/login"; // Or any other page you want to redirect to
          }
        } catch (e) {
          console.error(e);
        }
      };

      deleteUserPerm();
    }
  }, [deleteUserFinal, deletingUser]);

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

  useEffect(() => {
    if (!session?.user) {
      router.push("/");
    } else {
      getSubscriptionID(session.user.id as string);
    }
  }, []);

  const handleConversationClick = (convoId: string) => {
    const targetPath = `/chat/app/${session?.user.id}/${convoId}`;

    router.push(targetPath, undefined);
    setCurrentConversationId(convoId);
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

    if (localStorageConversations) {
      const conversationArray: Conversation[] = JSON.parse(
        localStorageConversations
      );
      if (conversationArray.length > 0) {
        setConversations?.(conversationArray); // Safe call with optional chaining
      }
    }
  }, [setConversations]);

  //Run a function that updates all the Character Traits right on reload

  useEffect(() => {}, [
    lifePath,
    ennealogy,
    mylesBridgeType,
    cardologyNumber,
    birthday,
    nameNumerologyNumber,
  ]);

  //Handing the Settinss to show up
  const [showEditSettings, setShowEditSettings] = useState<boolean>(false);
  const showEditSettingsDiv = () => {
    setShowEditSettings(!showEditSettings);

    // console.log("This is logging the the click button", showEditSettings)
  };
  useEffect(() => {
    console.log("Logging the new state of edit settings", showEditSettings);
  }, [showEditSettings]);
  

  //Enusring The Loading of all settings 
  useEffect(() => { 
  },[zodiac])
  //Enusring The Loading of all settings 
  useEffect(() => { 
  },[lifePath])
  //Enusring The Loading of all settings 
  useEffect(() => { 
  },[mylesBridgeType])
  //Enusring The Loading of all settings 
  useEffect(() => { 
  },[cardologyNumber])
  useEffect(() => { 
  },[birthday])
  useEffect(() => {

  },[nameNumerologyNumber])
  useEffect(() => {
  },[ennealogy])
  useEffect(() => {
  },[birthday])



  return (
    <>
      {showGuidelines && (
        <ProfileGuidelines onComplete={handleGuidelinesComplete} />
      )}

      {showPopup && <Feedbackform togglePopup={togglePopup} />}
      {deletingUser && (
        <UserDeleteAlert
          toggleDelete={togglePopup}
          deletingUser={deletingUser}
          setDeleteUser={setDeleteUser}
          deleteUserFinal={deleteUserFinal}
          setDeleteUserFinal={setDeleteUserFinal}
        />
      )}

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
        f{/* Chat Container Componet  */}
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

                <EditProfileSettingsBtn
                  showEditSettingsDiv={showEditSettingsDiv}
                />

                <EditProfileSettings
                  showEditSettings={showEditSettings}
                  showEditSettingsDiv={showEditSettingsDiv}
                  handleKeyDown={handleKeyDown}
                  setZodiac={setZodiac}
                  setLifePathNumber={setLifePathNumber}
                  setEnnealogyNumber={setEnnealogyNumber}
                  setCardologyNumber={setCardologyNumber}
                  setMylesBridgeType={setMylesBridgeType}
                  setNameNumerolgyNumber = {setNameNumerolgyNumber}
                  setBirthDay={setBirthDay}
                  profileProgresLoading={profileProgresLoading}
                />
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
                  <Link
                    href="https://www.aquariusmaximus.com/"
                    target="_blank"
                    id="greyText"
                  >
                    Cardology Number
                  </Link>
                  {isEditing ? (
                    <input
                      className="profileInput outline-none"
                      type="text"
                      value={cardologyNumber as any}
                      onChange={(e) => setCardologyNumber(e.target.value)}
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
                  <Link
                    href="https://www.16personalities.com/"
                    target="_blank"
                    id="greyText"
                  >
                    Myles Bridge Personality Type
                  </Link>
                  {isEditing ? (
                    <input
                      className="profileInput"
                      type="text"
                      value={mylesBridgeType as any}
                      onChange={(e) => setMylesBridgeType(e.target.value)}
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
                  <p id="greyText">Subscription Status</p>
                  <button className=" pointer-events-none text-[14px] newChat flex flex-row items-center justify-center gap-[13px] ">
                    <div className="mainIcon">
                      <Image
                        alt="chatIcon"
                        src={arrowLeft}
                        width={100}
                        height={100}
                      />
                    </div>
                    <p>{`${activeSubscription ? "True" : "False"}`}</p>
                  </button>{" "}
                </div>
                <div className="flex flex-row w-full justify-between">
                  {/* <p id="greyText">Limits</p> */}
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
                    <p className="text-white">{`${
                      canceledSubscription
                        ? "Renew Subscription"
                        : "Cancel Subscription"
                    }`}</p>
                    <p className="text-[12px]" id="greyText">
                      You haved learnt all you need. Leave This quest.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleSubscriptionAction(subcriptionSessionID)
                    }
                    className=" text-[14px] newChat large !flex flex-row items-center justify-center gap-[13px] "
                  >
                    <div className="mainIcon">
                      <Image
                        alt="chatIcon"
                        src={arrowLeft}
                        width={100}
                        height={100}
                      />
                    </div>
                    <p className="text-white">{`${
                      canceledSubscription
                        ? "Renew Subscription"
                        : "Cancel Subscription"
                    }`}</p>{" "}
                  </button>{" "}
                </div>

                <div className="flex flex-col   md:flex-row gap-[15px] md:gap-[0px justify-between accountDiv">
                  <div className="flex flex-col ">
                    <p className="text-white">Delete Account</p>
                    <p className="text-[12px]" id="greyText">
                      Permanently delete your account and data
                    </p>
                  </div>
                  <button
                    onClick={beginDeletingUser}
                    className=" text-[14px] newChat !flex flex-row items-center justify-center gap-[13px] "
                  >
                    <div className="mainIcon">
                      <Image
                        alt="chatIcon"
                        src={arrowLeft}
                        width={100}
                        height={100}
                      />
                    </div>
                    <p>Delete Account</p>
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
                      className="hover:text-[#807f7f] text-[12px]"
                    >
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
