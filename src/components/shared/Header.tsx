"use client";
import Link from "next/link";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <div
      // style={{
      //   boxShadow:
      //     " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
      // }}
      className="bg-[#f8eee2]  flex justify-between px-12 py-3 fixed top-0 w-full z-[1000]"
    >
      {/* left side */}
      <div className="flex items-center">
        <div className="flex items-center gap-3">
          <img className="w-20 h-20" src="/images/logo.png" alt="" />
          <p className="protest-guerrilla-regular text-3xl text-red-600">
            Bondhu Group
          </p>
        </div>
      </div>

      {/* right side */}
      <div className="flex items-center gap-5">
        {/* search box */}
        <div className="relative">
          <input
            className="px-8 py-2 outline-none bg-[#c4e6d0] focus:border focus:border-red-600  rounded-md"
            type="text"
            placeholder="Search your company"
          />
          <FaSearch className="absolute top-[50%] -translate-y-1/2 right-3 text-lg " />
        </div>
        {/* account */}
        <div className="flex flex-col items-center">
          <MdOutlineManageAccounts className="text-3xl cursor-pointer" />
        </div>
        <div>
          <Link
            href="/dashboard"
            className="cursor-pointer border border-red-600 px-4 py-2 rounded-md hover:bg-red-200 hover:text-black transition-all duration-300 ease-in"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
