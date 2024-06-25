import Link from "next/link";
import axios from "axios";
import React, { FC, FormEvent, RefObject, useEffect, useState } from "react";
import Image from "next/image";
import NewsImage from "../../../public/assets/homePage/NewsLetter_Image.png";
import SwordIamge from "../../../public/assets/homePage/Sword_Icon.png";
import ChestImage from "../../../public/assets/homePage/Chest_Icon.png";
import JoinImage from "../../../public/assets/homePage/JoinList.png";
import { SuccessPopup } from "./SucessPopup";
import FaceIcon from "../../../public/faceIconSolomon.png";

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
      console.log("Logging submissionstae", submissionState);
      //   togglePopup();
      // You might want to clear the form or give user feedback here
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    console.log("Loggin submission stae in the useEffect", submissionState);
  }, [submissionState]);

  return (
    <div className="homePopup">
      {submissionState ? (
        <SuccessPopup togglePopup={togglePopup} />
      ) : (
        <div className="bg-black border border-white/40 p-4 rounded-xl w-full h-auto md:w-[420px] relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            onClick={togglePopup}
            className="absolute top-[1rem] right-[1rem] fill-white/80 cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
          <div className=" w-full pb-2 flex items-center justify-center flex-col gap-4">
            <div className="flex w-full items-center justify-center">
              <Image
                src={FaceIcon}
                alt="Solomon Logo"
                width={48}
                height={48}
              />
            </div>
            <p className="text-white font-thin text-center text-indigo-00">
              Solomon AI <br />
              <span className="text-lg">Spirtual AI Intergration</span>
            </p>
              <p className="px-2 py-4 text-gray font-thin text-center border border-white/10 rounded text-[1.25rem] leading-[1.5rem]">
                There is an undeniable power to having universal guidance at
                your finger tips. Wisdom is a forever process, let us aid in the
                ways.
              </p>
            <form onSubmit={joinSubmit} className="w-full flex flex-col gap-4">
              <input
                type="email"
                className="w-full p-2 font-thin text-white border-b border-white/55 bg-black placeholder:text-white/75 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                autoComplete="off"
              />
              {/* <div className="p-[1px] bg-gradient-to-br to-indigo-950 from-indigo-400 rounded"> */}
                <button className="w-full p-2 font-thin bg-gradient-to-br to-indigo-950 from-indigo-800 border border-white/40 rounded-sm text-white bg-black">
                  Join the waitlist
                </button>
              {/* </div> */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
