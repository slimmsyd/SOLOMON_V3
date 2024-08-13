"use client";
import { useState, useEffect, useRef } from "react";
import NavComponent from "../navigation/navComponent";
import Image from "next/image";
import { Popup } from "../components/NewsletterPopup";
import Footer from "../components/Footer";
import solomonHeaderImg from "../../public/assets/chat-guidelines.png";
import { features } from "process";
import Link from "next/link";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
gsap.registerPlugin(ScrollTrigger);

//Think about better way to funnnel images
import ImageOne from "../../../public/assets/homePage/popup_header.png";

import Lenis from "lenis";

export default function BlogPage() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const refTextTrigger = useRef<HTMLDivElement>(null);
  const refTextOne = useRef<HTMLDivElement>(null);
  const refTextTwo = useRef<HTMLDivElement>(null);
  const refTextThree = useRef<HTMLDivElement>(null);

  const refImageTwo = useRef<HTMLDivElement>(null);
  const refImageThree = useRef<HTMLDivElement>(null);

  //Controlling the Smooth Scrolling


  //Show Popup
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    console.log("Popup is toggling", isPopupVisible);
    setIsPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("isFirstVisit");
    if (!isFirstVisit) {
      // First time visitor
      togglePopup();
      localStorage.setItem("isFirstVisit", "true");
    }
  }, []);

  const scrollToSection = () => {
    if (refTextTrigger.current) {
      refTextTrigger.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const featuresRef = useRef<HTMLDivElement>(null);
  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>

{isPopupVisible && <Popup togglePopup={togglePopup} />}

      <main className="w-full h-auto">
        <NavComponent
          togglePopup={togglePopup}
          scrollToSection={scrollToSection}
          scrollToFeatures={scrollToFeatures}
        />

        <section className="w-full h-auto pt-[14rem] pb-[14rem] gap-[25px]  px-6 flex items-center justify-center ">

        <Link
            href="/blogs/unifiedGod"
            className="blogCard flex-col flex items-start justify-start"
          >
            <div className="blogCardImageContainer h-full flex-1">
              <Image src={ImageOne} alt="Spiritual Image" />
            </div>

            <div className="blogCardContents flex flex-col gap-[10px] h-[250px] p-[1.1rem]">
              <div className="flex flex-row gap-[4px]">
                <span className="text-gray text-[14px]">May 31st, 2024</span>
                <span className="text-gray text-[14px] text-before">5 min read</span>
              </div>

              <h3 className="text-white">Return of an Unifed God.</h3>

              <p className="text-gray font-light">
                The instructions of Ptah Hotep of 5 dynasty Egypt and or
                formally known as Ancient Kemit. Scholars argue this these text
                are some of the oldest recovered written text known to man
              </p>
            </div>
          </Link>

{/* 
          <div className="blogCard flex-col flex">
            <div className="blogCardImageContainer"></div>

            <div className="blogCardContents"></div>
          </div> */}
      
        </section>
      </main>
      <Footer />
    </div>
  );
}
