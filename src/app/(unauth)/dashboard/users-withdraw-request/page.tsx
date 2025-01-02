"use client";

import React, { useEffect, useState } from "react";
import baseUrl from "../../../../../config";
import Cookies from "js-cookie";
import { formatDate } from "@/utils/dateUtils";
import ViewImageModal from "@/components/shared/Modal/ViewImageModal";
import { getUserNameById } from "@/utils/userUtils";
import { Circles } from "react-loader-spinner";
import toast from "react-hot-toast";
import { GiFastBackwardButton } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

interface WithdrawHistoriesData {
  _id?: string;
  userId: string;
  payment_method: string;
  account_no: string;
  bank_name?: string;
  branch_name?: string;
  routing_no: number;
  swift_code: number;
  withdraw_amount: number;
  security_code: string;
  withdraw_wallet: string;
  withdraw_status: boolean;
  createdAt: string;
}

const page = () => {
  const [withdrawHistories, setWithdrawHistories] =
    useState<WithdrawHistoriesData[]>();
  const [pageNo, setPageNo] = useState<number>(1);
  const [isOpenImageModal, setIsOpenImageModal] = useState<boolean>(false);
  const [modalImage, seModalImgae] = useState<string>("");
  const [usernames, setUsernames] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingAccept, setIsLoadingAccept] = useState<{
    status: boolean;
    idx: string;
  }>({
    status: false,
    idx: "",
  });

  const router = useRouter();
  const token: string = Cookies.get("token") || "";

  const fetchAllWithdrawRequests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/withdraw/get-all-requested-withdraw?page=${pageNo}&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data?.success) {
        setWithdrawHistories(data?.data?.allRequestedWithdraw);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllWithdrawRequests();
  }, []);

  // Fetch username for each bonus_from (userId) in referral bonus history
  const fetchUsernames = async (
    investmentHistories: WithdrawHistoriesData[]
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
    if (withdrawHistories) {
      fetchUsernames(withdrawHistories);
    }
  }, [withdrawHistories]);

  const handleAcceptWithdrawRequest = async (id: string) => {
    setIsLoadingAccept({
      status: true,
      idx: id,
    });
    try {
      const response = await fetch(`${baseUrl}/withdraw/approve/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data?.success) {
        toast.success("Accepted the Request");
        fetchAllWithdrawRequests();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setIsLoadingAccept({ status: false, idx: "" });
    }
  };
  return (
    <div className="h-full w-full">
      <div className="flex items-center gap-5">
        <h1 className="text-xl text-rose-600 font-bold tracking-widest">
          User's Money Withdraw Requests
        </h1>
        <div
          onClick={() => router.back()}
          className="border-2 border-black hover:bg-black hover:text-white transition-all duration-300 ease-in cursor-pointer text-black px-5 py-1 rounded-full flex items-center gap-3"
        >
          <GiFastBackwardButton />
          <p>Back</p>
        </div>
      </div>

      <div
        className="relative overflow-x-auto max-h-screen overflow-y-auto my-5"
        // style={{ width: "calc(100% - 150px)" }}
      >
        <table className="min-w-full text-sm text-left rtl:text-right   ">
          <thead className="sticky top-0 text-xs text-black  bg-teal-200 border-2 border-black">
            <tr>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs border-r-2 border-black"
              >
                Payment Method
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center border-r-2 border-black"
              >
                UserName
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center border-r-2 border-black"
              >
                Account Number
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center border-r-2 border-b-2 border-black"
              >
                Bank Name
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center border-r-2 border-black"
              >
                Bank Branch
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center border-r-2 border-black"
              >
                Routing Number
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center border-r-2 border-black"
              >
                Swift Code
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center border-r-2 border-black"
              >
                Withdraw Amount
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center border-r-2 border-black"
              >
                Withdraw Wallet
              </th>

              <th
                scope="col"
                className="px-3 py-3 text-center border-r-2 border-black"
              >
                Requested Date
              </th>
              <th scope="col" className="px-3 py-3 text-center ">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-[12px]">
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
            ) : withdrawHistories && withdrawHistories?.length <= 0 ? (
              <tr className="text-center">
                <td colSpan={12} align="center">
                  <div className="my-5 flex flex-col justify-center items-center">
                    <p className="text-lg text-rose-500">No Data to Show</p>
                  </div>
                </td>
              </tr>
            ) : (
              withdrawHistories?.map((history: WithdrawHistoriesData, i) => (
                <tr
                  key={history?._id}
                  className={`${i % 2 == 0 ? "bg-teal-50" : "bg-teal-200"} text-black border-2 border-slate-700 `}
                >
                  <td className="px-3 py-4 text-center">
                    {history?.payment_method}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {usernames[history?.userId] || "Loading..."}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {" "}
                    {history?.account_no}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {history?.bank_name ? history?.bank_name : "--"}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {history?.branch_name ? history?.branch_name : "--"}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {history?.routing_no ? history?.routing_no : "--"}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {history?.swift_code ? history?.swift_code : "--"}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {history?.withdraw_amount}
                  </td>
                  <td className="px-3 py-4 text-center">
                    {history?.withdraw_wallet}
                  </td>

                  <td className="px-3 py-4 text-center">
                    {history?.createdAt}
                  </td>
                  <td className="px-3 py-4 text-center ">
                    {isLoadingAccept.status &&
                    isLoadingAccept.idx === history?._id ? (
                      <p>Loading...</p>
                    ) : (
                      <p
                        onClick={() => {
                          handleAcceptWithdrawRequest(history?._id || "");
                        }}
                        className={`py-2 px-2 rounded-md shadow-2xl cursor-pointer shadow-black transition-all duration-300 ease-in ${history.withdraw_status ? "bg-teal-300" : "bg-rose-200 text-rose-700 hover:bg-rose-300 "}`}
                      >
                        {history?.withdraw_status ? "Approve" : "Accept"}
                      </p>
                    )}
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

        {isOpenImageModal && (
          <ViewImageModal
            image={modalImage}
            setIsOpenImageModal={setIsOpenImageModal}
          />
        )}
      </div>
    </div>
  );
};

export default page;
