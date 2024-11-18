"use client";
import axios, { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../../../../../../config";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { Circles } from "react-loader-spinner";
import { formatDate } from "@/utils/dateUtils";

interface GivenPurchaseWalletInterface {
  _id: string;
  purchase_to: {
    name: string;
    user_name: string;
  };
  amount: number;
  purchase_date: string;
}
const page = () => {
  const [givenPurchaseWalletHistory, setGivenPurchaseWalletHistory] = useState<
    GivenPurchaseWalletInterface[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [selectUser, setSelectuser] = useState("");
  const [amount, setAmount] = useState<string>("");

  // get Cookies value
  const token: string = Cookies.get("token") || "";
  const id: string = Cookies.get("id") || "";

  const fetchGivenPurchaseHistory = async () => {
    try {
      axios
        .get(
          `${baseUrl}/purchase/get-all-purchase-history?page=${pageNo}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.data?.success) {
            setGivenPurchaseWalletHistory(res?.data?.data?.purchaseHistory);
            setTotalPages(
              Math.ceil(res?.data?.data?.total / res?.data?.data?.limit)
            );
          } else {
            toast.error("Something went wrong");
          }
        });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGivenPurchaseHistory();
  }, []);
  return (
    <div className="relative w-full h-full pt-6">
      <div className=" flex items-center justify-between">
        <h1 className="text-xl text-rose-600 font-bold tracking-widest">
          Given Purchase Wallet History
        </h1>
      </div>

      <div>
        {/* users table */}
        <div
          className={`relative overflow-x-auto ${isLoading ? "min-h-[600px]" : `h-[${givenPurchaseWalletHistory.length * 61 + 41}px]`} max-h-[${givenPurchaseWalletHistory.length * 61 + 41}px] overflow-y-auto mt-5`}
        >
          <table className="w-full text-sm text-left rtl:text-right text-white ">
            <thead className="sticky top-0 text-xs text-black uppercase bg-teal-200  border-2  border-black rounded-md">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Given Date
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="text-center">
                  <td colSpan={12} align="center">
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
                givenPurchaseWalletHistory.map((user: any, i: number) => (
                  <tr
                    key={user._id}
                    className={`${i % 2 == 0 ? "bg-teal-50" : "bg-teal-200"} cursor-pointer transition-all duration-500 ease-in text-black border-2 border-slate-700`}
                  >
                    <td className="px-6 py-4 text-left">
                      {user?.purchase_to?.name}
                    </td>
                    <td className="px-6 py-4 text-left cursor-pointer hover:text-red-700 hover:underline">
                      {user?.purchase_to?.user_name}
                    </td>
                    <td className="px-6 py-4 text-left">
                      {user?.purchase_amount}
                    </td>
                    <td className="px-6 py-4 text-left">
                      {formatDate(user?.purchase_date)}
                    </td>
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

export default page;
