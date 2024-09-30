"use client";
import React, { useEffect, useRef, useState } from "react";
import { TiPin } from "react-icons/ti";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

const page = () => {
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [totalProjectShare, setTotalProjectShare] = useState<number>(0);
  const [projectShareAmount, setProjectShareAmount] = useState<number>(0);
  const [fixedDepositAmount, setFixedDepositAmount] = useState<any>();
  const [shareHolderAmount, setShareHolderAmount] = useState<any>();
  const [directorshipAmount, setDirectorshipAmount] = useState<any>();
  const [totalPlanCost, setTotalPlanCost] = useState<number>(0);

  const fixedDepositInputRef = useRef<HTMLInputElement>(null);
  const shareHolderInputRef = useRef<HTMLInputElement>(null);
  const directorshipInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProjectShareAmount(totalProjectShare * 10000);
    setTotalPlanCost(totalPlanCost + projectShareAmount);
  }, [totalProjectShare]);

  console.log(fixedDepositAmount);

  useEffect(() => {
    const addCost = (amount: number) => {
      setTotalPlanCost(totalPlanCost + amount);
    };
  }, [
    projectShareAmount,
    shareHolderAmount,
    directorshipAmount,
    fixedDepositAmount,
  ]);

  return (
    <div className="w-full h-full p-10 text-black">
      <h1 className="text-2xl text-rose-600 font-bold tracking-widest ">
        Pick Your Plan
      </h1>

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
            <div className="flex flex-col items-center gap-y-2">
              <img
                className={`w-16 h-16 ${!selectedPlans.includes("project-share") && "filter grayscale"}`}
                src="/images/projectShareIcon.png"
                alt=""
              />
              <p
                className={`text-xl ${selectedPlans.includes("project-share") ? "font-bold" : ""}`}
              >
                Project Share
              </p>
            </div>
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
                    if (selectedPlans.includes("project-share")) {
                      if (totalProjectShare == 0) {
                        return;
                      } else {
                        setTotalProjectShare(totalProjectShare - 1);
                      }
                    }
                  }}
                  className="text-xl cursor-pointer"
                />
                <p>{totalProjectShare}</p>
                <FaCirclePlus
                  onClick={() => {
                    if (selectedPlans.includes("project-share")) {
                      if (totalProjectShare == 100) {
                        return;
                      } else {
                        setTotalProjectShare(totalProjectShare + 1);
                      }
                    }
                  }}
                  className="text-xl cursor-pointer"
                />
              </span>
            </div>

            <p className="text-xl ">Total: {projectShareAmount}</p>
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
                setFixedDepositAmount("");
                setSelectedPlans(neww);
              } else {
                setSelectedPlans((prev) => {
                  return [...prev, "fixed-deposit"]; // Return the new array
                });
              }
            }}
            className={`w-[200px] h-[150px]  flex justify-center items-center border border-black rounded-md cursor-pointer relative ${selectedPlans.includes("fixed-deposit") && "shadow-2xl"}`}
          >
            <div className="flex flex-col items-center gap-y-2">
              <img
                className={`w-16 h-16 ${!selectedPlans.includes("fixed-deposit") && "filter grayscale"}`}
                src="/images/fixedDepositIcon.png"
                alt=""
              />
              <p
                className={`text-xl ${selectedPlans.includes("fixed-deposit") ? "font-bold" : ""}`}
              >
                Fixed Deposit
              </p>
            </div>
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
                ref={fixedDepositInputRef}
                type="number"
                defaultValue=""
                className="outline-none border border-black rounded-md bg-[#EAE9E8] px-3 "
                disabled={!selectedPlans.includes("fixed-deposit")}
              />
              {selectedPlans.includes("fixed-deposit") && (
                <p
                  onClick={() => {
                    if (fixedDepositInputRef.current) {
                      setFixedDepositAmount(
                        fixedDepositInputRef.current?.value
                      );
                    }
                  }}
                  className="bg-green-700 px-3 py-0.5 rounded-md hover:scale-105 hover:tracking-widest transition-all duration-300 ease-in  text-white font-bold text-center cursor-pointer"
                >
                  Submit
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
            <div className="flex flex-col items-center gap-y-2">
              <img
                className={`w-20 h-20 ${!selectedPlans.includes("share-holder") && "filter grayscale"}`}
                src="/images/shareholderIcon.png"
                alt=""
              />
              <p
                className={`text-xl ${selectedPlans.includes("share-holder") ? "font-bold" : ""}`}
              >
                Share Holder
              </p>
            </div>
            {selectedPlans.includes("share-holder") && (
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
                // onChange={(e) => setShareHolderAmount(e.target.value)}
                ref={shareHolderInputRef}
                type="number"
                defaultValue=""
                className="outline-none border border-black rounded-md bg-[#EAE9E8] px-3 "
                disabled={!selectedPlans.includes("share-holder")}
              />
              {selectedPlans.includes("share-holder") && (
                <p
                  onClick={() => {
                    if (shareHolderInputRef.current) {
                      setShareHolderAmount(shareHolderInputRef.current?.value);
                    }
                  }}
                  className="bg-green-700 px-3 py-0.5 rounded-md hover:scale-105 hover:tracking-widest transition-all duration-300 ease-in text-white font-bold text-center cursor-pointer"
                >
                  Submit
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Directorship */}
        <div>
          {/* plan */}
          <div
            onClick={() => {
              if (selectedPlans.includes("directorship")) {
                // setTotalProjectShare(0);
                const neww = selectedPlans.filter((p) => p != "directorship");
                setSelectedPlans(neww);
              } else {
                setSelectedPlans((prev) => {
                  return [...prev, "directorship"]; // Return the new array
                });
              }
            }}
            className={`w-[200px] h-[150px]  flex justify-center items-center border border-black rounded-md cursor-pointer relative ${selectedPlans.includes("fixed-deposit") && "shadow-2xl"}`}
          >
            <div className="flex flex-col items-center gap-y-2">
              <img
                className={`w-20 h-20 ${!selectedPlans.includes("directorship") && "filter grayscale"}`}
                src="/images/directorshipIcon.png"
                alt=""
              />
              <p
                className={`text-xl ${selectedPlans.includes("directorship") ? "font-bold" : ""}`}
              >
                Directorship
              </p>
            </div>
            {selectedPlans.includes("directorship") && (
              <TiPin className="text-6xl absolute -top-7 -right-7 text-green-600" />
            )}
          </div>
          {/* plan details */}
          <div
            className={`w-[200px] h-[150px]  mt-6 p-3 flex flex-col justify-between gap-y-3 ${!selectedPlans.includes("directorship") && "cursor-not-allowed  text-gray-500"}`}
          >
            <div className="flex flex-col gap-y-3">
              <label htmlFor="price">Enter Amount:</label>
              <input
                // onChange={(e) => setDirectorshipAmount(e.target.value)}
                ref={directorshipInputRef}
                type="number"
                defaultValue=""
                className="outline-none border border-black rounded-md bg-[#EAE9E8] px-3 "
                disabled={!selectedPlans.includes("directorship")}
              />
              {selectedPlans.includes("directorship") && (
                <p
                  onClick={() => {
                    if (directorshipInputRef.current) {
                      setDirectorshipAmount(
                        directorshipInputRef.current?.value
                      );
                    }
                  }}
                  className="bg-green-700 px-3 py-0.5 rounded-md hover:scale-105 hover:tracking-widest transition-all duration-300 ease-in text-white font-bold text-center cursor-pointer"
                >
                  Submit
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Plans Summary and Payment details */}
      <div className="mt-16 flex gap-x-10">
        {/* plan summary */}
        <div className="w-full min-h-[400px] bg-[#bfbdba]">
          <div className="flex items-center justify-between p-4">
            <p className="text-rose-700 font-bold text-2xl ">Plan Summary</p>
            <p className="text-lg tracking-wider">Total:{totalPlanCost}</p>
          </div>

          <div className=" flex flex-col gap-y-3">
            {projectShareAmount > 0 && (
              <div className="flex items-center justify-between bg-[#a4a29f] px-4 py-3">
                <div className="flex items-center gap-3 text-white">
                  <p>Project Share</p>
                  <p>{totalProjectShare}</p>
                </div>
                <p className="text-white">{projectShareAmount}</p>
              </div>
            )}
            {parseInt(fixedDepositAmount) > 0 && (
              <div className="flex items-center justify-between bg-[#a4a29f] px-4 py-3 text-white">
                <div className="flex items-center gap-3">
                  <p>Fixed Deposit</p>
                </div>
                <p>{fixedDepositAmount}</p>
              </div>
            )}
            {parseInt(shareHolderAmount) > 0 && (
              <div className="flex items-center justify-between bg-[#a4a29f] px-4 py-3 text-white">
                <div className="flex items-center gap-3">
                  <p>Share Holder</p>
                </div>
                <p>{shareHolderAmount}</p>
              </div>
            )}
            {parseInt(directorshipAmount) > 0 && (
              <div className="flex items-center justify-between bg-[#a4a29f] px-4 py-3 text-white">
                <div className="flex items-center gap-3 px-4">
                  <p>Directorship</p>
                </div>
                <p>{directorshipAmount}</p>
              </div>
            )}
          </div>
        </div>
        {/* payment details */}
        <div className="w-full"></div>
      </div>
    </div>
  );
};

export default page;
