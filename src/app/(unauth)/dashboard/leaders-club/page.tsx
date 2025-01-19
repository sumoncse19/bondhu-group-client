"use client";
import LeadersClubMemberTable from "@/components/shared/LeadersClubMemberTable";
import axios, { isAxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import baseUrl from "../../../../../config";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const page = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedDate2, setSelectedDate2] = useState<Date | null>(new Date());
  const [clubBonusHistories, setClubBonusHistories] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const token: string = Cookies.get("token") || "";

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleDateChange2 = (date: Date | null) => {
    setSelectedDate2(date);
  };

  function formatDate(dateString: Date | null): string {
    if (!dateString) {
      throw new Error("Date is null or undefined");
    }

    const date = dateString instanceof Date ? dateString : new Date(dateString);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleSendClubBonus = async () => {
    try {
      await axios
        .post(
          `${baseUrl}/add-money/send-club-bonus?date=${formatDate(selectedDate)}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.data?.success) {
            toast.success(res?.data?.message);
            fetchClubBonusHistory();
          } else {
            toast.error(res?.data?.errors[0]);
          }
        });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const fetchClubBonusHistory = async () => {
    try {
      await axios
        .get(
          `${baseUrl}/history/get-send-club-bonus-by-date?date=${formatDate(selectedDate2)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.data?.success) {
            setClubBonusHistories(res?.data?.data);
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

  useEffect(() => {
    fetchClubBonusHistory();
  }, [selectedDate2]);

  return (
    <div className="">
      {/* pathname */}
      <div>
        <div className="flex items-center gap-1 text-xl">
          <Link
            href="/dashboard"
            className="hover:text-blue-500 cursor-pointer"
          >
            Home
          </Link>{" "}
          <p>/</p> <p>Leaders Club</p>
        </div>
      </div>
      {/* pay club bonus to member */}
      <div className="mt-10">
        <div className="flex items-center gap-3">
          <label htmlFor="pay_date">Payment Date</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {/* Calendar Icon */}
            <FaCalendarAlt style={{ fontSize: "1rem", color: "#555" }} />

            {/* Date Picker Component */}
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Choose a date"
              isClearable
              className="p-1 cursor-pointer"
            />
          </div>
          <button
            onClick={handleSendClubBonus}
            className="bg-teal-400 hover:bg-teal-500 text-white px-3 py-1 rounded"
          >
            Pay Club Bonus
          </button>
        </div>
      </div>

      {/* club member and histories */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 my-10">
        {/* club member */}
        <LeadersClubMemberTable />
        {/* histories */}
        <div className="col-span-1">
          <div
            style={{
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
            className="bg-white rounded-md pb-5"
          >
            <div className="p-4 flex items-center justify-between">
              <p>Club Bonus History</p>

              <div className="flex items-center gap-2">
                <label htmlFor="">Choose Date</label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {/* Calendar Icon */}
                  <FaCalendarAlt style={{ fontSize: "1rem", color: "#555" }} />

                  {/* Date Picker Component */}
                  <DatePicker
                    selected={selectedDate2}
                    onChange={handleDateChange2}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Choose a date"
                    isClearable
                    className="p-1 cursor-pointer bg-gray-200"
                  />
                </div>
              </div>
            </div>

            {/* history table */}
            <div className="my-3">
              {/* table header */}
              <div className="flex items-center justify-between bg-gray-200 px-4 py-2">
                <div className="w-full">Date</div>
                <div className="w-full">Club Member</div>
                <div className="w-full">Total Bonus</div>
                <div className="w-full">Bonus Per Member</div>
              </div>

              <div className="flex flex-col">
                {isLoading ? (
                  <div className="w-full flex justify-center">
                    <p className="py-2">Loading...</p>
                  </div>
                ) : clubBonusHistories?.length <= 0 ? (
                  <div className="w-full flex justify-center">
                    <p className="py-2">No data to show</p>
                  </div>
                ) : (
                  clubBonusHistories?.map(
                    (history: {
                      _id: string;
                      date: string;
                      total_members: number;
                      club_bonus_amount: number;
                      bonus_per_member: number;
                    }) => (
                      <div
                        key={history?._id}
                        className="flex items-center justify-between border-b border-blue-200 px-4 py-2"
                      >
                        <div className="w-full">{history?.date}</div>
                        <div className="w-full">{history?.total_members}</div>
                        <div className="w-full">
                          {history?.club_bonus_amount}
                        </div>
                        <div className="w-full">
                          {history?.bonus_per_member}
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
