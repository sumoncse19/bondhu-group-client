"use client";
import Cookies from "js-cookie";
import React, { useEffect, useMemo, useState } from "react";
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
  partner_serial_number: string;
}

const PurchaseMoneyCostingTable = () => {
  const [expensesHistories, setExpensessHistories] = useState<
    ExpensessInterface[]
  >([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Items per page
  const ITEMS_PER_PAGE = 10;

  const router = useRouter();

  const id = Cookies.get("id");
  const token = Cookies.get("token");

  const getExpensessHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/history/get-user-joining-cost-history/${id}?page=${pageNo}&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setExpensessHistories(data?.data?.joiningCostHistory);
        setTotalPages(Math.ceil(data?.data?.total / data?.data?.limit));
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
  }, [id, pageNo]);

  return (
    <div className="">
      <div className="flex">
        <p className="text-teal-700">Newly joined user by you</p>
      </div>

      <div>
        {/* users table */}
        <div
          className={`relative overflow-x-auto ${isLoading ? "min-h-[600px]" : `h-[${expensesHistories.length * 53 + 41}px]`} max-h-[${expensesHistories.length * 53 + 41}px]  overflow-y-auto my-5`}
        >
          <table className="w-full text-sm text-left rtl:text-right text-white ">
            <thead className="sticky top-0 text-xs text-black uppercase bg-white  border-2 rounded border-black italic">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  SL No
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  New Joined User
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Joined Date
                </th>
                <th scope="col" className="px-6 py-3 text-left">
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
                expensesHistories?.map((detail: ExpensessInterface, i) => (
                  <tr
                    key={detail._id}
                    className={`bg-gray-100 ${i % 2 == 0 ? "bg-gray-100" : "bg-gray-300"} text-black border-2 border-slate-700`}
                  >
                    <td className="px-6 py-4 text-left">
                      {detail?.partner_serial_number || "--"}
                    </td>
                    <td className="px-6 py-4 text-left">
                      {detail?.partner_name ? detail?.partner_name : "--"}
                    </td>

                    <td className="px-6 py-4 text-left">
                      {detail?.partner_user_name
                        ? detail?.partner_user_name
                        : "--"}
                    </td>

                    <td className="px-6 py-4 text-left">
                      {formatDate(detail?.date)}
                    </td>
                    <td className="px-6 py-4 text-left text-red-500">1000</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-5 flex flex-wrap items-center gap-3 justify-center self-center">
            {/* Previous button */}
            {pageNo > 1 && (
              <p
                onClick={() => setPageNo(pageNo - 1)}
                className={`border-2 px-2 rounded-md cursor-point border-black text-black`}
              >
                Prev
              </p>
            )}

            {/* Page numbers */}
            {(() => {
              // Determine the range of page numbers to display
              let startPage = Math.max(1, pageNo - 5);
              let endPage = Math.min(totalPages, pageNo + 4);

              // Adjust start and end pages to always show 10 pages when possible
              if (endPage - startPage < 9) {
                if (startPage === 1) {
                  endPage = Math.min(totalPages, startPage + 9);
                } else if (endPage === totalPages) {
                  startPage = Math.max(1, endPage - 9);
                }
              }

              return Array.from(
                { length: endPage - startPage + 1 },
                (_, index) => {
                  const page = startPage + index;
                  return (
                    <p
                      key={page}
                      onClick={() => setPageNo(page)}
                      className={`border-2 px-2 rounded-md cursor-pointer ${
                        pageNo === page
                          ? "bg-black text-white"
                          : "text-black border-black"
                      }`}
                    >
                      {page}
                    </p>
                  );
                }
              );
            })()}

            {/* Next button */}
            {pageNo < totalPages && (
              <p
                onClick={() => setPageNo(pageNo + 1)}
                className={`border-2 px-2 rounded-md cursor-pointer border-black text-black`}
              >
                Next
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseMoneyCostingTable;
