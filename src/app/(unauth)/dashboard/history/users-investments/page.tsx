"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineProject } from "react-icons/ai";
import { FaSlideshare } from "react-icons/fa";
import { PiBuildingApartmentBold } from "react-icons/pi";
import baseUrl from "../../../../../../config";
import Cookies from "js-cookie";
import InvestmentStatisticsChart from "@/components/Charts/InvestmentStatisticsChart";
import { Circles } from "react-loader-spinner";

interface InvestmentHistoriesData {
  _id?: string;
  userId: string;
  user_name: string;
  project_share: number;
  fixed_deposit: number;
  share_holder: number;
  directorship: number;
  total_amount: number;
  total_point: number;
  money_receipt_number: string;
  phone: string;
  payment_method: string;
  bank_name?: string;
  bank_account_name?: string;
  branch_name?: string;
  transaction_id: string;
  picture: string;
  payment_picture: string;
  is_reject: boolean;
  is_approved: boolean;
  date: string;
}

const page = () => {
  const [investmentHistories, setInvestmentHistories] = useState<
    InvestmentHistoriesData[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [separatedValue, setSeparatedValue] = useState<{
    project_share: number[];
    fixed_deposit: number[];
    share_holder: number[];
    directorship: number[];
  }>({
    project_share: [],
    fixed_deposit: [],
    share_holder: [],
    directorship: [],
  });
  const [totalInvestment, setTotalInvestment] = useState<number>(0);

  // get cookies value
  const token: string = Cookies.get("token") || "";

  const fetchAllInvestmentHistories = async () => {
    const response = await axios.get(
      `${baseUrl}/history/get-all-add-money-history?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response?.data?.success) {
      setInvestmentHistories(response?.data?.data?.addMoneyHistories);

      const result = {
        project_share: [] as number[],
        fixed_deposit: [] as number[],
        share_holder: [] as number[],
        directorship: [] as number[],
      };

      // Populate arrays with values greater than 0
      response?.data?.data?.addMoneyHistories.forEach(
        (item: InvestmentHistoriesData) => {
          if (item.is_approved) {
            // Check if the item is approved
            if (item.project_share > 0)
              result.project_share.push(item.project_share);
            if (item.fixed_deposit > 0)
              result.fixed_deposit.push(item.fixed_deposit);
            if (item.share_holder > 0)
              result.share_holder.push(item.share_holder);
            if (item.directorship > 0)
              result.directorship.push(item.directorship);
          }
        }
      );
      setSeparatedValue(result);
      const total_investment =
        result?.project_share.reduce((acc, curr) => acc + curr, 0) +
        result?.fixed_deposit.reduce((acc, curr) => acc + curr, 0) +
        result?.share_holder.reduce((acc, curr) => acc + curr, 0) +
        result?.directorship.reduce((acc, curr) => acc + curr, 0);
      setTotalInvestment(total_investment);
    }
  };

  useEffect(() => {
    fetchAllInvestmentHistories();
  }, []);

  function numberToWords(num: number): string {
    if (num === 0) return "Zero Taka";

    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const scales = ["", "Thousand", "Lacs", "Crore"];

    // Helper function to convert numbers less than 100
    function convertTwoDigit(n: number): string {
      if (n < 20) return units[n];
      return tens[Math.floor(n / 10)] + (n % 10 ? " " + units[n % 10] : "");
    }

    // Helper function to convert three-digit numbers
    function convertThreeDigit(n: number): string {
      if (n < 100) return convertTwoDigit(n);
      const hundredPart = Math.floor(n / 100);
      const remainder = n % 100;
      return (
        units[hundredPart] +
        " Hundred" +
        (remainder > 0 ? " " + convertTwoDigit(remainder) : "")
      );
    }

    let result = "";
    let scaleIndex = 0;

    // Process the number in parts based on the Indian numbering system
    const parts: number[] = [];

    while (num > 0) {
      if (scaleIndex === 1) {
        // For thousands, take two digits
        parts.push(num % 100);
        num = Math.floor(num / 100);
      } else {
        // For lacs and above, take three digits
        parts.push(num % 1000);
        num = Math.floor(num / 1000);
      }
      scaleIndex++;
    }

    parts.reverse();
    scaleIndex = parts.length - 1;

    for (let i = 0; i < parts.length; i++) {
      if (parts[i] > 0) {
        const scale = scales[scaleIndex];
        if (scale === "Thousand") {
          result += convertTwoDigit(parts[i]) + " " + scale + " ";
        } else if (scale === "Lacs" || scale === "Crore") {
          result += convertThreeDigit(parts[i]) + " " + scale + " ";
        }
      }
      scaleIndex--;
    }

    return result.trim() + " Taka";
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-700">User's Investments</h1>
      {/* all types of investments summary */}
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* project share */}
        <div className="w-full h-fit rounded-md shadow-2xl bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-1">
              <p className="text-gray-500">Project Share</p>
              <p className="text-4xl font-bold text-gray-700">
                {separatedValue?.project_share?.length}
              </p>
              <p className="text-xs text-gray-700">
                {separatedValue?.project_share.reduce(
                  (acc, curr) => acc + curr,
                  0
                )}
                -{" "}
                {numberToWords(
                  separatedValue?.project_share.reduce(
                    (acc, curr) => acc + curr,
                    0
                  )
                )}
              </p>
            </div>
            <div className="px-6">
              <AiOutlineProject className="w-10 h-10 rounded-full bg-green-200 p-2 text-green-700" />
            </div>
          </div>
        </div>
        {/* Fixed Deposit */}
        <div className="w-full h-fit rounded-md shadow-2xl bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-1">
              <p className="text-gray-500">Fixed Deposit</p>
              <p className="text-4xl font-bold text-gray-700">
                {separatedValue?.fixed_deposit?.length}
              </p>
              <p className="text-xs text-gray-700">
                {separatedValue?.fixed_deposit.reduce(
                  (acc, curr) => acc + curr,
                  0
                )}
                -{" "}
                {numberToWords(
                  separatedValue?.fixed_deposit.reduce(
                    (acc, curr) => acc + curr,
                    0
                  )
                )}
              </p>
            </div>
            <div className="px-6">
              <AiOutlineProject className="w-10 h-10 rounded-full bg-purple-200 p-2 text-purple-700" />
            </div>
          </div>
        </div>
        {/* share holder*/}
        <div className="w-full h-fit rounded-md shadow-2xl bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-1">
              <p className="text-gray-500">Share Holder</p>
              <p className="text-4xl font-bold text-gray-700">
                {separatedValue?.share_holder?.length}
              </p>
              <p className="text-xs text-gray-700">
                {separatedValue?.share_holder.reduce(
                  (acc, curr) => acc + curr,
                  0
                )}
                -{" "}
                {numberToWords(
                  separatedValue?.share_holder.reduce(
                    (acc, curr) => acc + curr,
                    0
                  )
                )}
              </p>
            </div>
            <div className="px-6">
              <FaSlideshare className="w-10 h-10 rounded-full bg-red-200 p-2 text-red-700" />
            </div>
          </div>
        </div>
        {/* partnership */}
        <div className="w-full h-fit rounded-md shadow-2xl bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-1">
              <p className="text-gray-500">Partnership</p>
              <p className="text-4xl font-bold text-gray-700">
                {separatedValue?.directorship?.length}
              </p>
              <p className="text-xs text-gray-700">
                {separatedValue?.directorship.reduce(
                  (acc, curr) => acc + curr,
                  0
                )}
                -{" "}
                {numberToWords(
                  separatedValue?.directorship.reduce(
                    (acc, curr) => acc + curr,
                    0
                  )
                )}
              </p>
            </div>
            <div className="px-6">
              <PiBuildingApartmentBold className="w-10 h-10 rounded-full bg-blue-200 p-2 text-blue-700" />
            </div>
          </div>
        </div>
      </div>

      {/* statistics and table */}
      <div className="mt-16 flex flex-col gap-10">
        {/* statistics */}
        <div className="bg-white">
          <div className="p-4 text-xl">
            Total Investment: {totalInvestment}{" "}
            <p className="inline text-sm font-normal text-gray-600">
              {numberToWords(totalInvestment)}
            </p>
          </div>
          <div className="flex justify-center">
            <InvestmentStatisticsChart
              data={[
                {
                  name: "Project Share",
                  value: separatedValue?.project_share.reduce(
                    (acc, curr) => acc + curr,
                    0
                  ),
                },
                {
                  name: "Fixed Deposit",
                  value: separatedValue?.fixed_deposit.reduce(
                    (acc, curr) => acc + curr,
                    0
                  ),
                },
                {
                  name: "Share Holder",
                  value: separatedValue?.share_holder.reduce(
                    (acc, curr) => acc + curr,
                    0
                  ),
                },
                {
                  name: "Partnership",
                  value: separatedValue?.directorship.reduce(
                    (acc, curr) => acc + curr,
                    0
                  ),
                },
              ]}
              colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]}
            />
          </div>
        </div>

        {/* investmet table */}
        <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          className="bg-white w-full py-5 rounded-md"
        >
          <p className="p-3 font-bold">All Approved Investment</p>
          <div
            className="relative overflow-x-auto max-h-screen max-w-full overflow-y-auto"
            // style={{ width: "calc(100% - 150px)" }}
          >
            <table className="min-w-full text-sm text-left rtl:text-right   ">
              <thead className="sticky top-0 text-xs text-black  bg-blue-50">
                <tr>
                  <th
                    rowSpan={2}
                    scope="col"
                    className="px-3 py-3 text-center text-xs whitespace-nowrap"
                  >
                    Money Reciept Number
                  </th>
                  <th
                    rowSpan={2}
                    scope="col"
                    className="px-3 py-3 text-center  whitespace-nowrap"
                  >
                    UserName
                  </th>
                  <th
                    rowSpan={2}
                    scope="col"
                    className="px-3 py-3 text-center  whitespace-nowrap"
                  >
                    Mobile Number
                  </th>
                  <th
                    colSpan={5}
                    scope="col"
                    className="px-3 py-3 text-center whitespace-nowrap"
                  >
                    Investment
                  </th>
                  <th
                    rowSpan={2}
                    scope="col"
                    className="px-3 py-3 text-center whitespace-nowrap"
                  >
                    Payment Method
                  </th>
                  {/* <th
                    rowSpan={2}
                    scope="col"
                    className="px-3 py-3 text-center whitespace-nowrap"
                  >
                    Transaction ID
                  </th> */}

                  <th
                    rowSpan={2}
                    scope="col"
                    className="px-3 py-3 text-center whitespace-nowrap"
                  >
                    Request Date <br /> (yyyy-mm-dd)
                  </th>
                  <th
                    rowSpan={2}
                    scope="col"
                    className="px-3 py-3 text-center whitespace-nowrap"
                  >
                    Status
                  </th>
                </tr>
                <tr>
                  <th className="px-3 py-3 text-center  whitespace-nowrap">
                    Project Share
                  </th>
                  <th className="px-3 py-3 text-center  whitespace-nowrap">
                    Fixed Deposite
                  </th>
                  <th className="px-3 py-3 text-center whitespace-nowrap">
                    Share Holder
                  </th>
                  <th className="px-3 py-3 text-center  whitespace-nowrap">
                    Partnership
                  </th>
                  <th className="px-3 py-3 text-center whitespace-nowrap">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {isLoading ? (
                  <tr className="text-center">
                    <td colSpan={14} align="center">
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
                ) : investmentHistories && investmentHistories?.length <= 0 ? (
                  <tr className="text-center">
                    <td colSpan={14} align="center">
                      <div className="my-5 flex flex-col justify-center items-center">
                        <p className="text-lg text-rose-500">No Data to Show</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  investmentHistories?.map(
                    (history: InvestmentHistoriesData, i) => (
                      <tr
                        key={history?._id}
                        className={`${i % 2 == 0 ? "bg-white" : "bg-white"} text-black border-b-2 border-slate-500`}
                      >
                        <td className="px-3 py-4 text-center">
                          {history?.money_receipt_number}
                        </td>
                        <td className="px-3 py-4 text-center">
                          {history?.user_name}
                        </td>
                        <td className="px-3 py-4 text-center">
                          {" "}
                          {history?.phone}
                        </td>
                        <td className="px-3 py-4 text-center">
                          {history?.project_share}
                        </td>
                        <td className="px-3 py-4 text-center">
                          {history?.fixed_deposit}
                        </td>
                        <td className="px-3 py-4 text-center">
                          {history?.share_holder}
                        </td>
                        <td className="px-3 py-4 text-center">
                          {history?.directorship}
                        </td>
                        <td className="px-3 py-4 text-center">
                          {history?.total_amount}
                        </td>
                        <td className="px-3 py-4 text-center">
                          {history?.payment_method}
                          {/* {history?.payment_method == "bank" && (
                          <p className="pt-2">Bank Name:FCIC Bank-Branch:ctg</p>
                        )} */}
                        </td>

                        {/* <td className="px-3 py-4 text-center">
                          {history?.transaction_id}
                        </td> */}

                        <td className="px-3 py-4 text-center">
                          {history?.date}
                        </td>
                        <td className="px-3 py-4 text-center ">
                          {history?.is_approved ? (
                            <p className="text-teal-500 px-3 py-1 rounded-md">
                              Approved
                            </p>
                          ) : history?.is_reject ? (
                            <p className="bg-red-300 text-black px-3 py-1 rounded-md">
                              Rejected
                            </p>
                          ) : (
                            <p className="bg-yellow-300 text-black px-3 py-1 rounded-md">
                              Pending
                            </p>
                          )}
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
