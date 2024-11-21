"use client";

import axios, { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import baseUrl from "../../../../../config";
import Cookies from "js-cookie";
import { Circles } from "react-loader-spinner";
import toast from "react-hot-toast";

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
  const [value, setValue] = useState<Value>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingForSendProfit, setIsLoadingForSendProfit] =
    useState<boolean>(false);
  const [histories, setHistories] = useState<ShareHolderHistoriesInterface[]>(
    []
  );
  const [payAmount, setPaymentAmount] = useState<{
    status: boolean;
    value: {
      _id: string;
      share_holder_amount: number;
      payment_date: string;
    };
  }>({
    status: false,
    value: {
      _id: "",
      share_holder_amount: 0,
      payment_date: "",
    },
  });
  const [amount, setAmount] = useState<string>("");

  const token: string = Cookies.get("token") || "";

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatDate2(date: Value): string {
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return "";
  }

  const fetchShareHolderHistories = async () => {
    try {
      setIsLoading(true);
      const formattedDate = formatDate2(value);
      const response = await axios.get(
        `${baseUrl}/wallet/share-holder?date=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success) {
        setHistories(response?.data?.data?.allShareHolderPaymentByDate || []);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error fetching data.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShareHolderHistories();
  }, [value]);

  const handleSendShareHolderProfit = async () => {
    try {
      setIsLoadingForSendProfit(true);
      const response = await axios.post(
        `${baseUrl}/wallet/send-share-holder-profit`,
        {
          share_holder_payment_id: payAmount?.value?._id,
          profit_amount: payAmount?.value?.share_holder_amount,
          profit_date: formatDate(payAmount?.value?.payment_date),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.status) {
        toast.success("Sent Share Holder Profit");
        setPaymentAmount({
          status: false,
          value: { _id: "", share_holder_amount: 0, payment_date: "" },
        });
        fetchShareHolderHistories();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error sending profit.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoadingForSendProfit(false);
    }
  };

  return (
    <div className="p-10">
      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
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
              } px-6 py-2 rounded-3xl text-center cursor-pointer`}
            >
              {tab
                .split("-")
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(" ")}{" "}
              Profit
            </div>
          )
        )}
      </div>

      {/* Calendar and Table */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Calendar */}
        <Calendar onChange={setValue} value={value} />

        {/* Table */}
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
          className="col-span-2 rounded-md p-10 bg-white"
        >
          <div className="relative overflow-x-auto min-h-[600px]">
            <table className="w-full text-sm text-left text-white">
              <thead className="sticky top-0 text-xs text-black uppercase bg-white border-2 border-black italic">
                <tr>
                  {[
                    "Money Receipt",
                    "Username",
                    "Payment Method",
                    "Amount",
                    "Investment Date",
                    "Payment Date",
                    "Status",
                  ].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-6 py-3 text-left"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-5">
                      <Circles height="50" width="50" color="#4fa94d" visible />
                    </td>
                  </tr>
                ) : histories.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-5 text-rose-500">
                      No Data to Show
                    </td>
                  </tr>
                ) : (
                  histories.map((detail, i) => (
                    <tr
                      key={detail._id}
                      className={`${
                        i % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                      } text-black border-2 border-slate-700`}
                    >
                      <td className="px-6 py-4">
                        {detail.money_receipt_number}
                      </td>
                      <td className="px-6 py-4">{detail.user_name || "--"}</td>
                      <td className="px-6 py-4">
                        {detail.payment_method || "--"}
                      </td>
                      <td className="px-6 py-4">
                        {detail.share_holder_amount}
                      </td>
                      <td className="px-6 py-4">
                        {formatDate(detail.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        {formatDate(detail.payment_date)}
                      </td>
                      <td className="px-6 py-4">
                        {detail.is_paid ? (
                          <span className="bg-teal-200 text-teal-600 px-3 py-0.5 rounded-md">
                            Paid
                          </span>
                        ) : payAmount.status &&
                          payAmount.value._id === detail._id ? (
                          <div className="flex flex-col items-center gap-3">
                            <input
                              type="number"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              placeholder="Enter Amount"
                              className="outline-none border-2 border-black rounded-lg px-3 py-1"
                            />
                            <button
                              className="bg-yellow-400 px-3 py-1 rounded-md text-sm"
                              onClick={handleSendShareHolderProfit}
                            >
                              {isLoadingForSendProfit ? "Sending..." : "Send"}
                            </button>
                          </div>
                        ) : (
                          <button
                            className="bg-yellow-300 px-3 py-1 rounded-md text-sm"
                            onClick={() =>
                              setPaymentAmount({
                                status: true,
                                value: {
                                  _id: detail._id,
                                  share_holder_amount:
                                    detail.share_holder_amount,
                                  payment_date: detail.payment_date,
                                },
                              })
                            }
                          >
                            Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
