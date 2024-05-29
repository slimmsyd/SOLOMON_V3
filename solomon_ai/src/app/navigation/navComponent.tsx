import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import FaceIcon from '../../../public/faceIconSolomon.png'
import Image from "next/image";

interface PopupProps {
  togglePopup?: () => void;
}

const NavComponent: React.FC<PopupProps> = ({ togglePopup }) => {
  const [animate, setAnimate] = useState(false);
  const [navState, setNavState] = useState(false);
  const navIcon = useRef<HTMLDivElement>(null);
  const mobileNav = useRef<HTMLUListElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleNav = () => {
    setNavState(!navState);
  };

  useEffect(() => {
    if (navState) {
      navRef.current?.classList.add("black-bg");
    } else {
      navRef.current?.classList.remove("black-bg");
    }
  }, [navState]);

  useEffect(() => {
    if (navState) {
      gsap.to(".line1", {
        rotation: 45,
        y: 3,
        transformOrigin: "center",
        duration: 0.3,
      });
      gsap.to(".line2", {
        rotation: -45,
        y: -6,
        transformOrigin: "center",
        duration: 0.3,
      });
    } else {
      gsap.to(".line1", {
        rotation: 0,
        y: 0,
        duration: 0.3,
      });
      gsap.to(".line2", {
        rotation: 0,
        y: 0,
        duration: 0.3,
      });
    }
  }, [navState]);

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
        ref={navRef}
        className={
          animate
            ? "fixed left-0 top-0 w-full px-6  flex items-center justify-between bg-main-transparent z-[9] slide-in"
            : "fixed left-0 top-0 w-full px-6  flex items-center justify-between bg-main-transparent z-[9] slide-out"
        }
      >
        <Link
          href="/"
          className="p-2 text-white flex flex-row gap-[15px]  items-center text-4xl uppercase lg:text-[2.75rem] xl:text-[3rem  md:w-[280px] w-auto"
        >
          <div>
            <Image src = {FaceIcon}
            alt = "Solomon Face"
            width={32}
            height = {32}
            />
          </div>
          SolomonAI
        </Link>
        <ul className="hidden items-center gap-[3rem] xl:flex">
          <Link
            href="/"
            className="abc-diatype-Regular text-gray text-[1.75rem] duration-300 ease-in-out hover:text-white"
          >
            Home
          </Link>
          <Link
            onClick={togglePopup}
            href="/"
            className="abc-diatype-Regular text-gray text-[1.75rem] duration-300 ease-in-out hover:text-white"
          >
            Join Beta
          </Link>
          {/* <Link
            href="/"
            className="abc-diatype-Regular text-gray text-[1.75rem] duration-300 ease-in-out hover:text-white"
          >
            Prices
          </Link> */}
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
        <div className="hidden items-center justify-end gap-8 xl:flex w-[280px]">
          <div className="flex items-center justify-end	  gap-4">
            {/* <Link
              href="/login"
              className="abc-diatype-Regular text-gray text-[1.75rem] duration-300 ease-in-out hover:text-white"
            >
              Sign In
            </Link> */}
            <Link
              onClick={togglePopup}
              href="/"
              className="px-2 py-1 abc-diatype-Regular bg-gray border border-white/20 text-white text-[1.75rem] rounded  hover:bg-transparent hover:border-white/60"
            >
              Join Beta
            </Link>
          </div>
        </div>

        <div className="flex flex-row xl:hidden gap-[3rem] items-center ">
          <Link
            onClick={togglePopup}
            href="/"
            className="px-2 py-1 md:text-[14px] !text-[12px] bg-gray border border-white/20 text-white rounded"
          >
            Join Beta
            {/* Get Started */}
          </Link>
          <div
            ref={navIcon}
            onClick={toggleNav}
            className="w-[40px] h-[10px] relative z-50 flex items-center justify-between flex-col cursor-pointer xl:hidden"
          >
            <div className="line line1 w-[60%] h-[1.25px] rounded bg-white"></div>
            <div className="line line2 w-[60%] h-[1.25px] rounded bg-white"></div>
          </div>
        </div>

        <ul
          ref={mobileNav}
          className={`
          
          mobileNav
          absolute mt-[3rem] inset-0 p-6 bg-main-black w-full h-screen flex items-start justify-start flex-col  uppercase transition-transform duration-[1s] ease-in-out ${
            navState
              ? " pointer-events-auto opacity-100 "
              : " pointer-events-none opacity-0"
          }`}
        >
          <Link href="/" className="mobileNavLink">
            <span className="text-gray text-[3rem] capitalize duration-300 ease-in-out hover:text-white">
              Home
            </span>
          </Link>

          <Link onClick={togglePopup} href="/" className="mobileNavLink">
            <span className=" text-gray text-[3rem] capitalize duration-300 ease-in-out hover:text-white">
              {/* Use Cases */}
              Join Beta
            </span>
          </Link>

          {/* <Link        href="/" className="mobileNavLink">

          <span
            className=" text-gray text-[3rem] capitalize duration-300 ease-in-out hover:text-white"
          >
            Prices
          </span>

          </Link> */}

          <Link href="/" className="mobileNavLink">
            <span className=" text-gray text-[3rem] capitalize duration-300 ease-in-out hover:text-white">
              About
            </span>
          </Link>

          <Link href="/" className="mobileNavLink">
            <span className=" text-gray text-[3rem] capitalize duration-300 ease-in-out hover:text-white">
              Blog
            </span>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default NavComponent;
