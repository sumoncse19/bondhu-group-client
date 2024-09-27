import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { LuUser2 } from "react-icons/lu";
import { IoCall } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";

const ProfileHeader = () => {
  return (
    <div className="w-full h-fit  flex flex-col rounded-md border overflow-hidden bg-[#dfd5cf] shadow">
      {/* cover image */}
      <div className="w-full h-[200px] bg-blue-300 pt-10 px-16 relative">
        <div className=" absolute bottom-8 right-10">
          <div className="flex items-center gap-2 bg-white px-5 py-2 border border-black cursor-pointer text-black rounded-md">
            <FaCameraRetro />
            <p>Edit Cover</p>
          </div>
        </div>
      </div>
      {/* profile image and intro */}
      <div className="w-full h-[40%]  px-16 pt-2 pb-10">
        <div className="flex gap-6">
          {/* profile pic */}
          <div className="-mt-12 z-[2000] p-2 relative">
            <img
              className="w-24 h-24"
              src="/images/profilePicIcon.png"
              alt=""
            />
            <FaCameraRetro className="text-white text-2xl absolute bottom-5 right-3 bg-black p-1 rounded-full" />
          </div>
          <div className="pt-3">
            <div className=" flex items-center gap-10">
              <p className="text-xl font-bold text-black">Shakir Ahmed</p>
              <span className="flex items-center gap-2">
                <AiOutlineSafetyCertificate className="text-green-500 text-xl font-bold" />
                <p className="bg-green-500 px-3 rounded-lg text-white font-bold">
                  Business Account
                </p>
              </span>
            </div>

            <div className="mt-5 flex items-center gap-5 text-slate-600 text-sm">
              <span className="flex items-center gap-1">
                <LuUser2 />
                <p>shakirAh019</p>
              </span>
              <span className="flex items-center gap-1">
                <IoCall />
                <p>+88017122311</p>
              </span>
              <span className="flex items-center gap-2">
                <SlCalender />
                <p>Joined 12/01/24</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;