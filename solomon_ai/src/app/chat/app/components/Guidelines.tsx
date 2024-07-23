import React, { FC, RefObject } from "react";
import { useEffect, useRef, useState } from "react";

export const Guidelines = ({ onComplete }) => {
  const circles = Array.from({ length: 4 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
  }, [activeIndex]);

  const handleNext = () => {
    if (activeIndex < 3) {
      setActiveIndex(prevIndex => prevIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (


    <div className={`guidlinesOverlay ${activeIndex === 4 ? "active" : ""}`}>
      <div
        className={`guideLinesWhiteBox flex flex-col gap-[5px] first ${
          activeIndex === 0 ? "active" : ""
        }`}
      >
        <h3>Return To Dashboard Home</h3>
        <p className="text-[#494949]">
          Return back to home to begin an new chat with metaphysical co-pilot. Most Advanced Model.
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
        className={`guideLinesWhiteBox flex flex-col gap-[5px] second ${
          activeIndex === 1 ? "active" : ""
        }`}
      >
        <h3>Dream Calculator </h3>
        <p className="text-[#494949] text-[14px]">
          Metaphysical co-pilot that is trained on Dream interpetations to give
          an ideation
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
        className={`guideLinesWhiteBox flex flex-col gap-[5px] third ${
          activeIndex === 2 ? "active" : ""
        }`}
      >
        <h3>Align With The Day</h3>
        <p className="text-[#494949] text-[14px]">
          Our Dream Calculator, a metaphysical co-pilot, expertly interprets
          your dreams to provide insightful guidance and deeper understanding.
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
        className={`guideLinesWhiteBox flex flex-col gap-[5px] fourth ${
          activeIndex === 3 ? "active" : ""
        }`}
      >
        <h3>Settings </h3>
        <p className="text-[#494949] text-[14px]">
          View Overall Settings Here.
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
