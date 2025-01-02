"use client";
import React, { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import baseUrl from "../../../config";

const LeadersClubMemberTable = () => {
  const [clubMember, setClubMember] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isClient, setIsClient] = useState(false);

  const token: string = Cookies.get("token") || "";

  const fetchAllUser = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/user/get-all-users?page=1&limit=20&is_club_member=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res?.data?.success) {
        setClubMember(res?.data?.data?.usersWithPartners);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true); // Ensures the component is client-side
    fetchAllUser();
  }, []);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  if (!isClient) {
    return null; // Prevent server-side rendering of the component
  }

  return (
    <div className="col-span-1">
      <div
        style={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
        className="bg-white rounded-md pb-5"
      >
        <div className="p-4 flex items-center justify-between">
          <p>Leaders Club Member</p>
        </div>
        <div className="my-3">
          {/* table header */}
          <div className="flex items-center justify-between bg-gray-200 px-4 py-2 text-sm">
            <div className="w-full">Username</div>
            <div className="w-full">Role</div>
            <div className="w-full">Club Joined</div>
            <div className="w-full">Club Bonus</div>
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <div className="w-full flex justify-center py-2">
                <p>Loading...</p>
              </div>
            ) : clubMember.length <= 0 ? (
              <div className="w-full flex justify-center py-2">
                <p>No data to show</p>
              </div>
            ) : (
              clubMember.map(
                (member: {
                  _id: string;
                  user_name: string;
                  role: string;
                  club_joining_date: string;
                  wallet: { club_bonus: number };
                }) => (
                  <div
                    key={member?._id}
                    className="flex items-center justify-between border-b border-blue-200 px-4 py-3 text-sm"
                  >
                    <div className="w-full">{member?.user_name}</div>
                    <div className="w-full">{member?.role}</div>
                    <div className="w-full">
                      {formatDate(member?.club_joining_date)}
                    </div>
                    <div className="w-full">{member?.wallet?.club_bonus}</div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadersClubMemberTable;
