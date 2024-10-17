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

const HomePage = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chatMessages, setChatMessages] = useState<[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

  const id: string = Cookies.get("id") || "";

  useEffect(() => {
    // Connect to the socket server
    const socketIO = io(baseUrl, {
      // transports: ["polling"], // Force using HTTP polling
    });

    setSocket(socketIO);

    console.log(socketIO);

    // Register the userId with the server after the connection is established
    socketIO.emit("register", id); // Replace with actual userId

    // Listen for chat messages
    // socketIO.on("chatMessage", (data) => {
    //   console.log("Received chat message:", data.content);
    //   setChatMessages((prevMessages) => [...prevMessages, data.content]);
    // });

    // Listen for notifications
    socketIO.on("notification", (data) => {
      console.log("Received notification:", data.message);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        data.message,
      ]);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socketIO.disconnect();
    };
  }, []);

  return (
    <div className="w-full">
      {/* Hero section */}
      {/* <Hero /> */}
      <div>
        <HomeBanner />
      </div>

      {/* Bondhu builder intro */}
      <div className="my-24">
        <div className=" w-[80%] mx-auto flex items-center gap-10">
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
          <div>{notifications?.map((noti) => <p key={noti}>{noti}</p>)}</div>

          {/* right div */}
          <div className="w-full flex justify-center right-div">
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
      </div>

      {/* Our Service */}
      <Services />

      {/* Our Projects */}
      <Projects />
    </div>
  );
};

export default HomePage;
