"use client";
import { useState, useEffect, useRef } from "react";
import NavComponent from "./navigation/navComponent";
import Image from "next/image";
import Video from "./components/Vidoe";
import Footer from "./components/Footer";
import solomonHeaderImg from "../../public/assets/chat-guidelines.png"
import { features } from "process";
import Link from "next/link";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { gsap } from "gsap";

import { Popup } from "./components/NewsletterPopup";
import { SuccessPopup } from "./components/SucessPopup";

import Lenis from "lenis";



export default function HomePage() {


  const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className={` ${isOpen ? "!h-[200px]" : "h-[75px"} transform duration-200	transition-all	 ease-in-out	  w-full flex items-start justify-start h-[75px] overflow-y-hidden flex-col my-2 border border-[#ffffff4a] rounded`}
      
      >
        <div
          className="w-full p-6 flex justify-between items-center cursor-pointer "
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
       
          <div className="w-full px-4 py-8 border-t border-white/20">
            <p className="text-left text-white montserrat">{content}</p>
          </div>
      </div>
    );
  };



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
  
  

  const accordionData = [
    {
      title: "What is Solomon AI?",
      content:
        "Solomon AI is a leading metaphysical AI designed to assist in elevating the moral consciousness of today’s era.",
    },
    {
      title: "How does the Oracle feature work?",
      content:
        "The Oracle feature provides deep metaphysical insights and guidance based on ancient wisdom and scriptural texts. Advacned neural networks give it the ability to synthesize data and draw deep and insightful connections",
    },
    {
      title: "What are the benefits of the Life Path Consultant?",
      content:
        "The Life Path Consultant helps you gain clarity and guidance on your soul's purpose and direction in life, uncover talents, and align with your true calling. Innerstanding the numerical frequency guiding you life's theme will aid in clarity and intent.",
    },
  ];

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
    console.log("Popup is toggling", isPopupVisible)
    setIsPopupVisible(!isPopupVisible);
  };

  const scrollToSection = () => {
    if (refTextTrigger.current) {
      refTextTrigger.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (

    <div>

//   {isPopupVisible && <Popup togglePopup={togglePopup} />}

      <main className="w-full h-auto">
        <NavComponent
          togglePopup = {togglePopup}
        />
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
            <button 
              onClick={togglePopup}
            className="px-4 justify-start py-2 border border-white flex self-start	 lg:self-center items-center  text-white montserrat rounded-sm duration-300 ease-in-out hover:text-[rgb(28,28,28)] hover:bg-white">
              Join The Waitlist
            </button>
          </div>
        </section>
        <figure className="w-full h-auto mt-[4rem] p-6 flex items-center justify-center flex-col gap-6">
          <Image
            src={solomonHeaderImg}
            layout="responsive"
            width={1200}
            height={600}
            alt="Solomon chatbot"

            className="w-full max-w-[1200px]  rounded-xl shadow-lg"
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
          <div className="w-full py-[6rem] flex items-center justify-center flex-col lg:items-start lg:justify-between lg:flex-row lg:max-w-[1300px]">
            {toggleFeature.oracle && (
              <>
                <div className="py-6 w-full flex items-start justify-start flex-col gap-4 text-white text-left lg:py-0 lg:pb-6">
                <h3 className="text-left w-full text-white uppercase fira-sans-semibold">
                    Metaphysical Oracle
                  </h3>
                  <p className="text-white text-left  text-gray leading-[1.8rem] montserrat w-full">
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
                  <p className="text-white text-left text-gray    leading-[1.8rem] montserrat w-full">
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
                  <p className="text-white  text-left text-gray  leading-[1.8rem] montserrat w-full">
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
                src="https://www.aisolomon.xyz/OracleVideo.mp4"
                type="video/mp4"
                controls={false}
                autoPlay={true}
                loop={true}
                muted={true}
                className={`object-cover transition-opacity duration-700 ${
                  toggleFeature.oracle
                    ? "w-600px] h-auto opacity-100 relative"
                    : "w-[600px] h-auto opacity-0 absolute"
                }`}
              />
              <Video
                src="https://www.aisolomon.xyz/KnowThyselfVideo.mp4"
                type="video/mp4"
                controls={false}
                autoPlay={true}
                loop={true}
                muted={true}
                className={`object-cover transition-opacity duration-700 ${
                  toggleFeature.astrology
                   ? "w-600px] h-auto opacity-100 relative"
                    : "w-[600px] h-auto opacity-0 absolute"
                }`}
              />
              <Video
                src="https://www.aisolomon.xyz/SpirtualAscenstionVideo.mp4"
                type="video/mp4"
                controls={false}
                autoPlay={true}
                loop={true}
                muted={true}
                className={`object-cover transition-opacity duration-700 ${
                  toggleFeature.lifePath
                          ? "w-600px] h-auto opacity-100 relative"
                    : "w-[600px] h-auto opacity-0 absolute"
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
            <div className=" w-full h-[100vh] py-[6rem] flex items-start justify-start flex-col">
              <div className="w-full h-auto flex items-center justify-center flex-col  lg:flex-row lg:items-start">
                <div
                  ref={refTextOne}
                  className="w-full py-[2rem] text-left flex items-start justify-center flex-col gap-[10px] lg:py-0"
                >
                  <span className="text-white montserrat text-[14px]">
                    Authentic Intelligence.
                  </span>
                  <h3 className="text-white fira-sans leading-[1.5rem] xl:leading-[2rem]">
                    No denominated spiritualization. Decentralized
                    spiritualization.
                  </h3>
                  <p className="text-white text-gray text-[16px] montserrat lg:w-3/4">
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
                src="https://www.aisolomon.xyz/OracleVideo.mp4"
                type="video/mp4"
                    controls={false}
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    className="w-full h-[505px]"
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
            <div className=" w-full h-[100vh] py-[6rem] flex items-start justify-start flex-col">
              <div className="w-full h-auto flex items-start justify-center flex-col pb-[4rem] lg:flex-row lg:items-start">
                <div
                  ref={refTextTwo}
                  className="w-full py-[2rem] text-left flex items-start justify-start flex-col gap-[10px] lg:py-0"
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
                src="https://www.aisolomon.xyz/KnowThyselfVideo.mp4"
                type="video/mp4"
                    controls={false}
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    className="w-full h-[505px]"
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

            <div className=" w-full h-[100vh] py-[6rem] flex items-start justify-start flex-col">
              <div className="w-full h-auto flex items-start justify-center flex-col lg:flex-row lg:items-start">
                <div
                  ref={refTextThree}
                  className="w-full py-[2rem] text-left flex items-start justify-center flex-col gap-[10px] lg:py-0"
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
                src="https://www.aisolomon.xyz/SpirtualAscenstionVideo.mp4"
                type="video/mp4"
                    controls={false}
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    className="w-full h-[505px]"
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
        <section className="info-section-2 md:py-[20vh] pb-[0px] px-8  w-full  flex items-start justify-start flex-col  md:gap-[5vh] gap-[20vh]">
          <h2 className=" text-white  w-full md:w-[50%]    xl:w-2/3 text-left">
            No more mysteries or spook, join us in evolution.
          </h2>

          <div className="mainVideoContainer flex flex-col gap-[3rem]">
            <Video
              src="https://solomon-v3.vercel.app/Solomon_Intro_Vid.mp4"
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

          <hr className="w-full h-[1px] mt-[20vh] bg-white opacity-[.10]" />
        </section>
        {/* <section className="w-full h-auto px-6 py-[4rem]">
        <h2
                className="w-auto xl:w-[55%] mr-[auto] text-white fira-sans-semibold text-[2rem] leading-[2rem] capitalize text-left lg:text-[3rem] lg:leading-[3.5rem]"
              >
                Pricing
              </h2>
          <p className="w-full py-1 text-left text-white montserrat">
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
        </section> */}
        <section className="w-full h-auto px-6 py-[4rem] flex items-center justify-center flex-col">
              <h2
                className="w-auto xl:w-[55%] mr-[auto] text-white fira-sans-semibold text-[2rem] leading-[2rem] capitalize text-left lg:text-[3rem] lg:leading-[3.5rem]"
              >
                Frequently Ask Questions
              </h2>
          <div className="w-full flex flex-col py-[4rem] items-center">
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