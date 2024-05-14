import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function NavComponent() {
  const [animate, setAnimate] = useState(false);
  const [navState, setNavState] = useState(false);
  const navIcon = useRef<HTMLDivElement>(null);
  const mobileNav = useRef<HTMLUListElement>(null);

  const toggleNav = () => {
    setNavState(!navState);
  };

  useEffect(() => {
    console.log("Loggin animate state", animate);

    const handleScroll = () => {
      if (window.scrollY === 10) {
        setAnimate(!animate);
      } else {
        setAnimate(!animate);
      }

      console.log("Loggin animate state", animate);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    
      <nav
        className={
          animate
            ? "fixed left-0 top-0 w-full px-6  flex items-center justify-between bg-main-black z-[9] slide-in"
            : "fixed left-0 top-0 w-full px-6  flex items-center justify-between bg-main-black z-[9] slide-out"
        }
      >
        <Link
          href="/"
          className="p-2 text-white abc-diatype-bold text-4xl uppercase lg:text-[2.75rem] xl:text-[3rem  w-[280px]"
        >
          Solomon<span className="abc-diatype-thin text-2xl">AI</span>
        </Link>
        <ul className="hidden items-center gap-[3rem] xl:flex">
          <Link
            href="/"
            className="abc-diatype-Regular text-gray text-[1.75rem] duration-300 ease-in-out hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/"
            className="abc-diatype-Regular text-gray text-[1.75rem] duration-300 ease-in-out hover:text-white"
          >
            Use Cases
          </Link>
          <Link
            href="/"
            className="abc-diatype-Regular text-gray text-[1.75rem] duration-300 ease-in-out hover:text-white"
          >
            Prices
          </Link>
          <Link
            href="/"
            className="abc-diatype-Regular text-gray text-[1.75rem] duration-300 ease-in-out hover:text-white"
          >
            About
          </Link>
          <Link
            href="/"
            className="abc-diatype-Regular text-gray text-[1.75rem] duration-300 ease-in-out hover:text-white"
          >
            Blog
          </Link>
        </ul>
        <div className="hidden items-center justify-between gap-8 xl:flex w-[280px]">
          <div className="flex items-center justify-end	  gap-4">
            <button className="abc-diatype-Regular text-gray text-[1.75rem] duration-300 ease-in-out hover:text-white">
              Sign In
            </button>
            <button className="px-2 py-1 abc-diatype-Regular bg-gray border border-white/20 text-white text-[1.75rem] rounded">
              Get Started
            </button>
          </div>
        </div>
        <div
          ref={navIcon}
          onClick={toggleNav}
          className="w-[40px] h-[26px] flex items-center justify-between flex-col cursor-pointer xl:hidden"
        >
          <div className="w-[33%] h-[1.25px] rounded bg-white"></div>
          <div className="w-full h-[1.25px] rounded bg-white"></div>
          <div className="w-[33%] h-[1.25px] rounded bg-white"></div>
        </div>
        <ul
          ref={mobileNav}
          className={`absolute inset-0 p-6 bg-main-black w-full h-screen flex items-center justify-center flex-col gap-[2rem] uppercase transition-transform duration-[1s] ease-in-out ${
            navState ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Link
            href="/"
            className="abc-diatype-thin text-gray text-[3rem] duration-300 ease-in-out hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/"
            className="abc-diatype-thin text-gray text-[3rem] duration-300 ease-in-out hover:text-white"
          >
            Use Cases
          </Link>
          <Link
            href="/"
            className="abc-diatype-thin text-gray text-[3rem] duration-300 ease-in-out hover:text-white"
          >
            Prices
          </Link>
          <Link
            href="/"
            className="abc-diatype-thin text-gray text-[3rem] duration-300 ease-in-out hover:text-white"
          >
            About
          </Link>
          <Link
            href="/"
            className="abc-diatype-thin text-gray text-[3rem] duration-300 ease-in-out hover:text-white"
          >
            Blog
          </Link>
          <div className="absolute p-6 top-0 right-0 flex items-center gap-6">
            <button className="abc-diatype-thin text-gray text-[1.75rem] duration-300 ease-in-out hover:text-white">
              Sign In
            </button>
            <button className="px-4 abc-diatype-thin text-gray text-[1.75rem] bg-gray border border-white/20 duration-300 ease-in-out rounded">
              Get Started
            </button>
          </div>
          <div
            className="return-arrow absolute px-6 py-4 top-0 left-0 flex items-center gap-4 cursor-pointer"
            onClick={toggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="white"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </ul>
      </nav>
    </>
  );
}
