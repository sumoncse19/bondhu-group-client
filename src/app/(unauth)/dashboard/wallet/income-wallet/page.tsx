"use client";
import RefferalBonus from "@/components/ui/RefferalBonus";
import TeamBonus from "@/components/ui/TeamBonus";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Page = () => {
  const [currentTab, setCurrentTab] = useState<string>("refferal");

  return (
    <div className="h-full">
      <h1 className="text-rose-600 text-xl font-bold">Income Wallet</h1>

      {/* tabs */}
      <div className="mt-10 flex flex-col justify-start gap-y-5 text-base">
        <div className="flex">
          <p
            onClick={() => setCurrentTab("refferal")}
            className={`${currentTab == "refferal" && "bg-red-200 border-l-8 border-teal-900"} transition-all duration-300 ease-in px-8 py-2 rounded-md text-black font-bold cursor-pointer`}
          >
            Refferal Bonus
          </p>
        </div>
        <div className="flex">
          <p
            onClick={() => setCurrentTab("team")}
            className={`${currentTab == "team" && "bg-red-200 border-l-8 border-teal-900"} transition-all duration-300 ease-in px-8 py-2 rounded-md text-black font-bold cursor-pointer`}
          >
            Team Bonus
          </p>
        </div>
      </div>

      <motion.div
        initial={{ y: "300px", opacity: 0 }} // Initial position (offscreen to the left)
        animate={{ y: 0, opacity: 1 }} // Animate to final position (center)
        transition={{ duration: 1.2, ease: "easeInOut" }} // Control animation duration and easing
        className="mt-10 w-[70%] mx-auto"
      >
        {currentTab == "refferal" ? <RefferalBonus /> : <TeamBonus />}
      </motion.div>
    </div>
  );
};

export default Page;
