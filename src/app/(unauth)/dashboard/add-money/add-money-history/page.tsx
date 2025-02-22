"use client";

import ViewImageModal from "@/components/shared/Modal/ViewImageModal";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import baseUrl from "../../../../../../config";
import { formatDate } from "../../../../../utils/dateUtils";
import { BsBuildingFillAdd } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { AddMoneyHistoriesInterface } from "@/type";

const page = () => {
  const [isOpenImageModal, setIsOpenImageModal] = useState<boolean>(false);
  const [addMoneyHistories, setAddMoneyHistories] = useState<
    AddMoneyHistoriesInterface[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalImage, seModalImgae] = useState<string>("");
  const id: string = Cookies.get("id") || "";
  const token: string = Cookies.get("token") || "";

  const router = useRouter();

  const fetchAddMoneyHistories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/history/get-add-money-history/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data?.success) {
        setAddMoneyHistories(data?.data?.addMoneyHistories);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddMoneyHistories();
  }, [id]);

  // const addMoneyHistories = [
  //   {
  //     id: 1,
  //     money_reciept_nuber: "1231231h1oi",
  //     phone: "01211431412",
  //     payment_method: "bkash",
  //     transaction_id: "uihjuiqywiu21",
  //     picture: "/images/paymentPictureDummy.jpg",
  //     createdAt: "3.30,Friday, 03.10.2024",
  //     isApproved: false,
  //   },
  //   {
  //     id: 2,
  //     money_reciept_nuber: "2839728937g",
  //     phone: "018763245",
  //     payment_method: "bank",
  //     transaction_id: "werfsd321",
  //     picture: "/images/paymentPictureDummy.jpg",
  //     createdAt: "4.10,Thrusday, 02.10.2024",
  //     isApproved: true,
  //   },
  // ];
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-rose-600 font-bold text-2xl">Add Money History</h1>
        <div
          onClick={() => router.push("/dashboard/add-money/add-now")}
          className="border-2 border-black px-7 py-2 rounded-full shadow-2xl text-black cursor-pointer flex items-center gap-2"
        >
          <BsBuildingFillAdd />
          <p>New Add Money</p>
        </div>
      </div>

      <div className="w-[350px] sm:w-[500px] md:w-[750px] xl:w-full relative overflow-x-auto max-h-screen overflow-y-auto my-5">
        <table className="w-full text-sm text-left rtl:text-right text-white ">
          <thead className="sticky top-0 text-xs text-black  bg-teal-200 border-2  border-black">
            <tr>
              <th
                rowSpan={2}
                scope="col"
                className="px-6 py-3 text-center text-xs "
              >
                Money Reciept Number
              </th>
              <th rowSpan={2} scope="col" className="px-6 py-3 text-center ">
                Mobile Number
              </th>
              <th colSpan={4} scope="col" className="px-6 py-3 text-center ">
                Investment
              </th>
              <th rowSpan={2} scope="col" className="px-6 py-3 text-center">
                Payment Method
              </th>
              {/* <th rowSpan={2} scope="col" className="px-6 py-3 text-center ">
                Transaction ID
              </th>
              <th rowSpan={2} scope="col" className="px-6 py-3 text-center">
                Transaction Picture
              </th>
              <th rowSpan={2} scope="col" className="px-6 py-3 text-center">
                Money Reciept Picture
              </th> */}
              <th rowSpan={2} scope="col" className="px-6 py-3 text-center ">
                Request Date <br /> (yyyy-mm-dd)
              </th>
              <th rowSpan={2} scope="col" className="px-6 py-3 text-center ">
                State
              </th>
            </tr>
            <tr>
              <th className="px-6 py-3 text-center ">Project Share</th>
              <th className="px-6 py-3 text-center ">Fixed Deposite</th>
              <th className="px-6 py-3 text-center ">Share Holder</th>
              <th className="px-6 py-3 text-center ">Partnership</th>
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
            ) : addMoneyHistories && addMoneyHistories?.length <= 0 ? (
              <tr className="text-center">
                <td colSpan={12} align="center">
                  <div className="my-5 flex flex-col justify-center items-center">
                    <p className="text-lg text-rose-500">No Data to Show</p>
                  </div>
                </td>
              </tr>
            ) : (
              addMoneyHistories?.map(
                (history: AddMoneyHistoriesInterface, i) => (
                  <tr
                    key={history?._id}
                    className={`${i % 2 == 0 ? "bg-teal-50" : "bg-teal-200"} text-black border-2 border-slate-700`}
                  >
                    <td className="px-6 py-4 text-center">
                      {history?.money_receipt_number}
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
                      {/* {history?.payment_method == "bank" && (
                        <p className="pt-2">Bank Name:FCIC Bank-Branch:ctg</p>
                      )} */}
                    </td>

                    {/* <td className="px-6 py-4 text-center">
                      {history?.transaction_id ? history?.transaction_id : "--"}
                    </td>
                    <td className="px-6 py-4 text-center">
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
                    </td>
                    <td className="px-6 py-4 text-center ">
                      <div className="flex justify-center items-center gap-x-2">
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
                    <td className="px-6 py-4 text-center">{history?.date}</td>
                    <td className="px-6 py-4 text-center ">
                      <p
                        className={`  py-2 px-2 rounded-md italic  ${history?.is_approved ? " text-teal-700" : "text-rose-700"}`}
                      >
                        {history?.is_approved ? "Approved" : "Requested"}
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
