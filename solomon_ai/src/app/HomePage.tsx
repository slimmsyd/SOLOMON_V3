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
import { gsap } from "gsap";

import { Popup } from "./components/NewsletterPopup";
import { CircleSVG } from "./components/CircleSVG";
import Lenis from "lenis";

import ImageOne from "../../public/assets/homePage/popup_header.png";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div
        className={` ${
          isOpen ? "!h-[280px]" : "h-[75px"
        } transform duration-200	transition-all	 ease-in-out	  w-full flex items-start justify-start lg:h-[75px] h-[85px] overflow-y-hidden flex-col my-2 border border-[#ffffff4a] rounded`}
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

  //Handling the pricing configuration

  return (
    <div>
      {isPopupVisible && <Popup togglePopup={togglePopup} />}

      <main className="w-full h-auto">
        <NavComponent
          togglePopup={togglePopup}
          scrollToSection={scrollToSection}
          scrollToFeatures={scrollToFeatures}
        />
        <CircleSVG />
        <section className="w-full h-auto pt-[14rem] px-6 flex items-end justify-center">
          <div className="w-full flex items-center justify-center flex-col gap-6 text-center">
            <div className="w-full  m-auto lg:w-4/5 xl:w-2/3">
              <span className="text-left lg:text-center lg:justify-center justify-start lg:self-center self-start flex w-full justify-start text-gray text-[14px]">
                Closer to God one question at a time...
              </span>
              <h1 className="text-white capitalize text-[58px] text-left self-start lg:self-center lg:text-center leading-[4.5rem] fira-sans-semibold ">
                Explore, Question, and Grow with Our Spiritual AI Guide
              </h1>
            </div>

            <p className="text-white montserrat text-[1.175rem] text-left lg:text-center leading-[1.25rem] lg:w-3/4 lg:text-[1.5rem] lg:leading-[1.5rem] xl:w-1/2">
              SolomonAI is a leading metaphysical AI designed to assist in
              elevating the moral consciousness of today’s era.
            </p>
            <button
              onClick={togglePopup}
              className="px-4 justify-start py-2 border border-white flex self-start	 lg:self-center items-center  text-white montserrat rounded-sm duration-300 ease-in-out hover:text-[rgb(28,28,28)] hover:bg-white"
            >
              Join The Waitlist
            </button>
          </div>
        </section>
        <figure className="w-full h-auto mt-[4rem] p-6 flex items-center justify-center flex-col gap-6">
          <Video
            src="https://www.aisolomon.xyz/video_introduction.mp4"
            type="video/mp4"
            width="100%"
            height="auto"
            controls={true}
            autoPlay={true}
            loop={true}
            muted={false}
            className="pointerEventsYes"
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
        <section
          ref={featuresRef}
          className="w-full h-auto py-[2rem] px-6 flex items-center justify-center flex-col gap-4"
        >
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
                    infinite possibilities with Solomon AI. It possesses the
                    ability to delve several levels deep into any metaphysical
                    topic and has been extensively trained on all matters of
                    meaning of scriptural subjects.
                  </p>

                  <div>
                    <h3>Key Features:</h3>
                    <ul className="descriptionList">
                      <li>
                        <span className="highLightPurple">
                          Infinite Possibilites:
                        </span>{" "}
                        Engage with a model that can naviate through the vast
                        expanse of metaphysical knowledge, spiritual knowledge,
                        offering you unqiue and enriching experiences each time.{" "}
                      </li>
                      <li>
                        <span className="highLightPurple">
                          {" "}
                          Comprehensive Insights:
                        </span>
                        From ancient wisdom to modern-day applications, Solomon
                        Oracle provides comprehensive insights that help you
                        understand the relevance of spiritual principles in
                        today’s world.{" "}
                      </li>
                      <li>
                        <span className="highLightPurple">
                          {" "}
                          Persoalized Guidance:
                        </span>
                        Solomon Oracle adapts to your individual needs, offering
                        personalized guidance and support in your spiritual
                        development. It’s like having a wise mentor by your
                        side, ready to assist you at every step.
                      </li>
                    </ul>
                  </div>
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

                  <div>
                    <h3>Key Features:</h3>
                    <ul className="descriptionList">
                      <li>
                        <span className="highLightPurple">
                          Holistic Understanding:
                        </span>{" "}
                        By integrating insights from various ideologies, Zodiac
                        Astrologist provides a comprehensive view of your cosmic
                        identity, enriching your understanding of who you are
                        and your place in the universe.
                      </li>
                      <li>
                        <span className="highLightPurple">
                          {" "}
                          Timely Updates:
                        </span>
                        Stay informed with regular updates about your personal
                        and cosmic cycles, helping you navigate life's
                        challenges and opportunities with greater awareness and
                        confidence.
                      </li>
                      <li>
                        <span className="highLightPurple">
                          {" "}
                          Enhanced Self-Awareness:
                        </span>
                        Use the knowledge gained from your astrological profile
                        to enhance self-awareness and personal growth. Discover
                        how the alignment of celestial bodies influences your
                        strengths, challenges, and potential.
                      </li>
                    </ul>
                  </div>
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
                    true calling. Let Solomon AI illuminate your path and
                    empower you to live authentically and passionately.
                  </p>
                  <div>
                    <h3>Key Features:</h3>
                    <ul className="descriptionList">
                      <li>
                        <span className="highLightPurple">
                          Holistic Guidance:
                        </span>{" "}
                        Life Path Consultant offers a comprehensive approach to
                        personal development, integrating numerical insights
                        with spiritual wisdom to provide holistic guidance.
                      </li>
                      <li>
                        <span className="highLightPurple"> Empowerment </span>
                        Let Solomon AI illuminate your path, empowering you to
                        live authentically and passionately. Use the insights
                        from your numerical profiles to overcome obstacles and
                        harness your innate talents.
                      </li>
                      <li>
                        <span className="highLightPurple">
                          {" "}
                          Personalized Insights:
                        </span>
                        Receive tailored guidance that speaks directly to your
                        unique life journey. Whether you are seeking clarity on
                        your next steps or looking to deepen your
                        self-awareness, Life Path Consultant offers the support
                        you need.
                      </li>
                    </ul>
                  </div>
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
                className={`object-cover transition-opacity h-[500px] duration-700 ${
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
                className={`object-cover transition-opacity h-[500px] duration-700 ${
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
                className={`object-cover transition-opacity h-[500px] duration-700 ${
                  toggleFeature.lifePath
                    ? "w-600px] h-auto opacity-100 relative"
                    : "w-[600px] h-auto opacity-0 absolute"
                }`}
              />
            </figure>
          </div>
        </section>
        <section className="info-section w-full h-auto px-6 pt-[6rem]">
          <div className="w-full flex items-center flex-col px-[0.5rem] lg:px-[8rem]">
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
            <div className=" w-full h-[100%] lg:h-[100vh] py-[6rem] flex items-start justify-start flex-col">
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
                </figure>
              </div>
            </div>
            <div className=" w-full h-[100%] lg:h-[100vh] py-[6rem] flex items-start justify-start flex-col">
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
                </figure>
              </div>
            </div>

            <div className=" w-full h-[100%] lg:h-[100vh] py-[6rem] flex items-start justify-start flex-col">
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
              src="https://www.aisolomon.xyz/Trailer_Video.mp4"
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

        <section className="info-section-2 relative md:py-[20vh] md:pb-[8vh] pb-[0px] px-8  w-full  flex items-center justify-center flex-col  md:gap-[5vh] gap-[20vh]">
          <CircleSVG />

          <h2 className=" text-white  w-full md:w-[50%]    xl:w-2/3 text-center">
            Be amongst the pioneers,Access higher intelligence.
          </h2>
          <p className="text-[#afafaf]">
            One plan, one price to venture into the temple of Solomon
          </p>
          <form className="flex flex-row gap-[5px] justify-center items-center">
            <div className="pricingCard">
              <div className="flex flex-col h-full">
                <h5>Ascent</h5>
                <p></p>
                <div className="flex flex-row  mt-[8px]">
                  <div className="flex-row flex gap-[5px] items-center">
                    <span className="text-[30px] !text-[#fff] font-bold">
                      $25{" "}
                    </span>
                    <span className="slantLine"></span>
                    <span>per</span>
                    <span>month</span>
                  </div>
                </div>

                <ul className="flex flex-col mt-[25px] gap-[20px] flex-1  ">
                  <div className="flex flex-row gap-[5px]"></div>

                  <li className=" text-[#afafaf] text-[20px] ">
                    1,000 questions per month
                  </li>
                  <li className="text-[16px] text-white !list-disc ">
                    Text-To-Image
                  </li>
                  <li className="text-[16px] text-white !list-disc ">
                    Dream Calculator
                  </li>
                  <li className="text-[16px] text-white  !list-disc ">
                    Daily Horoscope Interpreter
                  </li>
                  <li className="text-[16px] text-white  !list-disc">
                    Life Path Caclulator
                  </li>
                </ul>

                <Link
                  href="/login"
                  className="pricingBtn text-black text-[14px]   text-left"
                >
                  Join Application
                </Link>
              </div>
            </div>
          </form>

          <hr className="vidDivider"></hr>

          <hr className="w-full h-[1px] mt-[20vh] bg-white opacity-[.10]" />
        </section>

        <section className="w-full h-auto relative  flex items-start py-[20px] px-[20px] justify-center flex-col">
          
          <Link 
            href = "/blog"
          className="flex flex-row flex-wrap relative  max-w-[450px] ">
            <div className="blogContainer relative max-w-[450px] ">
              <div className="blogCardImageContainer relative h-full flex-1 flex items-end">
                <Image src={ImageOne} alt="Spiritual Image" />
                <div className = "absolute mb-[4rem] mx-[20px] z-[100] " >

                <div className="flex flex-row gap-[4px]">
                <span className="text-gray text-[14px]">May 31st, 2024</span>
                <span className="text-gray text-[14px] text-before">5 min read</span>
              </div>                  <h3 className = "text-white font-bold">Return of an Unifed God</h3>


                </div>

                <div className = "overlay"></div>

              </div>

           
            </div>
          </Link>
        </section>

        <section className="w-full h-auto px-6 py-[4rem] flex items-center justify-center flex-col">
          <h2 className="w-auto xl:w-[55%] mr-[auto] text-white fira-sans-semibold text-[2rem] leading-[2rem] capitalize text-left lg:text-[3rem] lg:leading-[3.5rem]">
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
