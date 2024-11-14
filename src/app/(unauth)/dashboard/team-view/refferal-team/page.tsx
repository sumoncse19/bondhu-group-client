"use client";
import { formatDate } from "@/utils/dateUtils";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import baseUrl from "../../../../../../config";
import { Circles } from "react-loader-spinner";

const page = () => {
  const [refferedUsers, setRefferedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const id: string = Cookies.get("id") || "";
  const token: string = Cookies.get("token") || "";

  const fetchRefferedUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/user/get-referred-user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data?.success) {
        setRefferedUsers(data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRefferedUsers();
  }, [id]);
  return (
    <div className="py-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-10">
          <h1 className="text-rose-600 font-bold text-2xl">My Reffered Uers</h1>
          {/* <div
            onClick={() => router.back()}
            className="cursor-pointer bg-rose-500 hover:bg-rose-600 text-white px-5 py-1 rounded flex items-center gap-2"
          >
            <GiFastBackwardButton />
            <p> Back</p>
          </div> */}
        </div>
        {/* <div
          onClick={handlePrint}
          className="bg-teal-500 hover:bg-teal-700 transition-all duration-300 ease-in px-6 py-2 rounded cursor-pointer text-white flex items-center gap-x-3"
        >
          <GrDownload className="text-xl font-bold -mt-1" />
          <p> Download History</p>
        </div> */}
      </div>

      <div>
        {/* users table */}
        <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5 ">
          <table className="w-full text-sm text-left rtl:text-right text-white ">
            <thead className="sticky top-0 text-xs text-black uppercase bg-teal-300 border-2  border-black">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Mobile No
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Joined Date
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="text-center">
                  <td colSpan={4} align="center">
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
              ) : refferedUsers?.length <= 0 ? (
                <tr className="text-center">
                  <td colSpan={4} align="center">
                    <div className="my-5 flex flex-col justify-center items-center">
                      <p className="text-lg text-rose-500">No Data to Show</p>
                    </div>
                  </td>
                </tr>
              ) : (
                refferedUsers?.map(
                  (
                    user: {
                      _id: string;
                      name: string;
                      user_name: string;
                      phone: number;
                      registration_date: string;
                    },
                    i
                  ) => (
                    <tr
                      key={user._id}
                      className={`${i % 2 == 0 ? "bg-teal-50" : "bg-teal-200"} text-black border-2 border-slate-700`}
                    >
                      <td className="px-6 py-4 text-center">{user?.name}</td>
                      <td className="px-6 py-4 text-center">
                        {user?.user_name}
                      </td>
                      <td className="px-6 py-4 text-center">{user?.phone}</td>
                      <td className="px-6 py-4 text-center">
                        {user?.registration_date}
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
