"use client";
import React, { useEffect, useState } from "react";
import ProjectShareInvestChart from "./Charts/ProjectShareInvestChart";
import FixedDepositInvestChart from "./Charts/FixedDepositInvestChart";
import ShareHolderInvestChart from "./Charts/ShareHolderInvestChart";
import AllInvestmentBar from "./Charts/AllInvestmentBar";
import toast from "react-hot-toast";
import baseUrl from "../../config";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import IncomeWalletPieChart from "./Charts/IncomeWalletPieChart";
import dynamic from "next/dynamic";
import LeadersClubMemberTable from "./shared/LeadersClubMemberTable";
import { AddMoneyHistoriesInterface } from "@/type";
// import DonutChart from "./Charts/PurchaseWalletChart";

const DonutChart = dynamic(() => import("./Charts/PurchaseWalletChart"), {
  ssr: false,
});

const Test: React.FC<any> = ({ user }) => {
  const [addMoneyHistories, setAddMoneyHistories] = useState<
    AddMoneyHistoriesInterface[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // get cookies value
  const id = Cookies.get("id");
  const have_purchase_wallet = Cookies.get("have_purchase_wallet");
  const role = Cookies.get("role");
  const userCookie = Cookies.get("user");
  const token = Cookies.get("token");

  const router = useRouter();

  const totalBalance = () => {
    const sum =
      user?.wallet?.reference_bonus +
      user?.wallet?.matching_bonus +
      user?.wallet?.club_bonus +
      user?.wallet?.project_share_wallet +
      user?.wallet?.fixed_deposit_wallet +
      user?.wallet?.share_holder_wallet +
      user?.wallet?.directorship_wallet;

    return Math.ceil(sum.toFixed(2));
  };

  const totalWalletSum = Object.values(user?.wallet || {}).reduce(
    (sum: any, value: any) => sum + (typeof value === "number" ? value : 0),
    0
  );

  const investmentData = [
    {
      name: "",
      Project_Share: user?.accountable?.project_share,
      Fixed_Deposit: user?.accountable?.fixed_deposit,
      Share_Holder: user?.accountable?.share_holder,
      Partnership: user?.accountable?.directorship,
    },
  ];

  const profitData = [
    {
      name: "Reference Bonus",
      value: Math.ceil(user?.wallet?.reference_bonus),
      color: "#FAB12F",
    },
    {
      name: "Team Bonus",
      value: Math.ceil(user?.wallet?.matching_bonus),
      color: "#82ca9d",
    },
    { name: "Club Bonus", value: user?.wallet?.club_bonus, color: "#003161" },
    {
      name: "Project Share Profit",
      value: Math.ceil(user?.wallet?.project_share_wallet),
      color: "#8174A0",
    },
    {
      name: "Fixed Deposit Profit",
      value: Math.ceil(user?.wallet?.fixed_deposit_wallet),
      color: "#9ABF80",
    },
    {
      name: "Share Holder Profit",
      value: Math.ceil(user?.wallet?.share_holder_wallet),
      color: "#9694FF",
    },
    {
      name: "Partnership Profit",
      value: Math.ceil(user?.wallet?.directorship_wallet),
      color: "#ccd618",
    },
  ];

  const fetchAddMoneyHistories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/history/get-add-money-history/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data?.success) {
        setAddMoneyHistories(data?.data?.addMoneyHistories);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddMoneyHistories();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full">
      {/* 1st col */}
      <div className="col-span-1 flex flex-col gap-4 p-0 lg:p-2">
        {/* card */}
        <div
          style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
          className="bg-white p-4 rounded-md"
        >
          <p className="pb-5">My Card</p>
          <div
            style={{
              backgroundImage: `url("/images/card-bg.svg")`,
            }}
            className="w-full h-52 bg-cover bg-no-repeat rounded-md p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-gray-400">Bondhu Card</p>
                <p className="text-white">{user?.user_name || "--"}</p>
              </div>
              <div className="flex">
                <p className="w-6 h-6 rounded-full bg-rose-400"></p>
                <p className="w-6 h-6 rounded-full bg-teal-400 -ml-3"></p>
              </div>
            </div>
            <div className="my-6 text-white text-xl">**** **** ***** ****</div>
            <div className="my-3 text-white flex items-center gap-5">
              <div className="flex flex-col gap-0.5">
                <p className="text-gray-400">Issue</p>
                <p className="text-white">{user?.registration_date || "---"}</p>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-gray-400">Security Code</p>
                <p className="text-white">{user?.security_code || "---"}</p>
              </div>
            </div>
          </div>
          {/* cards below part */}
          <div className="pt-3 flex justify-center">
            <div className="flex flex-col items-center">
              <p className="text-2xl">&#x9F3; {totalBalance() || "0.00"}</p>
              <p className="text-xs">Total Balance</p>
            </div>
          </div>
        </div>
        {/*latest investment */}
        <div
          style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
          className="bg-white p-4 rounded-md"
        >
          <p className="font-medium">Latest Investment</p>
          <div className="flex flex-col my-4">
            {addMoneyHistories?.length <= 0 && (
              <div className="flex flex-col items-center">
                <p className="text-red-500">You dont have any investment.</p>
                <img src="/images/emptyFile.jpg" alt="" className="w-52" />
              </div>
            )}
            {addMoneyHistories.slice(0, 6).map((history, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-gray-300 py-2"
              >
                <div className="flex flex-col gap-1">
                  <p>{history.money_receipt_number}</p>
                  <p className="text-gray-700 text-xs">
                    {history?.payment_method}
                  </p>
                </div>
                <div className="text-green-700">{history?.total_amount}</div>
              </div>
            ))}
          </div>
        </div>
        {/* club member for super admin */}
        {role === "superAdmin" && <LeadersClubMemberTable />}
        {/* Purchase Wallet Chart */}
        {have_purchase_wallet === "yes" && (
          <DonutChart
            percentage={
              user?.wallet
                ? parseInt(user.wallet.purchase_wallet ?? 0) / 1000
                : 0
            }
            purchase_wallet={parseInt(user?.wallet?.purchase_wallet) ?? "--"}
            wallet={user?.wallet}
          />
        )}
      </div>
      {/* 2nd col */}
      <div className="xl:col-span-2 flex flex-col gap-4 p-2">
        {/* individual investment stat */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* project share */}
          <div className="bg-white rounded-md p-4">
            <p className="text-xl font-medium">Investment</p>
            <p className="text-sm text-gray-600">Project Share</p>
            <div className="w-full h-16 my-3">
              <ProjectShareInvestChart />
            </div>
            <p>&#x9F3; {user?.accountable?.project_share}</p>
          </div>
          {/* fixed deposite */}
          <div className="bg-white rounded-md p-4">
            <p className="text-xl font-medium">Investment</p>
            <p className="text-sm text-gray-600">Fixed Deposit</p>
            <div className="w-full h-16 my-3">
              <FixedDepositInvestChart />
            </div>
            <p>&#x9F3; {user?.accountable?.fixed_deposit}</p>
          </div>
          {/* share holder */}
          <div className="bg-white rounded-md p-4">
            <p className="text-xl font-medium">Investment</p>
            <p className="text-sm text-gray-600">Share Holder</p>
            <div className="w-full h-16 my-3">
              <ShareHolderInvestChart />
            </div>
            <p>&#x9F3; {user?.accountable?.share_holder}</p>
          </div>
          {/* partnership */}
          <div className="bg-white rounded-md p-4">
            <p className="text-xl font-medium">Investment</p>
            <p className="text-sm text-gray-600">Partnership</p>
            <div className="w-full h-16 my-3">
              <ProjectShareInvestChart />
            </div>
            <p>&#x9F3; {user?.accountable?.directorship}</p>
          </div>
        </div>
        {/* all investment stat */}
        {addMoneyHistories?.length > 0 && (
          <div
            style={{
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
            className="bg-white p-3 rounded-md"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">
                Total Investment: &#x9F3; {user?.accountable?.total_amount}
              </p>
            </div>
            <div className="h-64 my-6">
              <AllInvestmentBar data={investmentData} />
            </div>
          </div>
        )}
        {/* all income source */}
        <div
          style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
          className="bg-white p-3 rounded-md"
        >
          <p>Income Source</p>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 my-6">
            <div className="p-3 border border-gray-400 rounded-md bg-green-100 text-green-700 flex items-center justify-between">
              <div>
                <p className="text-xs">Reference bonus</p>
                <p>&#x9F3; {Math.ceil(user?.wallet?.reference_bonus)}</p>
              </div>
              <div>
                <button
                  onClick={() => router.push("/dashboard/wallet/income-wallet")}
                  className="border border-green-700 px-2 rounded shadow-xl"
                >
                  Visit
                </button>
              </div>
            </div>
            <div className="p-3 border border-gray-400 rounded-md bg-cyan-100 text-cyan-700 flex items-center justify-between">
              <div>
                <p className="text-xs">Team bonus</p>
                <p>&#x9F3; {Math.ceil(user?.wallet?.matching_bonus)}</p>
              </div>
              <div>
                <button
                  onClick={() => router.push("/dashboard/wallet/income-wallet")}
                  className="border border-cyan-700 px-2 rounded shadow-xl"
                >
                  Visit
                </button>
              </div>
            </div>
            <div className="p-3 border border-gray-400 rounded-md bg-orange-100 text-orange-700 flex items-center justify-between">
              <div>
                <p className="text-xs">Club bonus</p>
                <p>&#x9F3; {Math.ceil(user?.wallet?.club_bonus)}</p>
              </div>
              <div>
                <button
                  onClick={() => router.push("/dashboard/wallet/income-wallet")}
                  className="border border-orange-700 px-2 rounded shadow-xl"
                >
                  Visit
                </button>
              </div>
            </div>
            <div className="p-3 border border-gray-400 rounded-md bg-teal-100 text-teal-700 flex items-center justify-between">
              <div>
                <p className="text-xs">Project Share Profit</p>
                <p>&#x9F3; {Math.ceil(user?.wallet?.project_share_wallet)}</p>
              </div>
              <div>
                <button className="border border-teal-700 px-2 rounded shadow-xl">
                  Visit
                </button>
              </div>
            </div>
            <div className="p-3 border border-gray-400 rounded-md bg-yellow-100 text-yellow-700 flex items-center justify-between">
              <div>
                <p className="text-xs">Fixed Deposit Profit</p>
                <p>&#x9F3; {Math.ceil(user?.wallet?.fixed_deposit_wallet)}</p>
              </div>
              <div>
                <button className="border border-yellow-700 px-2 rounded shadow-xl">
                  Visit
                </button>
              </div>
            </div>
            <div className="p-3 border border-gray-400 rounded-md bg-red-100 text-red-700 flex items-center justify-between">
              <div>
                <p className="text-xs">Share Holder Profit</p>
                <p>&#x9F3; {Math.ceil(user?.wallet?.share_holder_wallet)}</p>
              </div>
              <div>
                <button className="border border-red-700 px-2 rounded shadow-xl">
                  Visit
                </button>
              </div>
            </div>
            <div className="p-3 border border-gray-400 rounded-md bg-blue-100 text-blue-700 flex items-center justify-between">
              <div>
                <p className="text-xs">Partnership Profit</p>
                <p>&#x9F3; {Math.ceil(user?.wallet?.directorship_wallet)}</p>
              </div>
              <div>
                <button className="border border-blue-700 px-2 rounded shadow-xl">
                  Visit
                </button>
              </div>
            </div>
          </div>
          {/* Referral Bonus, Matching Bonus, Club Bonus  and all profit*/}
          {totalBalance() > 0 && (
            <div className="bg-white w-full h-fit p-3 rounded-md">
              {/* Graph */}
              <div className="h-[450px]">
                <IncomeWalletPieChart data={profitData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;
