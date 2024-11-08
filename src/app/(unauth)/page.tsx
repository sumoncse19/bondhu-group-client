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
// import SocketTest from "@/components/SocketTest";
import { ImAirplane } from "react-icons/im";
import { TextGenerateEffectDemo } from "@/components/TextEffect";
import { motion } from "framer-motion";
import { BackgroundBeamsWithCollision } from "@/components/ui/BackGroundBeamsWIthColluitions";
import { TypeAnimation } from "react-type-animation";
import { FaMapPin } from "react-icons/fa";

import { MissionVisionService } from "@/components/MissionVissionService";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col gap-y-28">
      {/* welcome text */}
      <div className="pt-5  min-h-[90vh]  flex items-center px-10">
        <div className="w-full">
          <div className="w-[80%] mx-auto relative">
            <TextGenerateEffectDemo />
            {/* business icons */}
            <img
              className="w-12 h-12 absolute left-0 -top-[150px]"
              src="/images/icons/business5.png"
              alt=""
            />
            <img
              className="w-12 h-12 absolute right-0 -top-[150px]"
              src="/images/icons/business3.png"
              alt=""
            />
            <img
              className="w-12 h-12 absolute left-[75%] -bottom-[100px] -translate-x-1/2"
              src="/images/icons/business2.png"
              alt=""
            />
            <img
              className="w-12 h-12 absolute right-[50%] -translate-x-1/2 -top-[100px]"
              src="/images/icons/business1.png"
              alt=""
            />
            <img
              className="w-12 h-12 absolute left-0 -bottom-[100px]"
              src="/images/icons/business4.png"
              alt=""
            />
          </div>
        </div>
        <motion.div
          className="w-full flex justify-center items-center relative"
          initial={{ x: "300px", opacity: 0 }} // Initial position (offscreen to the left)
          animate={{ x: 0, opacity: 1 }} // Animate to final position (center)
          transition={{ duration: 1.2, ease: "easeInOut" }} // Control animation duration and easing
        >
          <div className="relative">
            <img
              className="w-[600px]  h-[500px]  rounded-lg object-cover"
              src="/images/heroBanner1.jpeg"
              alt=""
            />
            <div className="bg-rose-200 w-[200px] pb-10 absolute -top-16 -right-16  -rotate-[30deg]">
              <p
                style={{
                  fontFamily: ` "Caveat", cursive`,
                }}
                className="text-xl p-4 leading-5 text-rose-900"
              >
                Success comes to those who dare to dream, work relentlessly, and
                innovate without limits—because in business, staying ahead means
                believing in your vision and turning challenges into
                opportunities
              </p>
              <FaMapPin className="text-3xl absolute left-[50%] -translate-x-1/2 -top-4" />
              <p className="w-2 h-2 rounded-full bg-white absolute bottom-2 left-[50%] -translate-x-1/2 mr-10"></p>
              <p className="w-2 h-2 rounded-full bg-white absolute bottom-2 left-[50%] -translate-x-1/2"></p>
              <p className="w-2 h-2 rounded-full bg-white absolute bottom-2 left-[50%] -translate-x-1/2 ml-5"></p>
              <p className="w-2 h-2 rounded-full bg-white absolute bottom-2 left-[50%] -translate-x-1/2 ml-10"></p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* motivation speech */}
      <div
        style={{
          backgroundImage: `url('/images/motivationBg.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          // filter: "blur(1px)",
        }}
        className="w-full h-[500px] py-6 bg-teal-100 bg-opacity-0 flex items-center justify-center"
      >
        <div className="w-[80%] min-h-40 mx-auto flex justify-center items-center z-50 bg-black bg-opacity-70 p-3 rounded-md">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed once, initially
              "Success is not final, failure is not fatal-it’s the courage to continue that counts.Dream big, start small, and act now.",
              1000,
              "Success is not final, failure is not fatal-it’s the courage to continue that counts.Opportunities don't happen; you create them.",
              1000,
              "Success is not final, failure is not fatal-it’s the courage to continue that counts.Your only limit is the one you set yourself.",
              1000,
              "Success is not final, failure is not fatal-it’s the courage to continue that counts.",
              1000,
            ]}
            speed={1}
            style={{
              fontSize: "2.5em",
              fontFamily: "Retrograde",
              color: "yellow",
            }}
            repeat={Infinity}
          />
        </div>
      </div>

      {/* Bondhu builder intro */}
      <motion.div
        className="my-10"
        initial={{ y: "80px", opacity: 0 }} // Initial position (offscreen to the left)
        whileInView={{ y: 0, opacity: 1 }} // Animate when it comes into view
        transition={{ duration: 0.4, ease: "easeIn" }} // Smooth transition
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
                // boxShadow:
                //   "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",

                boxShadow:
                  "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
              }}
              className="rounded-full w-[500px] h-[500px] transition-all duration-1000 ease-out"
              src="/images/buildersImg1.png"
              alt="Bondhu Builders"
            />
          </div>
        </div>
      </motion.div>

      {/* all sister concerns slider */}
      <motion.div
        className="my-0"
        initial={{ y: "50px", opacity: 0 }} // Initial position (offscreen to the left)
        whileInView={{ y: 0, opacity: 1 }} // Animate when it comes into view
        transition={{ duration: 1, ease: "easeIn" }} // Smooth transition
        viewport={{ once: true, amount: 0.5 }} // Trigger only once, when 50% of the element is visible
      >
        <HomeBanner />
      </motion.div>

      {/* Our Service */}
      {/* <Services /> */}
      <MissionVisionService />

      {/* Our Projects */}
      <Projects />
    </div>
  );
};

export default HomePage;
