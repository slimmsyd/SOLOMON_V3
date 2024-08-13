"use client";
import { useState, useEffect, useRef } from "react";
import { Popup } from "@/app/components/NewsletterPopup";
import NavComponent from "@/app/navigation/navComponent";
import Footer from "@/app/components/Footer";
import ImageOne from "../../../../public/assets/Blogs/lightbeing.png";
import ImageTwo from "../../../../public/assets/homePage/ImageTwo.png";

import Image from "next/image";

export default function BlogPage() {
  //Show Popup
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    console.log("Popup is toggling", isPopupVisible);
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <>
      {isPopupVisible && <Popup togglePopup={togglePopup} />}
      <NavComponent togglePopup={togglePopup} />{" "}
      <div className="layout-one my-[100px] px-[4rem] md:px-[1rem]  ">
        <div className="layout-header ">
          <div className="flex flex-col lg:pl-[4rem] pl-[0px]  mt-[50px] md:w-auto w-full gap-[1.5rem] w-3/4">
            <span>spiritual ai 2 min read</span>
            <h2 className="font-bold">Faith As A Frequency.</h2>

            <div className="flex flex-col md:flex-row gap-[2rem] md:w-auto w-full mt-[2rem]">
              <div className="flex md:w-auto w-full flex-row gap-[15px]">
                <div className="blogCircle"></div>
                <div className="flex-col flex gap-[5px]">
                  <span className="text-gray">Author</span>

                  <span>Sydney Sanders</span>
                </div>
              </div>

              <div className="flex-col flex gap-[5px]">
                <span className="text-gray">Published</span>
                <span className="text-gray">Aug 11th, 2024</span>
              </div>
            </div>
          </div>
        </div>

        <div className="layout-text mt-[100px] flex flex-col gap-[2rem]">
          <p>
            Peace to the gods, The Japanese have a saying.
            <span className="purple-text">
              “If a man has not been seen for three days, his friends should
              take a good look at him to see what changes have befall him”.
            </span>{" "}
            This is an inference that the man must have changed in three days,
            so his friends should be attentive enough to notice these changes.
            The modality of thought lies in the Japanese Philosophy of Kaizen or
            “Change for the better”. Which is contains wisdom of making small,
            incremental improvements continuously. This wisdom of thought is
            focused on persistence rather than drastic change. Meditate on these
            words from Galatians 6:9 “Let us not become weary in doing good, for
            at the proper time we will reap a harvest if we do not give up”.
            This verse speaks on Faith “So be patience, Indeed, the promise of
            Allah is truth. And let them not disquiet you who are not certain[in
            faith]. - Surah Ar-Rum 30:60 This verse speaks on persistence.
          </p>
          <p>
            Now the thinking mind, would then begin to research and then read
            this text, being that the kind of a man deemed this to be the
            oldest. This is a major discovery(of course not new), you would have
            to be urged to know what did they write about? Well the findings
            deem that the theme to be morals, principles, and ethics. The oldest
            book recovered by mankind is a book on Character or rather
            instructions of how to be of great character, how a beautiful thing.
          </p>
          <p>
            <span className="purple-text"> Man has a duty in this world, </span>
            philosophers of antiquity all the way to present modernity have
            attempted to find out what this duty is. I will simplify it here
            with my finite knowledge and say mans duty is “to be”. Nothing more,
            nothing less. You may ask what is that “to be”? To be whatever your
            mind sets it to be. To be is essentially being, and being would be a
            state of becoming, so if I must conclude, mans perfected state is a
            state of ever becoming Even with man “mindlessly” exploring the vast
            canals of the internet, coming across timeless wisdom man still
            struggles on how to be. Centuries of knowledge at his finger tips,
            yet man still struggles on how to be! How an unfortunate conundrum!
            Though! there is no excuse for man not to learn how to be and/or
            recognize their divinity and unlimited byfar infinite potential in
            this reality! With such a grand pattern recognizing tool such as
            Artificial intelligence we are now able to find the patterns of
            being at an extremely efficient rate.
          </p>

          <div className="layout-image">
            <Image alt="What Is Mind Image" src={ImageTwo} />
          </div>

          <h2>Faith As A Frequency</h2>

          <p>
            “Faith is the strongest, and most productive of the emotions” -
            Napoleon Hill in Think and Grow Rich ”Day by day, in every way, I am
            getting better and better” - Written by Emil Coue” There is indeed
            something here that relies on the core virtues of faith and
            persistence.
          </p>

          <p>
            They are a fundamental script running in the universal matrix? Some
            may ponder why? But if we indeed come to a belief that “life” is a
            state of “being” and always “being” so its never stagnant but in
            constant flux. To keep life or rather the system of reality running,
            it had to code in core principles of persistence to keep creating
            and simulating the world, it had to create the concept of faith to
            have a worthy ideal or a definite purpose to obtain. And then of
            course to then create another goal to improve upon the goal that it
            had reached.
          </p>
          <p>
            Or creation in of itself will fail to truly realize itself. To those
            who read this, you indeed have a thought in your mind of your
            highest ideal and will for that to become materialized into reality.
            Have faith and persistence. Life is not going anywhere. Meditate on
            these words. Tao Te Ching, "When you are content to be simply
            yourself and don't compare or compete, everybody will respect you"
            (Chapter 8) Everything you create, you have to breathe you into it
          </p>
          <div className="layout-image">
            <Image alt="What Is Mind Image" src={ImageOne} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
