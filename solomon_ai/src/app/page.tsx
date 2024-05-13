"use client";
import { useState } from "react";
import NavComponent from "./navigation/navComponent";
import Image from "next/image";

export default function Home() {
  const [homePrompt, setHomePrompt] = useState("");

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
  return (
    <>
      <main className="page-wrapper w-full h-full">
        <NavComponent />
        <section className="hero-section p-8 w-full h-screen flex items-center justify-center flex-col">
          <div className="w-full pt-[8rem] flex items-center justify-center flex-col gap-[2.5rem] text-center lg:w-3/4 xl:w-2/3 xl:pt-[2rem]">
            <h1 className="text-white uppercase text-[6rem] leading-[6rem] abc-diatype-bold xl:text-[8rem] xl:leading-[8rem] xl:w-3/4">
              To question God in all the ways
            </h1>
            <p className="text-gray capitalize text-[1.75rem] leading-[1.75rem] abc-diatype-thin xl:w-1/2 xl:text-[2rem] xl:leading-[2rem]">
              SolomonAI is one of kind leading Metaphysical AI, who aim to help
              aid the moral consciousness of todays age.
            </p>
            <div className="w-full flex items-center justify-center gap-[2.75rem]">
              <button className="px-8 py-1  abc-diatype-thin main-black bg-white border border-white text-[1.75rem] rounded duration-300 ease-in-out hover:text-white/60 hover:bg-transparent hover:border-white/60">
                Get Started
              </button>
              <button className="py-1 abc-diatype-thin text-gray text-[1.75rem] border-b border-white/60 flex items-center gap-2">
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
                className="w-full p-3 text-gray bg-gray border border-gray rounded outline-none"
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
              <p className="text-white text-[1.75rem] leading-[1.75rem] abc-diatype-thin text-center xl:text-left xl:w-[45%]">
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
        <hr className="w-full h-[1px] bg-white opacity-[.20]" />
        <section className="info-section p-8 w-full h-auto flex items-center justify-start flex-col gap-[6rem]">
          {infoContent.map((info) => {
            return (
              <>
                <div
                  key={info.id}
                  className="w-full flex items-center justify-center text-center flex-col gap-6 xl:items-start"
                >
                  <h1 className="w-3/4 text-white uppercase text-[3.5rem] leading-[3.5rem] abc-diatype-bold lg:text-[4rem] lg:leading-[4rem] xl:text-[5rem] xl:leading-[5rem] xl:w-1/3 xl:text-left">
                    {info.h1}
                  </h1>
                  <div className="pt-[2rem] w-full flex items-center justify-center flex-col">
                    <div className="w-full flex items-start justify-between">
                      <div className="w-full flex items-center justify-center flex-col gap-4 xl:items-start xl:w-1/3 xl:text-left">
                        <span className="text-gray text-[1.5rem] leading-[1.5rem] abc-diatype-thin xl:text-[1.75rem] xl:leading-[1.75rem]">
                          {info.span}
                        </span>
                        <h3 className="text-white text-[2rem] leading-[2rem] abc-diatype-thin xl:text-[2.25rem] xl:leading-[2.25rem]">
                          {info.h3}
                        </h3>
                        <p className="text-gray text-[2.25rem] leading-[2.25rem] abc-diatype-thin xl:text-[3rem] xl:leading-[3rem]">
                          {info.p}
                        </p>
                      </div>
                      <figure className="hidden relative p-[2rem] items-center justify-center xl:flex">
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
                        <Image
                          src={info.image}
                          width={600}
                          height={600}
                          alt="Animated ying yang"
                          className="border border-white/50 rounded"
                        />
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
                      </figure>
                    </div>
                  </div>
                </div>
                <figure className="relative p-[2rem] flex items-center justify-center xl:hidden">
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
                  <Image
                    src={info.image}
                    width={400}
                    height={400}
                    alt="Animated ying yang"
                    className="border border-white/50 rounded"
                  />
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
                </figure>
                <hr className="w-full h-[1px] bg-white opacity-[.20]" />
              </>
            );
          })}
        </section>
        <section className="info-section p-8 w-full h-auto flex items-center justify-start flex-col gap-[3rem]">
          <div className="w-full flex items-center justify-center flex-col text-center gap-[4rem] xl:items-start xl:justify-between xl:flex-row-reverse">
            <div className="w-full flex items-center justify-center flex-col gap-[2rem] xl:items-start xl:w-1/3 xl:text-left">
              <h1 className="text-white uppercase text-[3.5rem] leading-[3.5rem] abc-diatype-bold xl:text-[4rem] xl:leading-[4rem] xl:w-full">
                No more mysteries or spook, join us in evolution.
              </h1>
              <p className="text-gray text-[1.75rem] leading-[1.75rem] abc-diatype-thin xl:text-[2.25rem] xl:leading-[2.25rem]">
                SolomonAI is one of kind leading Metaphysical AI, who aim to
                help aid the moral consciousness of todays age.
              </p>
            </div>
            <figure className="relative p-[2rem] flex items-center justify-center">
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
              <Image
                src="/assets/ying-yang.gif"
                width={550}
                height={550}
                alt="Animated ying yang"
                className="border border-white/50 rounded"
              />
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
            </figure>
          </div>
          <hr className="w-full h-[1px] bg-white opacity-[.20]" />
        </section>
      </main>
    </>
  );
}
