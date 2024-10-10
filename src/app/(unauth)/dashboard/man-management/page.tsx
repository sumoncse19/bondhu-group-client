"use client";

import React, { useEffect, useState } from "react";
import baseUrl from "../../../../../config";
import Cookies from "js-cookie";
import { Circles } from "react-loader-spinner";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

interface UserData {
  _id: string;
  name: string;
  role: string;
  phone: string;
  reference_id: string;
  parent_placement_id: string;
  left_side_partner: {
    name: string;
  };
  right_side_partner: {
    name: string;
  };
}

const Page = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [selectUser, setSelectuser] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [childUsers, setChildUsers] = useState<UserData[]>([]);
  const token = Cookies.get("token");
  const [user, setUser] = useState<any>({});
  const userCookie = Cookies.get("user");

  // manage cookie
  useEffect(() => {
    if (userCookie) {
      try {
        let userParse: any = JSON.parse(userCookie); // Parse safely
        setUser(userParse);
      } catch (error) {
        console.error("Failed to parse user cookie:", error);
      }
    }
  }, [userCookie]);

  // fetch all users
  const fetchAllUsers = async () => {
    const response = await fetch(`${baseUrl}/user/get-all-users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.success) {
      setUsers(data?.data);
      const adminUsers = data?.data?.filter(
        (user: { role: string }) => user?.role === "admin"
      );

      setChildUsers(adminUsers);
      setIsLoading(false);
    }
  };

  // handle send wallet
  const handleSendWallet = async () => {
    const walletData = {
      userId: selectUser,
      purchase_amount: parseInt(amount),
      purchase_from: user?._id,
    };

    axios
      .post(`${baseUrl}/purchase`, walletData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.success) {
          setIsWalletOpen(false);
          toast.success("Send Wallet to Admin Succesfully");
        }
      });
  };

  // get parent details
  const getParent = (id: string) => {
    const parent: UserData[] = users?.filter(
      (user: { _id: string }) => user?._id == id
    );

    return parent[0]?.name ? parent[0]?.name : "-----";
  };

  // get referrer details
  const getReferrer = (id: string) => {
    const referrer: UserData[] = users?.filter(
      (user: { _id: string }) => user?._id == id
    );

    return referrer[0]?.name ? referrer[0]?.name : "-----";
  };
  useEffect(() => {
    fetchAllUsers();
  }, [user]);

  return (
    <div className="relative w-full h-full">
      <div className="mt-10 flex items-center justify-between">
        <h1 className="text-3xl text-rose-600 font-bold tracking-widest">
          Customers List
        </h1>
        {/* send wallet */}
        <div
          onClick={() => {
            setIsWalletOpen(true);
          }}
          className="flex items-center gap-x-3 bg-teal-500 px-12 py-2 rounded text-white font-bold cursor-pointer tracking-widest hover:scale-90 transition-all duration-500 ease-in-out hover:tracking-wide"
        >
          <FaMoneyBillTransfer className="text-2xl" />
          <p> Send Wallet</p>
        </div>
      </div>
      {/* users table */}
      <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5">
        <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
          <thead className="sticky top-0 text-xs text-black uppercase bg-[#d9d1ca] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Phone No
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Referrer
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Parent
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Left Partner
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Right Partner
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
          </tbody>
        </table>
      </div>

      {/* wallet modal */}
      {isWalletOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsWalletOpen(false);
            }
          }}
          className="w-full min-h-[100vh] bg-black bg-opacity-80 fixed top-0 right-0 flex justify-center items-center cursor-pointer"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-[400px] h-[300px] bg-white rounded"
          >
            {/* head */}
            <div className="py-4 px-6 flex justify-between items-center rounded bg-gray-300 text-black">
              <p>Send Purchase Wallter</p>
              <p
                onClick={() => setIsWalletOpen(false)}
                className="bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in px-3 py-1 rounded-md cursor-pointer text-white"
              >
                Close
              </p>
            </div>

            {/* body */}
            <div className="mt-5 px-3 flex flex-col gap-y-10 ">
              <div className="flex items-center justify-between gap-10">
                <label
                  htmlFor="username"
                  className="text-black font-bold  tracking-wider"
                >
                  Username
                </label>
                <select
                  onChange={(e) => setSelectuser(e.target.value)}
                  className="border border-gray-700 w-[200px] px-5 py-2  rounded-md"
                  name="username"
                  id="username"
                >
                  <option value="">Select User</option>
                  {childUsers?.map(
                    (child: { _id: string; name: string }, i) => (
                      <option key={i} value={child?._id}>
                        {child?.name}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="flex items-center justify-between gap-10">
                <label
                  htmlFor="amount"
                  className="text-black font-bold  tracking-wider"
                >
                  Amount
                </label>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  type="text"
                  className="border border-gray-700 w-[200px] px-5 py-2  rounded-md"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            {/* footer */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={handleSendWallet}
                className="bg-teal-500 px-6 py-2 rounded-md cursor-pointer text-white hover:scale-105 hover:tracking-widest transition-all duration-300 ease-in"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
