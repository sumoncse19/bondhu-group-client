"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import baseUrl from "../../../../../../../config";
import Cookies from "js-cookie";
import { UserData } from "@/type";

const page = () => {
  const [user, setUser] = useState<UserData>();
  const params = useParams();
  const id = params.id;
  const token: string = Cookies.get("token") || "";
  const fetchSingleUser = async () => {
    const response = await fetch(`${baseUrl}/user/get-user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data?.success) {
      console.log("userN", data?.data);
      setUser(data?.data);
    }
  };
  useEffect(() => {
    fetchSingleUser();
  }, [id]);

  const personalInfoData = [
    {
      id: 0,
      key: "Id",
      value: user?._id,
    },
    {
      id: 1,
      key: "Name",
      value: user?.name,
    },
    {
      id: 2,
      key: "Picture",
      value: user?.picture,
    },
    {
      id: 3,
      key: "Usename",
      value: user?.user_name,
    },
    {
      id: 4,
      key: "Mobile No",
      value: user?.phone,
    },
    {
      id: 5,
      key: "Nid No",
      value: user?.nid_passport_no,
    },
    {
      id: 6,
      key: "Email",
      value: user?.email,
    },
    {
      id: 7,
      key: "Present Address",
      value: user?.present_address,
    },
    {
      id: 8,
      key: "Permanent Address",
      value: user?.permanent_address,
    },
    {
      id: 9,
      key: "Nationality",
      value: user?.nationality,
    },
    {
      id: 10,
      key: "Role",
      value: user?.role,
    },
    {
      id: 11,
      key: "Religion",
      value: user?.religion,
    },
    {
      id: 12,
      key: "Refferer",
      value: user?.reference_id,
    },
    {
      id: 13,
      key: "Parent Placement",
      value: user?.parent_placement_id,
    },
    {
      id: 14,
      key: "Team",
      value: user?.choice_side,
    },
    {
      id: 15,
      key: "Blodd Group",
      value: user?.blood_group,
    },
    {
      id: 16,
      key: "Father/Husband Name",
      value: user?.father_or_husband_name,
    },
    {
      id: 17,
      key: "Mother Name",
      value: user?.mother_name,
    },
    {
      id: 18,
      key: "Date Of Birth",
      value: user?.dob,
    },
    {
      id: 19,
      key: "Maritual Status",
      value: user?.marital_status,
    },
    {
      id: 20,
      key: "Profession",
      value: user?.profession,
    },
    {
      id: 21,
      key: "Nominee's Name",
      value: user?.nominee_name,
    },
    {
      id: 22,
      key: "Nominee's Address",
      value: user?.nominee_address,
    },
    {
      id: 23,
      key: "Nominee's Mobile No",
      value: user?.nominee_mobile_no,
    },
    {
      id: 24,
      key: "Relation With Nominee",
      value: user?.relation_with_nominee,
    },
  ];

  const walletData = [];

  const moreInfos = [];

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        {/* Personal Infos */}
        <div className="flex flex-col items-center gap-y-3 bg-red-900">
          {personalInfoData?.map((info) => (
            <div className="flex justify-between items-center" key={info?.id}>
              <div>{info?.key}</div>
              <div>{info?.value}</div>
            </div>
          ))}
        </div>
        {/* Accounts */}
        <div className="bg-red-500">
          <p>Wallet</p>
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center justify-between">
              <div>Income Waller</div>
              <div>{user?.wallet?.income_wallet}</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Purchase Waller</div>
              <div>{user?.wallet?.purchase_wallet}</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Team Bonus</div>
              <div>{user?.wallet?.matching_bonus}</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Referrel Bonus</div>
              <div>{user?.wallet?.reference_bonus}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
