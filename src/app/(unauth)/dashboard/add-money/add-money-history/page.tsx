"use client";

import ViewImageModal from "@/components/shared/Modal/ViewImageModal";
import React, { useState } from "react";
import { Circles } from "react-loader-spinner";

const page = () => {
  const [isOpenImageModal, setIsOpenImageModal] = useState<boolean>(false);
  const addMoneyHistories = [
    {
      id: 1,
      money_reciept_nuber: "1231231h1oi",
      phone: "01211431412",
      payment_method: "bkash",
      transaction_id: "uihjuiqywiu21",
      picture: "/images/paymentPictureDummy.jpg",
      createdAt: "3.30,Friday, 03.10.2024",
      isApproved: false,
    },
    {
      id: 2,
      money_reciept_nuber: "2839728937g",
      phone: "018763245",
      payment_method: "bank",
      transaction_id: "werfsd321",
      picture: "/images/paymentPictureDummy.jpg",
      createdAt: "4.10,Thrusday, 02.10.2024",
      isApproved: true,
    },
  ];
  return (
    <div>
      <h1 className="text-rose-600 font-bold text-2xl">Add Money History</h1>

      <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5">
        <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
          <thead className="sticky top-0 text-xs text-black uppercase bg-[#d9d1ca] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Money Reciept Number
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Mobile Number
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Transaction ID
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Payment Picture
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Request Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                State
              </th>
            </tr>
          </thead>
          <tbody>
            {addMoneyHistories.map((history) => (
              <tr
                key={history.id}
                className="bg-[#EAE9E8] text-black border-b-2 border-slate-700 dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 text-center">
                  {history.money_reciept_nuber}
                </td>
                <td className="px-6 py-4 text-center"> {history.phone}</td>
                <td className="px-6 py-4 text-center">
                  {history.payment_method}
                  {history.payment_method == "bank" && (
                    <p className="pt-2">Bank Name:FCIC Bank-Branch:ctg</p>
                  )}
                </td>

                <td className="px-6 py-4 text-center">
                  {history.transaction_id}
                </td>
                <td className="px-6 py-4 text-center  flex justify-center items-center gap-x-2">
                  <img className="w-10 h-10" src={history.picture} alt="" />
                  <p
                    onClick={() => setIsOpenImageModal(true)}
                    className="cursor-pointer hover:text-rose-600 font-bold"
                  >
                    View
                  </p>
                </td>
                <td className="px-6 py-4 text-center">{history.createdAt}</td>
                <td className="px-6 py-4 text-center ">
                  <p
                    className={` text-white py-2 rounded-md shadow-2xl shadow-black ${history.isApproved ? "bg-teal-500" : "bg-rose-500"}`}
                  >
                    {history.isApproved ? "Approved" : "Requested"}
                  </p>
                </td>
              </tr>
            ))}
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
