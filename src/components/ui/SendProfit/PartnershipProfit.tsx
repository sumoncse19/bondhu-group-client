"use client";

import axios, { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Cookies from "js-cookie";
import { Circles } from "react-loader-spinner";
import toast from "react-hot-toast";
import baseUrl from "../../../../config";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface PartnershipHistoriesInterface {
  name: string;
  _id: string;
  user_name: string;
  payment_method: string;
  money_receipt_number: string;
  directorship_amount: number;
  payment_date: string;
  is_paid: boolean;
  createdAt: string;
}
const PartnershipProfit = () => {
  const [value, setValue] = useState<Value>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingForSendProfit, setIsLoadingForSendProfit] =
    useState<boolean>(false);
  const [isInProgress, setIsInProgress] = useState<{
    status: boolean;
    id: string;
  }>({ status: false, id: "" });
  const [histories, setHistories] = useState<PartnershipHistoriesInterface[]>(
    []
  );
  const [payAmount, setPaymentAmount] = useState<{
    status: boolean;
    value: {
      _id: string;
      directorship_amount: number;
      payment_date: string;
    };
  }>({
    status: false,
    value: {
      _id: "",
      directorship_amount: 0,
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

  function formatDate3(date: Value): string {
    if (date instanceof Date) {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const dayOfWeek = days[date.getDay()]; // Get day name
      const dayOfMonth = date.getDate();
      const month = months[date.getMonth()]; // Get month name
      const year = date.getFullYear();

      // Handle ordinal suffix
      const ordinalSuffix = (n: number): string => {
        const lastDigit = n % 10;
        if (n >= 11 && n <= 13) return "th"; // Special case for 11th, 12th, 13th
        switch (lastDigit) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      };

      return `${dayOfWeek}, ${dayOfMonth}${ordinalSuffix(dayOfMonth)} ${month}, ${year}`;
    }
    return "";
  }

  const fetchPartnershipHistories = async () => {
    try {
      setIsLoading(true);
      setPaymentAmount({
        status: false,
        value: {
          _id: "",
          directorship_amount: 0,
          payment_date: "",
        },
      });
      const response = await axios.get(
        `${baseUrl}/wallet/directorship?date=${formatDate2(value)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success) {
        setHistories(response?.data?.data?.allDirectorshipPaymentByDate || []);
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
    fetchPartnershipHistories();
  }, [value]);

  const handleSendPartnershipProfit = async () => {
    setIsLoadingForSendProfit(true);

    try {
      const response = await axios.post(
        `${baseUrl}/wallet/send-directorship-profit`,
        {
          share_holder_payment_id: payAmount?.value?._id,
          profit_amount: parseInt(amount),
          profit_date: formatDate(payAmount?.value?.payment_date),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success) {
        toast.success("Sent Share Holder Profit");
        fetchPartnershipHistories();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error sending profit.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoadingForSendProfit(false);
      setIsInProgress({ status: false, id: "" });
      setPaymentAmount({
        status: false,
        value: { _id: "", directorship_amount: 0, payment_date: "" },
      });
    }
  };

  return (
    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Calendar */}
      <div
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
        }}
        className="bg-white p-5 rounded-md"
      >
        <div className="flex flex-col items-center justify-center my-10">
          <p className="text-2xl">
            {formatDate3(value).split(",")[0]}
            {","}
          </p>
          <p className="text-xl">{formatDate3(value).split(",").slice(1)}</p>
        </div>
        <div className="flex justify-center items-center w-full">
          <Calendar
            className="h-fit border-2 border-blue-400 shadow-2xl"
            onChange={setValue}
            value={value}
          />
        </div>
      </div>

      {/* Table */}
      <div className="col-span-2 rounded-md py-5 bg-white">
        {/* heading */}
        <div className="px-5">
          <div className="text-sm">
            Send Partnership Profit to Investors on{" "}
            <p className="font-bold inline text-base">{formatDate3(value)}</p>
          </div>
        </div>
        {/* enter payable amount */}
        <div className="flex justify-end p-3">
          {payAmount.status && (
            <div className="flex items-center gap-3">
              <p>Enter Amount:</p>
              <input
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendPartnershipProfit();
                  }
                }}
                type="text"
                name=""
                id=""
                className="outline-none border-2 border-dashed border-black rounded-md px-4 py-1"
              />
              <button
                onClick={handleSendPartnershipProfit}
                className="bg-teal-200 px-3 py-1 rounded-md shadow-2xl"
              >
                {isLoadingForSendProfit ? "Sending.." : "Send"}
              </button>
            </div>
          )}
        </div>
        <div className="relative overflow-x-auto min-h-[600px] mt-5">
          <table className="w-full text-sm text-left text-white">
            <thead className="sticky top-0 text-xs text-black uppercase bg-blue-100">
              <tr>
                {[
                  "Money Receipt",
                  "Username",
                  "Payment Method",
                  "Invest",
                  "Investment Date",
                  "Payment Date",
                  "Status",
                ].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-6 py-3 text-left whitespace-nowrap"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="text-center">
                  <td colSpan={7} align="center">
                    <div className="my-5 flex flex-col justify-center items-center">
                      <Circles
                        height="50"
                        width="50"
                        color="#4fa94d"
                        ariaLabel="circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </div>
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
                      i % 2 === 0 ? "bg-white" : "bg-gray-200"
                    } text-black `}
                  >
                    <td className="px-6 py-4">{detail.money_receipt_number}</td>
                    <td className="px-6 py-4">{detail.user_name || "--"}</td>
                    <td className="px-6 py-4">
                      {detail.payment_method || "--"}
                    </td>
                    <td className="px-6 py-4">{detail.directorship_amount}</td>
                    <td className="px-6 py-4">
                      {formatDate(detail.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(detail.payment_date)}
                    </td>
                    <td className="px-6 py-4">
                      {detail.is_paid ? (
                        <span
                          style={{
                            boxShadow:
                              " rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
                          }}
                          className="bg-teal-200 px-4 py-1 rounded-md"
                        >
                          Paid
                        </span>
                      ) : (
                        <button
                          style={{
                            boxShadow:
                              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                          }}
                          className="bg-yellow-300 px-4 py-1 rounded-md text-sm shadow-2xl"
                          onClick={() => {
                            setIsInProgress({
                              status: true,
                              id: detail?._id,
                            });
                            setPaymentAmount({
                              status: true,
                              value: {
                                _id: detail._id,
                                directorship_amount: detail.directorship_amount,
                                payment_date: detail.payment_date,
                              },
                            });
                          }}
                        >
                          {isInProgress.status &&
                          isInProgress.id === detail?._id
                            ? "Inprogress"
                            : "Pay"}
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
  );
};

export default PartnershipProfit;
