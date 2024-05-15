"use client";

import { Circles } from "react-loader-spinner";
import { useEffect, useRef, useState } from "react";
import React, { FC, RefObject } from "react";
import NavComponent from "@/app/navigation/navComponent";

export const LoadingRender = () => {
  return (
    <div className="bodyWrapper">
      <NavComponent />

      <div className="flex flex-col gap-3 h-full w-full items-center justify-center">
        <Circles
          height="95"
          width="95"
          color="#fff"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />


        <h3>Loading in Dashbaord......</h3>
        <h6
        className ="text-[#807F7F]"
        >Gather Preferences...</h6>
      </div>
    </div>
  );
};
