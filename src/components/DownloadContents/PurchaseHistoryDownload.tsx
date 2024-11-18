"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { GrDownload } from "react-icons/gr";
import { GiFastBackwardButton } from "react-icons/gi";
import { useRouter } from "next/navigation";
import baseUrl from "../../../config";

interface PurchaseHistoryItem {
  _id: string;
  purchase_amount: number;
  date: string;
}

interface purchaseInterface {
  _id: string;
  userId: string;
  purchase_amount: string;
  purchase_amount_history: PurchaseHistoryItem[];
}

const PurchaseHistoryDownload = ({}) => {
  const [purchaseHistories, setPurchaseHistories] =
    useState<purchaseInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const id = Cookies.get("id");
  const token = Cookies.get("token");

  const getPurchaseHistory = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        ` ${baseUrl}/history/get-user-joining-cost-history/${id}?page=1&limit=100000000000000000`,
        {
          method: "GET",
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setPurchaseHistories(data?.data);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error?.message : "An error ocured";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (backendDate: string): string => {
    const date = new Date(backendDate);

    // Extract and format the time in 12-hour format with AM/PM
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true, // 12-hour format
    };
    const time = new Intl.DateTimeFormat("en-US", timeOptions).format(date);

    // Extract and format the day and date
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "long", // Full day name (e.g., Wednesday)
      day: "2-digit", // Day of the month (e.g., 02)
      month: "2-digit", // Month (e.g., 10)
      year: "numeric", // Full year (e.g., 2024)
    };
    const formattedDate = new Intl.DateTimeFormat("en-GB", dateOptions).format(
      date
    );

    return `${time}, ${formattedDate}`;
  };

  useEffect(() => {
    getPurchaseHistory();
  }, [id]);
  return (
    <div id="print-content" className="mt-[100vh] ">
      <div className="print-head hidden">
        {" "}
        <div className="company-header">
          <img
            src="/images/buildersImg1.jpeg"
            alt="Company Logo"
            style={{ width: "100px" }}
          />
          <h1>Bondhu Group</h1>
          <p>Gulshan,Dhaka,Bangladesh</p>
          <p>Phone: 123-456-7890</p>
          <hr />
        </div>
      </div>

      {/* users table */}
      <div
        id="purchase-history-table"
        className="relative overflow-x-auto max-h-screen overflow-y-auto my-5 hidden"
      >
        <table className="w-full text-sm text-left rtl:text-right text-white">
          <thead className="sticky top-0 text-xs text-black uppercase bg-[#d9d1ca]">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Source
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Date
              </th>
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
            ) : (
              purchaseHistories?.purchase_amount_history?.map(
                (history: {
                  _id: string;
                  purchase_amount: number;
                  date: string;
                }) => (
                  <tr
                    key={history?._id}
                    className="bg-[#EAE9E8] text-black border-b-2 border-slate-700"
                  >
                    <td className="px-6 py-4 text-center">Super Admin</td>
                    <td className="px-6 py-4 text-center">
                      {history?.purchase_amount}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {formatDate(history?.date)}
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseHistoryDownload;
