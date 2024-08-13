import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import React, { FC, FormEvent, RefObject, useEffect, useState } from "react";

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

  useEffect(() => {
    setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!));
  }, []);

  const handleCheckout = async (priceId: string, subscription: boolean) => {
    try {
      const { data } = await axios.post(
        `/api/create-checkout-session`,
        { userId: "ssanders444", email: "ssanderss444@gmail.com", priceId, subscription });


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

  return (
    <div className="homePopup feedback !items-center !justify-center">
      <div className="homePopupContainer  flexStartImportant feedback deleteForm">
        <div className="homePopupFormContainer gap-[5px] deleteForm w-full flex flex-col items-center !justify-start">
          <div className=" homePopupInnerWrapper borderRadius text-center flex flex-col items-center gap-[5px] ">
            <div className="popupLinearGradient flex flex-col gap-[15px]">
              <h3 className="text-black font-medium">Peace Unto You</h3>

              <span className="!text-center !text-[#717171]">
                To join the spirtual evolution of Mankind, please send your
                support to keep the platform running
              </span>

              <h5>Thank You For Willing To Improve Thyself</h5>

              <span className="montlyLabel">Monthly</span>
            </div>
          </div>

          <div className="flex flex-col gap-[5px]">
            <button
              onClick={() =>
                handleCheckout( "24.99", true)
              }
              className="joinBeta w-full flex items-center justify-center !bg-[#4D36DF] !text-white mx-[1rem]   "
            >
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
