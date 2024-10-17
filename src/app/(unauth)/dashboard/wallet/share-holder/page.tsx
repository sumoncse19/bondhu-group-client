"use client";
import { formatDate } from "@/utils/dateUtils";
import React, { useState } from "react";
import { Circles } from "react-loader-spinner";

const page = () => {
  const [projectShareProfitHistories, setProjectShareProfitHistories] =
    useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="p-10">
      <h1 className="text-rose-600 text-2xl font-bold">Share Holder Wallet</h1>

      <div className="mt-10 w-[90%] mx-auto">
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
          className="rounded-md p-4"
        >
          <div className="flex items-center gap-x-5">
            <p className="text-rose-500 font-bold">
              Total profit from Share Holder Invest
            </p>
            <p className="text-lg">&#2547; 0</p>
          </div>

          {/* table */}
          <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5 ">
            <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
              <thead className="sticky top-0 text-xs text-black uppercase bg-[#d9d1ca] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    Invest Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Investment Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Money Reciept Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Profit Recieved Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Recieved Amount
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
                ) : projectShareProfitHistories?.length <= 0 ? (
                  <tr className="text-center">
                    <td colSpan={12} align="center">
                      <div className="my-5 flex flex-col justify-center items-center">
                        <p className="text-lg text-rose-500">No Data to Show</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  projectShareProfitHistories
                    ?.slice()
                    .reverse()
                    .map((history) => (
                      <tr
                        key={history._id}
                        className="bg-[#EAE9E8] text-black border-b-2 border-slate-700 dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4 text-center flex justify-center">
                          {history?.amount}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {history?.reference_bonus_amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {formatDate(history?.date)}
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

export default page;
