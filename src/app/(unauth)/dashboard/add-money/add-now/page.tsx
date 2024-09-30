"use client";
import React, { useState } from "react";
import { TiPin } from "react-icons/ti";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

const page = () => {
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [totalProjectShare, setTotalProjectShare] = useState<number>(0);
  const [fixedDepositAmount, setFixedDepositAmount] = useState<string>();

  console.log("plan", selectedPlans);

  return (
    <div className="w-full h-full p-10 text-black">
      <h1 className="text-lg tracking-widest font-bold">Pick Your Plan</h1>
      {/* plans */}

      <div className="mt-10 flex items-center gap-8">
        {/* Project Share part */}
        <div>
          {/* plan */}
          <div
            onClick={() => {
              if (selectedPlans.includes("project-share")) {
                setTotalProjectShare(0);
                const neww = selectedPlans.filter((p) => p != "project-share");
                setSelectedPlans(neww);
              } else {
                setSelectedPlans((prev) => {
                  return [...prev, "project-share"]; // Return the new array
                });
              }
            }}
            className={`w-[200px] h-[150px]  flex justify-center items-center border border-black rounded-md cursor-pointer relative ${selectedPlans.includes("project-share") && "shadow-2xl"}`}
          >
            <p className="text-xl font-bold">Project Share</p>
            {selectedPlans.includes("project-share") && (
              <TiPin className="text-6xl absolute -top-7 -right-7 text-green-600" />
            )}
          </div>
          {/* plan details */}
          <div
            className={`w-[200px] h-[150px]  mt-6 p-3 flex flex-col justify-between gap-y-3 ${!selectedPlans.includes("project-share") && "cursor-not-allowed  text-gray-500"}`}
          >
            <p>Share Price: &#2547; 10,000</p>
            <div className="flex items-center gap-4">
              <p>Pick Share</p>
              <span className="flex items-center gap-3">
                <FaCircleMinus
                  onClick={() => {
                    if (totalProjectShare == 1) {
                      return;
                    } else {
                      setTotalProjectShare(totalProjectShare - 1);
                    }
                  }}
                  className="text-xl cursor-pointer"
                />
                <p>{totalProjectShare}</p>
                <FaCirclePlus
                  onClick={() => {
                    if (totalProjectShare == 100) {
                      return;
                    } else {
                      setTotalProjectShare(totalProjectShare + 1);
                    }
                  }}
                  className="text-xl cursor-pointer"
                />
              </span>
            </div>

            <p className="text-xl ">Total: {totalProjectShare * 10000}</p>
          </div>
        </div>

        {/* Fixed Deposit part */}
        <div>
          {/* plan */}
          <div
            onClick={() => {
              if (selectedPlans.includes("fixed-deposit")) {
                setTotalProjectShare(0);
                const neww = selectedPlans.filter((p) => p != "fixed-deposit");
                setSelectedPlans(neww);
              } else {
                setSelectedPlans((prev) => {
                  return [...prev, "fixed-deposit"]; // Return the new array
                });
              }
            }}
            className={`w-[200px] h-[150px]  flex justify-center items-center border border-black rounded-md cursor-pointer relative ${selectedPlans.includes("fixed-deposit") && "shadow-2xl"}`}
          >
            <p className="text-xl font-bold">Fixed Deposit</p>
            {selectedPlans.includes("fixed-deposit") && (
              <TiPin className="text-6xl absolute -top-7 -right-7 text-green-600" />
            )}
          </div>
          {/* plan details */}
          <div
            className={`w-[200px] h-[150px]  mt-6 p-3 flex flex-col justify-between gap-y-3 ${!selectedPlans.includes("fixed-deposit") && "cursor-not-allowed  text-gray-500"}`}
          >
            <div className="flex flex-col gap-y-3">
              <label htmlFor="price">Enter Amount:</label>
              <input
                onChange={(e) => setFixedDepositAmount(e.target.value)}
                type="number"
                value={fixedDepositAmount}
                className="outline-none border border-black rounded-md bg-[#EAE9E8] px-3 "
                disabled={!selectedPlans.includes("fixed-deposit")}
              />
              {selectedPlans.includes("fixed-deposit") && (
                <p className="bg-green-700 px-3 py-0.5 rounded-md text-white font-bold text-center cursor-pointer">
                  Ok
                </p>
              )}
            </div>
          </div>
        </div>

        {/* share holder */}
        <div>
          {/* plan */}
          <div
            onClick={() => {
              if (selectedPlans.includes("share-holder")) {
                // setTotalProjectShare(0);
                const neww = selectedPlans.filter((p) => p != "share-holder");
                setSelectedPlans(neww);
              } else {
                setSelectedPlans((prev) => {
                  return [...prev, "share-holder"]; // Return the new array
                });
              }
            }}
            className={`w-[200px] h-[150px]  flex justify-center items-center border border-black rounded-md cursor-pointer relative ${selectedPlans.includes("fixed-deposit") && "shadow-2xl"}`}
          >
            <p className="text-xl font-bold">Share Holder</p>
            {selectedPlans.includes("fixed-deposit") && (
              <TiPin className="text-6xl absolute -top-7 -right-7 text-green-600" />
            )}
          </div>
          {/* plan details */}
          <div
            className={`w-[200px] h-[150px]  mt-6 p-3 flex flex-col justify-between gap-y-3 ${!selectedPlans.includes("share-holder") && "cursor-not-allowed  text-gray-500"}`}
          >
            <div className="flex flex-col gap-y-3">
              <label htmlFor="price">Enter Amount:</label>
              <input
                onChange={(e) => setFixedDepositAmount(e.target.value)}
                type="number"
                value={fixedDepositAmount}
                className="outline-none border border-black rounded-md bg-[#EAE9E8] px-3 "
                disabled={!selectedPlans.includes("fixed-deposit")}
              />
              {selectedPlans.includes("fixed-deposit") && (
                <p className="bg-green-700 px-3 py-0.5 rounded-md text-white font-bold text-center cursor-pointer">
                  Ok
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
