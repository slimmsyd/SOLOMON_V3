import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import React, { FC, FormEvent, RefObject, useEffect, useState , useRef} from "react";
import ImageOne from "../../../../public/assets/Ancient_Guy.png";
import Image from "next/image";
import Video from "@/app/components/Vidoe";

interface PopupProps {
  toggleDelete?: () => void;
  deletingUser: boolean;
  deleteUserFinal: boolean;
  setDeleteUserFinal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PayForAppPopup = ({}) => {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<string>("");
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const togglePricingPeriod = (value: string) =>
    setIsYearly(parseInt(value) === 1);
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);

  //Check this session in the userEffect

  useEffect(() => {
    console.log("Logging hte session date", session);
  }, [session]);

  useEffect(() => {
    setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!));
  }, []);

  const handleCheckout = async (priceId: string, subscription: boolean) => {
    try {
      const { data } = await axios.post(`/api/create-checkout-session`, {
        userId: session?.user?.id,
        email: session?.user?.email,
        priceId,
        subscription,
      });

      if (data.sessionId) {
        const stripe = await stripePromise;

        const response = await stripe?.redirectToCheckout({
          sessionId: data.sessionId,
        });

        return response;
      } else {
        console.error("Failed to create checkout session");
        toast("Failed to create checkout session");
        return;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast("Error during checkout");
      return;
    }
  };

  //Play when audio mounts
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }

    console.log("Audio ref", audioRef);
    console.log("Musted stae", muted);
  }, []);

  //Toggle mute/unmute
  const toggleMute = () => {
    console.log("Logging click",)
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <>
      <div>
        <audio
          ref={audioRef}
          src="/assets/music/Cosmos.mp3"
          autoPlay
          loop
          muted={muted} // Start muted to avoid autoplay restrictions
        />
      </div>
      <div className="homePopup feedback !items-center !justify-center">
        <div className="homePopupContainer signUpForm  flexStartImportant feedback deleteForm">
          <div className="homePopupFormContainer gap-[5px] deleteForm w-full flex flex-col items-center !justify-start">
            <div className=" homePopupInnerWrapper   borderRadius text-center flex flex-col items-center gap-[5px] ">
              <div className="popupLinearGradient flex flex-col gap-[15px]">
                <div className="h-[300px]">
                  <Video
                    src="/assets/Ancient_Pull_Out.mp4"
                    type="video/mp4"
                    width="100%"
                    height="auto"
                    controls={false}
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    className="pointerEventsYes"
                  />
                  {/* <Image
                  layout="responsive"
                  objectFit="cover" // Ensures the image covers the container without distortion
                  quality={100}
                  src={ImageOne}
                  width={100}
                  height={100}
                  alt="Ancient Scholar"
                ></Image> */}
                </div>
                <h3 className="text-white font-medium">Peace Unto You</h3>

                <span className="!text-center !text-[#717171]">
                  To join the spirtual evolution of Mankind, please send your
                  support to keep the platform running
                </span>

                <h5 className="text-white">
                  Thank You For Willing To Improve Thyself
                </h5>

                {/* <span className="montlyLabel">Monthly</span> */}
              </div>
            </div>

            <div className="flex flex-col gap-[5px] mt-[10px]">
              <button
                onClick={() => handleCheckout("5.00", true)}
                className="joinBeta w-full flex items-center justify-center !bg-[#4D36DF] !text-white px-[5px]   "
              >
                Upgrade Plan
              </button>

              <button
              className = "text-white flex items-center justify-center mt-[5px] rotate"
                onClick={toggleMute}
              >
                  <Image src = "/assets/Chat/CD_DISK.png"
                  width={30}
                  height={30}
                  alt = "Music Disk"
                  />

              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
