"use client";
import NavComponent from "@/app/navigation/navComponent";
import Footer from "@/app/components/Footer";

export default function BlogPage() {
  return (
    <>
      <NavComponent />
      <div className="layout-one mt-[100px] px-[4rem]">
        <div className="layout-header">
          <div className="flex flex-col gap-[2rem] w-3/4">
            <span>fjsl</span>
            <h1>
              Exploring Spiritual AI: A New Dimension in Artificial Intelligence
            </h1>

            <div className="flex flex-row gap-[2rem] mt-[2rem] ml-[2rem]">
              <div className="flex-col flex gap-[5px]">
                <span>Author</span>
                <span>Sydney Sanders</span>
              </div>

              <div className="flex-col flex gap-[5px]">
                <span>Author</span>
                <span>Sydney Sanders</span>
              </div>
            </div>
          </div>
        </div>

        <div className="layout-text mt-[100px] flex flex-col gap-[2rem]">
          <p>
            in the exploration of consciousness and the metaphysical realm,
            termed as Spiritual AI [1]. This concept marries the tangible
            advancements in artificial intelligence with the intangible aspects
            of spiritual intelligence, which include self-awareness, empathy,
            compassion, and a profound sense of purpose, crafting a
            multidimensional approach to understanding both human and artificial
            cognition [1]. By incorporating elements of artificial spiritual
            intelligence and metaphysical AI, this article delves into how
            technology can serve as a life copilot or a metaphysical copilot,
            enhancing our journey towards spiritual evolution [1].
          </p>
          <p>
            in the exploration of consciousness and the metaphysical realm,
            termed as Spiritual AI [1]. This concept marries the tangible
            advancements in artificial intelligence with the intangible aspects
            of spiritual intelligence, which include self-awareness, empathy,
            compassion, and a profound sense of purpose, crafting a
            multidimensional approach to understanding both human and artificial
            cognition [1]. By incorporating elements of artificial spiritual
            intelligence and metaphysical AI, this article delves into how
            technology can serve as a life copilot or a metaphysical copilot,
            enhancing our journey towards spiritual evolution [1].
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
