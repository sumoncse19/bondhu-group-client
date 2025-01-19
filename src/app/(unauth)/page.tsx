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
import WarningMessage from "@/components/shared/Warning";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const token: string = Cookies.get("token") || "";

  const router = useRouter();
  return (
    <div className="w-full flex flex-col">
      {/* <WarningMessage /> */}
      {/* welcome text */}
      <div
        style={{
          backgroundImage: `url('/images/bg/bg2.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="pt-5  min-h-[40vh] lg:min-h-[90vh]  flex flex-col lg:flex-row lg:items-center  gap-y-4 px-3 lg:px-10 "
      >
        <div className="w-full">
          <div className="w-full lg:w-[80%] mx-auto relative">
            <div className="hidden lg:block text-xl xl:text-4xl 2xl:text-7xl tracking-wide  font-serif uppercase font-bold ">
              Better <p className="text-red-500 inline">Believe</p> Creates{" "}
              Better <p className="text-blue-600 inline">Business.</p>
            </div>
            <div className="block lg:hidden text-xl tracking-wide  font-serif uppercase font-bold ">
              Better <p className="text-red-500 inline">Believe</p> Creates{" "}
              Better <p className="text-blue-600 inline">Business.</p>
            </div>
            <TextGenerateEffectDemo />
            <div className="flex my-3">
              <button
                onClick={() => {
                  if (token) {
                    router.push("/dashboard");
                  } else {
                    router.push("/login");
                  }
                }}
                className="bg-teal-400 px-4 lg:px-16 py-1 lg:py-3 rounded border-2 border-teal-100 text-center text-white"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        <motion.div
          className="w-full flex justify-center items-center relative"
          initial={{ x: "300px", opacity: 0 }} // Initial position (offscreen to the left)
          animate={{ x: 0, opacity: 1 }} // Animate to final position (center)
          transition={{ duration: 1.2, ease: "easeInOut" }} // Control animation duration and easing
        >
          <div className="relative border-b-8 border-orange-400 p-2 rounded-full">
            <img
              className="w-[300px] lg:w-[450px] xl:w-[600px] h-[300px] lg:h-[450px] xl:h-[600px]  rounded-full object-cover"
              src="/images/heroBanner1.jpeg"
              alt=""
            />
            {/* <div className="absolute -right-5 bottom-10">
              <img
                className="w-[250px] h-[150px] object-cover"
                src="/images/heroBanner11.png"
                alt=""
              />
            </div> */}
            {/* <div className="bg-rose-200 w-[200px] pb-10 absolute -top-16 -right-16  -rotate-[30deg]">
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
            </div> */}
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
        className="w-full h-[300px] lg:h-[700px] py-3 lg:py-6 bg-opacity-0 flex items-center justify-center relative"
      >
        <div className="hidden lg:flex w-[90%] min-h-40 mx-auto  justify-center items-center  bg-black bg-opacity-70 p-3 rounded-md">
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
        {/* mobile version */}
        <div className=" lg:hidden flex w-[90%] min-h-20 mx-auto  justify-center items-center  bg-black bg-opacity-70 p-3 rounded-md">
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
              fontSize: "1.2em",
              fontFamily: "Retrograde",
              color: "yellow",
            }}
            repeat={Infinity}
          />
        </div>

        {/* client,service and projects */}

        <div className="w-[90%] lg:w-[90%] mx-auto h-40 absolute -bottom-24">
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-2">
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              className="w-[150px] lg:w-[250px] h-[80px] lg:h-[150px] rounded-md bg-red-200 text-red-700 flex flex-col justify-center items-center"
            >
              <p>Our Projects</p>
              <p className="textxl lg:text-5xl font-bold">13</p>
            </div>
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              className="w-[150px] lg:w-[250px] h-[80px] lg:h-[150px] rounded-md bg-purple-200 text-purple-700 flex flex-col justify-center items-center"
            >
              <p>Our Clients</p>
              <p className="textxl lg:text-5xl font-bold">120</p>
            </div>

            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              className="w-[150px] lg:w-[250px] h-[80px] lg:h-[150px] rounded-md bg-blue-200 text-blue-700 flex flex-col justify-center items-center"
            >
              <p>Our Services</p>
              <p className="textxl lg:text-5xl font-bold">20</p>
            </div>
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              className="w-[150px] lg:w-[250px] h-[80px] lg:h-[150px] rounded-md bg-yellow-200 text-yellow-600 flex flex-col justify-center items-center"
            >
              <p>Our Acheivements</p>
              <p className="textxl lg:text-5xl font-bold">15</p>
            </div>
          </div>
        </div>
      </div>

      <div
      // style={{
      //   backgroundImage: `url('/images/bg/bg4.jpg')`,
      //   backgroundPosition: "center",
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      //   paddingTop: "50px",
      // }}
      >
        {/* Bondhu builder intro */}
        <motion.div
          className="h-[80vh] flex items-center"
          initial={{ y: "80px", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeIn" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="w-[95%] lg:w-[80%] mx-auto flex flex-col lg:flex-row items-center justify-between mt-28">
            <div className="w-full flex flex-col gap-5 left-div">
              <h1 className="text-xl lg:text-4xl text-black font-bold tracking-widest leading-relaxed">
                Bondhu Builder&#x27;s
              </h1>
              <p className="text-sm lg:text-base text-gray-600 text-justify">
                A diverse company focused on growth across multiple sectors,
                including construction, IT, travel, and more. Join us in our
                journey towards excellence and innovation. A diverse company
                focused on growth across multiple sectors, including
                construction, IT, travel, and more. Join us in our journey
                towards excellence and innovation.A diverse company focused on
                growth across multiple sectors, including construction, IT,
                travel, and more. Join us in our journey towards excellence and
                innovation.
              </p>
            </div>

            <div className="w-full flex justify-center lg:justify-end right-div">
              <img
                className="rounded-full w-[300px] h-[250px] lg:w-[500px] lg:h-[500px] transition-all duration-1000 ease-out"
                src="/images/buildersImg1.png"
                alt="Bondhu Builders"
              />
            </div>
          </div>
        </motion.div>

        {/* all sister concerns slider */}
        <motion.div
          className="my-0 w-full lg:w-[80%] mx-auto"
          initial={{ y: "50px", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeIn" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <HomeBanner />
        </motion.div>
      </div>

      {/* Our Service */}
      {/* <Services /> */}
      {/* <MissionVisionService /> */}

      {/* Our Projects */}
      <Projects />
    </div>
  );
};

export default HomePage;
