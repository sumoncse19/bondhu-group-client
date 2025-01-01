"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import baseUrl from "../../../../../../../config";
import Cookies from "js-cookie";
import { UserData } from "@/type";
import { FaUserEdit } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";
import { GiFastBackwardButton } from "react-icons/gi";
import axios, { isAxiosError } from "axios";

const page = () => {
  const [user, setUser] = useState<UserData>();
  const [selectWallet, setSelectWallet] = useState<string>("income");
  const [openSetPositionModal, setOpenSetPositionModal] =
    useState<boolean>(false);
  const [designation, setDesignation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const params = useParams();
  const id = params.id;

  const token: string = Cookies.get("token") || "";

  const router = useRouter();

  const fetchSingleUser = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/get-user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data?.success) {
        // console.log("userN", data?.data);
        setUser(data?.data);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
    }
  };
  useEffect(() => {
    fetchSingleUser();
  }, []);

  // const personalInfoData = [
  //   {
  //     id: 0,
  //     key: "Id",
  //     value: user?._id,
  //   },
  //   {
  //     id: 1,
  //     key: "Name",
  //     value: user?.name,
  //   },
  //   {
  //     id: 2,
  //     key: "Picture",
  //     value: user?.picture,
  //   },
  //   {
  //     id: 3,
  //     key: "Usename",
  //     value: user?.user_name,
  //   },
  //   {
  //     id: 4,
  //     key: "Mobile No",
  //     value: user?.phone,
  //   },
  //   {
  //     id: 5,
  //     key: "Nid No",
  //     value: user?.nid_passport_no,
  //   },
  //   {
  //     id: 6,
  //     key: "Email",
  //     value: user?.email,
  //   },
  //   {
  //     id: 7,
  //     key: "Present Address",
  //     value: user?.present_address,
  //   },
  //   {
  //     id: 8,
  //     key: "Permanent Address",
  //     value: user?.permanent_address,
  //   },
  //   {
  //     id: 9,
  //     key: "Nationality",
  //     value: user?.nationality,
  //   },
  //   {
  //     id: 10,
  //     key: "Role",
  //     value: user?.role,
  //   },
  //   {
  //     id: 11,
  //     key: "Religion",
  //     value: user?.religion,
  //   },
  //   {
  //     id: 12,
  //     key: "Refferer",
  //     value: user?.reference_id,
  //   },
  //   {
  //     id: 13,
  //     key: "Parent Placement",
  //     value: user?.parent_placement_id,
  //   },
  //   {
  //     id: 14,
  //     key: "Team",
  //     value: user?.choice_side,
  //   },
  //   {
  //     id: 15,
  //     key: "Blodd Group",
  //     value: user?.blood_group,
  //   },
  //   {
  //     id: 16,
  //     key: "Father/Husband Name",
  //     value: user?.father_or_husband_name,
  //   },
  //   {
  //     id: 17,
  //     key: "Mother Name",
  //     value: user?.mother_name,
  //   },
  //   {
  //     id: 18,
  //     key: "Date Of Birth",
  //     value: user?.dob,
  //   },
  //   {
  //     id: 19,
  //     key: "Maritual Status",
  //     value: user?.marital_status,
  //   },
  //   {
  //     id: 20,
  //     key: "Profession",
  //     value: user?.profession,
  //   },
  //   {
  //     id: 21,
  //     key: "Nominee's Name",
  //     value: user?.nominee_name,
  //   },
  //   {
  //     id: 22,
  //     key: "Nominee's Address",
  //     value: user?.nominee_address,
  //   },
  //   {
  //     id: 23,
  //     key: "Nominee's Mobile No",
  //     value: user?.nominee_mobile_no,
  //   },
  //   {
  //     id: 24,
  //     key: "Relation With Nominee",
  //     value: user?.relation_with_nominee,
  //   },
  // ];

  // if (isLoading) {
  //   return <p>Loading.....</p>;
  // }

  const handleSetPosition = async () => {
    setIsLoading(true);
    const updateData = {
      designation,
    };
    try {
      // const response = await fetch(`${baseUrl}/user/auth/${id}`, {
      //   method: "PUT",
      //   body: JSON.stringify(updateData),
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // const data = await response.json();

      // if (data.success) {
      //   toast.success("Successfully set the designation");
      //   setOpenSetPositionModal(false);
      // }

      await axios
        .put(
          `${baseUrl}/user/auth/${id}`,
          { designation: designation },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.data?.success) {
            toast.success("Set Designation Successfully");
            setOpenSetPositionModal(false);
            setDesignation("");
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

  return (
    <div className="">
      <div className="flex items-center gap-5">
        <h1 className="text-xl text-rose-600 font-bold tracking-widest">
          User Details
        </h1>
        <div
          onClick={() => router.back()}
          className="border-2 border-black hover:bg-black hover:text-white transition-all duration-300 ease-in cursor-pointer text-black px-5 py-1 rounded-full flex items-center gap-3"
        >
          <GiFastBackwardButton />
          <p>Back</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6 gap-x-8 ">
        {/* Personal Infos */}
        <div className="flex flex-col gap-y-3 h-[300px] bg-white rounded-lg border-black border-2 w-full py-10 px-5">
          <p>Personal Info</p>
          <div className="flex gap-x-4 w-full">
            <img
              className="w-40 h-40 rounded-lg border-2 border-rose-500"
              src={user?.picture}
              alt=""
            />
            <div className="flex flex-col gap-y-2  flex-grow">
              <div className="flex items-center justify-between">
                <p className="text-lg text-rose-500 font-bold">
                  {user?.name && user?.name}
                </p>
                <Link
                  href={`/dashboard/man-management/edit-user/${user?._id && user?._id}`}
                  className="bg-black text-white px-5 py-1 rounded-full flex items-center gap-2 shadow-xl hover:scale-105 transition-all duration-300 ease-in"
                >
                  <FaUserEdit />
                  <p>Edit User</p>
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm text-gray-700">
                  {user?.user_name && user?.user_name}
                </p>
                <p className="text-sm text-gray-700">
                  {user?.email && user?.email}
                </p>
                <p className="text-sm text-gray-700">
                  {user?.phone && user?.phone}
                </p>
              </div>
              <div className="text-sm text-gray-700">
                <p>Nid: {user?.nid_passport_no && user?.nid_passport_no}</p>
              </div>
              <div className="text-sm text-gray-700">
                <p>
                  Refferer:{" "}
                  {user?.reference_id && user?.reference_id?.user_name}
                </p>
              </div>
              <div className="text-sm text-gray-700">
                <p>
                  Placement:{" "}
                  {user?.parent_placement_id &&
                    user?.parent_placement_id?.user_name}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Accounts */}
        <div className="flex flex-col gap-y-3 h-[300px] bg-white rounded-lg border-black border-2 w-full py-10 px-5">
          <p className="font-bold">Wallet Info</p>
          <div className="flex gap-x-4 w-full">
            <div className="flex flex-col gap-y-2  flex-grow">
              {/* select wallet */}
              <div className="mb-5 flex items-center gap-5">
                <p>Select Wallet</p>
                <select
                  className="w-[50%] border-2 border-black py-1 px-3 rounded-xl cursor-pointer bg-white"
                  name=""
                  id=""
                  onChange={(e) => setSelectWallet(e.target.value)}
                >
                  <option value="income">Income</option>
                  <option value="purchase">Purchase</option>
                  <option value="project-share">Project Share</option>
                  <option value="share-holder">Share Holder</option>
                  <option value="fixed-deposite">Fixed Deposite</option>
                  <option value="directorship">Directorship</option>
                </select>
              </div>

              {selectWallet == "income" && (
                <div className=" text-gray-700 text-lg">
                  <div>
                    Income Wallet:{" "}
                    <p className="inline text-rose-500 text-base">
                      {user?.wallet && user?.wallet?.income_wallet
                        ? user?.wallet?.income_wallet.toFixed(2)
                        : 0}
                    </p>
                  </div>
                </div>
              )}
              {selectWallet == "purchase" && (
                <div className="text-sm text-gray-700">
                  <div>
                    Purchase Wallet:{" "}
                    <p className="inline text-rose-500 text-base">
                      {user?.wallet?.purchase_wallet
                        ? user?.wallet?.purchase_wallet.toFixed(2)
                        : 0}
                    </p>
                  </div>
                </div>
              )}
              {selectWallet == "project-share" && (
                <div className="text-sm text-gray-700">
                  <div>
                    Project Share Wallet:{" "}
                    <p className="inline text-rose-500 text-base">
                      {user?.wallet?.project_share_wallet
                        ? user?.wallet?.project_share_wallet.toFixed(2)
                        : 0}
                    </p>
                  </div>
                </div>
              )}
              {selectWallet == "fixed-deposite" && (
                <div className="text-sm text-gray-700">
                  <div className="inline text-rose-500 text-base">
                    Fixed Deposite Wallet:{" "}
                    <p>
                      {user?.wallet?.fixed_deposit_wallet
                        ? user?.wallet?.fixed_deposit_wallet.toFixed(2)
                        : 0}
                    </p>
                  </div>
                </div>
              )}
              {selectWallet == "share-holder" && (
                <div className="text-sm text-gray-700">
                  <div>
                    Share Holder Wallet:{" "}
                    <p className="inline text-rose-500 text-base">
                      {user?.wallet?.share_holder_wallet
                        ? user?.wallet?.share_holder_wallet.toFixed(2)
                        : 0}
                    </p>
                  </div>
                </div>
              )}
              {selectWallet == "directorship" && (
                <div className="text-sm text-gray-700">
                  <div>
                    Directorship Wallet:{" "}
                    <p className="inline text-rose-500 text-base">
                      {user?.wallet?.directorship_wallet
                        ? user?.wallet?.directorship_wallet.toFixed(2)
                        : 0}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Accounts */}
      {/* <div className="flex flex-col gap-y-3 h-[300px] bg-white rounded-lg border-black border-2 w-full py-10 px-5 mt-6">
        <p className="font-bold">Account Info</p>
        <div>

        </div>
      </div> */}

      {/* send wallet profit button */}
      <div className="mt-5 flex items-center gap-x-5">
        <div
          // onMouseEnter={() => setOpenSetPositionModal(true)}
          // onMouseLeave={() => setOpenSetPositionModal(false)}
          onClick={() => {
            setOpenSetPositionModal((prev) => !prev);
          }}
        >
          <p
            style={{
              boxShadow:
                "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
            }}
            className="bg-teal-600 px-3 py-1 rounded-full text-white border-2 border-rose-400 shadow-black hover:scale-105 transition-all duration-300 ease-out cursor-pointer"
          >
            Set Designation
          </p>
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute p-5 ${openSetPositionModal ? "opacity-100" : "opacity-0 h-0 hidden"}`}
          >
            <div className="bg-white p-4 rounded">
              <input
                className="border-2 border-black outline-none px-3 py-1 rounded-xl bg-white"
                onChange={(e) => setDesignation(e.target.value)}
                type="text"
                name=""
                id=""
                placeholder="Type designation"
              />
              <div className="flex items-center gap-x-2 py-2 ">
                {" "}
                <p
                  onClick={handleSetPosition}
                  className="p-1 bg-teal-400 hover:bg-teal-500 cursor-pointer rounded-full px-3 py-1"
                >
                  {isLoading ? "Loading..." : "Save"}
                </p>
                <p
                  onClick={() => setOpenSetPositionModal(false)}
                  className="p-1 bg-rose-400 hover:bg-rose-500 cursor-pointer rounded-full px-3 py-1"
                >
                  Close
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
