import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { FC, FormEvent, RefObject, useEffect, useState } from "react";
import Image from "next/image";

import PopupImage from "../../../public/assets/homePage/popup_header.png";
import { SuccessPopup } from "../components/SucessPopup";

import FaceIcon from "../../../public/faceIconSolomon.png";

interface PopupProps {
  togglePopup: () => void;
}

export const Feedbackform: React.FC<PopupProps> = ({ togglePopup }) => {
  const [email, setEmail] = useState<string>("");
  const [submissionState, setSubmissionState] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const { data: session, status } = useSession();
  const [sessionEmail, setSessionEmail] = useState<string>("");
  const [sessionName, setSessionName] = useState<string>("");

  const [activeIndex, setActiveIndex] = useState(0);
  const [ratingValue, setRatingValue] = useState<Number>(0);

  const handleRatingClick = (index: number, rating: number) => {
    setActiveIndex(index);
    setRatingValue(rating);
  };
  //Keep track of the updating index
  useEffect(() => {}, [activeIndex, ratingValue]);

  useEffect(() => {
    setSessionEmail(session?.user.email);
    setSessionName(session?.user.name);
  }, []);

  const joinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //Log the current date of submisison
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}--${month}--${year}`;

    const data = {
      email: sessionEmail,
      feedback: feedback,
      ratingValue: ratingValue,
      currentDate: currentDate,
    };

    try {
      const response = await axios.post(
        "https://hook.us1.make.com/6bx3xklj81i4eg1z4ppqf8irjwztdttx",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Success:", response.data);
      console.log("Logging the Data that wwas send", data);

      // Simulate successful submission
      setSubmissionState(true);
      console.log("Logging submission state", submissionState);
      // Call togglePopup to close the popup after successful submission
      togglePopup();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {}, [submissionState]);

  return (
    <div className="homePopup feedback">
      {submissionState ? (
        <SuccessPopup togglePopup={togglePopup} />
      ) : (
        <div className="homePopupContainer feedback">
          <div onClick={togglePopup} className="closePopupContainer feedBack">
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

          <div className="homePopupFormContainer gap-[5px] feedBackForm w-full flex flex-col items-center !justify-evenly">
            <div className="popupHeader feedback">
              <Image src={PopupImage} alt="popupheader" />
            </div>

            <div className=" homePopupInnerWrapper text-left flex flex-col items-start gap-[5px] mb-[5px] md:mb-[50px] mt-[20px] mx-[20px]">
              <h2 className=" font-med text-[28px] text-center text-black">
                Much Appreciate Feedback For User Best Possible Experience In
                This Realm
              </h2>
            </div>

            <form
              onSubmit={joinSubmit}
              className="flex flex-col w-full  gap-[15px] "
            >
              {/* <input placeholder="Enter Name Optional" /> */}
              <textarea
                placeholder="How is the app? What could we do better?"
                className="feedBackTextArea"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              >
                {" "}
              </textarea>

              <p className="text-[14px]">
                We value your insights, could you tell us your experience with
                the products performance
              </p>

              <div className="flex flex-row gap-[15px] flex-1 w-full justify-evenly">
                <span
                  onClick={() => handleRatingClick(0, 0)}
                  className={`feedBackBtn text-[25px] flex items-center justify-center ${
                    activeIndex === 0 ? " active" : ""
                  }`}
                >
                  🥺
                </span>
                <span
                  onClick={() => handleRatingClick(1, 1)}
                  className={`feedBackBtn text-[25px] flex items-center justify-center ${
                    activeIndex === 1 ? "active" : ""
                  }`}
                >
                  🙁
                </span>
                <span
                  onClick={() => handleRatingClick(2, 2)}
                  className={`feedBackBtn text-[25px] flex items-center justify-center ${
                    activeIndex === 2 ? "active" : ""
                  }`}
                >
                  😑
                </span>
                <span
                  onClick={() => handleRatingClick(3, 3)}
                  className={`feedBackBtn text-[25px] flex items-center justify-center ${
                    activeIndex === 3 ? "active" : ""
                  } `}
                >
                  🙂
                </span>
                <span
                  onClick={() => handleRatingClick(4, 4)}
                  className={`feedBackBtn text-[25px] flex items-center justify-center ${
                    activeIndex === 4 ? "active" : ""
                  } `}
                >
                  😍
                </span>
              </div>

              <button
                type="submit"
                className="joinBeta !bg-black !text-white   "
              >
                Submit
              </button>

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
