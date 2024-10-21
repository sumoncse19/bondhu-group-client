"use client";

import Hero from "@/components/ui/Hero";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/shared/Button";
import Services from "@/components/ui/Services";
import Projects from "@/components/ui/Projects";
import HomeBanner from "@/components/ui/HomeBanner";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { io, Socket } from "socket.io-client";
import baseUrl from "../../../config";
import SocketTest from "@/components/SocketTest";
import { ImAirplane } from "react-icons/im";
import { TextGenerateEffectDemo } from "@/components/TextEffect";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Hero section */}
      {/* <Hero /> */}
      <div>{/* <HomeBanner /> */}</div>

      {/* welcome text */}

      <div className="pt-5  min-h-[90vh]  flex items-center px-10">
        <div className="w-full ">
          <div className="w-[80%] mx-auto relative">
            <ImAirplane className="absolute -top-6 -left-10 text-4xl text-red-600" />
            <TextGenerateEffectDemo />
          </div>
        </div>
        <motion.div
          className="w-full flex justify-center items-center relative"
          initial={{ x: "300px", opacity: 0 }} // Initial position (offscreen to the left)
          animate={{ x: 0, opacity: 1 }} // Animate to final position (center)
          transition={{ duration: 1.2, ease: "easeInOut" }} // Control animation duration and easing
        >
          <img
            className="w-[600px] h-[500px] rounded-lg object-cover"
            src="/images/heroBanner1.jpeg"
            alt=""
          />
          {/* <HomeBanner /> */}

          {/* <div className="w-20 h-20 rounded-full bg-white absolute -top-8 left-3 z-50"></div>
          <div className="w-20 h-20 rounded-full bg-white absolute -top-8 right-3 z-50"></div>
          <div className="w-20 h-20 rounded-full bg-white absolute -bottom-8 left-3 z-50"></div>
          <div className="w-20 h-20 rounded-full bg-white absolute -bottom-8 right-3 z-50"></div> */}
        </motion.div>
      </div>

      <motion.div
        initial={{ y: "100px", opacity: 0 }} // Initial position (offscreen to the left)
        whileInView={{ y: 0, opacity: 1 }} // Animate when it comes into view
        transition={{ duration: 1.5, ease: "easeIn" }} // Smooth transition
        viewport={{ once: true, amount: 0.5 }} // Trigger only once, when 50% of the element is visible
      >
        <HomeBanner />
      </motion.div>

      {/* <SocketTest /> */}
      {/* Bondhu builder intro */}
      <motion.div
        className="my-24"
        initial={{ y: "100px", opacity: 0 }} // Initial position (offscreen to the left)
        whileInView={{ y: 0, opacity: 1 }} // Animate when it comes into view
        transition={{ duration: 0.5, ease: "easeIn" }} // Smooth transition
        viewport={{ once: true, amount: 0.5 }} // Trigger only once, when 50% of the element is visible
      >
        <div className=" w-[90%] mx-auto flex items-center justify-between">
          {/* left div */}
          <div className="w-full flex flex-col gap-5 left-div">
            <h1 className="text-4xl text-black font-bold tracking-widest leading-relaxed">
              Bondhu Builder&#x27;s
            </h1>
            <p className="text-gray-600">
              A diverse company focused on growth across multiple sectors,
              including construction, IT, travel, and more. Join us in our
              journey towards excellence and innovation.
            </p>
            <Button />
          </div>

          {/* noti */}
          {/* <div>{notifications?.map((noti) => <p key={noti}>{noti}</p>)}</div> */}

          {/* right div */}
          <div className="w-full flex justify-end right-div">
            <img
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
              }}
              className="rounded-full w-[500px] h-[500px] transition-all duration-1000 ease-out"
              src="/images/buildersImg1.png"
              alt="Bondhu Builders"
            />
          </div>
        </div>
      </motion.div>

      {/* Our Service */}
      <Services />

      {/* Our Projects */}
      <Projects />
    </div>
  );
};

export default HomePage;
