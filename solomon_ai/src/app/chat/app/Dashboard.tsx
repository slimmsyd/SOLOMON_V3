import { useEffect, useRef, useState } from "react";
import React, { FC, RefObject } from "react";

interface DashboardProps {
  userName: string;
}

export const Dashboard: FC<DashboardProps> = ({ userName }) => {
  userName;

  return (
    <>
      {/* Place within a Componnet */}
      <h2>Grand Rising, {userName}</h2>
      <h2>How may I guide?</h2>
      <p id="greyText">Wisdom is a forever process, let us aid in the ways </p>

      {/* Render Cards/ Text will pouplate based on Quesitonaire  */}

      <div className="renderCardsWrapper flex flex-row gap-[23px] justify-start relative">
        <div className="renderCards relative">
          <p>Get your astrological predictions</p>

          <button className="renderAutoTextBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 32 32"
              className="rotate-90"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="renderCards relative">
          <p>Calculate my life path number, and personal months meaning</p>

          <button className="renderAutoTextBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 32 32"
              className="rotate-90"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="renderCards relative">
          <p>Calculate my life path number, and personal months meaning</p>

          <button className="renderAutoTextBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 32 32"
              className="rotate-90"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className="renderCards relative">
          <p>
            Breakdown “In the beginning was the world” from a Quantum
            perspective
          </p>

          <button className="renderAutoTextBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 32 32"
              className="rotate-90"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
