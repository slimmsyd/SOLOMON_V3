"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession, getSession } from "next-auth/react";
import { checkSession } from "@/utilis/CheckSession";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { isClient } from "@/utilis/isClient";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HeroImage from "../../../public/assets/Light_Being.png";
import Logo from "../../../public/faceIconSolomon.png";
import LoadingComponent from "../components/helper/Loading";
import Link from "next/link";
import { Suspense } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const session_id = searchParams!.get("session_id");
  const [subscription, setSubscription] = useState(null);
  const router = useRouter();

  const [userId, setUserId] = useState<string>("");
  const { data: session, status } = useSession();
  const [sessionStatus, setSessionStatus] = useState<string>("");
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);

  const {
    userName,
    setUserName,
    splitUserName,
    email,
    setEmail,
    setSplitUserName,
  } = useSessionStorage();

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

  useEffect(() => {
    async function returnUserId() {
      const getSesh = await getSession();
      console.log("Loggin getSesH", getSesh);

      setUserId(getSesh?.user.id || "");
    }

    returnUserId();
  }, [userId]);

  useEffect(() => {
    if (session_id) {
      fetch("/api/retrieve-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSubscription(data.subscription);

          // After fetching the subscription, update the user profile
          if (userId) {
            updateSubscriptionInUserProfile(data.subscription.id);
          }
        })
        .catch((error) =>
          console.error("Error fetching subscription details:", error)
        );
    }
  }, [session_id, userId]);

  useEffect(() => {
    console.log("Logging hte current USERD ID in the success page", userId);
  }, [userId]);

  const updateSubscriptionInUserProfile = async (subscriptionId) => {
    try {
      console.log("Logging the userID before we send", userId);
      const response = await fetch("/api/update-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, subscriptionId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User profile updated with subscription ID:", data);
      } else {
        console.error("Failed to update user profile with subscription ID");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  useEffect(() => {
    console.log("THe subscriptoin has changed", subscription);
  }, [subscription]);

  useEffect(() => {
    if (subscription) {
      const timer = setTimeout(() => {
        router.push('/chat/app/questionaire');
      }, 5000); // 5000 milliseconds = 5 seconds

      return () => clearTimeout(timer); // Clear timeout if component unmounts
    }
  }, [subscription, router]);

  return (
    <div className="bg-white h-[100vh] flex flex-row relative ">
      <div className="flex flex-row gap-[10px] justify-center items-center">
        <div className="text-black h-full">
          {subscription ? (
            <div className="text-center flex flex-row gap-[10px] h-full">
              <span className="imageContainer w-[80%]  ">
                <Image
                  alt="HeroImage"
                  width={200}
                  height={500}
                  className="!h-full customImage"
                  src={HeroImage}
                  layout="responsive"
                  objectFit="cover" // Ensures the image covers the container without distortion
                  quality={100}
                />
              </span>

              <div className="flex flex-col items-left text-left pl-[10px] justify-center pb-[5rem]">
                <div className="flex flex-row gap-[15px]">
                  <span className="bg-black rounded-[50%] flex items-center justify-center p-[5px] w-[40px] h-[40px] ">
                    <Image
                      alt="Solomon Logo"
                      src={Logo}
                      width={20}
                      height={20}
                    />
                  </span>
                </div>
                <h2 className="text-black text-[38px] ">
                  Thank You For Willing To Better Thyself
                </h2>
                <p className="!text-left">
                  You Will Be Redirected Toward the App Dashboard Shortly
                </p>
                <p className="!text-left">If not, click on the image below </p>

                <Link
                  href="/chat/app/questionaire"
                  className="redirect bg-black w-[200px] h-[45px] text-white flex items-center justify-center mt-[15px] "
                >
                  <span>Click Here To Redirect</span>
                </Link>

              <div className = "self-end pt-[20px]"> 

                <p>Perhaps the coming together of our insights about the world around us and the world inside us is a satisfying feature of the recent evolution in science</p>


              </div>


              </div>

              {/* <pre>{JSON.stringify(subscription, null, 2)}</pre> */}
            </div>
          ) : (
            <LoadingComponent />
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
