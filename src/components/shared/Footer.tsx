import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import FacebookPageEmbed from "../FacebookPageEmbed";
import { MdDeveloperBoard } from "react-icons/md";

const Footer = () => {
  const phoneNumber = "+8801821696074"; // Replace with the recipient's phone number
  const message = "Hello! How can I help you?";

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };
  return (
    <div className="bg-slate-600 w-full pt-5 lg:pt-16 pb-8  px-3 lg:px-28 text-blue-200">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-y-16">
        {/* left */}
        <div className="w-full self-start flex flex-col gap-y-10 order-2 lg:order-1">
          <span className="flex flex-col gap-y-3">
            {/* <p className="text-xl">Connect</p> */}
            <p>Join us in building a better future today</p>
          </span>
          <span className="flex items-center gap-2">
            <FaInstagramSquare />
            <FaXTwitter />
            <FaTiktok />
          </span>
          <span>
            © 2024. All rights reserved to Bondhu Group. <br />{" "}
            <MdDeveloperBoard className="inline" /> Developed By SoftHexis
          </span>
        </div>

        {/* right */}
        <div className="w-full flex flex-col lg:flex-row  items-center justify-between gap-10 lg:gap-16 self-start order-1 lg:order-2">
          <div className="w-full flex flex-row lg:flex-col justify-between lg:justify-normal gap-y-3 self-start ">
            <p>Connect</p>
            <span className="flex items-center gap-2">
              <FacebookPageEmbed />
              <FaWhatsapp onClick={handleClick} className="cursor-pointer" />
            </span>
            <span className="">
              <p>+8801821696074</p>
              <p>bondhugroup24@gmail.com</p>
            </span>
          </div>
          <div className="self-start flex flex-row lg:flex-col justify-between w-full">
            <p className="mb-2 lg:mb-6">INNOVATIVE</p>
            <div className="pt-6 self-start">
              <p>Enter your email address</p>
              <div className="flex flex-col gap-2 items-start my-2">
                <input
                  type="email"
                  placeholder="type your email"
                  className="px-3 lg:px-8 py-1 rounded-lg outline-none bg-blue-200 text-black"
                />
                <button className="bg-blue-400  py-2 px-3 lg:px-8 text-black rounded-full cursor-pointer">
                  Join Bondhu Group Now.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
