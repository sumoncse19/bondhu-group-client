"use client";
import RefferelBonusChart from "@/components/Charts/RefferelBonusChart";
import ShareProfitChart from "@/components/Charts/ShareProfitChart";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { RiWhatsappLine } from "react-icons/ri";
import { FaTelegram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import MatchingBonusChart from "@/components/Charts/MatchingBonusChart";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import FixedDepositChart from "@/components/Charts/FixedDepositChart";
import ShareHolderChart from "@/components/Charts/ShareHolderChart";
import useStore from "../../../Zustand/Store/userStore";
import baseUrl from "../../../../config";
import ClubBonusChart from "@/components/Charts/ClubBonusChart";
import BonusChart from "@/components/Charts/BonusChart";
import IncomeWalletPieChart from "@/components/Charts/IncomeWalletPieChart";
import PurchaseWalletChart from "@/components/Charts/PurchaseWalletChart";
import DonutChart from "@/components/Charts/PurchaseWalletChart";
import PurchaseMoneyCostingTable from "@/components/Table/PurchaseMoneyCostingTable";

const Dashboard = () => {
  const [user, setUser] = useState<any>({});
  const { singleUser, setSingleUser } = useStore();

  const have_purchase_wallet = Cookies.get("have_purchase_wallet");
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
        {/* all wallet*/}
        <div className="flex flex-wrap items-center  gap-5">
          <div className="w-full flex items-center justify-between gap-x-4">
            <div className="w-full h-40  rounded-md  flex items-center gap-4">
              {/* income wallet */}
              <div className="h-full w-full bg-purple-200 flex flex-col gap-y-2 justify-center px-6">
                <p className="text-3xl text-purple-600">
                  &#x9F3; {Math.ceil(user?.wallet?.income_wallet)}
                </p>
                <p>Income Wallet</p>
              </div>
              {/* project share wallet */}
              <div className="h-full w-full bg-blue-200 flex flex-col gap-y-2 justify-center px-6">
                <p className="text-3xl text-blue-600">
                  &#x9F3;{" "}
                  {Math.ceil(
                    user?.wallet?.project_share
                      ? user?.wallet?.project_share
                      : 0
                  )}
                </p>
                <p>Project Share Wallet</p>
              </div>
              {/*fixed deposite wallet */}
              <div className="h-full w-full bg-green-200 flex flex-col gap-y-2 justify-center px-6">
                <p className="text-3xl text-green-600">
                  &#x9F3;{" "}
                  {Math.ceil(
                    user?.wallet?.fixed_deposit
                      ? user?.wallet?.fixed_deposit
                      : 0
                  )}
                </p>
                <p>Fixed Deposite Wallet</p>
              </div>
              {/*  share holder wallet */}
              <div className="h-full w-full bg-yellow-200 flex flex-col gap-y-2 justify-center px-6">
                <p className="text-3xl text-yellow-600">
                  &#x9F3;{" "}
                  {Math.ceil(
                    user?.wallet?.share_holder ? user?.wallet?.share_holder : 0
                  )}
                </p>
                <p>Share Holder Wallet</p>
              </div>
              {/* partnership wallet */}
              <div className="h-full w-full bg-red-200 flex flex-col gap-y-2 justify-center px-6">
                <p className="text-3xl text-red-600">
                  &#x9F3;{" "}
                  {Math.ceil(
                    user?.wallet?.directorship ? user?.wallet?.directorship : 0
                  )}
                </p>
                <p>Partnership Wallet</p>
              </div>
            </div>
          </div>
        </div>

        {/* referrel bonus , matching bonus and club bonus  */}
        <div className="bg-white w-full h-fit p-3">
          <p className="text-2xl mb-2 ">Bonus</p>
          <div className="flex gap-x-9 py-4">
            <p>
              Reference &#x9F3;{" "}
              {Math.ceil(
                user?.wallet?.reference_bonus
                  ? user?.wallet?.reference_bonus
                  : 0
              )}
            </p>
            <p>
              Team &#x9F3;{" "}
              {Math.ceil(
                user?.wallet?.matching_bonus ? user?.wallet?.matching_bonus : 0
              )}
            </p>
            <p>
              Club &#x9F3;{" "}
              {Math.ceil(
                user?.wallet?.club_bonus ? user?.wallet?.club_bonus : 0
              )}
            </p>
          </div>
          {/* graph */}
          <div className="p-3 py-8 flex items-center justify-between">
            <BonusChart />
            <IncomeWalletPieChart />
          </div>
        </div>

        {/* purchase_wallet */}

        {have_purchase_wallet === "yes" && (
          <div className=" w-full flex gap-8  p-3">
            {/* purchase wallet chart */}
            <DonutChart
              percentage={parseInt(user?.wallet?.purchase_wallet) / 1000}
              purchase_wallet={user?.wallet?.purchase_wallet}
            />
            {/* purchase money costing table */}
            <div className="flex-grow">
              <PurchaseMoneyCostingTable />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
