"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsBuildingFillAdd } from "react-icons/bs";
import baseUrl from "../../../../../../config";
import Cookies from "js-cookie";
import { Circles } from "react-loader-spinner";

const page = () => {
  const [widthdrawHistories, setWithdrawHistories] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const token: string = Cookies.get("token") || "";
  const id: string = Cookies.get("id") || "";

  const fetchWithdrawHistories = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/withdraw/user-withdraw-history/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Beraer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data?.success) {
        setWithdrawHistories(data?.data?.addMoneyHistories);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchWithdrawHistories();
  }, []);

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
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-rose-600 font-bold text-2xl">Withdraw History</h1>
        <div
          onClick={() => router.push("/dashboard/withdraw/withdraw-now")}
          className="border-2 border-black px-7 py-2 rounded-full shadow-2xl text-black cursor-pointer flex items-center gap-2"
        >
          <BsBuildingFillAdd />
          <p>New Withdraw Request</p>
        </div>
      </div>

      <div className="w-[350px] sm:w-[500px] md:w-[750px] xl:w-full relative overflow-x-auto max-h-screen overflow-y-auto my-5">
        <table className="w-full text-sm text-left rtl:text-right text-white ">
          <thead className="sticky top-0 text-xs text-black  bg-teal-200 border-2  border-black">
            <tr>
              <th scope="col" className="px-6 py-3 text-center text-xs ">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3 text-center ">
                Account Number
              </th>
              <th scope="col" className="px-6 py-3 text-center ">
                Wallet
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Withdraw Amount
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Withdraw Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-[10px]">
            {isLoading ? (
              <tr className="text-center">
                <td colSpan={5} align="center">
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
            ) : widthdrawHistories && widthdrawHistories?.length <= 0 ? (
              <tr className="text-center">
                <td colSpan={5} align="center">
                  <div className="my-5 flex flex-col justify-center items-center">
                    <p className="text-lg text-rose-500">No Data to Show</p>
                  </div>
                </td>
              </tr>
            ) : (
              widthdrawHistories.map(
                (
                  history: {
                    _id: string;
                    payment_method: string;
                    account_no: string;
                    withdraw_wallet: string;
                    withdraw_amount: number;
                    withdraw_status: string;
                    updatedAt: string;
                  },
                  i
                ) => (
                  <tr
                    key={history?._id}
                    className={` ${i % 2 == 0 ? "bg-teal-50" : "bg-teal-100"} text-black border-2 border-slate-700 `}
                  >
                    <td className="px-6 py-4 text-center">
                      {history?.payment_method}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {" "}
                      {history?.account_no}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {history?.withdraw_wallet}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {history?.withdraw_amount}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {formatDate(history?.updatedAt)}
                    </td>

                    <td className="px-6 py-4 text-center ">
                      <p
                        className={`py-2 px-2 italic  ${history?.withdraw_status ? "text-teal-700" : "bg-rose-700"}`}
                      >
                        {history?.withdraw_status !== "pending"
                          ? "Approved"
                          : "Requested"}
                      </p>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
          {/* <tbody>
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
              users.map((user) => (
                <tr
                  key={user._id}
                  className="bg-[#EAE9E8] text-black border-b-2 border-slate-700 "
                >
                  <td className="px-6 py-4 text-center">{user.name}</td>
                  <td className="px-6 py-4 text-center">{user.role}</td>
                  <td className="px-6 py-4 text-center">{user.phone}</td>
                  <td className="px-6 py-4 text-center">
                    {getReferrer(user.reference_id)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getParent(user?.parent_placement_id)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {user?.left_side_partner?.name ? (
                      user?.left_side_partner?.name
                    ) : (
                      <p className="text-red-500 font-bold">Empty</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {user?.right_side_partner?.name ? (
                      user?.right_side_partner?.name
                    ) : (
                      <p className="text-red-500 font-bold">Empty</p>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody> */}
        </table>

        {/* {isOpenImageModal && (
          <ViewImageModal
            image={modalImage}
            setIsOpenImageModal={setIsOpenImageModal}
          />
        )} */}
      </div>
    </div>
  );
};

export default page;
