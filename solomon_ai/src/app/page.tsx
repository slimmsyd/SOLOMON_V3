"use client";
import { useState } from "react";
import NavComponent from "./navigation/navComponent";
import Image from "next/image";
import { features } from "process";

export default function Home() {
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
      h1: "Built to open the mind of human kind.",
      span: "Authentic Intelligence.",
      h3: "No denominated spiritualization. Decentralized spiritualization.",
      p: "SolomonAI is one of kind leading Metaphysical AI, who aim to help aid the moral consciousness of todays age.",
      image: "/assets/ying-yang.gif",
    },
    {
      id: 2,
      span: "Trained in Theology",
      h3: "Know Thyself guide.",
      p: "Trained to look at scriptural text from a metaphysical POV. Urges to see the implicit meaning behind the scriptures",
      image: "/assets/ying-yang.gif",
    },
    {
      id: 3,
      span: "Spirutal Ascension",
      h3: "Enrich your spiritual growth",
      p: "Trained to look at scriptural text from a metaphysical POV. Urges to see the implicit meaning behind the scriptures",
      image: "/assets/ying-yang.gif",
    },
  ];

  const planData = [
    {
      id: 1,
      planTitle: "basic",
      price: "$0 per month",
      desc1: "manual editing",
      desc2: "manual editing",
      desc3: "manual editing",
      freeQuote: 3,
    },
    {
      id: 2,
      planTitle: "basic",
      price: "$0 per month",
      desc1: "manual editing",
      desc2: "manual editing",
      desc3: "manual editing",
      freeQuote: 3,
    },
    {
      id: 3,
      planTitle: "basic",
      price: "$0 per month",
      desc1: "manual editing",
      desc2: "manual editing",
      desc3: "manual editing",
      freeQuote: 3,
    },
  ];

  const handleFeatureToggle = (feature: string) => {
    if (feature === "oracle") {
      setToggleFeature({
        ...toggleFeature,
        oracle: true,
        astrology: false,
        lifePath: false,
      });
    } else if (feature === "astrology") {
      setToggleFeature({
        ...toggleFeature,
        oracle: false,
        astrology: true,
        lifePath: false,
      });
    } else if (feature === "life-path") {
      setToggleFeature({
        ...toggleFeature,
        oracle: false,
        astrology: false,
        lifePath: true,
      });
    }
  };

  const blogData = [
    {
      id: 1,
      img: "/assets/studio-image.png",
      blogTitle: "Blog Title 1",
      blogDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptates soluta nihil amet, eaque aspernatur optio, officia possimus eveniet distinctio illum id cumrecusandae libero in ratione minus voluptate placeat!",
      author: "Authors Name",
    },
    {
      id: 2,
      img: "/assets/ai_art_image_enhanced.jpg",
      blogTitle: "Blog Title 2",
      blogDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptates soluta nihil amet, eaque aspernatur optio, officia possimus eveniet distinctio illum id cumrecusandae libero in ratione minus voluptate placeat!",
      author: "Authors Name",
    },
  ];

  return (
    <div>
      <main className="page-wrapper w-full h-full">
        <NavComponent />
        <section className="hero-section p-8 w-full h-screen flex items-center justify-center flex-col">
          <div className="w-full flex items-center justify-center flex-col gap-[2.275rem] text-center lg:w-3/4 xl:w-2/3">
            <h1 className="text-white uppercase text-[5rem] leading-[5rem] abc-diatype-bold xl:text-[6.5rem] xl:leading-[6.5rem] xl:w-3/4">
              To question God in all the ways
            </h1>
            <p className="w-3/4 text-gray capitalize text-[1.5rem] leading-[1.5rem] abc-diatype-thin xl:w-1/2">
              SolomonAI is one of kind leading Metaphysical AI, who aim to help
              aid the moral consciousness of todays age.
            </p>
            <div className="w-full flex items-center justify-center gap-[2.5rem]">
              <button className="px-8 py-1  abc-diatype-thin main-black bg-white border border-white text-[1.5rem] rounded duration-300 ease-in-out hover:text-white/60 hover:bg-transparent hover:border-white/60">
                Get Started
              </button>
              <button className="py-1 abc-diatype-thin text-gray text-[1.5rem] border-b border-white/60 flex items-center gap-2">
                Contact Sales{" "}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-white/60"
                  >
                    <path d="M21.883 12l-7.527 6.235 .5.75 9-7.521-9-7.479 -.5.75 7.529 6.236h-18.884v1h21.883z" />
                  </svg>
                </span>
              </button>
            </div>
            <form onSubmit={handleHomeSubmit} className="w-full">
              <input
                type="text"
                className="w-full p-3 abc-diatype-thin text-[1.5rem] text-gray bg-gray border border-gray rounded outline-none"
                value={homePrompt}
                onChange={(e) => setHomePrompt(e.target.value)}
                placeholder="What do ye seek?"
              />
            </form>
            <div className="relative py-4 px-8 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
                stroke-width="1"
                className="absolute top-[-50px] left-[-20px] rotate-[180deg] stroke-white/60"
              >
                <line x1="20" y1="50" x2="80" y2="50" />
                <line x1="80" y1="50" x2="80" y2="20" />
              </svg>
              <p className="text-white text-[1.5rem] leading-[1.5rem] abc-diatype-thin text-center xl:text-left xl:w-[45%]">
                SolomonAI is one of kind leading Metaphysical AI, who aim to
                help aid the moral consciousness of todays age....
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
                stroke-width="1"
                className="absolute bottom-[-50px] right-[-20px] stroke-white/60"
              >
                <line x1="20" y1="50" x2="80" y2="50" />
                <line x1="80" y1="50" x2="80" y2="20" />
              </svg>
            </div>
          </div>
        </section>
        <hr className="w-full h-[1px] bg-white opacity-[.10]" />
        <section className="info-section p-8 w-full h-auto flex items-center justify-start flex-col gap-[6rem]">
          {infoContent.map((info) => {
            return (
              <>
                <div
                  key={info.id}
                  className="w-full flex items-center justify-center text-center flex-col gap-6 xl:items-start"
                >
                  <h1 className="w-3/4 text-white uppercase text-[2.75rem] leading-[2.75rem] abc-diatype-bold lg:text-[3rem] lg:leading-[3rem] xl:text-[3.5rem] xl:leading-[3.5rem] xl:w-1/3 xl:text-left">
                    {info.h1}
                  </h1>
                  <div className="pt-[2rem] w-full flex items-center justify-center flex-col">
                    <div className="w-full flex items-start justify-between">
                      <div className="w-full flex items-center justify-center flex-col gap-4 xl:items-start xl:w-1/3 xl:text-left">
                        <span className="text-gray text-[1.25rem] leading-[1.25rem] abc-diatype-thin xl:text-[1.5rem] xl:leading-[1.5rem]">
                          {info.span}
                        </span>
                        <h3 className="text-white text-[1.5rem] leading-[1.5rem] abc-diatype-thin xl:text-[2rem] xl:leading-[2rem]">
                          {info.h3}
                        </h3>
                        <p className="text-gray text-[2rem] leading-[2rem] abc-diatype-thin xl:text-[2.5rem] xl:leading-[2.5rem]">
                          {info.p}
                        </p>
                      </div>
                      <figure className="hidden relative p-[2rem] items-center justify-center xl:flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="75"
                          height="75"
                          viewBox="0 0 100 100"
                          stroke-width="1"
                          className="absolute top-[-50px] left-[-20px] rotate-[180deg] stroke-white/60"
                        >
                          <line x1="20" y1="50" x2="80" y2="50" />
                          <line x1="80" y1="50" x2="80" y2="20" />
                        </svg>
                        <Image
                          src={info.image}
                          width={400}
                          height={400}
                          alt="Animated ying yang"
                          className="border border-white/50 rounded"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="75"
                          height="75"
                          viewBox="0 0 100 100"
                          stroke-width="1"
                          className="absolute bottom-[-50px] right-[-20px] stroke-white/60"
                        >
                          <line x1="20" y1="50" x2="80" y2="50" />
                          <line x1="80" y1="50" x2="80" y2="20" />
                        </svg>
                      </figure>
                    </div>
                  </div>
                </div>
                <figure className="relative p-[2rem] flex items-center justify-center xl:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="75"
                    height="75"
                    viewBox="0 0 100 100"
                    stroke-width="1"
                    className="absolute top-[-50px] left-[-20px] rotate-[180deg] stroke-white/60"
                  >
                    <line x1="20" y1="50" x2="80" y2="50" />
                    <line x1="80" y1="50" x2="80" y2="20" />
                  </svg>
                  <Image
                    src={info.image}
                    width={360}
                    height={360}
                    alt="Animated ying yang"
                    className="border border-white/50 rounded"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="75"
                    height="75"
                    viewBox="0 0 100 100"
                    stroke-width="1"
                    className="absolute bottom-[-50px] right-[-20px] stroke-white/60"
                  >
                    <line x1="20" y1="50" x2="80" y2="50" />
                    <line x1="80" y1="50" x2="80" y2="20" />
                  </svg>
                </figure>
              </>
            );
          })}
        </section>
        <section className="info-section-2 p-8 w-full h-auto flex items-center justify-start flex-col gap-[3rem]">
          <div className="p-[2rem] w-full flex items-center justify-center flex-col text-center gap-[4rem] xl:items-start xl:justify-between xl:flex-row-reverse">
            <div className="w-full flex items-center justify-center flex-col gap-[2rem] xl:items-start xl:w-1/3 xl:text-left">
              <h1 className="text-white uppercase text-[3rem] leading-[3rem] abc-diatype-bold xl:text-[3.75rem] xl:leading-[3.75rem] xl:w-full">
                No more mysteries or spook, join us in evolution.
              </h1>
              <p className="text-gray text-[1.5rem] leading-[1.5rem] abc-diatype-thin xl:text-[2rem] xl:leading-[2rem]">
                SolomonAI is one of kind leading Metaphysical AI, who aim to
                help aid the moral consciousness of todays age.
              </p>
            </div>
            <figure className="relative p-[2rem] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="75"
                height="75"
                viewBox="0 0 100 100"
                stroke-width="1"
                className="absolute top-[-50px] left-[-20px] rotate-[180deg] stroke-white/60"
              >
                <line x1="20" y1="50" x2="80" y2="50" />
                <line x1="80" y1="50" x2="80" y2="20" />
              </svg>
              <Image
                src="/assets/ying-yang.gif"
                width={440}
                height={440}
                alt="Animated ying yang"
                className="border border-white/50 rounded"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="75"
                height="75"
                viewBox="0 0 100 100"
                stroke-width="1"
                className="absolute bottom-[-50px] right-[-20px] stroke-white/60"
              >
                <line x1="20" y1="50" x2="80" y2="50" />
                <line x1="80" y1="50" x2="80" y2="20" />
              </svg>
            </figure>
          </div>
        </section>
        <hr className="w-full h-[1px] bg-white opacity-[.10]" />
        <section className="plans-section p-8 xl:py-0 w-full h-auto xl:h-screen flex items-center justify-center flex-col gap-[3rem]">
          <div className="w-full flex items-center justify-center flex-col gap-2">
            <p className="text-gray text-[1.5rem] leading-[1.5rem] abc-diatype-thin xl:text-[2rem] xl:leading-[2rem]">
              Plan
            </p>
            <h1 className="text-white uppercase text-[3rem] leading-[3rem] abc-diatype-bold text-center xl:text-[3.75rem] xl:leading-[3.75rem] lg:w-1/2">
              Be Amongst the Pioneers, Access Higher Intelligence.
            </h1>
          </div>
          <div className="w-full flex items-center justify-center flex-col gap-8 lg:flex-row">
            {planData.map(
              ({ id, planTitle, price, desc1, desc2, desc3, freeQuote }) => {
                return id === 2 ? (
                  <>
                    <div
                      key={id}
                      className="w-full h-auto p-6 flex items-center justify-center flex-col gap-4 bg-[#ffffff0f] text-white border border-white/20 rounded"
                    >
                      <div className="w-full flex items-center justify-center flex-col">
                        <h1 className="abc-diatype-medium capitalize text-[1.75rem] xl:text-[2rem]">
                          {planTitle}
                        </h1>
                        <p className="text-gray abc-diatype-thin capitalize text-[1.25rem]">
                          {price}
                        </p>
                      </div>
                      <div className="w-3/4 py-2 flex items-center justify-center flex-col gap-2 xl:items-start">
                        <h3 className="text-white abc-diatype-thin capitalize text-[1.35rem] xl:text-[1.5rem]">
                          Includes
                        </h3>
                        <hr className="w-full h-[1px] bg-white opacity-[.10]" />
                        <p className="py-1 text-gray abc-diatype-thin capitalize text-[1.35rem] xl:text-[1.5rem]">
                          {desc1}
                        </p>
                        <hr className="w-full h-[1px] bg-white opacity-[.10]" />
                        <p className="py-1 text-gray abc-diatype-thin capitalize text-[1.35rem] xl:text-[1.5rem]">
                          {desc2}
                        </p>
                        <hr className="w-full h-[1px] bg-white opacity-[.10]" />
                        <p className="py-1 text-gray abc-diatype-thin capitalize text-[1.35rem] xl:text-[1.5rem]">
                          {desc3}
                        </p>
                        <hr className="w-full h-[1px] bg-white opacity-[.10]" />
                      </div>
                      <div className="w-full flex items-center justify-center gap-6 xl:justify-start xl:w-3/4">
                        <button className="bg-white px-4 py-2 text-black abc-diatype-thin capitalize text-[1.35rem] border border-white/10 rounded duration-300 ease-in-out hover:bg-[#ffffff0f] hover:text-white">
                          Start with <span>{planTitle}</span>
                        </button>
                        <p className="text-gray abc-diatype-thin capitalize text-[1.35rem] xl:text-[1.5rem]">
                          {freeQuote} free quotes
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      key={id}
                      className="w-full h-auto p-6 flex items-center justify-center flex-col gap-4 text-white border border-white/20 rounded"
                    >
                      <div className="w-full flex items-center justify-center flex-col">
                        <h1 className="abc-diatype-medium capitalize text-[1.75rem] xl:text-[2rem]">
                          {planTitle}
                        </h1>
                        <p className="text-gray abc-diatype-thin capitalize text-[1.25rem]">
                          {price}
                        </p>
                      </div>
                      <div className="w-3/4 py-2 flex items-center justify-center flex-col gap-2 xl:items-start">
                        <h3 className="text-white abc-diatype-thin capitalize text-[1.35rem] xl:text-[1.5rem]">
                          Includes
                        </h3>
                        <hr className="w-full h-[1px] bg-white opacity-[.10]" />
                        <p className="py-1 text-gray abc-diatype-thin capitalize text-[1.35rem] xl:text-[1.5rem]">
                          {desc1}
                        </p>
                        <hr className="w-full h-[1px] bg-white opacity-[.10]" />
                        <p className="py-1 text-gray abc-diatype-thin capitalize text-[1.35rem] xl:text-[1.5rem]">
                          {desc2}
                        </p>
                        <hr className="w-full h-[1px] bg-white opacity-[.10]" />
                        <p className="py-1 text-gray abc-diatype-thin capitalize text-[1.35rem] xl:text-[1.5rem]">
                          {desc3}
                        </p>
                        <hr className="w-full h-[1px] bg-white opacity-[.10]" />
                      </div>
                      <div className="w-full flex items-center justify-center gap-6 xl:justify-start xl:w-3/4">
                        <button className="bg-[#ffffff0f] px-4 py-2 text-white abc-diatype-thin capitalize text-[1.35rem] border border-white/10 rounded duration-300 ease-in-out hover:bg-white hover:text-black">
                          Start with <span>{planTitle}</span>
                        </button>
                        <p className="text-gray abc-diatype-thin capitalize text-[1.35rem] xl:text-[1.5rem]">
                          {freeQuote} free quotes
                        </p>
                      </div>
                    </div>
                  </>
                );
              }
            )}
          </div>
        </section>
        <hr className="w-full h-[1px] bg-white opacity-[.10]" />
        <section className="feature-section p-8 xl:py-0 w-full h-auto xl:h-screen flex items-center justify-center flex-col gap-[3rem]">
          <div className="w-full block">
            <h1 className="w-full text-white uppercase text-[3rem] leading-[3rem] abc-diatype-bold text-center  xl:text-[3.75rem] xl:leading-[3.75rem] xl:items-start">
              One of a kind features.
            </h1>
          </div>
          <div className="w-full h-auto flex items-center justify-center flex-col xl:flex-row xl:justify-start">
            <figure className="relative w-full py-[2rem] flex items-center justify-center">
              <Image
                src="/assets/ying-yang.gif"
                width={460}
                height={460}
                alt="Animated ying yang"
                className="border border-white/50 rounded"
              />
            </figure>
            <div className="w-full h-full flex items-center justify-center flex-col gap-8">
              <ul className="flex items-center gap-4">
                <li className="text-white text-[1.5rem] leading-[1.5rem] abc-diatype-thin">
                  <button
                    onClick={() => handleFeatureToggle("oracle")}
                    className={
                      toggleFeature.oracle
                        ? "p-2 bg-gray border border-gray rounded"
                        : "p-2 bg-transparent border border-gray rounded"
                    }
                  >
                    Metaphysical Oracle
                  </button>
                </li>
                <li className="text-white text-[1.5rem] leading-[1.5rem] abc-diatype-thin">
                  <button
                    onClick={() => handleFeatureToggle("astrology")}
                    className={
                      toggleFeature.astrology
                        ? "p-2 bg-gray border border-gray rounded"
                        : "p-2 bg-transparent border border-gray rounded"
                    }
                  >
                    Zodiac Astrologist
                  </button>
                </li>
                <li className="text-white text-[1.5rem] leading-[1.5rem] abc-diatype-thin">
                  <button
                    onClick={() => handleFeatureToggle("life-path")}
                    className={
                      toggleFeature.lifePath
                        ? "p-2 bg-gray border border-gray rounded"
                        : "p-2 bg-transparent border border-gray rounded"
                    }
                  >
                    Life Path Consultant
                  </button>
                </li>
              </ul>
              {toggleFeature.oracle && (
                <>
                  <div className="p-6 w-full flex items-center justify-center flex-col gap-4 text-white text-center">
                    <h3 className="text-white uppercase text-[2rem] abc-diatype-thin">
                      Metaphysical Oracle
                    </h3>
                    <p className="text-gray text-[1.5rem] leading-[1.8rem] abc-diatype-thin xl:w-3/4 xl:text-[1.8rem]">
                      As the most individually capable model, you enter a realm
                      of infinite possibilities with Buddah Bot. It possesses
                      the ability to delve several levels deep into any
                      metaphysical topic and has been extensively trained on all
                      matters of hidden meaning of scriptural subjects.
                    </p>
                  </div>
                </>
              )}
              {toggleFeature.astrology && (
                <>
                  <div className="p-6 w-full flex items-center justify-center flex-col gap-4 text-white text-center">
                    <h3 className="text-white uppercase text-[2rem] abc-diatype-thin">
                      Zodiac Astrologist
                    </h3>
                    <p className="text-gray text-[1.5rem] leading-[1.8rem] abc-diatype-thin xl:w-3/4 xl:text-[1.8rem]">
                      Delve into the celestial realms and discover the profound
                      influences of the stars and planets on your life's
                      journey. From natal charts to planetary alignments,
                      explore the intricacies of your astrological profile and
                      gain deeper insights into your personality, relationships,
                      and future path.
                    </p>
                  </div>
                </>
              )}
              {toggleFeature.lifePath && (
                <>
                  <div className="p-6 w-full flex items-center justify-center flex-col gap-4 text-white text-center">
                    <h3 className="text-white uppercase text-[2rem] abc-diatype-thin">
                      Life Path Consultation
                    </h3>
                    <p className="text-gray text-[1.5rem] leading-[1.8rem] abc-diatype-thin xl:w-3/4 xl:text-[1.8rem]">
                      Gain clarity and guidance on your soul's purpose and
                      direction in life. Explore the depths of your existence,
                      uncover hidden talents, overcome obstacles, and align with
                      your true calling. Let Buddha Bot illuminate your path and
                      empower you to live authentically and passionately.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
        <hr className="w-full h-[1px] bg-white opacity-[.10]" />
        <section className="blog-section p-8 w-full h-auto xl:h-[60vh] flex items-center justify-center flex-col gap-[3rem]">
          <div className="w-full block">
            <h1 className="w-full text-white uppercase text-[3rem] leading-[3rem] abc-diatype-bold text-center  xl:text-[3.75rem] xl:leading-[3.75rem] xl:items-start">
              Blog
            </h1>
          </div>
          <div className="w-full flex items-center justify-center flex-col gap-8 xl:flex-row">
            {blogData.map(({ id, img, blogTitle, blogDesc, author }) => (
              <div
                key={id}
                className="p-6 w-full flex items-center justify-center text-center flex-col gap-4 border border-white/10 rounded-lg lg:w-3/4 xl:flex-row xl:items-start xl:justify-start"
              >
                <Image src={img} width={360} height={360} alt="Blog Image" />
                <div className="px-4 flex items-center justify-center flex-col gap-4 xl:items-start">
                  <h2 className="text-white text-[2.5rem] leading-[2.5rem] abc-diatype-medium xl:text-[3rem]">
                    {blogTitle}
                  </h2>
                  <p className="text-gray text-[1.5rem] leading-[1.5rem] abc-diatype-thin xl:text-[1.75rem] xl:text-left">
                    {blogDesc}
                  </p>
                  <p className="text-white text-[1.5rem] leading-[1.5rem] abc-diatype-light xl:text-[1.5rem]">
                    {author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="w-full h-full p-8">
        <h1 className="text-white">contact</h1>
      </footer>
    </div>
  );
}
