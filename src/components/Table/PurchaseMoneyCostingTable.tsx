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
import PurchaseHistoryDownload from "@/components/DownloadContents/PurchaseHistoryDownload";
import baseUrl from "../../../config";

interface ExpensessInterface {
  _id: string;
  new_partner_id: string;
  partner_name: string;
  partner_user_name: string;
  date: string;
}

interface partnerDetails {
  _id: string;
  name: string;
  user_name: string;
  phone: string;
  email: string;
  nid_passport_no: string;
  registration_date: string;
  createdAt: string;
}

const PurchaseMoneyCostingTable = () => {
  const [expensesHistories, setExpensessHistories] =
    useState<ExpensessInterface[]>();
  const [partnersDetails, setPartnersDetails] = useState<partnerDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const id = Cookies.get("id");
  const token = Cookies.get("token");

  const getExpensessHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/history/get-purchase-history/${id}?page=1&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.success) {
        setExpensessHistories(
          data?.data?.userPurchaseHistory[0]?.joining_cost_history
        );
      } else {
        throw new Error(data.message || "Failed to fetch purchase history");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (backendDate: string): string => {
    // Parse the backend date string into a Date object
    const date = new Date(backendDate);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

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
    getExpensessHistory();
  }, [id]);

  return (
    <div className="">
      <div className="flex">
        <p className="text-teal-700">Newly Joined User By You</p>
      </div>

      <div>
        {/* users table */}
        <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5 ">
          <table className="w-full text-sm text-left rtl:text-right text-white ">
            <thead className="sticky top-0 text-xs text-black uppercase bg-white  border-2 rounded border-black italic">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  New Joined User
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Joined Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Cost
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
              ) : expensesHistories && expensesHistories?.length <= 0 ? (
                <tr className="text-center">
                  <td colSpan={7} align="center">
                    <div className="my-5 flex flex-col justify-center items-center">
                      <p className="text-lg text-rose-500">No Data to Show</p>
                    </div>
                  </td>
                </tr>
              ) : (
                expensesHistories?.map((detail: ExpensessInterface) => (
                  <tr
                    key={detail._id}
                    className="bg-gray-100 text-black border-2 border-slate-700"
                  >
                    <td className="px-6 py-4 text-center">
                      {detail?.partner_name ? detail?.partner_name : "--"}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {detail?.partner_user_name
                        ? detail?.partner_user_name
                        : "--"}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {formatDate(detail?.date)}
                    </td>
                    <td className="px-6 py-4 text-center text-red-500">1000</td>
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

export default PurchaseMoneyCostingTable;
