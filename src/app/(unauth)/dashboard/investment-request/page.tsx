"use client";

import React, { useEffect, useState } from "react";
import baseUrl from "../../../../../config";
import Cookies from "js-cookie";
import { formatDate } from "@/utils/dateUtils";
import ViewImageModal from "@/components/shared/Modal/ViewImageModal";
import { getUserNameById } from "@/utils/userUtils";
import { Circles } from "react-loader-spinner";
import toast from "react-hot-toast";

interface InvestmentHistoriesData {
  _id?: string;
  userId: string;
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
  is_approved: boolean;
  createdAt: string;
}

const page = () => {
  const [investmentHistories, setInvestmentHistories] =
    useState<InvestmentHistoriesData[]>();
  const [pageNo, setPageNo] = useState<number>(1);
  const [isOpenImageModal, setIsOpenImageModal] = useState<boolean>(false);
  const [usernames, setUsernames] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const token: string = Cookies.get("token") || "";

  const fetchAllInvestmentRequests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/add-money/get-all-requested-add-money?page=${pageNo}&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data?.success) {
        setInvestmentHistories(data?.data?.requestedAddMoney);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllInvestmentRequests();
  }, [token]);

  // Fetch username for each bonus_from (userId) in referral bonus history
  const fetchUsernames = async (
    investmentHistories: InvestmentHistoriesData[]
  ) => {
    const newUsernames: { [key: string]: string } = {};
    for (const history of investmentHistories) {
      if (history.userId && !usernames[history.userId]) {
        const username = await getUserNameById(history.userId, token);
        newUsernames[history.userId] = username || "Unknown User";
      }
    }
    setUsernames((prevUsernames) => ({ ...prevUsernames, ...newUsernames }));
  };

  useEffect(() => {
    if (investmentHistories) {
      fetchUsernames(investmentHistories);
    }
  }, [investmentHistories]);

  const handleAcceptInvestmentRequest = async (id: string) => {
    const response = await fetch(`${baseUrl}/add-money/approve/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data?.success) {
      toast.success("Accepted the Request");
      fetchAllInvestmentRequests();
    }
  };
  return (
    <div className="h-full w-full p-10">
      <h1 className="text-3xl text-rose-600 font-bold tracking-widest">
        User's Investment Requests
      </h1>

      <div className="w-[350px] sm:w-[500px] md:w-[750px] xl:w-full relative overflow-x-auto max-h-screen overflow-y-auto my-5">
        <table className="w-full text-sm text-left rtl:text-right text-white ">
          <thead className="sticky top-0 text-xs text-black  bg-[#d9d1ca] ">
            <tr>
              <th
                rowSpan={2}
                scope="col"
                className="px-6 py-3 text-center text-xs border-r-2 border-black"
              >
                Money Reciept Number
              </th>
              <th
                rowSpan={2}
                scope="col"
                className="px-6 py-3 text-center border-r-2 border-black"
              >
                UserName
              </th>
              <th
                rowSpan={2}
                scope="col"
                className="px-6 py-3 text-center border-r-2 border-black"
              >
                Mobile Number
              </th>
              <th
                colSpan={4}
                scope="col"
                className="px-6 py-3 text-center border-r-2 border-b-2 border-black"
              >
                Investment
              </th>
              <th
                rowSpan={2}
                scope="col"
                className="px-6 py-3 text-center border-r-2 border-black"
              >
                Payment Method
              </th>
              <th
                rowSpan={2}
                scope="col"
                className="px-6 py-3 text-center border-r-2 border-black"
              >
                Transaction ID
              </th>
              <th
                rowSpan={2}
                scope="col"
                className="px-6 py-3 text-center border-r-2 border-black"
              >
                Payment Picture
              </th>
              <th
                rowSpan={2}
                scope="col"
                className="px-6 py-3 text-center border-r-2 border-black"
              >
                Request Date
              </th>
              <th rowSpan={2} scope="col" className="px-6 py-3 text-center ">
                State
              </th>
            </tr>
            <tr>
              <th className="px-6 py-3 text-center border-r-2 border-black">
                Project Share
              </th>
              <th className="px-6 py-3 text-center border-r-2 border-black">
                Project Share
              </th>
              <th className="px-6 py-3 text-center border-r-2 border-black">
                Project Share
              </th>
              <th className="px-6 py-3 text-center border-r-2 border-black">
                Project Share
              </th>
            </tr>
          </thead>
          <tbody className="text-[10px]">
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
            ) : investmentHistories && investmentHistories?.length <= 0 ? (
              <tr className="text-center">
                <td colSpan={12} align="center">
                  <div className="my-5 flex flex-col justify-center items-center">
                    <p className="text-lg text-rose-500">No Data to Show</p>
                  </div>
                </td>
              </tr>
            ) : (
              investmentHistories?.map((history: InvestmentHistoriesData) => (
                <tr
                  key={history?._id}
                  className="bg-[#EAE9E8] text-black border-b-2 border-slate-700 dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 text-center">
                    {history?.money_receipt_number}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {usernames[history?.userId] || "Loading..."}
                  </td>
                  <td className="px-6 py-4 text-center"> {history?.phone}</td>
                  <td className="px-6 py-4 text-center">
                    {history?.project_share}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {history?.fixed_deposit}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {history?.share_holder}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {history?.directorship}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {history?.payment_method}
                    {history?.payment_method == "bank" && (
                      <p className="pt-2">Bank Name:FCIC Bank-Branch:ctg</p>
                    )}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {history?.transaction_id}
                  </td>
                  <td className="px-6 py-4 text-center  flex justify-center items-center gap-x-2">
                    <img className="w-10 h-10" src={history?.picture} alt="" />
                    <p
                      onClick={() => setIsOpenImageModal(true)}
                      className="cursor-pointer hover:text-rose-600 font-bold"
                    >
                      View
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {formatDate(history?.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-center ">
                    <p
                      onClick={() => {
                        handleAcceptInvestmentRequest(history?._id || "");
                      }}
                      className={` text-white py-2 px-2 rounded-md shadow-2xl cursor-pointer shadow-black transition-all duration-300 ease-in ${history.is_approved ? "bg-teal-500" : "bg-rose-500 hover:bg-rose-600 hover:tracking-wider"}`}
                    >
                      {history?.is_approved ? "Approved" : "Accept"}
                    </p>
                  </td>
                </tr>
              ))
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
                  className="bg-[#EAE9E8] text-black border-b-2 border-slate-700 dark:bg-gray-800 dark:border-gray-700"
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

        {isOpenImageModal && (
          <ViewImageModal setIsOpenImageModal={setIsOpenImageModal} />
        )}
      </div>
    </div>
  );
};

export default page;
