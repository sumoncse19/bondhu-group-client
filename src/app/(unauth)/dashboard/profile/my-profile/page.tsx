"use client";
import MatchingBonusChart from "@/components/Charts/MatchingBonusChart";
import RefferelBonusChart from "@/components/Charts/RefferelBonusChart";
import ProfileHeader from "@/components/ui/ProfileHeader";
import { FaHandPointRight } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import { UserData } from "@/type";
import Cookies from "js-cookie";
import baseUrl from "../../../../../../config";
import Link from "next/link";
import ClubBonusChart from "@/components/Charts/ClubBonusChart";

const MyProfile = () => {
  const [user, setUser] = useState<UserData>();
  const id = Cookies.get("id");
  const token = Cookies.get("token");

  const fetchSingleUser = async () => {
    const response = await fetch(`${baseUrl}/user/get-user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data?.success) {
      setUser(data?.data);
    }
  };
  useEffect(() => {
    fetchSingleUser();
  }, [id]);

  const personalInfo = [
    {
      id: 1,
      name: "Name",
      value: user?.name,
    },

    {
      id: 3,
      name: "Designation",
      value: user?.designation ? user?.designation : "",
    },
    {
      id: 4,
      name: "Username",
      value: user?.user_name,
    },
    {
      id: 5,
      name: "Father/Husband",
      value: user?.father_or_husband_name,
    },
    {
      id: 6,
      name: "Mother",
      value: user?.mother_name,
    },
    {
      id: 7,
      name: "Mobile",
      value: user?.phone,
    },
    {
      id: 8,
      name: "Email",
      value: user?.email,
    },
    {
      id: 9,
      name: "Date Of Birth",
      value: user?.dob,
    },
    {
      id: 10,
      name: "Religion",
      value: user?.religion,
    },

    {
      id: 12,
      name: "Blood",
      value: user?.blood_group,
    },
    {
      id: 13,
      name: "Maritual Status",
      value: user?.marital_status,
    },
    {
      id: 14,
      name: "Nationality",
      value: user?.nationality,
    },
    {
      id: 15,
      name: "Nid No",
      value: user?.nid_passport_no,
    },
    {
      id: 16,
      name: "Profession",
      value: user?.profession,
    },
    {
      id: 17,
      name: "Refferer",
      value: user?.reference_id?.user_name,
    },
    {
      id: 18,
      name: "Nominee's Name",
      value: user?.nominee_name,
    },
    {
      id: 19,
      name: "Nominee's Phone",
      value: user?.nominee_mobile_no,
    },
    {
      id: 20,
      name: "Relation With Nominee",
      value: user?.relation_with_nominee || "",
    },
    {
      id: 21,
      name: "Bkash Account",
      value: user?.bKash || "",
    },
    {
      id: 22,
      name: "Nagad Account",
      value: user?.nagad || "",
    },
    {
      id: 23,
      name: "Rocket Account",
      value: user?.rocket || "",
    },
    {
      id: 24,
      name: "Bank Account Name",
      value: user?.bank_account_name || "",
    },
    {
      id: 25,
      name: "Bank Account No",
      value: user?.account_no || "",
    },
    {
      id: 26,
      name: "Bank Name",
      value: user?.bank_name || "",
    },
    {
      id: 27,
      name: "Bank Branch",
      value: user?.branch_name || "",
    },
    {
      id: 28,
      name: "Routing No",
      value: user?.routing_no || "",
    },
    {
      id: 29,
      name: "Swift Code",
      value: user?.swift_code ? user?.swift_code : "--",
    },
  ];

  const sampleData = [
    { name: "Page A", uv: 100, pv: 100 },
    { name: "Page B", uv: 200, pv: 200 },
    // Add more data as needed
  ];

  return (
    <div className="bg-gray-100">
      <div className="">
        {/* cover and profile pic */}
        <ProfileHeader
          name={user?.name}
          user_name={user?.user_name}
          phone={user?.phone}
          registration_date={user?.registration_date}
          picture={user?.picture}
          cover_photo={user?.cover_photo}
        />

        {/* profile details */}
        <div
          style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
          className="mt-16 bg-white px-2"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* information */}
            <div
              // style={{
              //   boxShadow:
              //     "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
              // }}
              className="w-full h-fit bg-white py-5 px-2 rounded"
            >
              <h1 className="text-black font-bold text-xl text-center">
                Personal Information
              </h1>

              <div className="py-10 flex flex-col gap-y-3 w-full">
                {personalInfo?.map((info) => (
                  <div
                    className="w-full flex items-center bg-red-50 text-slate-700 py-2 border border-black rounded-xl"
                    key={info?.id}
                  >
                    <div className="w-full flex justify-center items-center">
                      <p>{info?.name}</p>
                    </div>
                    <FaHandPointRight className="text-green-600 text-xl" />
                    <div className="w-full flex justify-center items-center text-sm">
                      <p className="font-bold">{info?.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* wallet */}
            <div className="w-full flex flex-col gap-y-5 h-[500px]">
              {/* referrel bonus */}
              <div
                // style={{
                //   boxShadow:
                //     "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                // }}
                className="w-full h-60 bg-white p-5 rounded-md text-slate-700"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold tracking-wider">
                      &#x9F3;{" "}
                      {user?.wallet?.reference_bonus
                        ? Math.ceil(user?.wallet?.reference_bonus)
                        : 0.0}
                    </p>
                    <p className="text-rose-700 font-bold">Refferel Bonus</p>
                  </div>
                  <div className="px-2 h-8 bg-green-700 hover:scale-105 transition-all duration-300 ease-in shadow-lg cursor-pointer rounded-sm flex justify-center items-center">
                    <Link
                      href="/dashboard/wallet/income-wallet"
                      className="text-white text-sm font-bold"
                    >
                      View
                    </Link>
                  </div>
                </div>
                <div className="w-full h-28 mt-6">
                  <RefferelBonusChart />
                </div>
              </div>
              {/* matching bonus */}
              <div
                // style={{
                //   boxShadow:
                //     "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                // }}
                className="w-full h-60 bg-white p-5 rounded-md text-slate-700"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold tracking-widest">
                      &#x9F3;{" "}
                      {user?.wallet?.matching_bonus
                        ? Math.ceil(user?.wallet?.matching_bonus)
                        : 0.0}
                    </p>
                    <p className="text-rose-700 font-bold">Team Bonus</p>
                  </div>
                  <div className="px-2 h-8 bg-green-700 hover:scale-105 transition-all duration-300 ease-in shadow-lg rounded-sm cursor-pointer flex justify-center items-center">
                    <Link
                      href="/dashboard/wallet/income-wallet"
                      className="text-white text-sm font-bold"
                    >
                      View
                    </Link>
                  </div>
                </div>
                <div className="w-full h-28 mt-6">
                  <MatchingBonusChart />
                </div>
              </div>

              {/* Club Bonus */}
              <div
                // style={{
                //   boxShadow:
                //     "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                // }}
                className="w-full h-60 bg-white p-5 rounded-md text-slate-700"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold tracking-widest">
                      &#x9F3;{" "}
                      {user?.wallet?.matching_bonus
                        ? Math.ceil(user?.wallet?.matching_bonus)
                        : 0.0}
                    </p>
                    <p className="text-rose-700 font-bold">Club Bonus</p>
                  </div>
                  <div className="px-2 h-8 bg-green-700 hover:scale-105 transition-all duration-300 ease-in shadow-lg rounded-sm cursor-pointer flex justify-center items-center">
                    <Link
                      href="/dashboard/wallet/income-wallet"
                      className="text-white text-sm font-bold"
                    >
                      View
                    </Link>
                  </div>
                </div>
                <div className="w-full h-28 mt-6">
                  <ClubBonusChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
