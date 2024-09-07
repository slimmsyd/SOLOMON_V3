"use client";
import { useEffect, useRef, useState } from "react";
import NavComponent from "../navigation/navComponent";

import { Feedbackform } from "../profile/FeedbackForm";

export default function Changelog() {
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <section className="w-full h-[100vh] pt-[14rem] px-6 flex items-start justify-center">
      <NavComponent />

      <div className="flex flex-col">
        <div>
          <h1 className="text-[38px]">Changelog</h1>
        </div>

        <div className="mt-[8rem]">
          <p className="text-white">
            We always update Solomon with new features, bug fixes, and
            improvements. In case you have any issues,
            <span
                onClick={togglePopup}
            className="text-[#4c35de] cursor-pointer">
               please contact us in live support or email us.
            </span>
          </p>
        </div>
      </div>

      {showPopup && <Feedbackform togglePopup={togglePopup} />}
    </section>
  );
}
