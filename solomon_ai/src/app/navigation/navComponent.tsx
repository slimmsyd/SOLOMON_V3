import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import FaceIcon from "../../../public/faceIconSolomon.png";
import Image from "next/image";

interface PopupProps {
  togglePopup?: () => void;
  scrollToSection?: () => void;
  scrollToFeatures?: () => void;
}

const NavComponent: React.FC<PopupProps> = ({
  togglePopup,
  scrollToSection,
  scrollToFeatures,
}) => {
  const [animate, setAnimate] = useState(false);
  const [navState, setNavState] = useState(false);
  const navIcon = useRef<HTMLDivElement>(null);
  const mobileNav = useRef<HTMLUListElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleNav = () => {
    setNavState(!navState);
  };

  const scrolToAbout = () => {
    if (scrollToSection) {
      scrollToSection();
    }
    setNavState(!navState);
  };

  const scrollToFeaturesClose = () => {
    if (scrollToFeatures) {
      scrollToFeatures();
    }
    setNavState(!navState);
  };

  useEffect(() => {}, [navState]);

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
    <header className="w-full px-4 py-6 absolute left-0 top-0 right-0 lg:px-[2rem] xl:px-[4rem]">
      <nav className="w-full pb-4 flex items-center justify-between border-b border-white/20">
        <Link
          href="/"
          className="p-2 text-white flex flex-row gap-[15px]  items-center uppercase w-auto"
        >
          <div>
            <Image src={FaceIcon} alt="Solomon Face" width={32} height={32} />
          </div>
          SolomonAI
        </Link>
        <ul className="hidden items-center lg:flex">
          <li className="px-8 ">
            <Link
              onClick={scrollToFeaturesClose}
              href="/"
              className="text-white montserrat ease-out duration-200		 hover:text-[#4c35de]"
            >
              Features
            </Link>
          </li>
          {/* <li className="px-8">
             <Link
              href="/"
              className="text-white montserrat ease-out duration-200		 hover:text-[#4c35de]"
            >
              Pricing
            </Link> 
          </li> */}
          <li className="px-8">
            <Link
              onClick={scrollToFeaturesClose}
              href="/"
              className="text-white montserrat ease-out duration-200		 hover:text-[#4c35de]"
            >
              About
            </Link>
          </li>
          <li className="px-8">
            <Link
              href="/blog"
              className="text-white montserrat ease-out duration-200		 hover:text-[#4c35de]"
            >
              Blog
            </Link>
          </li>
          <li className="px-8">
            <Link
              href="/"
              className="text-white montserrat ease-out duration-200		 hover:text-[#4c35de]"
            >
              Changelog
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-6">
          <button
            onClick={togglePopup}
            className="px-4 py-2 border border-white flex items-center justify-center text-white montserrat rounded-sm duration-300 ease-in-out hover:text-[rgb(28,28,28)] hover:bg-white"
          >
            Join Newsletter
          </button>

          <div className="flex flex-row xl:hidden gap-[3rem] items-center ">
            {/* <Link
              onClick={togglePopup}
              href="/"
              className="px-2 py-1 md:text-[14px] !text-[12px] bg-gray border border-white/20 text-white rounded"
            >
              Join Beta
            </Link> */}
            <div
              ref={navIcon}
              onClick={toggleNav}
              className="w-[40px] h-[10px] relative z-50 flex items-center justify-between flex-col cursor-pointer xl:hidden mobileContainer"
            >
              <div className="line line1 w-[60%] h-[1.25px] rounded bg-white"></div>
              <div className="line line2 w-[60%] h-[1.25px] rounded bg-white"></div>
            </div>
          </div>

          <ul
            ref={mobileNav}
            className={`

          mobileNav
          absolute mt-[6rem] inset-0 p-6 bg-main-black w-full h-screen flex items-start justify-start flex-col  uppercase transition-transform duration-[1s] ease-in-out ${
            navState
              ? " pointer-events-auto opacity-100 "
              : " pointer-events-none opacity-0"
          }`}
          >
            <Link href="/" className="mobileNavLink">
              <span className="text-gray  capitalize duration-300 ease-in-out hover:text-white">
                Home
              </span>
            </Link>

            {/* <Link        href="/" className="mobileNavLink">

          <span
            className=" text-gray text-[3rem] capitalize duration-300 ease-in-out hover:text-white"
          >
            Prices
          </span>

          </Link> */}

            <Link
              onClick={scrollToFeaturesClose}
              href="/"
              className="mobileNavLink"
            >
              <span className=" text-gray  capitalize duration-300 ease-in-out hover:text-white">
                Features
              </span>
            </Link>

            {/* <Link href="/blogs/unifiedGod" className="mobileNavLink">
              <span className=" text-gray  capitalize duration-300 ease-in-out hover:text-white">
                Pricing
              </span>
            </Link> */}
            <Link onClick={scrolToAbout} href="/" className="mobileNavLink">
              <span className=" text-gray  capitalize duration-300 ease-in-out hover:text-white">
                About
              </span>
            </Link>

            <Link href="/blog" className="mobileNavLink">
              <span className=" text-gray  capitalize duration-300 ease-in-out hover:text-white">
                Blog
              </span>
            </Link>
            <Link href="/blog" className="mobileNavLink">
              <span className=" text-gray  capitalize duration-300 ease-in-out hover:text-white">
                Changelog
              </span>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavComponent;
