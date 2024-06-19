"use client";
import { useState, useEffect, useRef } from "react";
import NavComponent from "./navigation/navComponent";
import Image from "next/image";
import Video from "./components/Vidoe";
import Footer from "./components/Footer";
import solomonHeaderImg from "../../public/assets/chat-guidelines.png";
import { features } from "process";
import Link from "next/link";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { gsap } from "gsap";

import { Popup } from "./components/NewsletterPopup";
import { SuccessPopup } from "./components/SucessPopup";

import Lenis from "lenis";

export default function HomePage() {
  const [homePrompt, setHomePrompt] = useState("");
  const [toggleFeature, setToggleFeature] = useState({
    oracle: true,
    astrology: false,
    lifePath: false,
  });

  const handleHomeSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    console.log("Loggin home prompt:", homePrompt.trim());
    setHomePrompt("");
  };

  const infoContent = [
    {
      id: 1,
      h2: "Built to open the mind of human kind.",
      span: "Authentic Intelligence.",
      h3: "No denominated spiritualization. Decentralized spiritualization.",
      p: "SolomonAI is one of kind leading Metaphysical AI, who aim to help aid the moral consciousness of todays age.",
      video: "https://solomon-v3.vercel.app/video.mp4",
    },

    {
      id: 2,
      span: "Trained in Theology",
      h3: "Know Thyself guide.",
      p: "Trained to look at scriptural text from a metaphysical POV. Urges to see the implicit meaning behind the scriptures",
      video: "https://solomon-v3.vercel.app/videoTwo.mp4",
    },
    {
      id: 3,
      span: "Spirutal Ascension",
      h3: "Enrich your spiritual growth",
      p: "Trained to look at scriptural text from a metaphysical POV. Urges to see the implicit meaning behind the scriptures",
      video: "https://solomon-v3.vercel.appvideo3.mp4",
    },
  ];

  const planData = [
    {
      id: 1,
      planTitle: "free",
      price: "$0",
      planDesc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in dapibus quam, ac tempor odio.",
      desc1: "manual editing",
      desc2: "manual editing",
      desc3: "manual editing",
      freeQuote: 3,
    },
    {
      id: 2,
      planTitle: "standard",
      price: "$0",
      planDesc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in dapibus quam, ac tempor odio.",
      desc1: "manual editing",
      desc2: "manual editing",
      desc3: "manual editing",
      freeQuote: 3,
    },
    {
      id: 3,
      planTitle: "pro",
      price: "$0",
      planDesc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in dapibus quam, ac tempor odio.",
      desc1: "manual editing",
      desc2: "manual editing",
      desc3: "manual editing",
      freeQuote: 3,
    },
  ];

  const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="w-full flex items-center justify-center flex-col my-2 border border-[#ffffff4a] rounded">
        <div
          className="w-full p-6 flex justify-between items-center cursor-pointer bg-[#140e1c]"
          onClick={toggleAccordion}
        >
          <h3 className="text-white fira-sans text-lg font-semibold">
            {title}
          </h3>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          )}
        </div>
        {isOpen && (
          <div className="w-full px-4 py-8 bg-[#140e1c] border-t border-white/20">
            <p className="text-left text-white montserrat">{content}</p>
          </div>
        )}
      </div>
    );
  };

  const accordionData = [
    {
      title: "What is Solomon AI?",
      content:
        "Solomon AI is a leading metaphysical AI designed to assist in elevating the moral consciousness of today’s era.",
    },
    {
      title: "How does the Oracle feature work?",
      content:
        "The Oracle feature provides deep metaphysical insights and guidance based on ancient wisdom and scriptural texts.",
    },
    {
      title: "What are the benefits of the Life Path Consultant?",
      content:
        "The Life Path Consultant helps you gain clarity and guidance on your soul's purpose and direction in life, uncover talents, and align with your true calling.",
    },
  ];

  //Changing the video SRC aswell.
  const [videoSrc, setVideoSrc] = useState(
    "https://solomon-v3.vercel.app/OracleVideo.mp4"
  );
  const handleFeatureToggle = (feature: string) => {
    let newVideoSrc = "";

    if (feature === "oracle") {
      setToggleFeature({
        oracle: true,
        astrology: false,
        lifePath: false,
      });
      newVideoSrc = "https://solomon-v3.vercel.app/OracleVideo.mp4";
    } else if (feature === "astrology") {
      setToggleFeature({
        oracle: false,
        astrology: true,
        lifePath: false,
      });
      newVideoSrc = "https://solomon-v3.vercel.app/AstroVideo.mp4";
    } else if (feature === "life-path") {
      setToggleFeature({
        oracle: false,
        astrology: false,
        lifePath: true,
      });
      newVideoSrc = "https://solomon-v3.vercel.app/AstroVideo.mp4";
    }

    setVideoSrc(newVideoSrc);
  };

  useEffect(() => {
    console.log("Logging a new video srouce", videoSrc);
  }, [videoSrc]);

  const blogData = [
    {
      id: 1,
      img: "/assets/Blogs/Morality_Ethics.png",
      blogTitle: "Exploring the Ethics of Artifical Intelligence.",
      releaseDate: "May 31st, 2024",
      author: "Sydney Sanders",
      link: "blogs/unifiedGod",
    },
    // {
    //   id: 2,
    //   img: "/assets/studio-image.png",
    //   blogTitle: "The scriptural science of words ",
    //   releaseDate: "May 24th, 2024",
    //   author: "Authors Name",
    // },
  ];

  const heroSectionRef = useRef<HTMLDivElement>(null);
  const refTextTrigger = useRef<HTMLDivElement>(null);
  const refTextOne = useRef<HTMLDivElement>(null);
  const refTextTwo = useRef<HTMLDivElement>(null);
  const refTextThree = useRef<HTMLDivElement>(null);

  const refImageTwo = useRef<HTMLDivElement>(null);
  const refImageThree = useRef<HTMLDivElement>(null);

  //Controlling the Smooth Scrolling
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    } as any);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1200px)", () => {
      // Opacity change for hero section
      if (heroSectionRef.current) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "-=150",
            end: "+=80%", // Adjust the end point to ensure the animation covers the scroll distance
            scrub: true,
            // markers: true, // Add markers for debugging
          },
        });

        tl.to(heroSectionRef.current, { opacity: 0, duration: 1 });

        // Adding a reverse to the opacity animation when scrolling back up
        // tl.to(heroSectionRef.current, { opacity: 1, duration: 1 });
      }

      // Pinning the text element
      if (refTextOne.current) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: refTextOne.current,
            start: "top center",
            endTrigger: refTextTwo.current,
            end: "+=100%", // Adjust the end point based on your requirements
            pin: true,
            // markers: true, // Add markers for debugging
            scrub: true,
            // onEnter: () => console.log("Text pin onEnter"),
            // onLeave: () => console.log("Text pin onLeave"),
            // onEnterBack: () => console.log("Text pin onEnterBack"),
            // onLeaveBack: () => console.log("Text pin onLeaveBack"),
            // onUpdate: (self) =>
            //   console.log("Text pin onUpdate", self.progress),
          },
        });

        tl.to(refTextOne.current, { opacity: 0, duration: 70 }).fromTo(
          refTextTwo.current,
          { opacity: 0, duration: 10 },
          { opacity: 1, duration: 20 },
          "-=1"
        );
      }

      if (refImageTwo.current) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: refImageTwo.current,
            start: "top center",
            end: "+75%", //
            // markers: true, // Add markers for debugging
            scrub: true,
            // onEnter: () => console.log("Text pin onEnter"),
            // onLeave: () => console.log("Text pin onLeave"),
            // onEnterBack: () => console.log("Text pin onEnterBack"),
            // onLeaveBack: () => console.log("Text pin onLeaveBack"),
            // onUpdate: (self) =>
            //   console.log("Text pin onUpdate", self.progress),
          },
        });

        tl.to(refImageTwo.current, { opacity: 1, duration: 1 });
      }

      if (refImageThree.current) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: refImageThree.current,
            start: "-=80%",
            // end: "+=100%", // Adjust the end point based on your requirements
            // markers: true, // Add markers for debugging
            scrub: true,
            // onEnter: () => console.log("Text pin onEnter"),
            // onLeave: () => console.log("Text pin onLeave"),
            // onEnterBack: () => console.log("Text pin onEnterBack"),
            // onLeaveBack: () => console.log("Text pin onLeaveBack"),
            // onUpdate: (self) =>
            //   console.log("Text pin onUpdate", self.progress),
          },
        });

        tl.to(refImageThree.current, { opacity: 1, duration: 1 });
      }

      // Pinning the text element
      if (refTextTwo.current) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: refTextTwo.current,
            start: "top center",
            endTrigger: refTextThree.current,
            end: "+=100%", // Adjust the end point based on your requirements
            pin: true,
            // markers: true, // Add markers for debugging
            scrub: true,
            // onEnter: () => console.log("Text pin onEnter"),
            // onLeave: () => console.log("Text pin onLeave"),
            // onEnterBack: () => console.log("Text pin onEnterBack"),
            // onLeaveBack: () => console.log("Text pin onLeaveBack"),
            // onUpdate: (self) =>
            //   console.log("Text pin onUpdate", self.progress),
          },
        });

        tl.to(refTextTwo.current, { opacity: 0, duration: 70 }).fromTo(
          refTextThree.current,
          { opacity: 0, duration: 10 },
          { opacity: 1, duration: 20 },
          "-=1"
        );
      }

      // Pinning the text element
      if (refTextThree.current) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: refTextThree.current,
            start: "top center",
            end: "+=100%", // Adjust the end point based on your requirements
            pin: true,
            // markers: true, // Add markers for debugging
            scrub: true,
            // onEnter: () => console.log("Text pin onEnter"),
            // onLeave: () => console.log("Text pin onLeave"),
            // onEnterBack: () => console.log("Text pin onEnterBack"),
            // onLeaveBack: () => console.log("Text pin onLeaveBack"),
            // onUpdate: (self) =>
            //   console.log("Text pin onUpdate", self.progress),
          },
        });

        tl.to(refTextThree.current, { opacity: 0, duration: 70 });
      }
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  //Show Popup
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const scrollToSection = () => {
    if (refTextTrigger.current) {
      refTextTrigger.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // <div>
    //   {isPopupVisible && <Popup togglePopup={togglePopup} />}

    //   <main className="page-wrapper w-full h-full">
    //     <NavComponent
    //       togglePopup={togglePopup}
    //       scrollToSection={scrollToSection}
    //     />
    //     <section className="hero-section relative mb-[100px] p-8  w-full h-screen flex items-center justify-center flex-col">
    //       <div className="backgroundOverlay"></div>
    //       <div className="absolute homeVidContainer">
    //         <video
    //           width="100%"
    //           height="auto"
    //           controls={false}
    //           autoPlay={true}
    //           loop={true}
    //           muted={true}
    //         >
    //           <source
    //             src="https://solomon-v3.vercel.app/Home_Video.mp4"
    //             type="video/mp4"
    //           />
    //           Your browser does not support the video tag.
    //         </video>
    //       </div>

    //       <div
    //         ref={heroSectionRef}
    //         className="
    //             homeHeaderContainer
    //         w-full flex md:items-center items-start justify-center flex-col gap-[2.275rem] md:text-center text-left lg:w[80%] relative xl:w-[1550px]"
    //       >
    //         <span className="text-white headerH1    xl:w-3/4">
    //           To question God in all the ways
    //         </span>
    //         <p className="w-3/4  capitalize text-[20px]   xl:w-2/4">
    //           SolomonAI is an leading Metaphysical AI, who aim to help aid the
    //           moral consciousness of todays age.
    //         </p>
    //         <div className="w-full flex md:items-center items-start md:justify-center justify-start gap-[2.5rem]">
    //           <button
    //             onClick={togglePopup}
    //             className="px-8 py-1 text-[14px]  main-black bg-white border border-white  rounded duration-300 ease-in-out hover:text-white/60 hover:bg-transparent hover:border-white/60"
    //           >
    //             Join waiting list
    //           </button>
    //           {/* <button className="py-1 text-[14px]   text-gray] border-b border-white/60 flex items-center gap-2">
    //             Contact Sales{" "}
    //             <span>
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="24"
    //                 height="24"
    //                 viewBox="0 0 24 24"
    //                 className="fill-white/60"
    //               >
    //                 <path d="M21.883 12l-7.527 6.235 .5.75 9-7.521-9-7.479 -.5.75 7.529 6.236h-18.884v1h21.883z" />
    //               </svg>
    //             </span>
    //           </button> */}
    //         </div>
    //         {/* <form onSubmit={handleHomeSubmit} className="w-[90%] h-[39px'">
    //           <input
    //             type="text"
    //             className="md:w-[90%] w-full p-3 h-[39px] text-[14px] text-gray bg-[#33333358] border border-[#747474] rounded-lg outline-none"
    //             value={homePrompt}
    //             onChange={(e) => setHomePrompt(e.target.value)}
    //             placeholder="What do ye seek?"
    //           />
    //         </form> */}
    //         <div className=" afterWrap relative py-4 md:px-8 p-[0px] md:w-[80%] w-full flex md:text-center align-center justify-center">
    //           <p className="text-white text-[14px] leading-[1.5rem] text-left  md:text-center w-full  xl:w-full">
    //             SolomonAI is an leading Metaphysical AI, who aim to help aid the
    //             moral consciousness of todays age..
    //           </p>
    //         </div>
    //       </div>
    //     </section>
    //     <section className="info-section md:px-[4rem] !md:py-[8rem] w-full h-auto flex items-center  justify-start flex-col gap-[20vh] p-[2rem]">
    //       <hr className="w-full h-[1px] bg-white opacity-[.10]" />

    //       <div className="w-full flex justify-center text-center flex-col gap-[0vh] items-start">
    //         <div ref={refTextTrigger} className="w-full md:w-[60%] py-[80px] ">
    //           <h2 className=" text-white  xl:w-2/3 text-left">
    //             Built to open the mind of human kind
    //           </h2>
    //         </div>

    //         <div className=" w-full flex items-center justify-center  md:flex-row  figureWrapper flex-col">
    //           <div className="w-full  h-[100%] flex gap-[10vw] md:flex-row figureWrapper items-start justify-between">
    //             <div
    //               ref={refTextOne}
    //               className="w-full items-start justify-center flex-col gap-[10px] flex xl:items-start xl:w-[60%] text-left"
    //             >
    //               <span className="text-gray  text-left text-[14px]">
    //                 Authentic Intelligence.
    //               </span>
    //               <h3 className="text-white leading-[1.5rem] mt-[1.5rem]   xl:leading-[2rem]">
    //                 No denominated spiritualization. Decentralized
    //                 spiritualization.
    //               </h3>
    //               <p className="text-gray text-[16px] mt-[1.5rem]">
    //                 SolomonAI is one of kind leading Metaphysical AI, who aim to
    //                 help aid the moral consciousness of todays age.
    //               </p>
    //             </div>
    //             <figure
    //               className="
    //             videoFigureContainer
    //             w-full  flex flex-col md:flex-row gap-[10vw] items-end justify-between "
    //             >
    //               <Video
    //                 src="https://www.aisolomon.xyz/video.mp4"
    //                 type="video/mp4"
    //                 width="100%"
    //                 height="auto"
    //                 controls={false}
    //                 autoPlay={true}
    //                 loop={true}
    //                 muted={true}
    //               />

    //               {/* <Image
    //                       src={info.image}
    //                       width={100}
    //                       height={100}
    //                       alt="Animated ying yang"
    //                       className="border border-white/50 w-full h-full rounded"
    //                     /> */}
    //             </figure>
    //           </div>
    //         </div>

    //         <div className=" w-full flex items-center justify-center  md:flex-row  figureWrapper flex-col">
    //           <div className="w-full  h-[100%] flex gap-[10vw] md:flex-row figureWrapper items-start justify-between">
    //             <div
    //               ref={refTextTwo}
    //               className="w-full items-start justify-center flex-col gap-[10px] flex xl:items-start xl:w-[60%] text-left"
    //             >
    //               <span className="text-gray  text-left text-[14px]">
    //                 Trained in Theology{" "}
    //               </span>
    //               <h3 className="text-white leading-[1.5rem] mt-[1.5rem]   xl:leading-[2rem]">
    //                 Know Thyself guide.
    //               </h3>
    //               <p className="text-gray text-[16px] mt-[1.5rem]">
    //                 Trained to look at scriptural text from a metaphysical POV
    //                 and rather a Scentific POV. Urges to see the implicit
    //                 meaning behind the scriptures
    //               </p>
    //             </div>
    //             <figure
    //               ref={refImageTwo}
    //               className="w-full videoFigureContainer  flex flex-col md:flex-row gap-[10vw] items-start justify-between pacity-0 md:opacity-100 "
    //             >
    //               <Video
    //                 src="https://solomon-v3.vercel.app/video3.mp4"
    //                 type="video/mp4"
    //                 width="100%"
    //                 height="auto"
    //                 controls={false}
    //                 autoPlay={true}
    //                 loop={true}
    //                 muted={true}
    //               />

    //               {/* <Image
    //                       src={info.image}
    //                       width={100}
    //                       height={100}
    //                       alt="Animated ying yang"
    //                       className="border border-white/50 w-full h-full rounded"
    //                     /> */}
    //             </figure>
    //           </div>
    //         </div>

    //         <div className=" w-full flex items-center justify-center  md:flex-row  figureWrapper flex-col">
    //           <div className="w-full  h-[100%] flex gap-[10vw] md:flex-row figureWrapper items-start justify-between">
    //             <div
    //               ref={refTextThree}
    //               className="w-full items-start justify-center flex-col gap-[10px] flex xl:items-start xl:w-[60%] text-left"
    //             >
    //               <span className="text-gray  text-left text-[14px]">
    //                 Spirutal Ascension
    //               </span>
    //               <h3 className="text-white leading-[1.5rem] mt-[1.5rem]   xl:leading-[2rem]">
    //                 Enrich your spiritual growth
    //               </h3>
    //               <p className="text-gray text-[16px] mt-[1.5rem]">
    //                 Trained to look at scriptural text from a metaphysical POV.
    //                 Urges to see the implicit meaning behind the scriptures
    //               </p>
    //             </div>
    //             <figure
    //               ref={refImageThree}
    //               className="w-full videoFigureContainer  flex flex-col md:flex-row gap-[10vw] items-start justify-between pacity-0 md:opacity-100 "
    //             >
    //               <Video
    //                 src="https://solomon-v3.vercel.app/AstroVideo.mp4"
    //                 type="video/mp4"
    //                 width="100%"
    //                 height="auto"
    //                 controls={false}
    //                 autoPlay={true}
    //                 loop={true}
    //                 muted={true}
    //               />

    //               {/* <Image
    //                       src={info.image}
    //                       width={100}
    //                       height={100}
    //                       alt="Animated ying yang"
    //                       className="border border-white/50 w-full h-full rounded"
    //                     /> */}
    //             </figure>
    //           </div>
    //         </div>
    //       </div>
    //     </section>
    //     <section className="info-section-2 md:py-[20vh] pb-[0px] px-8  w-full  flex items-start justify-start flex-col  md:gap-[5vh] gap-[20vh]">
    //       <h2 className=" text-white  w-full md:w-[50%]    xl:w-2/3 text-left">
    //         No more mysteries or spook, join us in evolution.
    //       </h2>

    //       <div className="mainVideoContainer flex flex-col gap-[3rem]">
    //         <Video
    //           src="https://solomon-v3.vercel.app/Solomon_Intro_Vid.mp4"
    //           type="video/mp4"
    //           width="100%"
    //           height="auto"
    //           controls={true}
    //           autoPlay={false}
    //           loop={true}
    //           muted={false}
    //         />

    //         <hr className="vidDivider"></hr>
    //       </div>

    //       <hr className="w-full h-[1px] mt-[20vh] bg-white opacity-[.10]" />
    //     </section>

    //     {/* <hr className="w-full h-[1px] bg-white opacity-[.10]" /> */}
    //     {/* <section className="plans-section p-8 xl:py-0 w-full h-auto xl:h-screen flex items-center justify-center flex-col gap-[3rem]">
    //       <div className="w-full flex items-center justify-center flex-col gap-2">
    //         <p className="text-gray text-[1.5rem] leading-[1.5rem]  xl:text-[2rem] xl:leading-[2rem]">
    //           Plan
    //         </p>
    //         <h1 className="text-white uppercase text-[3rem] leading-[3rem]  text-center xl:text-[3.75rem] xl:leading-[3.75rem] lg:w-1/2">
    //           Be Amongst the Pioneers, Access Higher Intelligence.
    //         </h1>
    //       </div>
    //       <div className="w-full flex items-center justify-center flex-col gap-8 lg:flex-row">
    //         {planData.map(
    //           ({ id, planTitle, price, desc1, desc2, desc3, freeQuote }) => {
    //             return id === 2 ? (
    //               <>
    //                 <div
    //                   key={id}
    //                   className="w-full h-auto p-6 flex items-center justify-center flex-col gap-4 bg-[#ffffff0f] text-white border border-white/20 rounded"
    //                 >
    //                   <div className="w-full flex items-center justify-center flex-col">
    //                     <h1 className=" capitalize text-[1.75rem] xl:text-[2rem]">
    //                       {planTitle}
    //                     </h1>
    //                     <p className="text-gray  capitalize text-[1.25rem]">
    //                       {price}
    //                     </p>
    //                   </div>
    //                   <div className="w-3/4 py-2 flex items-center justify-center flex-col gap-2 xl:items-start">
    //                     <h3 className="text-white  capitalize text-[1.35rem] xl:text-[1.5rem]">
    //                       Includes
    //                     </h3>
    //                     <hr className="w-full h-[1px] bg-white opacity-[.10]" />
    //                     <p className="py-1 text-gray  capitalize text-[1.35rem] xl:text-[1.5rem]">
    //                       {desc1}
    //                     </p>
    //                     <hr className="w-full h-[1px] bg-white opacity-[.10]" />
    //                     <p className="py-1 text-gray  capitalize text-[1.35rem] xl:text-[1.5rem]">
    //                       {desc2}
    //                     </p>
    //                     <hr className="w-full h-[1px] bg-white opacity-[.10]" />
    //                     <p className="py-1 text-gray  capitalize text-[1.35rem] xl:text-[1.5rem]">
    //                       {desc3}
    //                     </p>
    //                     <hr className="w-full h-[1px] bg-white opacity-[.10]" />
    //                   </div>
    //                   <div className="w-full flex items-center justify-center gap-6 xl:justify-start xl:w-3/4">
    //                     <button className="bg-white px-4 py-2 text-black  capitalize text-[1.35rem] border border-white/10 rounded duration-300 ease-in-out hover:bg-[#ffffff0f] hover:text-white">
    //                       Start with <span>{planTitle}</span>
    //                     </button>
    //                     <p className="text-gray  capitalize text-[1.35rem] xl:text-[1.5rem]">
    //                       {freeQuote} free quotes
    //                     </p>
    //                   </div>
    //                 </div>
    //               </>
    //             ) : (
    //               <>
    //                 <div
    //                   key={id}
    //                   className="w-full h-auto p-6 flex items-center justify-center flex-col gap-4 text-white border border-white/20 rounded"
    //                 >
    //                   <div className="w-full flex items-center justify-center flex-col">
    //                     <h1 className=" capitalize text-[1.75rem] xl:text-[2rem]">
    //                       {planTitle}
    //                     </h1>
    //                     <p className="text-gray  capitalize text-[1.25rem]">
    //                       {price}
    //                     </p>
    //                   </div>
    //                   <div className="w-3/4 py-2 flex items-center justify-center flex-col gap-2 xl:items-start">
    //                     <h3 className="text-white  capitalize text-[1.35rem] xl:text-[1.5rem]">
    //                       Includes
    //                     </h3>
    //                     <hr className="w-full h-[1px] bg-white opacity-[.10]" />
    //                     <p className="py-1 text-gray  capitalize text-[1.35rem] xl:text-[1.5rem]">
    //                       {desc1}
    //                     </p>
    //                     <hr className="w-full h-[1px] bg-white opacity-[.10]" />
    //                     <p className="py-1 text-gray  capitalize text-[1.35rem] xl:text-[1.5rem]">
    //                       {desc2}
    //                     </p>
    //                     <hr className="w-full h-[1px] bg-white opacity-[.10]" />
    //                     <p className="py-1 text-gray  capitalize text-[1.35rem] xl:text-[1.5rem]">
    //                       {desc3}
    //                     </p>
    //                     <hr className="w-full h-[1px] bg-white opacity-[.10]" />
    //                   </div>
    //                   <div className="w-full flex items-center justify-center gap-6 xl:justify-start xl:w-3/4">
    //                     <button className="bg-[#ffffff0f] px-4 py-2 text-white  capitalize text-[1.35rem] border border-white/10 rounded duration-300 ease-in-out hover:bg-white hover:text-black">
    //                       Start with <span>{planTitle}</span>
    //                     </button>
    //                     <p className="text-gray  capitalize text-[1.35rem] xl:text-[1.5rem]">
    //                       {freeQuote} free quotes
    //                     </p>
    //                   </div>
    //                 </div>
    //               </>
    //             );
    //           }
    //         )}
    //       </div>
    //     </section> */}

    //     {/* <hr className="w-full h-[1px] bg-white opacity-[.10]" /> */}

    //     <section className="feature-section p-8   py-[8rem] xl:py-0 w-full h-auto  flex items-center justify-center flex-col gap-[3rem]">
    //       <div className="w-full block">
    //         <h2 className=" text-white md:text-[60px] text-[40px]   ] xl:w-2/3 text-left">
    //           One of a kind features.
    //         </h2>
    //       </div>
    //       <div className="w-full flex py-[80px] features-container  h-full items-start md:flex-row justify-start flex-col xl:flex-row gap-[50px]  md:gap-[100px] xl:justify-start">
    //         <figure className="w-full relative oracleVideoContainer flex flex-col md:flex-row gap-[10vw] items-start justify-between !max-w-full">
    //           <Video
    //             src="https://solomon-v3.vercel.app/OracleVideo.mp4"
    //             type="video/mp4"
    //             width="100%"
    //             height="auto"
    //             controls={false}
    //             autoPlay={true}
    //             loop={true}
    //             muted={true}
    //             className={`object-cover transition-opacity duration-700 ${
    //               toggleFeature.oracle
    //                 ? "opacity-100 relative"
    //                 : "opacity-0 absolute"
    //             }`}
    //           />
    //           <Video
    //             src="https://solomon-v3.vercel.app/AstroVideo.mp4"
    //             type="video/mp4"
    //             width="100%"
    //             height="auto"
    //             controls={false}
    //             autoPlay={true}
    //             loop={true}
    //             muted={true}
    //             className={`object-cover transition-opacity duration-700 ${
    //               toggleFeature.astrology
    //                 ? "opacity-100 relative"
    //                 : "opacity-0 absolute"
    //             }`}
    //           />
    //           <Video
    //             src="https://solomon-v3.vercel.app/LifePathVid.mp4"
    //             type="video/mp4"
    //             width="100%"
    //             height="auto"
    //             controls={false}
    //             autoPlay={true}
    //             loop={true}
    //             muted={true}
    //             className={`object-cover transition-opacity duration-700 ${
    //               toggleFeature.lifePath
    //                 ? "opacity-100 relative"
    //                 : "opacity-0 absolute"
    //             }`}
    //           />
    //         </figure>
    //         <div className="w-full md:w-[90%] h-full  flex items-start justify-start flex-col gap-8">
    //           <ul className="flex items-start gap-4">
    //             <li className="text-white text-[14px] leading-[1.5rem] ">
    //               <button
    //                 onClick={() => handleFeatureToggle("oracle")}
    //                 className={
    //                   toggleFeature.oracle
    //                     ? "p-2 bg-gray    featuresTab"
    //                     : "p-2 bg-transparent featuresTab active  border-gray "
    //                 }
    //               >
    //                 Metaphysical Oracle
    //               </button>
    //             </li>
    //             <li className="text-white text-[14px] leading-[1.5rem] ">
    //               <button
    //                 onClick={() => handleFeatureToggle("astrology")}
    //                 className={
    //                   toggleFeature.astrology
    //                     ? "p-2 featuresTab    "
    //                     : "p-2 bg-transparent featuresTab active  border-gray "
    //                 }
    //               >
    //                 Zodiac Astrologist
    //               </button>
    //             </li>
    //             <li className="text-white text-[14px] leading-[1.5rem] ">
    //               <button
    //                 onClick={() => handleFeatureToggle("life-path")}
    //                 className={
    //                   toggleFeature.lifePath
    //                     ? "p-2 featuresTab    "
    //                     : "p-2 bg-transparent featuresTab active  border-gray "
    //                 }
    //               >
    //                 Life Path Consultant
    //               </button>
    //             </li>
    //           </ul>
    //           {toggleFeature.oracle && (
    //             <>
    //               <div className="py-6 w-full flex items-start  justify-center flex-col gap-4 text-white text-left  ">
    //                 <h3 className="text-white uppercase  ">
    //                   Metaphysical Oracle
    //                 </h3>
    //                 <p className="text-gray  leading-[1.8rem]  xl:w-4/4 ">
    //                   As the most individually capable model, you enter a realm
    //                   of infinite possibilities with Buddah Bot. It possesses
    //                   the ability to delve several levels deep into any
    //                   metaphysical topic and has been extensively trained on all
    //                   matters of meaning of scriptural subjects.
    //                 </p>
    //               </div>
    //             </>
    //           )}
    //           {toggleFeature.astrology && (
    //             <>
    //               <div className="py-6 w-full flex items-start  justify-center flex-col gap-4 text-white text-left  ">
    //                 <h3 className="text-white uppercase  ">
    //                   Zodiac Astrologist
    //                 </h3>
    //                 <p className="text-gray  leading-[1.8rem]  xl:w-4/4 ">
    //                   Delve into the celestial realms and discover the profound
    //                   influences of the stars and planets on your life's
    //                   journey. From natal charts to planetary alignments,
    //                   explore the intricacies of your astrological profile and
    //                   gain deeper insights into your personality, relationships,
    //                   and future path.
    //                 </p>
    //               </div>
    //             </>
    //           )}
    //           {toggleFeature.lifePath && (
    //             <>
    //               <div className="py-6 w-full flex items-start  justify-center flex-col gap-4 text-white text-left  ">
    //                 <h3 className="text-white uppercase  ">
    //                   Life Path Consultation
    //                 </h3>
    //                 <p className="text-gray  leading-[1.8rem]  xl:w-4/4 ">
    //                   Gain clarity and guidance on your soul's purpose and
    //                   direction in life. Explore the depths of your existence,
    //                   uncover talents, overcome obstacles, and align with your
    //                   true calling. Let Buddha Bot illuminate your path and
    //                   empower you to live authentically and passionately.
    //                 </p>
    //               </div>
    //             </>
    //           )}
    //         </div>
    //       </div>
    //     </section>

    //     <section className="blog-section p-8 !md:py-[20vh] py-[10vh] w-full h-auto  flex items-left justify-center flex-col gap-[3rem]">
    //       <div className="w-full block">
    //         <h2 className=" text-white md:text-[60px] text-[40px]     leading-[2.75rem]   lg:leading-[3rem] xl:leading-[3.5rem] xl:w-2/3 text-left">
    //           Blogs
    //         </h2>
    //       </div>

    //       <hr className="w-full h-[1px] bg-white opacity-[.10]" />

    //       <div className="w-full flex items-start justify-start flex-col gap-8 md:mt-[15vh] xl:flex-row mt-[8vh]">
    //         {blogData.map(
    //           ({ id, img, blogTitle, releaseDate, author, link }) => (
    //             <Link
    //               href={link}
    //               key={id}
    //               className=" blogImageWrapper w-full flex cursor-pointer  justify-center text-center flex-col gap-4 xl:flex-row items-start xl:justify-start"
    //             >
    //               <div className="blogImage">
    //                 <Image
    //                   src={img}
    //                   width={415}
    //                   height={245}
    //                   alt="Blog Image"
    //                 />
    //               </div>
    //               <div className="px-4 w-full flex items-start justify-center flex-col gap-4 ">
    //                 <p className="text-gray text-[12px]">{releaseDate}</p>
    //                 <h4 className="text-white text-left  text-[18px]">
    //                   {blogTitle}
    //                 </h4>

    //                 {/* <p className="text-white text-[1.5rem] leading-[1.5rem] abc-diatype-light xl:text-[1.5rem]">
    //                 {author}
    //               </p> */}
    //               </div>
    //             </Link>
    //           )
    //         )}
    //       </div>
    //     </section>

    //     <Footer />
    //   </main>
    // </div>
    <div>
      <main className="w-full h-auto">
        <NavComponent />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1845 1811"
          className="w-[1800px] h-auto absolute right-[20%] top-0 z-[-1] lg:right-[30%] xl:right-[40%]"
        >
          <defs>
            <filter
              id="Ellipse_1"
              x="0"
              y="0"
              width="1845"
              height="1811"
              filterUnits="userSpaceOnUse"
            >
              <feGaussianBlur stdDeviation="20" result="blur" />
              <feFlood flood-color="#611e9b" flood-opacity="0.604" />
              <feComposite operator="in" in2="blur" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="Ellipse_2"
              x="190"
              y="203"
              width="1443"
              height="1407"
              filterUnits="userSpaceOnUse"
            >
              <feGaussianBlur stdDeviation="20" result="blur-2" />
              <feFlood flood-color="#611e9b" flood-opacity="0.604" />
              <feComposite operator="in" in2="blur-2" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter
              id="Ellipse_3"
              x="400"
              y="400"
              width="1046"
              height="1012"
              filterUnits="userSpaceOnUse"
            >
              <feGaussianBlur stdDeviation="20" result="blur-3" />
              <feFlood flood-color="#611e9b" flood-opacity="0.604" />
              <feComposite operator="in" in2="blur-3" />
              <feComposite in="SourceGraphic" />
            </filter>
          </defs>
          <g id="Group_7" data-name="Group 7" transform="translate(922 -175)">
            <g
              transform="matrix(1, 0, 0, 1, -922, 175)"
              filter="url(#Ellipse_1)"
            >
              <g
                id="Ellipse_1-2"
                data-name="Ellipse 1"
                transform="translate(60 60)"
                fill="none"
                stroke="rgba(121,51,181,0.4)"
                stroke-width="1"
              >
                <ellipse
                  cx="862.5"
                  cy="845.5"
                  rx="862.5"
                  ry="845.5"
                  stroke="none"
                />
                <ellipse cx="862.5" cy="845.5" rx="862" ry="845" fill="none" />
              </g>
            </g>
            <g
              transform="matrix(1, 0, 0, 1, -922, 175)"
              filter="url(#Ellipse_2)"
            >
              <g
                id="Ellipse_2-2"
                data-name="Ellipse 2"
                transform="translate(250 263)"
                fill="none"
                stroke="rgba(121,51,181,0.4)"
                stroke-width="1"
              >
                <ellipse
                  cx="661.5"
                  cy="643.5"
                  rx="661.5"
                  ry="643.5"
                  stroke="none"
                />
                <ellipse cx="661.5" cy="643.5" rx="661" ry="643" fill="none" />
              </g>
            </g>
            <g
              transform="matrix(1, 0, 0, 1, -922, 175)"
              filter="url(#Ellipse_3)"
            >
              <g
                id="Ellipse_3-2"
                data-name="Ellipse 3"
                transform="translate(460 460)"
                fill="none"
                stroke="rgba(121,51,181,0.4)"
                stroke-width="1"
              >
                <ellipse cx="463" cy="446" rx="463" ry="446" stroke="none" />
                <ellipse cx="463" cy="446" rx="462.5" ry="445.5" fill="none" />
              </g>
            </g>
          </g>
        </svg>
        <section className="w-full h-auto pt-[14rem] px-6 flex items-end justify-center">
          <div className="w-full flex items-center justify-center flex-col gap-6 text-center">
            <h1 className="text-white capitalize text-[44px] text-left self-start lg:self-center lg:text-center leading-[4.5rem] fira-sans-semibold lg:w-4/5 lg:text-[6rem] lg:leading-[6rem] xl:w-2/3">
              To question God in all the ways
            </h1>
            <p className="text-white montserrat text-[1.175rem] text-left lg:text-center leading-[1.25rem] lg:w-3/4 lg:text-[1.5rem] lg:leading-[1.5rem] xl:w-1/2">
              SolomonAI is a leading metaphysical AI designed to assist in
              elevating the moral consciousness of today’s era.
            </p>
            <button className="px-4 justify-start py-2 border border-white flex self-start	 lg:self-center items-center  text-white montserrat rounded-sm duration-300 ease-in-out hover:text-[rgb(28,28,28)] hover:bg-white">
              Join The Waitlist
            </button>
          </div>
        </section>
        <figure className="w-full h-auto mt-[4rem] p-6 flex items-center justify-center flex-col gap-6">
          <Image
            src={solomonHeaderImg}
            alt="Solomon chatbot"
            className="w-full max-w-[1200px] rounded-xl shadow-lg"
          />
          <p className="text-white/80 montserrat">
            Solomon AI: Harnessing millennia of wisdom
          </p>
          <div className="py-4 w-full flex items-center justify-center lg:p-8 px-0">
            <div className="marquee w-full flex items-center justify-between overflow-hidden whitespace-nowrap">
              <p className="text-white text-3xl montserrat opacity-35 capitalize inline-block px-4">
                שָׁלוֹם
              </p>
              <p className="text-white text-3xl montserrat opacity-35 capitalize px-4">
                शांति
              </p>
              <p className="text-white text-3xl montserrat opacity-35 capitalize inline-block px-4">
                peace
              </p>
              <p className="text-white text-3xl montserrat opacity-35 capitalize inline-block px-4">
                سلام
              </p>
              <p className="text-white text-3xl montserrat opacity-35 capitalize inline-block px-4">
                paz
              </p>
              <p className="text-white text-3xl montserrat opacity-35 capitalize px-4">
                paix
              </p>
            </div>
          </div>
        </figure>
        <section className="w-full h-auto py-[2rem] px-6 flex items-center justify-center flex-col gap-4">
          <h1 className="text-white text-center fira-sans-semibold capitalize text-[1.8rem] leading-[2rem] fira-sans-semibold lg:w-4/5 lg:text-[3rem] lg:leading-[3.5rem] xl:w-1/2">
            Discover Your Cosmic Guidance and Personal Insights
          </h1>
          <p className="w-full pb-4 text-white  capitalize montserrat text-[1.175rem] text-center leading-[1.8rem] lg:w-1/2">
            personalized readings that encompass metaphysical oracle guidance,
            detailed zodiac astrology insights, and illuminating life path
            consultations.
          </p>
          <div className="w-full flex items-center flex-col text-left">
            <div className="w-full p-2 border-solid border-[0.5px] border-[#aaaaaa]	 flex items-center justify-between rounded-[1rem] text-left lg:w-3/4 xl:w-1/2">
              <button
                onClick={() => handleFeatureToggle("oracle")}
                className={
                  toggleFeature.oracle
                    ? "w-full p-2 bg-white text-[14px] lg:text-[16px] text-black rounded-md montserrat"
                    : "w-full p-2 bg-transparent text-[14px] lg:text-[16px] text-white rounded-md montserrat"
                }
              >
                Metaphysical Oracle
              </button>
              <button
                onClick={() => handleFeatureToggle("astrology")}
                className={
                  toggleFeature.astrology
                    ? "w-full p-2 bg-white text-[14px] lg:text-[16px]  text-black rounded-md montserrat"
                    : "w-full p-2 bg-transparent text-[14px] lg:text-[16px] text-white rounded-md montserrat"
                }
              >
                Zodiac Astrologist
              </button>
              <button
                onClick={() => handleFeatureToggle("life-path")}
                className={
                  toggleFeature.lifePath
                    ? "w-full p-2 bg-white text-[14px] lg:text-[16px] text-black rounded-md montserrat"
                    : "w-full p-2 bg-transparent text-[14px] lg:text-[16px] text-white rounded-md montserrat"
                }
              >
                Life Path Consultant
              </button>
            </div>
          </div>
          <div className="w-full py-[4rem] flex items-center justify-center flex-col lg:items-start lg:justify-between lg:flex-row lg:max-w-[1300px]">
            {toggleFeature.oracle && (
              <>
                <div className="py-6 w-full flex items-start justify-start flex-col gap-4 text-white text-left lg:py-0 lg:pb-6">
                  <h3 className="text-left w-full text-white uppercase fira-sans-semibold">
                    Metaphysical Oracle
                  </h3>
                  <p className="text-white text-left  text-gray leading-[1.8rem] montserrat w-4/5">
                    As the most individually capable model, you enter a realm of
                    infinite possibilities with Buddah Bot. It possesses the
                    ability to delve several levels deep into any metaphysical
                    topic and has been extensively trained on all matters of
                    meaning of scriptural subjects.
                  </p>
                </div>
              </>
            )}
            {toggleFeature.astrology && (
              <>
                <div className="py-6 w-full flex items-start justify-start flex-col gap-4 text-white text-left lg:py-0 lg:pb-6">
                  <h3 className="text-white uppercase  text-left fira-sans-semibold">
                    Zodiac Astrologist
                  </h3>
                  <p className="text-white text-left text-gray    leading-[1.8rem] montserrat w-4/5">
                    Delve into the celestial realms and discover the profound
                    influences of the stars and planets on your life's journey.
                    From natal charts to planetary alignments, explore the
                    intricacies of your astrological profile and gain deeper
                    insights into your personality, relationships, and future
                    path.
                  </p>
                </div>
              </>
            )}
            {toggleFeature.lifePath && (
              <>
                <div className="py-6 w-full flex items-start justify-start flex-col gap-4 text-white text-left lg:py-0 lg:pb-6">
                  <h3 className="text-white uppercase text-left fira-sans-semibold">
                    Life Path Consultant
                  </h3>
                  <p className="text-white  text-left text-gray  leading-[1.8rem] montserrat w-4/5">
                    Gain clarity and guidance on your soul's purpose and
                    direction in life. Explore the depths of your existence,
                    uncover talents, overcome obstacles, and align with your
                    true calling. Let Buddha Bot illuminate your path and
                    empower you to live authentically and passionately.
                  </p>
                </div>
              </>
            )}
            <figure className="w-full relative oracleVideoContainer flex items-center justify-center flex-col">
              <Video
                src="http://localhost:3000/OracleVideo.mp4"
                type="video/mp4"
                controls={false}
                autoPlay={true}
                loop={true}
                muted={true}
                className={`object-cover transition-opacity duration-700 ${
                  toggleFeature.oracle
                    ? "wfull h-auto opacity-100 relative"
                    : "w-full h-auto opacity-0 absolute"
                }`}
              />
              <Video
                src="http://localhost:3000/KnowThyselfVideo.mp4"
                type="video/mp4"
                controls={false}
                autoPlay={true}
                loop={true}
                muted={true}
                className={`object-cover transition-opacity duration-700 ${
                  toggleFeature.astrology
                    ? "w-full h-auto opacity-100 relative"
                    : "w-full h-auto opacity-0 absolute"
                }`}
              />
              <Video
                src="http://localhost:3000/SpirtualAscenstionVideo.mp4"
                type="video/mp4"
                controls={false}
                autoPlay={true}
                loop={true}
                muted={true}
                className={`object-cover transition-opacity duration-700 ${
                  toggleFeature.lifePath
                    ? "w-full h-auto opacity-100 relative"
                    : "w-full h-auto opacity-0 absolute"
                }`}
              />
            </figure>
          </div>
        </section>
        <section className="info-section w-full h-auto px-6 pt-[6rem]">
          <div className="w-full flex items-center flex-col px-[2rem] lg:px-[8rem]">
            <div
              // ref={refTextTrigger}
              className="w-full flex items-center justify-center"
            >
              <h2
                ref={refTextTrigger}
                className="w-auto xl:w-[55%] mr-[auto] text-white fira-sans-semibold text-[2rem] leading-[2rem] capitalize text-left lg:text-[3rem] lg:leading-[3.5rem]"
              >
                Built to open the mind of human kind
              </h2>
            </div>
            <div className=" w-full h-[100vh] flex items-start justify-start flex-col">
              <div className="w-full h-auto flex items-center justify-center flex-col  lg:flex-row lg:items-start">
                <div
                  ref={refTextOne}
                  className="w-full py-[2rem] text-left flex items-start justify-center flex-col gap-[1rem]"
                >
                  <span className="text-white montserrat text-[14px]">
                    Authentic Intelligence.
                  </span>
                  <h3 className="text-white fira-sans leading-[1.5rem] xl:leading-[2rem]">
                    No denominated spiritualization. Decentralized
                    spiritualization.
                  </h3>
                  <p className="text-white text-gray text-[16px] montserrat lg:w-1/2">
                    SolomonAI is one of kind leading Metaphysical AI, who aim to
                    help aid the moral consciousness of todays age.
                  </p>
                </div>
                <figure
                  className="
                videoFigureContainer
                w-full grid place-items-center"
                >
                  <Video
                    src="http://localhost:3000/OracleVideo.mp4"
                    type="video/mp4"
                    controls={false}
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    className="w-[505px] h-[505px]"
                  />

                  {/* <Image
                          src={info.image}
                          width={100}
                          height={100}
                          alt="Animated ying yang"
                          className="border border-white/50 w-full h-full rounded"
                        /> */}
                </figure>
              </div>
            </div>
            <div className=" w-full h-[100vh] flex items-start justify-start flex-col">
              <div className="w-full h-auto flex items-start justify-center flex-col pb-[4rem] lg:flex-row lg:items-start">
                <div
                  ref={refTextTwo}
                  className="w-full py-[2rem] text-left flex items-start justify-start flex-col gap-[1rem]"
                >
                  <span className="text-white montserrat text-[14px]">
                    Trained in Theology{" "}
                  </span>
                  <h3 className="text-white fira-sans leading-[1.5rem] xl:leading-[2rem]">
                    Know Thyself guide.
                  </h3>
                  <p className=" text-gray  text-[16px] montserrat lg:w-3/4">
                    Trained to look at scriptural text from a metaphysical POV
                    and rather a Scentific POV. Urges to see the implicit
                    meaning behind the scriptures
                  </p>
                </div>
                <figure
                  ref={refImageTwo}
                  className="
                videoFigureContainer
                w-full grid place-items-center"
                >
                  <Video
                    src="http://localhost:3000/KnowThyselfVideo.mp4"
                    type="video/mp4"
                    controls={false}
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    className="w-[505px] h-[505px]"
                  />

                  {/* <Image
                          src={info.image}
                          width={100}
                          height={100}
                          alt="Animated ying yang"
                          className="border border-white/50 w-full h-full rounded"
                        /> */}
                </figure>
              </div>
            </div>

            <div className=" w-full h-[100vh] flex items-start justify-start flex-col">
              <div className="w-full h-auto flex items-start justify-center flex-col lg:flex-row lg:items-start">
                <div
                  ref={refTextThree}
                  className="w-full py-[2rem] text-left flex items-start justify-center flex-col gap-[1rem] lg:py-0"
                >
                  <span className="text-white montserrat text-[14px]">
                    Spirutal Ascension
                  </span>
                  <h3 className="text-white fira-sans leading-[1.5rem] xl:leading-[2rem]">
                    Enrich your spiritual growth
                  </h3>
                  <p className="text-gray  text-[16px] montserrat lg:w-3/4">
                    Trained to look at scriptural text from a metaphysical POV.
                    Urges to see the implicit meaning behind the scriptures
                  </p>
                </div>
                <figure
                  // ref={refImageThree}
                  className="
                videoFigureContainer
                w-full grid place-items-center"
                >
                  <Video
                    src="http://localhost:3000/SpirtualAscenstionVideo.mp4"
                    type="video/mp4"
                    controls={false}
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    className="w-[505px] h-[505px]"
                  />

                  {/* <Image
                          src={info.image}
                          width={100}
                          height={100}
                          alt="Animated ying yang"
                          className="border border-white/50 w-full h-full rounded"
                        /> */}
                </figure>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full h-auto px-6 pt-[4rem]">
          <h1 className="text-center text-white fira-sans-semibold text-[2rem] leading-[2rem] capitalize lg:text-[3rem] lg:leading-[3.5rem]">
            Our flexible pricing plans
          </h1>
          <p className="w-full py-1 text-center text-white montserrat">
            No surprise fees. No contracts.
          </p>
          <div className="pt-1 flex items-center justify-start flex-col lg:flex-row lg:justify-around">
            {planData.map(
              ({
                id,
                planTitle,
                price,
                planDesc,
                desc1,
                desc2,
                desc3,
                freeQuote,
              }) => {
                return (
                  <div
                    key={id}
                    className="w-full flex items-center justify-center flex-col"
                  >
                    {id === 1 || id === 3 ? (
                      <div className="w-4/5 mt-6 p-8 flex items-center justify-center flex-col gap-[2rem] bg-[#140e1c] border border-white/20 rounded">
                        <div className="w-full flex items-center justify-center flex-col text-center gap-4">
                          <p className="text-[1.5rem] fira-sans text-white capitalize">
                            {planTitle}
                          </p>
                          <h3 className="montserrat text-white">
                            {price}
                            <span> / Month</span>
                          </h3>
                          <p className="montserrat text-white capitalize">
                            {planDesc}
                          </p>
                        </div>
                        <hr className="w-full h-[1px] bg-white/50" />
                        <ul className="w-full flex items-center justify-center flex-col gap-4">
                          <li className="flex items-center justify-center gap-4 montserrat text-white capitalize">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            {desc1}
                          </li>
                          <li className="flex items-center justify-center gap-4 montserrat text-white capitalize">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            {desc2}
                          </li>
                          <li className="flex items-center justify-center gap-4 montserrat text-white capitalize">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            {desc3}
                          </li>
                        </ul>
                        <button className="text-white montserrat border border-white rounded-sm px-8 py-3 cursor-pointer duration-300 ease-in-out hover:bg-white hover:text-[#1f1f1f]">
                          Choose Plan
                        </button>
                      </div>
                    ) : (
                      <div className="w-4/5 mt-6 p-8 flex items-center justify-center flex-col gap-[4rem] bg-[#51307b] border border-[#995de8] rounded">
                        <div className="w-full flex items-center justify-center flex-col text-center gap-4">
                          <p className="text-[1.5rem] fira-sans text-white capitalize">
                            {planTitle}
                          </p>
                          <h3 className="montserrat text-white">
                            {price}
                            <span> / Month</span>
                          </h3>
                          <p className="montserrat text-white capitalize">
                            {planDesc}
                          </p>
                        </div>
                        <hr className="w-full h-[1px] bg-white/50" />
                        <ul className="w-full flex items-center justify-center flex-col gap-4">
                          <li className="flex items-center justify-center gap-4 montserrat text-white capitalize">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            {desc1}
                          </li>
                          <li className="flex items-center justify-center gap-4 montserrat text-white capitalize">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            {desc2}
                          </li>
                          <li className="flex items-center justify-center gap-4 montserrat text-white capitalize">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            {desc3}
                          </li>
                        </ul>
                        <button className="text-white montserrat border border-white rounded-sm px-8 py-3 cursor-pointer duration-300 ease-in-out hover:bg-white hover:text-[#51307b]">
                          Choose Plan
                        </button>
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </section>
        <section className="w-full h-auto px-6 py-[4rem] flex items-center justify-center flex-col">
          <h2 className="text-center text-white fira-sans-semibold text-2xl leading-2xl capitalize lg:text-3xl lg:leading-3.5rem mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-full flex flex-col items-center">
            {accordionData.map(({ title, content }, index) => (
              <Accordion key={index} title={title} content={content} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
