import React, { FC, RefObject } from "react";
import { useEffect, useRef, useState } from "react";




export const ProfileGuidelines = ({ onComplete }) => {
  const circles = Array.from({ length: 3 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
  }, [activeIndex]);

  const handleNext = () => {
    if (activeIndex < 2) {
      setActiveIndex(prevIndex => prevIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (


    <div className={`guidlinesOverlay ${activeIndex === 4 ? "" : "active"}`}>
      <div
        className={`guideLinesWhiteBox profileGuidlines flex flex-col gap-[5px] first ${
          activeIndex === 0 ? "active" : ""
        }`}
      >
        <h3>How To Edit Your Settings</h3>
        <p className="text-[#494949]">
            By clicking on the "white" text, you can update your settings, so Solomon reflects the correct info.
        </p>

        <div className="flex flex-row gap-[5px] items-center justify-end flex-1">
          <div className="flex flex-row gap-[5px] flex-1 items-center">
            {circles.map((_, index) => (
              <div

                className={`guideLinesCircle ${
                  index === activeIndex ? "active" : ""
                }`}
              ></div>
            ))}
          </div>

          <button className="guildeLinesBtn black" onClick={handleBack}>
            Back
          </button>
          <button className="guildeLinesBtn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
      <div
        className={`guideLinesWhiteBox profileGuidlines flex flex-col gap-[5px] second ${
          activeIndex === 1 ? "active" : ""
        }`}
      >
        <h3>Settings Deatils  </h3>
        <p className="text-[#494949] text-[14px]">
            You can Click on "Cardology" and "Myles Bridge", to take you to an external link to get your information. Highly recommended.
        </p>

        <div className="flex flex-row gap-[5px] items-center justify-end flex-1">
          <div className="flex flex-row gap-[5px] flex-1 items-center">
            {circles.map((_, index) => (
              <div
                key={index}
                className={`guideLinesCircle ${
                  index === activeIndex ? "active" : ""
                }`}
              ></div>
            ))}
          </div>
          <button className="guildeLinesBtn black" onClick={handleBack}>
            Back
          </button>
          <button className="guildeLinesBtn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>


      <div
        className={`guideLinesWhiteBox profileGuidlines flex flex-col gap-[5px] third ${
          activeIndex === 2 ? "active" : ""
        }`}
      >
        <h3>Account Options </h3>
        <p className="text-[#494949] text-[14px]">
            Here is where you have the opportunity to "delete" account, log out, and give feedback.
        </p>

        <div className="flex flex-row gap-[5px] items-center justify-end flex-1">
          <div className="flex flex-row gap-[5px] flex-1 items-center">
            {circles.map((_, index) => (
              <div
                key={index}
                className={`guideLinesCircle ${
                  index === activeIndex ? "active" : ""
                }`}
              ></div>
            ))}
          </div>
          <button className="guildeLinesBtn black" onClick={handleBack}>
            Back
          </button>
          <button className="guildeLinesBtn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>

   
    </div>
  );
};
