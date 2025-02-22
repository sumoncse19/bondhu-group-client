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
  is_approved: boolean;
  date: string;
}

const page = () => {
  const [investmentHistories, setInvestmentHistories] =
    useState<InvestmentHistoriesData[]>();
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
  const [isLoadingReject, setIsLoadingReject] = useState<{
    status: boolean;
    idx: string;
  }>({
    status: false,
    idx: "",
  });

  const router = useRouter();
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

  // Accept Add Money Request
  const handleAcceptInvestmentRequest = async (id: string) => {
    setIsLoadingAccept({
      status: true,
      idx: id,
    });
    try {
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
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setIsLoadingAccept({ status: false, idx: "" });
    }
  };

  // reject money request
  const handleRejectInvestmentRequest = async (id: string) => {
    setIsLoadingReject({
      status: true,
      idx: id,
    });
    try {
      const response = await fetch(`${baseUrl}/add-money/reject/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data?.success) {
        toast.success("Rejected the Request");
        fetchAllInvestmentRequests();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setIsLoadingReject({ status: false, idx: "" });
    }
  };
  return (
    <div className="h-full w-full">
      <div className="flex items-center gap-5">
        <h1 className="text-xl text-rose-600 font-bold tracking-widest">
          User's Investment Requests
        </h1>
      </div>

      <div
        className="relative overflow-x-auto max-h-screen overflow-y-auto my-5"
        // style={{ width: "calc(100% - 150px)" }}
      >
        <table className="min-w-full text-sm text-left rtl:text-right   ">
          <thead className="sticky top-0 text-xs text-black  bg-teal-200 border-2 border-black">
            <tr>
              <th
                rowSpan={2}
                scope="col"
                className="px-3 py-3 text-center text-xs border-r-2 border-black"
              >
                Money Reciept Number
              </th>
              <th
                rowSpan={2}
                scope="col"
                className="px-3 py-3 text-center border-r-2 border-black"
              >
                UserName
              </th>
              <th
                rowSpan={2}
                scope="col"
                className="px-3 py-3 text-center border-r-2 border-black"
              >
                Mobile Number
              </th>
              <th
                colSpan={5}
                scope="col"
                className="px-3 py-3 text-center border-r-2 border-b-2 border-black"
              >
                Investment
              </th>
              <th
                rowSpan={2}
                scope="col"
                className="px-3 py-3 text-center border-r-2 border-black"
              >
                Payment Method
              </th>
              {/* <th
                rowSpan={2}
                scope="col"
                className="px-3 py-3 text-center border-r-2 border-black"
              >
                Transaction ID
              </th> */}
              {/* <th
                rowSpan={2}
                scope="col"
                className="px-3 py-3 text-center border-r-2 border-black"
              >
                Transaction Picture
              </th> */}
              {/* <th
                rowSpan={2}
                scope="col"
                className="px-3 py-3 text-center border-r-2 border-black"
              >
                Money Receipt
              </th> */}
              <th
                rowSpan={2}
                scope="col"
                className="px-3 py-3 text-center border-r-2 border-black"
              >
                Request Date <br /> (yyyy-mm-dd)
              </th>
              <th rowSpan={2} scope="col" className="px-3 py-3 text-center ">
                Action
              </th>
            </tr>
            <tr>
              <th className="px-3 py-3 text-center border-r-2 border-black">
                Project Share
              </th>
              <th className="px-3 py-3 text-center border-r-2 border-black">
                Fixed Deposite
              </th>
              <th className="px-3 py-3 text-center border-r-2 border-black">
                Share Holder
              </th>
              <th className="px-3 py-3 text-center border-r-2 border-black">
                Directorship
              </th>
              <th className="px-3 py-3 text-center border-r-2 border-black">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="text-[12px]">
            {isLoading ? (
              <tr className="text-center">
                <td colSpan={15} align="center">
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
                <td colSpan={15} align="center">
                  <div className="my-5 flex flex-col justify-center items-center">
                    <p className="text-lg text-rose-500">No Data to Show</p>
                  </div>
                </td>
              </tr>
            ) : (
              investmentHistories
                ?.slice()
                ?.reverse()
                ?.map((history: InvestmentHistoriesData, i) => (
                  <tr
                    key={history?._id}
                    className={`${i % 2 == 0 ? "bg-teal-50" : "bg-teal-200"} text-black border-2 border-slate-700 `}
                  >
                    <td className="px-3 py-4 text-center">
                      {history?.money_receipt_number}
                    </td>
                    <td className="px-3 py-4 text-center">
                      {history?.user_name}
                    </td>
                    <td className="px-3 py-4 text-center"> {history?.phone}</td>
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
                    {/* <td className="px-3 py-4 text-center  ">
                      {history?.picture ? (
                        <div className="flex justify-center items-center gap-x-2">
                          <img
                            className="w-10 h-10"
                            src={history?.picture}
                            alt=""
                          />
                          <p
                            onClick={() => {
                              setIsOpenImageModal(true);
                              seModalImgae(history?.picture);
                            }}
                            className="cursor-pointer hover:text-rose-600 font-bold"
                          >
                            View
                          </p>
                        </div>
                      ) : (
                        "--"
                      )}
                    </td> */}
                    {/* <td className="px-3 py-4 text-center ">
                      <div className=" flex justify-center items-center gap-x-2">
                        <img
                          className="w-10 h-10"
                          src={history?.payment_picture}
                          alt=""
                        />
                        <p
                          onClick={() => {
                            setIsOpenImageModal(true);
                            seModalImgae(history?.payment_picture);
                          }}
                          className="cursor-pointer hover:text-rose-600 font-bold"
                        >
                          View
                        </p>
                      </div>
                    </td> */}
                    <td className="px-3 py-4 text-center">{history?.date}</td>
                    <td className="px-3 py-4 text-center ">
                      <div className="flex items-center gap-3">
                        {/* accept button */}
                        <div>
                          {isLoadingAccept.status &&
                          isLoadingAccept.idx === history?._id ? (
                            <p>Loading...</p>
                          ) : (
                            <p
                              onClick={() => {
                                if (!isLoadingAccept.status) {
                                  handleAcceptInvestmentRequest(
                                    history?._id || ""
                                  );
                                }
                              }}
                              className={`py-2 px-2 rounded-md shadow-2xl  ${isLoadingAccept.status ? "cursor-not-allowed" : "cursor-pointer"} shadow-black transition-all duration-300 ease-in bg-teal-200 hover:bg-teal-300 text-black`}
                            >
                              Accept
                            </p>
                          )}
                        </div>
                        {/* reject button */}
                        <div>
                          {isLoadingReject.status &&
                          isLoadingReject.idx === history?._id ? (
                            <p>Loading...</p>
                          ) : (
                            <p
                              onClick={() => {
                                if (!isLoadingReject.status) {
                                  handleRejectInvestmentRequest(
                                    history?._id || ""
                                  );
                                }
                              }}
                              className={`py-2 px-2 rounded-md shadow-2xl  ${isLoadingReject.status ? "cursor-not-allowed" : "cursor-pointer"} shadow-black transition-all duration-300 ease-in bg-red-200 hover:bg-red-300 text-black`}
                            >
                              Reject
                            </p>
                          )}
                        </div>
                      </div>
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
