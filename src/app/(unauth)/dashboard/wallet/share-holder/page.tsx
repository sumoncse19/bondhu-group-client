"use client";
import { formatDate } from "@/utils/dateUtils";
import axios, { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";
import baseUrl from "../../../../../../config";
import Cookies from "js-cookie";
import { log } from "console";

const page = () => {
  const [shareHolderProfitHistories, setShareHolderProfitHistories] = useState(
    []
  );
  const [
    filteredShareHolderProfitHistories,
    setFilteredShareHolderProfitHistories,
  ] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [moneyRecieptsNo, setMoneyRecipetsNo] = useState<string[]>([]);

  // get cookies value
  const id: string = Cookies.get("id") || "";
  const token: string = Cookies.get("token") || "";

  const fetchShareHolderHistories = async () => {
    try {
      await axios
        .get(`${baseUrl}/wallet/share-holder?date=&is_paid=true&userId=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.data?.success) {
            setShareHolderProfitHistories(
              res?.data?.data?.allShareHolderPaymentByDate || []
            );
            setFilteredShareHolderProfitHistories(
              res?.data?.data?.allShareHolderPaymentByDate || []
            );

            // sum the total profit
            const totalProfit =
              res?.data?.data?.allShareHolderPaymentByDate.reduce(
                (
                  accumulator: number,
                  currentValue: { profit_amount: number }
                ) => {
                  return accumulator + currentValue.profit_amount;
                },
                0
              );
            setTotalProfit(totalProfit);

            // store all money recipets no in an array
            const allMoneyReciepts: string[] = [];
            res?.data?.data?.allShareHolderPaymentByDate.map(
              (share: { money_receipt_number: string }) => {
                allMoneyReciepts.push(share?.money_receipt_number);
              }
            );
            setMoneyRecipetsNo(Array.from(new Set(allMoneyReciepts)));
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

  const handleShareHolderHistoriesByMoneyReciept = (
    selectedMoneyReciept: string
  ) => {
    if (selectedMoneyReciept === "all") {
      setFilteredShareHolderProfitHistories(shareHolderProfitHistories);
      return;
    }
    const filteredShareHolderHistories = shareHolderProfitHistories.filter(
      (history: { money_receipt_number: string }) =>
        history?.money_receipt_number === selectedMoneyReciept
    );

    setFilteredShareHolderProfitHistories(filteredShareHolderHistories);
  };

  useEffect(() => {
    fetchShareHolderHistories();
  }, []);

  return (
    <div className="">
      <div className="mt-10 w-[90%] mx-auto">
        <div className="rounded-md py-4 bg-white">
          <div className="flex flex-col sm:flex-row lg:items-center justify-between gap-3 px-4">
            <div className="flex items-center gap-x-5">
              <p className="text-rose-500 font-bold text-xs lg:text-sm xl:text-base">
                Total profit from Share Holder Invest
              </p>
              <p className="text-lg">&#2547; {Math.ceil(totalProfit)}</p>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <label htmlFor="money_reciept_no">Choose Money Reciept</label>
              <select
                name=""
                id=""
                className="px-5 py-1 rounded-md outline-none border border-black"
                onChange={(e) =>
                  handleShareHolderHistoriesByMoneyReciept(e.target.value)
                }
              >
                <option value="all">All</option>
                {moneyRecieptsNo.map((money_reciept) => (
                  <option value={money_reciept} key={money_reciept}>
                    {money_reciept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* table */}
          <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-8">
            <table className="w-full text-sm text-left rtl:text-right text-white">
              <thead className="sticky top-0 text-xs text-black uppercase bg-gray-200">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center whitespace-nowrap"
                  >
                    Invest Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center whitespace-nowrap"
                  >
                    Money Reciept Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center whitespace-nowrap"
                  >
                    Profit Recieved Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center whitespace-nowrap"
                  >
                    Recieved Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr className="text-center">
                    <td colSpan={6} align="center">
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
                ) : filteredShareHolderProfitHistories?.length <= 0 ? (
                  <tr className="text-center">
                    <td colSpan={6} align="center">
                      <div className="my-5 flex flex-col justify-center items-center">
                        <p className="text-lg text-rose-500">No Data to Show</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredShareHolderProfitHistories?.map(
                    (history: {
                      _id: string;
                      share_holder_amount: number;
                      money_receipt_number: string;
                      profit_amount: number;
                      payment_send_date: string;
                    }) => (
                      <tr
                        key={history?._id}
                        className="bg-white text-black border-b-2 border-gray-100"
                      >
                        <td className="px-6 py-4 text-center flex justify-center">
                          {history?.share_holder_amount}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {history?.money_receipt_number}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {formatDate(
                            history?.payment_send_date || "2024-12-27"
                          )}
                        </td>

                        <td className="px-6 py-4 text-center">
                          {history?.profit_amount}
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
