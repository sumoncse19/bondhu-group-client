"use client";

import Hero from "@/components/ui/Hero";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import Button from "../../components/shared/Button";
import Services from "@/components/ui/Services";
import Projects from "@/components/ui/Projects";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const leftDivRef = useRef(null);
  const rightDivRef = useRef(null);

  const companies = [
    "Bondhu Group-1",
    "Bondhu Group-2",
    "Bondhu Group-3",
    "Bondhu Group-4",
    "Bondhu Group-5",
    "Bondhu Group-6",
    "Bondhu Group-7",
    "Bondhu Group-8",
    "Bondhu Group-9",
    "Bondhu Group-10",
    "Bondhu Group-11",
    "Bondhu Group-12",
  ];

  return (
    <div className="">
      {/* Hero section */}
      <Hero />

      {/* Bondhu builder intro */}
      <div className="my-24">
        <div className=" w-[80%] mx-auto flex items-center gap-10">
          {/* left div */}
          <div ref={leftDivRef} className="w-full flex flex-col gap-5 left-div">
            <h1 className="text-4xl text-black font-bold tracking-widest leading-relaxed">
              Welcome to <br /> Bondhu Builders LTD
            </h1>
            <p className="text-gray-600">
              A diverse company focused on growth across multiple sectors,
              including construction, IT, travel, and more. Join us in our
              journey towards excellence and innovation.
            </p>
            <Button />
          </div>

          {/* right div */}
          <div
            ref={rightDivRef}
            className="w-full flex justify-center right-div"
          >
            <img
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
              }}
              className="rounded-full w-[500px] h-[500px] hover:rotate-[360deg] transition-all duration-500 ease-out"
              src="/images/buildersImg1.avif"
              alt="Bondhu Builders"
            />
          </div>
        </div>
      </div>

      {/* Our Service */}
      <Services />

      {/* Our Projects */}
      <Projects />
    </div>
  );
};

export default HomePage;
