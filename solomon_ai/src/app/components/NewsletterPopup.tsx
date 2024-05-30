import Link from "next/link";
import axios from "axios";
import React, { FC, FormEvent, RefObject, useEffect, useState } from "react";
import Image from "next/image";
import NewsImage from "../../../public/assets/homePage/NewsLetter_Image.png";
import SwordIamge from "../../../public/assets/homePage/Sword_Icon.png";
import ChestImage from "../../../public/assets/homePage/Chest_Icon.png";
import JoinImage from "../../../public/assets/homePage/JoinList.png";
import { SuccessPopup } from "./SucessPopup";

interface PopupProps {
  togglePopup: () => void;
}

export const Popup: React.FC<PopupProps> = ({ togglePopup }) => {
  const [email, setEmail] = useState<string>("");
  const [submissionState, setSubmissionState] = useState<boolean>(false);

  const joinSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      email: email,
    };

    try {
      const response = await axios.post(
        "https://hook.us1.make.com/l99169ajyoh8dcxhaqnay3d3zqxe0on4 ",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Success:", response.data);
      setSubmissionState(true);
      console.log("Logging submissionstae", submissionState)
      //   togglePopup();
      // You might want to clear the form or give user feedback here
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    console.log("Loggin submission stae in the useEffect", submissionState)
  },[submissionState])

  return (
    <div className="homePopup">
      {submissionState ? (
        <SuccessPopup togglePopup={togglePopup} />
      ) : (
        <div className="homePopupContainer">
          <div onClick={togglePopup} className="closePopupContainer">
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

          <div className="iconImageRightTop">
            <Image src={SwordIamge} alt="Waiting List Image" />
          </div>

          <div className="iconImageLeftTop">
            <Image src={SwordIamge} alt="Waiting List Image" />
          </div>

          <div className="iconImageLeftBottom">
            <Image src={SwordIamge} alt="Waiting List Image" />
          </div>

          <div className="iconImageRighttBottom">
            <Image src={SwordIamge} alt="Waiting List Image" />
          </div>

          {/* <div className="topDiv">
  <div className="topDivContainer">
    <p>JOIN THE BETA</p>
  </div>
</div> */}

          <div className="homePopupImageContainer w-full items-center justify-center">
            <Image src={JoinImage} alt="Waiting List Image" />
          </div>

          <div className="homePopupFormContainer w-full flex flex-col items-center justify-center">
            <div className="flex flex-col gap-[5px] mb-[20px] md:mb-[50px] mt-[20px] mx-[20px]">
              <h3>Join the beta waiting list.</h3>
              <p className="text-gray text-[14px]">
                There is an undeniable power to having universal guidance at
                your finger tips.
              </p>
            </div>

            <form onSubmit={joinSubmit} className="flex flex-col  gap-[15px] ">
              <input
                className="w-full h-[38px]"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
              />

              <button className="joinBeta">Join Beta</button>

              {/* 
    <button type="submit" className="w-[32px] h-[32px] formImage">
      <Image src={ChestImage} alt="Waiting List Image" />
    </button> */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
