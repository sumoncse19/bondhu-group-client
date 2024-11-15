"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import useStore from "../../../Zustand/Store/userStore";
import baseUrl from "../../../../config";
import dynamic from "next/dynamic";

const BonusChart = dynamic(
  () => import("./../../../components/Charts/BonusChart"),
  { ssr: false }
);
const IncomeWalletPieChart = dynamic(
  () => import("./../../../components/Charts/IncomeWalletPieChart"),
  {
    ssr: false,
  }
);
const DonutChart = dynamic(
  () => import("./../../../components/Charts/PurchaseWalletChart"),
  { ssr: false }
);
const PurchaseMoneyCostingTable = dynamic(
  () => import("./../../../components/Table/PurchaseMoneyCostingTable"),
  { ssr: false }
);

const Dashboard = () => {
  const [user, setUser] = useState<any>({});
  const [isClient, setIsClient] = useState(false);
  const { singleUser, setSingleUser } = useStore();

  const have_purchase_wallet = Cookies.get("have_purchase_wallet");
  const userCookie = Cookies.get("user");
  const token = Cookies.get("token");

  useEffect(() => {
    setIsClient(true); // Ensure client-side rendering
  }, []);

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
      <div className="flex flex-col gap-y-10">
        {/* All Wallet */}
        <div className="flex flex-wrap items-center gap-5">
          <div className="w-full flex items-center justify-between gap-x-4">
            <div className="w-full h-40 rounded-md flex items-center gap-4">
              {/* Income Wallet */}
              <div className="h-full w-full bg-purple-200 flex flex-col gap-y-2 justify-center px-6">
                <p className="text-3xl text-purple-600">
                  &#x9F3;{" "}
                  {user?.wallet
                    ? Math.ceil(user.wallet.income_wallet ?? 0)
                    : "--"}
                </p>
                <p>Income Wallet</p>
              </div>
              {/* Project Share Wallet */}
              <div className="h-full w-full bg-blue-200 flex flex-col gap-y-2 justify-center px-6">
                <p className="text-3xl text-blue-600">
                  &#x9F3;{" "}
                  {user?.wallet
                    ? Math.ceil(user.wallet.project_share ?? 0)
                    : "--"}
                </p>
                <p>Project Share Wallet</p>
              </div>
              {/* Fixed Deposit Wallet */}
              <div className="h-full w-full bg-green-200 flex flex-col gap-y-2 justify-center px-6">
                <p className="text-3xl text-green-600">
                  &#x9F3;{" "}
                  {user?.wallet
                    ? Math.ceil(user.wallet.fixed_deposit ?? 0)
                    : "--"}
                </p>
                <p>Fixed Deposit Wallet</p>
              </div>
              {/* Share Holder Wallet */}
              <div className="h-full w-full bg-yellow-200 flex flex-col gap-y-2 justify-center px-6">
                <p className="text-3xl text-yellow-600">
                  &#x9F3;{" "}
                  {user?.wallet
                    ? Math.ceil(user.wallet.share_holder ?? 0)
                    : "--"}
                </p>
                <p>Share Holder Wallet</p>
              </div>
              {/* Partnership Wallet */}
              <div className="h-full w-full bg-red-200 flex flex-col gap-y-2 justify-center px-6">
                <p className="text-3xl text-red-600">
                  &#x9F3;{" "}
                  {user?.wallet
                    ? Math.ceil(user.wallet.directorship ?? 0)
                    : "--"}
                </p>
                <p>Partnership Wallet</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Bonus, Matching Bonus, and Club Bonus */}
        <div className="bg-white w-full h-fit p-3">
          <p className="text-2xl mb-2">Bonus</p>
          <div className="flex gap-x-9 py-4">
            <p>
              Reference &#x9F3;{" "}
              {user?.wallet
                ? Math.ceil(user.wallet.reference_bonus ?? 0)
                : "--"}
            </p>
            <p>
              Team &#x9F3;{" "}
              {user?.wallet ? Math.ceil(user.wallet.matching_bonus ?? 0) : "--"}
            </p>
            <p>
              Club &#x9F3;{" "}
              {user?.wallet ? Math.ceil(user.wallet.club_bonus ?? 0) : "--"}
            </p>
          </div>
          {/* Graph */}
          <div className="p-3 py-8 flex items-center justify-between">
            {isClient && <BonusChart />}
            {isClient && <IncomeWalletPieChart />}
          </div>
        </div>

        {/* Purchase Wallet */}
        {isClient && have_purchase_wallet === "yes" && (
          <div className="w-full flex gap-8 p-3">
            {/* Purchase Wallet Chart */}
            <DonutChart
              percentage={
                user?.wallet
                  ? parseInt(user.wallet.purchase_wallet ?? 0) / 1000
                  : 0
              }
              purchase_wallet={user?.wallet?.purchase_wallet ?? "--"}
            />
            {/* Purchase Money Costing Table */}
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
