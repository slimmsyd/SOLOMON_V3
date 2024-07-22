import React, { FC, RefObject } from "react";
import { useEffect, useRef, useState } from "react";

export const Guidelines = () => {
  const circles = Array.from({ length: 5 });

  return (
    <div className="guidlinesOverlay">
      <div className="guideLinesWhiteBox flex flex-col gap-[5px] first">
        <h3>Return To Dashboard Home</h3>
        <p className="text-[#494949]">
          Return back to home to begin an new chat with metaphysical co-pilot
        </p>

        <div className="flex flex-row gap-[5px] items-center justify-end">
          <div className="flex flex-row gap-[5px] flex-1">
            {circles.map((_, index) => (
              <div key={index} className="guideLinesCircle"></div>
            ))}
          </div>

          <button className="guildeLinesBtn black">Back</button>
          <button className="guildeLinesBtn">Next</button>
        </div>
      </div>
    </div>
  );
};
