"use client";

import axios, { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import baseUrl from "../../../../../config";
import Cookies from "js-cookie";
import { Circles } from "react-loader-spinner";
import toast from "react-hot-toast";
import ProjectShareProfit from "@/components/ui/SendProfit/ProjectShareProfit";
import FixedDepositChart from "@/components/Charts/FixedDepositChart";
import FixedDepositProfit from "@/components/ui/SendProfit/FixedDepositProfit";
import ShareHolderProfit from "@/components/ui/SendProfit/ShareHolderProfit";
import PartnershipProfit from "@/components/ui/SendProfit/PartnershipProfit";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface ShareHolderHistoriesInterface {
  name: string;
  _id: string;
  user_name: string;
  payment_method: string;
  money_receipt_number: string;
  share_holder_amount: number;
  payment_date: string;
  is_paid: boolean;
  createdAt: string;
}

const Page: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>("share-holder");

  return (
    <div className="">
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-5">
        {["project-share", "fixed-deposit", "share-holder", "partnership"].map(
          (tab) => (
            <div
              key={tab}
              onClick={() => setCurrentTab(tab)}
              style={{
                boxShadow:
                  currentTab === tab
                    ? "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                    : "none",
              }}
              className={`${
                currentTab === tab ? "bg-teal-400" : "border-2 border-slate-500"
              } px-3 lg:px-6 py-2 rounded-3xl text-center cursor-pointer`}
            >
              {tab
                .split("-")
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(" ")}
              Profit
            </div>
          )
        )}
      </div>
      {/* profit table */}
      {currentTab === "project-share" ? (
        <ProjectShareProfit />
      ) : currentTab === "fixed-deposit" ? (
        <FixedDepositProfit />
      ) : currentTab === "share-holder" ? (
        <ShareHolderProfit />
      ) : (
        currentTab === "partnership" && <PartnershipProfit />
      )}
    </div>
  );
};

export default Page;
