import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import FacebookPageEmbed from "../FacebookPageEmbed";

const Footer = () => {
  const phoneNumber = "+8801600362935"; // Replace with the recipient's phone number
  const message = "Hello! How can I help you?";

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };
  return (
    <div className="bg-slate-600 w-full mt-20 pt-16 pb-8 px-28 text-blue-200 hidden lg:block">
      <div className="flex items-center justify-between">
        {/* left */}
        <div className="flex flex-col gap-y-10">
          <span className="flex flex-col gap-y-3">
            {/* <p className="text-xl">Connect</p> */}
            <p>Join us in building a better future today</p>
          </span>
          <span className="flex items-center gap-2">
            <FaInstagramSquare />
            <FaXTwitter />
            <FaTiktok />
          </span>
          <span>© 2024. All rights reserved.</span>
        </div>

        {/* right */}
        <div className="flex items-center gap-16 self-start">
          <div className="flex flex-col gap-y-3 self-start">
            <p>Connect</p>
            <span className="flex items-center gap-2">
              <FacebookPageEmbed />
              <FaWhatsapp onClick={handleClick} className="cursor-pointer" />
            </span>
            <span className="">
              <p>+8801600362935</p>
              <p>bondhugroup24@gmail.com</p>
            </span>
          </div>
          <div className="">
            <p className="mb-6">INNOVATIVE</p>
            <span className="pt-6">
              <p>Enter your email address</p>
              <div className="flex flex-col gap-2 items-start my-2">
                <input
                  type="email"
                  placeholder="type your email"
                  className="px-6 py-1 rounded-lg outline-none bg-blue-200 text-black"
                />
                <button className="bg-blue-400  py-2 px-8 text-black rounded-full cursor-pointer">
                  Join Bondhu Group Now.
                </button>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
