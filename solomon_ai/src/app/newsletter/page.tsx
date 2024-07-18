"use client";
import { useState, useEffect, useRef } from "react";
import { Popup } from "@/app/components/NewsletterPopup";
import NavComponent from "@/app/navigation/navComponent";
import Footer from "@/app/components/Footer";

import Image from "next/image";

import PopupImage from "../../../public/assets/homePage/popup_header.png";
import SolomonFace from "../../../public/assets/homePage/Solomon_Face.png";

import Video from "../components/Vidoe";

export default function Newsltter() {
  //Show Popup
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    console.log("Popup is toggling", isPopupVisible);
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="bg-white h-full">
      {isPopupVisible && <Popup togglePopup={togglePopup} />}
      {/* <NavComponent togglePopup={togglePopup} />{" "} */}

      <div className="newsletterBanner"></div>

      <div className="mainParentContainer py-[10rem]">
        <div className="newsletterContainer  flex lg:flex-row flex-col p-[1rem] justify-center gap-[50px] h-full max-w-[1200px] m-auto">
          <div className="newsletterCard flex flex-col gap-[10px] p-[1rem]">
            <div>
              <Image src={PopupImage} alt="popupheader" />
            </div>

            <div className="flex flex-row gap-[10px] w-full justify-between">
              <div className="smallImageContainer">
                <Image
                  src={SolomonFace}
                  width={180}
                  height={180}
                  alt="popupheader"
                />
              </div>

              <div className="flex flex-col gap-[5px] p-[10px] ">
                <p className="font-semibold">
                  Solomon AI | Metaphysical Co-Pilot
                </p>

                <p className="text-[14px]">
                  Worlds leading spiritual copiolot aim to eleveate the
                  indivdual and collective consciousness
                </p>
              </div>
            </div>
          </div>

          <div className="letterWrapper pr-[10px] flex flex-col items-start justify-start h-auto gap-[20px]">
            <h2 className="text-black font-bold">
              Spiritual Sage For Your Self Development
            </h2>

            <p className="text-grey">
              Receive insightful spiritual guidance tailored for the modern age.
              Our AI assistant harmonizes wisdom from diverse global ideologies,
              helping you discover your unique truth beyond traditional dogma.
            </p>

            <form className="w-full newsLetterPageForm h-full flex items-end ">
              <div className="flex flex-row w-full p-[10px] h-[55px]">
                <input
                  className="w-full h-full align-bottom font-thin text-black outline-none"
                  // onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Your Email"
                  required
                />

                <button
                  type="submit"
                  className="flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="white"
                    viewBox="0 0 32 32"
                    className="rotate-90"
                  >
                    <path
                      fill="white"
                      fill-rule="evenodd"
                      d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
            <p className="pb-[4rem] text-[#c4c4c4] text-[14px]">
              Welcome to the aquarian age...
            </p>
          </div>
        </div>

        <div className="centerAlign max-w-[1200px] m-auto py-[5rem] px-[10px]">
          <div className="mainVideoContainer flex flex-col gap-[3rem]">
            <Video
              src="https://www.aisolomon.xyz/Trailer_Video.mp4"
              type="video/mp4"
              width="100%"
              height="auto"
              controls={true}
              autoPlay={false}
              loop={true}
              muted={false}
            />

            <hr className="vidDivider"></hr>
          </div>
        </div>
      </div>
    </div>
  );
}
