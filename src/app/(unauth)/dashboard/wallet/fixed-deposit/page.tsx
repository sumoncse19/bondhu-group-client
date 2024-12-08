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
  const [fixedDepositProfitHistories, setFixedDepositProfitHistories] =
    useState([]);
  const [
    filteredFixedDepositProfitHistories,
    setFilteredFixedDepositProfitHistories,
  ] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [moneyRecieptsNo, setMoneyRecipetsNo] = useState<string[]>([]);

  // get cookies value
  const id: string = Cookies.get("id") || "";
  const token: string = Cookies.get("token") || "";

  const fetchFixedDepositHistories = async () => {
    try {
      await axios
        .get(
          `${baseUrl}/wallet/fixed-deposit?date=&is_paid=true&userId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.data?.success) {
            setFixedDepositProfitHistories(
              res?.data?.data?.allFixedDepositPaymentByDate || []
            );
            setFilteredFixedDepositProfitHistories(
              res?.data?.data?.allFixedDepositPaymentByDate || []
            );

            // sum the total profit
            const totalProfit =
              res?.data?.data?.allFixedDepositPaymentByDate.reduce(
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
            res?.data?.data?.allFixedDepositPaymentByDate.map(
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

  const handleFixedDepositHistoriesByMoneyReciept = (
    selectedMoneyReciept: string
  ) => {
    if (selectedMoneyReciept === "all") {
      setFilteredFixedDepositProfitHistories(fixedDepositProfitHistories);
      return;
    }
    const filteredFixedDepositHistories = fixedDepositProfitHistories.filter(
      (history: { money_receipt_number: string }) =>
        history?.money_receipt_number === selectedMoneyReciept
    );

    setFilteredFixedDepositProfitHistories(filteredFixedDepositHistories);
  };

  useEffect(() => {
    fetchFixedDepositHistories();
  }, []);

  return (
    <div className="">
      <div className="mt-10 w-[90%] mx-auto">
        <div
          // style={{
          //   boxShadow:
          //     "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          // }}
          className="rounded-md bg-white py-4"
        >
          <div className="flex flex-col sm:flex-row lg:items-center justify-between gap-3 px-4">
            <div className="flex items-center gap-x-5">
              <p className="text-rose-500 font-bold text-xs lg:text-sm xl:text-base">
                Total profit from Fixed Deposit Invest
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
                  handleFixedDepositHistoriesByMoneyReciept(e.target.value)
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
          <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-8 ">
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
                    Profit Recieved Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center whitespace-nowrap"
                  >
                    Recieved Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center whitespace-nowrap"
                  >
                    Due Months
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
                ) : filteredFixedDepositProfitHistories?.length <= 0 ? (
                  <tr className="text-center">
                    <td colSpan={6} align="center">
                      <div className="my-5 flex flex-col justify-center items-center">
                        <p className="text-lg text-rose-500">No Data to Show</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredFixedDepositProfitHistories?.map(
                    (history: {
                      _id: string;
                      fixed_deposit_amount: number;
                      money_receipt_number: string;
                      profit_amount: number;
                      payment_send_date: string;
                      payment_count: number;
                    }) => (
                      <tr
                        key={history?._id}
                        className="bg-white text-black border-b-2 border-gray-100"
                      >
                        <td className="px-6 py-4 text-center flex justify-center">
                          {history?.fixed_deposit_amount}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {history?.money_receipt_number}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {formatDate(history?.payment_send_date)}
                        </td>
                        <td className="px-6 py-4 text-center flex justify-center">
                          {history?.payment_count}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {history?.profit_amount}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {25 - history?.payment_count}
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
