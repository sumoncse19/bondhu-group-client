"use client";

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

import { Circles } from "react-loader-spinner";
import { formatDate } from "@/utils/dateUtils";
import { getUserNameById } from "@/utils/userUtils";
import baseUrl from "../../../config";

interface BonusHistories {
  matching_bonus_amount: number;
  type: string;
  date: string;
  _id: string;
}

interface TeamBonusHistoryData {
  _id: string;
  userId: string;
  total_matching_history: number;
  matching_bonus_history: BonusHistories[];
}
const TeamBonus = () => {
  const [teamBonusHistories, setTeamBonusHistories] =
    useState<TeamBonusHistoryData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usernames, setUsernames] = useState<{ [key: string]: string }>({});

  const id: string = Cookies.get("id") || "";
  const token: string = Cookies.get("token") || "";

  const fetchRefferalBonusHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/history/get-matching-history/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setTeamBonusHistories(data?.data?.matchingBonusHistories[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRefferalBonusHistory();
  }, [id]);

  return (
    <div
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
      className="p-4 rounded-lg"
    >
      <div className="flex items-center justify-between">
        <p className="text-rose-500 font-bold">Total Team Bonus</p>
        <p className="text-lg">
          &#2547; {teamBonusHistories?.total_matching_history}
        </p>
      </div>

      {/* table */}
      <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5 ">
        <table className="w-full text-sm text-left rtl:text-right text-white">
          <thead className="sticky top-0 text-xs text-black uppercase bg-red-100 ">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Bonus Amount
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Recieved Date
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
            ) : teamBonusHistories?.matching_bonus_history &&
              teamBonusHistories?.matching_bonus_history?.length <= 0 ? (
              <tr className="text-center">
                <td colSpan={12} align="center">
                  <div className="my-5 flex flex-col justify-center items-center">
                    <p className="text-lg text-rose-500">No Data to Show</p>
                  </div>
                </td>
              </tr>
            ) : (
              teamBonusHistories?.matching_bonus_history
                ?.slice()
                .reverse()
                .map((history: BonusHistories) => (
                  <tr
                    key={history?._id}
                    className="bg-red-100 text-black border-b-2 border-slate-700 "
                  >
                    <td className="px-6 py-4 text-center">
                      {history?.matching_bonus_amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {formatDate(history?.date)}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamBonus;
