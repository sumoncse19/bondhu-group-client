import axios, { isAxiosError } from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import baseUrl from "../../../config";
import toast from "react-hot-toast";

interface DonutChartProps {
  percentage: number; // The percentage of the chart to fill
  purchase_wallet: number;
  wallet: {
    income_wallet: number;
    purchase_wallet: number;
    reference_wallet: number;
    matching_bonus: number;
    project_share_wallet: number;
    fixed_deposit_wallet: number;
    share_holder_wallet: number;
    directorship_wallet: number;
  };
}

const DonutChart: React.FC<DonutChartProps> = ({
  percentage,
  purchase_wallet,
  wallet,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const conicStyle: React.CSSProperties = {
    background: `conic-gradient(
      #78fade ${percentage}%,
      red ${percentage}% 100%
    )`,
  };

  const id: string = Cookies.get("id") || "";
  const token: string = Cookies.get("token") || "";
  const role: string = Cookies.get("role") || "";

  // handle send wallet
  const handleGeneratePurchaseWallet = async () => {
    setIsLoading(true);
    const walletData = {
      userId: id,
      purchase_amount: 100000,
      purchase_from: id,
    };

    try {
      await axios
        .post(`${baseUrl}/purchase`, walletData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.data?.success) {
            window.location.reload();
          }
        });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "An error occured");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGeneratePurchaseWallet = async () => {
  //   try {
  //     axios.put(
  //       `${baseUrl}/purchase`,
  //       {
  //         wallet: {
  //           ...wallet,
  //           purchase_wallet: wallet.purchase_wallet + 50000,
  //         },
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     if (isAxiosError(error)) {
  //       toast.error(error?.response?.data?.message);
  //     }
  //   }
  // };

  return (
    <div
      style={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
      className="h-fit bg-white p-5 rounded-md flex flex-col items-center"
    >
      <p className="self-start">Purchase Wallet : &#x9F3; {purchase_wallet}</p>
      <div
        className="w-[200px] h-[200px] rounded-full my-5 flex items-center justify-center "
        style={conicStyle}
      >
        {/* Inner white circle */}
        <div className="w-[130px] h-[130px] rounded-full bg-[#e3fdf7] flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs"> Remaining Joining</p>
            <p className="text-red-500">
              {purchase_wallet ? purchase_wallet / 1000 : 0}
            </p>
          </div>
        </div>
      </div>
      {role === "superAdmin" && (
        <div className="flex justify-center">
          <button
            onClick={handleGeneratePurchaseWallet}
            className="bg-green-200 text-green-800 px-5 py-1 rounded-md"
          >
            {isLoading ? "Sending....." : "Genrate Purchase Wallet"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DonutChart;
