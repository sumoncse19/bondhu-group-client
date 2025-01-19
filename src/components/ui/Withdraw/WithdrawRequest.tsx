"use client";

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import baseUrl from "../../../../config";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import useStore from "@/Zustand/Store/userStore";

const WithdrawRequest = ({
  setCurrentTab,
  setSelectedWallet,
  setWithdrawAmount,
  setCode,
  accountNo,
  bankName,
  branchName,
  routingNo,
  swiftCode,
  selectedWallet,
  withdrawAmount,
  code,
  selectedGateway,
}: {
  setCurrentTab: (tabName: string) => void;
  setSelectedWallet: (wallet: string) => void;
  setWithdrawAmount: (amount: string) => void;
  setCode: (code: string) => void;
  accountNo: string;
  bankName: string;
  branchName: string;
  routingNo: string;
  swiftCode: string;
  selectedWallet: string;
  withdrawAmount: string;
  code: string;
  selectedGateway: string;
}) => {
  const [incomeWalletPortion, setIncomeWalletPortion] = useState<string>("");

  const [user, setUser] = useState<any>();

  // get cookies value
  const id: string = Cookies.get("id") || "";
  const token: string = Cookies.get("token") || "";
  const userCookie = Cookies.get("user");

  const router = useRouter();
  // manage cookie
  useEffect(() => {
    if (userCookie) {
      try {
        let userParse: any = JSON.parse(userCookie); // Parse safely
        setUser(userParse);
      } catch (error) {
        console.error("Failed to parse user cookie:", error);
      }
    }
  }, [userCookie]);

  const handleWithdrawAmount = async () => {
    if (withdrawAmount === "" && code === "" && selectedWallet === "") {
      toast.error("Fill all field first");
      return;
    }
    const withdrawData = {
      userId: id,
      payment_method: selectedGateway,
      account_no: accountNo,
      bank_name: bankName || "",
      branch_name: branchName || "",
      routing_no: routingNo || "",
      swift_code: swiftCode || "",
      withdraw_wallet: incomeWalletPortion
        ? incomeWalletPortion
        : selectedWallet,
      withdraw_amount: parseInt(withdrawAmount),
      security_code: code,
      withdraw_status: "pending",
      is_withdrawn: false,
    };

    try {
      const response = await fetch(`${baseUrl}/withdraw`, {
        method: "POST",
        body: JSON.stringify(withdrawData),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data?.success) {
        toast.success("Withdraw Submitted Successfully");
        router.push("/dashboard/withdraw/withdraw-report");
      } else {
        if (data?.message === "Validation error") {
          toast.error(data?.errors[0]?.message);
        } else {
          toast.error(data.errors[0]);
        }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <div>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        className="mt-6 w-[40%] mx-auto bg-white p-5 rounded-md flex flex-col gap-y-4"
      >
        <div className="flex items-center justify-between">
          <label htmlFor="select_wallet">Select Wallet</label>
          <select
            id="select_wallet"
            onChange={(e) => setSelectedWallet(e.target.value)}
            className="w-52 px-3 py-1 bg-white text-sm outline-none border-2 border-slate-600 rounded-md"
          >
            <option value="">Select--</option>
            <option value="income_wallet">
              {`Income Wallet (৳ ${Math.ceil(user?.wallet?.income_wallet)})`}
            </option>
            <option value="project_share_wallet">
              Project Share Wallet (৳ 0)
            </option>
            <option value="fixed-deposit_wallet">
              Fixed Deposite Wallet (৳ 0)
            </option>
            <option value="share_holder_wallet">
              Share Holder Wallet (৳ 0)
            </option>
            <option value="directorship_wallet">Directorship (৳ 0)</option>
          </select>
        </div>

        {selectedWallet === "income_wallet" && (
          <div className="flex items-center justify-between">
            <label htmlFor="income_wallet_portion">Income Wallet Portion</label>
            <select
              id="income_wallet_portion"
              onChange={(e) => setIncomeWalletPortion(e.target.value)}
              className="w-52 px-3 py-1 bg-white text-sm outline-none border-2 border-slate-600 rounded-md"
            >
              <option value="">Select--</option>
              <option value="reference_bonus">{`Reference Bonus (৳ ${Math.ceil(user?.wallet?.reference_bonus)})`}</option>
              <option value="matching_bonus">{`Team Bonus (৳ ${Math.ceil(user?.wallet?.matching_bonus)})`}</option>
              <option value="club_bonus">{`Club Bonus (৳ 0)`}</option>
            </select>
          </div>
        )}

        <div className="flex items-center justify-between">
          <label htmlFor="withdraw_amnt">Withdraw Amount</label>
          <input
            onChange={(e) => setWithdrawAmount(e.target.value)}
            type="number"
            placeholder=""
            className="w-52 px-3 py-1 text-sm tracking-wider bg-white outline-none border-2 border-slate-600 rounded-md"
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="code">Security Code</label>
          <input
            onChange={(e) => setCode(e.target.value)}
            type="number"
            placeholder=""
            className="w-52 px-3 py-1 bg-white outline-none border-2 border-slate-600 rounded-md"
          />
        </div>

        <div className="flex justify-end items-center gap-x-2 mt-10">
          <p
            onClick={() => {
              if (selectedGateway === "cash") {
                setCurrentTab("payment-gateway");
              } else {
                setCurrentTab("setting");
              }
            }}
            className="bg-rose-500 text-white font-bold hover:bg-rose-600 px-3 py-1 rounded-md cursor-pointer"
          >
            Back
          </p>
          <p
            onClick={handleWithdrawAmount}
            className="bg-teal-500 text-white font-bold hover:bg-teal-600 px-3 py-1 rounded-md cursor-pointer"
          >
            Continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default WithdrawRequest;
