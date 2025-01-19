"use client";
import React, { useEffect, useState } from "react";
import useStore from "../../../../../Zustand/Store/userStore";
import Cookies from "js-cookie";
import baseUrl from "../../../../../../config";
import { useRouter } from "next/navigation";

interface UserData {
  _id?: string;
  name: string;
  user_name: string;
  father_or_husband_name: string;
  mother_name: string;
  picture: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  present_address: string;
  permanent_address: string;
  nationality: string;
  religion: string;
  blood_group: string;
  nid_passport_no: string;
  dob: string;
  choice_side: string;
  marital_status: string;
  profession: string;
  reference_id: string;
  parent_placement_id: string;
  nominee_name: string;
  relation_with_nominee: string;
  nominee_address: string;
  nominee_mobile_no: string;
  nominee_picture: string;
  registration_date: string;
  wallet: {
    purchase_wallet: number;
  };
}

const page = () => {
  const [user, setUser] = useState<UserData>();

  const id = Cookies.get("id");
  const token = Cookies.get("token");
  const router = useRouter();

  const getSingleUser = async () => {
    const response = await fetch(`${baseUrl}/user/get-user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data.success) {
      setUser(data?.data);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, [id]);

  return (
    <div className="w-full h-full">
      <h1 className=" text-3xl text-rose-600 font-bold">Purchase Wallet</h1>

      {/* balance inflow and cost */}
      <div className="mt-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* inflow */}
        <div
          // style={{
          //   boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
          // }}
          className="w-full rounded-md"
        >
          <div className="border-4 border-black rounded-md">
            <div className="bg-green-100 text-rose-700 font-bold py-5 px-2 border-b-4 border-black  text-xl">
              Balance Inflow
            </div>

            {/* from admin */}
            <div className="flex items-center bg-green-200   text-black px-2">
              <div className="w-[60%] border-r-4 border-black py-4">
                In From Admin
              </div>
              <div className="w-[20%] text-center  border-r-4 border-black py-4">
                &#2547; {user?.wallet?.purchase_wallet}
              </div>
              <div
                onClick={() => {
                  router.push(
                    "/dashboard/wallet/purchase-wallet/purchase-history"
                  );
                }}
                className="w-[20%] text-center cursor-pointer  transition-all duration-100 ease-out hover:text-red-800 hover:font-bold"
              >
                View
              </div>
            </div>
          </div>
        </div>
        {/* expenses */}
        <div
          // style={{
          //   boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
          // }}
          className="w-full rounded-md self-start"
        >
          <div className="border-4 border-black rounded-md">
            <div className="bg-red-100 text-teal-700 font-bold py-5 px-2 border-b-4 border-black  text-xl">
              Balance Expenses
            </div>
            {/* deposite */}
            <div className="flex items-center bg-red-200 text-black  px-2">
              <div className="w-[60%] border-r-4 border-black py-4">
                Joining
              </div>
              <div className="w-[20%] text-center  border-r-4 border-black py-4">
                &#2547; 0.00
              </div>
              <div
                onClick={() => {
                  router.push(
                    "/dashboard/wallet/purchase-wallet/balance-expensses-history"
                  );
                }}
                className="w-[20%] text-center cursor-pointer  transition-all duration-100 ease-out hover:text-red-800 hover:font-bold"
              >
                View
              </div>
            </div>

            {/* total */}
            {/* <div className="flex items-center bg-red-600 text-white font-bold border-t-4 border-black  px-2">
              <div className="w-[60%] border-r-4 border-black py-4">
                Total Inflow
              </div>
              <div className="w-[20%] text-center   py-4">0.00</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
