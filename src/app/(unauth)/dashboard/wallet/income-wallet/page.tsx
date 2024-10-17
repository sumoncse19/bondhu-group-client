"use client";
import RefferalBonus from "@/components/ui/RefferalBonus";
import TeamBonus from "@/components/ui/TeamBonus";
import React, { useState } from "react";

const Page = () => {
  const [currentTab, setCurrentTab] = useState<string>("refferal");

  return (
    <div className="p-10">
      <h1 className="text-rose-600 text-2xl font-bold">Income Wallet</h1>

      {/* tabs */}
      <div className="mt-10 flex flex-col justify-start gap-y-5 text-lg">
        <div className="flex">
          <p
            onClick={() => setCurrentTab("refferal")}
            className={`${currentTab == "refferal" && "bg-red-200 border-l-8 border-teal-900"} px-8 py-2 rounded-md text-black font-bold cursor-pointer`}
          >
            Refferal Bonus
          </p>
        </div>
        <div className="flex">
          <p
            onClick={() => setCurrentTab("team")}
            className={`${currentTab == "team" && "bg-red-200 border-l-8 border-teal-900"} px-8 py-2 rounded-md text-black font-bold cursor-pointer`}
          >
            Team Bonus
          </p>
        </div>
      </div>

      <div className="mt-10 w-[70%] mx-auto">
        {currentTab == "refferal" ? <RefferalBonus /> : <TeamBonus />}
      </div>
    </div>
  );
};

export default Page;
