import Link from "next/link";
import React, { FC, FormEvent, RefObject, useState } from "react";
import axios from "axios";
import FaceIcon from '../../../public/faceIconSolomon.png'
import Image from "next/image";

export const Footer: any = () => {
  const [email, setEmail] = useState<string>("");

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
      // You might want to clear the form or give user feedback here
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  return (
    <footer className="w-full p-8 relative flex flex-col gap-[20vh]">
      <hr className="w-full h-[1px] bg-white opacity-[.10]" />

      <div className="flex md:flex-row gap-[6rem] flex-col justify-between w-full">
        <div className="flex-col flex items-start gap-[30px]">
          <div className="flex flex-row gap-[5px] md:gap-[15px] items-center">
            <div>
                    <Image src = {FaceIcon}
                    width = {32}
                    height = {32}
                    alt = "Solomon Face Icon"
                    />
            </div>
            <p>Solomon AI</p>
            <span>-</span>
            <p className="text-gray"> joint beta waiting list</p>
          </div>

          <form
            onSubmit={joinSubmit}
            className="w-full relative newsLetterForm "
          >
            <div className="flex relative flex-row items-center">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent newsLetterInput"
                type="email"
                placeholder="Email address"
              />

              <button type="submit">
                <svg
                  width={20}
                  height={20}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  aria-labelledby="arrow-394209df-8e0a-4acc-a89e-e88f347972a7"
                  focusable="false"
                  fill="#fff"
                >
                  <title id="arrow-394209df-8e0a-4acc-a89e-e88f347972a7">
                    Arrow
                  </title>
                  <path d="M88.934,47.431l-27.298-27.259-.027-.027c-1.427-1.414-3.73-1.403-5.144,.024-1.414,1.426-1.403,3.729,.024,5.142l21.055,21.025H13.634c-2.007,0-3.634,1.627-3.634,3.633s1.627,3.633,3.634,3.633h63.972l-21.116,21.087-.024,.024c-1.413,1.427-1.401,3.73,.027,5.143s3.731,1.401,5.144-.027l27.298-27.259,.006-.006c1.416-1.419,1.414-3.718-.006-5.134Z"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>

        <div className="flex-col md:w-[30%] w-full gap-[15px]">
          <ul className="flex flex-col gap-[15px]">
            <li className="text-[16px]">Social</li>
            <Link
              href="https://www.instagram.com/syddarchitect"
              className="text-[14px] text-gray flex flex-row gap-[15px"
            >
              Instagram
            </Link>
            <Link
              href="https://www.instagram.com/syddarchitect"
              className="text-[14px] text-gray"
            >
              Creators - Instagram
            </Link>
            <Link href="/" className="text-[14px] text-gray">
              Tiktok
            </Link>
            <Link href="/" className="text-[14px] text-gray">
              Blogs
            </Link>
          </ul>
        </div>
      </div>

      <div className="flex md:flex-row flex-col justify-between relative md:pb-[28px pb-[0px]]">
        <p className="text-gray text-[14px]">
          {" "}
          © 2024 SolomonAI All rights reserved
        </p>

        <div className="md:flex flex-row gap-[15px] w-[30%] hidden lg:hidden  ">
          <Link href="/" className="text-gray text-[14px]">
            {" "}
            Security
          </Link>
          <p className="text-gray text-[14px]"> |</p>
          <Link href="/" className="text-gray text-[14px]">
            {" "}
            Privacy & Cookie Policy
          </Link>
          <p className="text-gray text-[14px]"> |</p>

          <Link href="/" className="text-gray text-[14px]">
            {" "}
            Terms & Services
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
