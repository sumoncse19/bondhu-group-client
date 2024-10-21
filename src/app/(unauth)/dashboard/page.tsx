"use client";
import RefferelBonusChart from "@/components/Chats/RefferelBonusChart";
import ShareProfitChart from "@/components/Chats/ShareProfitChart";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { RiWhatsappLine } from "react-icons/ri";
import { FaTelegram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import MatchingBonusChart from "@/components/Chats/MatchingBonusChart";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import FixedDepositChart from "@/components/Chats/FixedDepositChart";
import ShareHolderChart from "@/components/Chats/ShareHolderChart";
import useStore from "../../../Zustand/Store/userStore";
import baseUrl from "../../../../config";

const Dashboard = () => {
  const [user, setUser] = useState<any>({});
  const { setSingleUser } = useStore();
  const userCookie = Cookies.get("user");
  const token = Cookies.get("token");

  // fetch single user
  const fetchSingleUser = async (id: string) => {
    const response = await fetch(`${baseUrl}/user/get-user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data?.success) {
      setUser(data?.data);
      setSingleUser(data?.data);
    }
  };

  useEffect(() => {
    if (userCookie) {
      try {
        let userParse: any = JSON.parse(userCookie); // Parse safely
        fetchSingleUser(userParse?._id);
      } catch (error) {
        console.error("Failed to parse user cookie:", error);
      }
    }
  }, [userCookie]);

  return (
    <div className="w-full h-full">
      <div className=" flex flex-col gap-y-10">
        {/* name intro, my invest,share profit */}
        <div className="flex flex-wrap items-center  gap-5">
          <div className="w-full flex items-center justify-between gap-x-4">
            {/* name intro */}
            <div className="w-[60%] h-60  rounded-md p-5 hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
              <div className="flex gap-x-6 h-full">
                <div className="w-[50%] flex flex-col gap-y-7 ">
                  <div className="flex gap-x-3">
                    <img
                      className="w-20 h-20"
                      src="/images/profilePicIcon.png"
                      alt=""
                    />
                    <span className="flex self-center flex-col gap-y-2">
                      <p className="text-black font-bold">Welcome Back</p>
                      <p className="text-slate-600">{user && user?.name}</p>
                    </span>
                  </div>

                  <div className="flex items-center gap-6 ml-20 ">
                    <div className="text-black  flex flex-col gap-y-2">
                      <p>
                        &#x9F3;
                        {user?.wallet?.income_wallet
                          ? user?.wallet?.income_wallet
                          : 0}
                      </p>
                      <p>Income Wallet</p>
                      <p className="w-[60px] h-2 rounded-md bg-green-600" />
                    </div>
                    <div className="text-black flex flex-col gap-y-1">
                      <p>
                        &#x9F3;{" "}
                        {user?.wallet?.purchase_wallet
                          ? user?.wallet?.purchase_wallet
                          : 0}
                      </p>
                      <p>Purchase Wallet</p>
                      <p className="w-[80px] h-2 rounded-md bg-red-700" />
                    </div>
                  </div>
                </div>
                <div className="w-[50%] h-full flex justify-center items-center">
                  <img
                    className="w-[70%]"
                    src="/images/dashboardImg1.png"
                    alt=""
                  />
                </div>
              </div>
              <div></div>
            </div>

            {/* invest part */}
            <div className="w-[40%] h-60  p-5 rounded-md text-slate-700 hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
              <div className="h-full flex flex-col justify-between gap-y-2">
                <div className=" flex flex-col justify-between">
                  <p className="font-bold">&#x9F3; 0.00</p>
                  <p className="text-rose-700 font-bold">My Invest</p>
                </div>
                <div className=" flex justify-center items-center ">
                  <div className="w-[100px] h-[100px] rounded-full border-4 border-yellow-500 flex justify-center items-center p-1">
                    <div className="text-center">
                      <p className="text-sm">Total Orders</p>
                      <p className="text-sm">21%</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="inline font-bold">&#x9F3; 0.00</p>
                  <p className="inline ml-3">from last month</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between w-full gap-10">
            <div className="w-full flex items-center gap-10">
              {/*share profit part */}
              <div className="w-full h-60  p-5 rounded-md text-slate-700 hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
                <div className="h-full flex flex-col justify-between gap-y-2">
                  <div className=" flex flex-col justify-between">
                    <p className="font-bold">&#x9F3; 0.00</p>
                    <p className="text-rose-700 font-bold">Share Profit</p>
                  </div>
                  <div className="w-full h-40 flex justify-center items-center">
                    <ShareProfitChart />
                  </div>
                  <div>
                    <p className="inline font-bold">&#x9F3; 0.00</p>
                    <p className="inline ml-3">from last month</p>
                  </div>
                </div>
              </div>
              {/* fixed deposit part */}
              <div className="w-full h-60  p-5 rounded-md text-slate-700 hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
                <div className="h-full flex flex-col justify-between gap-y-2">
                  <div className=" flex flex-col justify-between">
                    <p className="font-bold">&#x9F3; 0.00</p>
                    <p className="text-rose-700 font-bold">Fixed Deposit</p>
                  </div>
                  <div className="w-full h-40 flex justify-center items-center">
                    <FixedDepositChart />
                  </div>
                  <div>
                    <p className="inline font-bold">&#x9F3; 0.00</p>
                    <p className="inline ml-3">from last month</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center gap-10">
              {/* share holder part */}
              <div className="w-full h-60  p-5 rounded-md text-slate-700 hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
                <div className="h-full flex flex-col justify-between gap-y-2">
                  <div className=" flex flex-col justify-between">
                    <p className="font-bold">&#x9F3; 0.00</p>
                    <p className="text-rose-700 font-bold">Share Holder</p>
                  </div>
                  <div className="w-full h-40 flex justify-center items-center">
                    <ShareHolderChart />
                  </div>
                  <div>
                    <p className="inline font-bold">&#x9F3; 0.00</p>
                    <p className="inline ml-3">from last month</p>
                  </div>
                </div>
              </div>
              {/* directorship part */}
              <div className="w-full h-60  p-5 rounded-md text-slate-700 hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
                <div className="h-full flex flex-col justify-between gap-y-2">
                  <div className=" flex flex-col justify-between">
                    <p className="font-bold">&#x9F3; 0.00</p>
                    <p className="text-rose-700 font-bold">Directorship</p>
                  </div>
                  <div className="w-full h-40 flex justify-center items-center">
                    <ShareProfitChart />
                  </div>
                  <div>
                    <p className="inline font-bold">&#x9F3; 0.00</p>
                    <p className="inline ml-3">from last month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* referrel bonus , matching bonus and get in touch  */}

        <div className="flex items-center gap-2">
          {/* referrel bonus , matching bonus */}
          <div className="w-[60%]">
            <div className="w-full flex items-center gap-3">
              {/* referrel bonus */}
              <div className="w-full h-60  p-5 rounded-md text-slate-700 hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">&#x9F3; 0.00</p>
                    <p className="text-rose-700 font-bold">Refferel Bonus</p>
                  </div>
                  <div className="px-2 h-8 bg-green-700 shadow-lg cursor-pointer rounded-sm flex justify-center items-center">
                    <p className="text-white text-sm font-bold">View</p>
                  </div>
                </div>
                <div className="w-full h-28 mt-6">
                  <RefferelBonusChart />
                </div>
              </div>
              {/* team bonus */}
              <div className="w-full h-60  p-5 rounded-md text-slate-700 hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">&#x9F3; 0.00</p>
                    <p className="text-rose-700 font-bold">Team Bonus</p>
                  </div>
                  <div className="px-2 h-8 bg-green-700 shadow-lg rounded-sm cursor-pointer flex justify-center items-center">
                    <p className="text-white text-sm font-bold">View</p>
                  </div>
                </div>
                <div className="w-full h-28 mt-6">
                  <MatchingBonusChart />
                </div>
              </div>
            </div>
          </div>
          {/*  get in touch */}
          <div className="w-[40%] h-60 p-5 rounded-md text-slate-700 hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
            <div>
              <p className="text-rose-700 font-bold text-lg">Get in touch</p>
              <div className="mt-10 flex justify-center items-center">
                <div className="flex items-center gap-3">
                  <FaFacebook
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                    }}
                    className="text-4xl text-blue-700 rounded-full cursor-pointer  hover:scale-110 transition-all duration-300 ease-in"
                  />
                  <FaTwitter
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                    }}
                    className="text-4xl bg-blue-500 p-2 rounded-full text-white cursor-pointer  hover:scale-110 transition-all duration-300 ease-in"
                  />
                  <FaTelegram
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                    }}
                    className="text-4xl rounded-full text-blue-500 cursor-pointer  hover:scale-110 transition-all duration-300 ease-in"
                  />
                  <IoLogoYoutube
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                    }}
                    className="text-4xl bg-red-500 p-1.5 rounded-full text-white cursor-pointer  hover:scale-110 transition-all duration-300 ease-in"
                  />
                  <IoMail
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                    }}
                    className="text-4xl bg-red-600 p-2 rounded-full text-white cursor-pointer  hover:scale-110 transition-all duration-300 ease-in"
                  />
                  <RiWhatsappLine
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                    }}
                    className="text-4xl bg-green-500 p-1 rounded-full text-white cursor-pointer  hover:scale-110 transition-all duration-300 ease-in"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
