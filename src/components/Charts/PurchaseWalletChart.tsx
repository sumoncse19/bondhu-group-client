import axios, { isAxiosError } from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import baseUrl from "../../../config";
import toast from "react-hot-toast";

interface DonutChartProps {
  percentage: number; // The percentage of the chart to fill
  purchase_wallet: number;
}

const DonutChart: React.FC<DonutChartProps> = ({
  percentage,
  purchase_wallet,
}) => {
  const [newPurchaseMoney, setNewPurchaseMoney] = useState(0);

  const conicStyle: React.CSSProperties = {
    background: `conic-gradient(
      #78fade ${percentage}%,
      red ${percentage}% 100%
    )`,
  };

  const wallet = Cookies.get("wallet");
  const id: string = Cookies.get("id") || "";
  const token: string = Cookies.get("token") || "";

  const handleGeneratePurchaseWallet = async () => {
    try {
      // axios.put(
      //   `${baseUrl}/user/auth/${id}`,
      //   {
      //     wallet: {
      //       purchase_wallet: 100000,
      //       income_wallet: 23800,
      //       reference_bonus: 9800,
      //       matching_bonus: 14000,
      //     },
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className="h-fit bg-[#e3fdf7] p-5">
      <p>Purchase Wallet : &#x9F3; {purchase_wallet}</p>
      <div
        className="w-[200px] h-[200px] rounded-full my-5 flex items-center justify-center "
        style={conicStyle}
      >
        {/* Inner white circle */}
        <div className="w-[130px] h-[130px] rounded-full bg-[#e3fdf7] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <p> Cost</p>
            <p className="text-red-500">{100 - percentage}%</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleGeneratePurchaseWallet}
          className="bg-green-200 text-green-800 px-5 py-1 rounded-md"
        >
          Generate Wallet
        </button>
      </div>
    </div>
  );
};

export default DonutChart;
