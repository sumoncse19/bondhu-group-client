import MatchingBonusChart from "@/components/Chats/MatchingBonusChart";
import RefferelBonusChart from "@/components/Chats/RefferelBonusChart";
import ProfileHeader from "@/components/ui/ProfileHeader";
import { FaHandPointRight } from "react-icons/fa";

import React from "react";

const MyProfile = () => {
  return (
    <div>
      <div className="">
        {/* cover and profile pic */}
        <ProfileHeader />

        {/* profile details */}
        <div className="mt-16">
          <div className="flex gap-6">
            {/* information */}
            <div
              style={{
                boxShadow:
                  "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
              }}
              className="w-[50%] h-fit bg-[#EAE9E8]  py-4 px-12 rounded"
            >
              <h1 className="text-black font-bold text-xl text-center">
                Personal Information
              </h1>

              <div className="py-10 flex flex-col gap-y-3">
                {personalInfo?.map((info) => (
                  <div
                    className="flex items-center bg-[#DBDBDA] text-slate-700 py-2"
                    key={info?.id}
                  >
                    <div className="w-[50%] flex justify-center items-center">
                      <p>{info?.name}</p>
                    </div>
                    <FaHandPointRight className="text-green-600 text-xl" />
                    <div className="w-[50%] flex justify-center items-center text-sm">
                      <p className="font-bold">{info?.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* wallet */}
            <div className="w-[50%] flex flex-col gap-y-5 h-[500px]">
              {/* referrel bonus */}
              <div
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                }}
                className="w-full h-60 bg-[#EAE9E8] p-5 rounded-md text-slate-700"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">&#x9F3; 0.00</p>
                    <p className="text-rose-700 font-bold">Refferel Bonus</p>
                  </div>
                  <div className="px-2 h-8 bg-green-700 shadow-lg cursor-pointer rounded-sm flex justify-center items-center">
                    <p className="text-white text-sm font-bold">View</p>
                  </div>
                </div>
                <div className="w-full h-28 mt-6">
                  <RefferelBonusChart />
                </div>
              </div>
              {/* matching bonus */}
              <div
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                }}
                className="w-full h-60 bg-[#EAE9E8] p-5 rounded-md text-slate-700"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">&#x9F3; 0.00</p>
                    <p className="text-rose-700 font-bold">Matching Bonus</p>
                  </div>
                  <div className="px-2 h-8 bg-green-700 shadow-lg rounded-sm cursor-pointer flex justify-center items-center">
                    <p className="text-white text-sm font-bold">View</p>
                  </div>
                </div>
                <div className="w-full h-28 mt-6">
                  <MatchingBonusChart />
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

const personalInfo = [
  {
    id: 1,
    name: "Name",
    value: "Shakir Ahmed",
  },
  {
    id: 2,
    name: "ID",
    value: "31",
  },
  {
    id: 3,
    name: "Id Status",
    value: "Business Account",
  },
  {
    id: 4,
    name: "Username",
    value: "shakirAh019",
  },
  {
    id: 5,
    name: "Father",
    value: "Jamal Uddin",
  },
  {
    id: 6,
    name: "Mother",
    value: "",
  },
  {
    id: 7,
    name: "Mobile",
    value: "+8801811311",
  },
  {
    id: 8,
    name: "Email",
    value: "shakirahmed@gmail.com",
  },
  {
    id: 9,
    name: "Date Of Birth",
    value: "10.09.1987",
  },
  {
    id: 10,
    name: "Religion",
    value: "",
  },
  {
    id: 11,
    name: "Gender",
    value: "Male",
  },
  {
    id: 12,
    name: "Blood",
    value: "AB+",
  },
];
