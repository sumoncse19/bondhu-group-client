"use client";

import Link from "next/link";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Header = () => {
  const [user, setUser] = useState<Object>();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const router = useRouter();
  let userCookie;
  useEffect(() => {
    userCookie = Cookies.get("user");
    setUser(userCookie);
  }, [user]);
  return (
    <div
      // style={{
      //   boxShadow:
      //     " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
      // }}
      className={`" bg-[#d9f2fe] fixed
          top-0 flex justify-between items-center px-12 py-3  w-full z-[1000000] " }`}
    >
      {/* left side */}
      <div className="flex items-center">
        <div
          onClick={() => {
            router.push("/");
          }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            className="w-20 h-20 p-2 rounded-full  shadow-2xl"
            src="/images/logo1.png"
            alt=""
          />
          <p className="protest-guerrilla-regular text-2xl text-black">
            Bondhu Group
          </p>
        </div>
      </div>

      {/* middle side */}
      <div className="flex items-center gap-5">
        <a
          href="/"
          className="text-black   tracking-widest cursor-pointer hover:scale-110 hover:text-slate-800 transition-all duration-300 ease-in"
        >
          Home
        </a>
        <div
          onMouseEnter={() => setIsDropDownOpen(true)}
          onMouseLeave={() => setIsDropDownOpen(false)}
          className="text-black  text-lg tracking-widest cursor-pointer hover:scale-110 hover:text-slate-800 transition-all duration-300 ease-in relative"
        >
          <a>Institutional</a>

          {/* dropdown */}
          {isDropDownOpen && (
            <div className="w-[200px] h-fit  absolute top-6 py-5">
              <div className="bg-white text-black w-full h-full text-sm pt-5 pb-10 px-5 rounded">
                <div className="flex flex-col  gap-y-3">
                  <p
                    onClick={() =>
                      router.push("/institutional/board-directors")
                    }
                    className="border-b border-slate-700 pb-2 hover:text-red-500 transition-all duration-300 ease-in"
                  >
                    Board Of Directors
                  </p>
                  <p className="border-b border-slate-700 pb-2 hover:text-red-500 transition-all duration-300 ease-in">
                    Company Principles
                  </p>
                  <p
                    onClick={() => router.push("/institutional/certificates")}
                    className="border-b border-slate-700 pb-2 hover:text-red-500 transition-all duration-300 ease-in"
                  >
                    Our Certificates
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <a
          href="#services"
          className="text-black  tracking-widest cursor-pointer hover:scale-110 hover:text-slate-800 transition-all duration-300 ease-in"
        >
          Services
        </a>
        <a
          href="#projects"
          className="text-black  tracking-widest cursor-pointer hover:scale-110 hover:text-slate-800 transition-all duration-300 ease-in"
        >
          Projects
        </a>
        <a className="text-black  tracking-widest cursor-pointer hover:scale-110 hover:text-slate-800 transition-all duration-300 ease-in">
          Events
        </a>
        {/* search box */}
        {/* <div className="relative">
          <input
            className="px-8 py-2 outline-none bg-[#c4e6d0] focus:border focus:border-red-600  rounded-md"
            type="text"
            placeholder="Search your company"
          />
          <FaSearch className="absolute top-[50%] -translate-y-1/2 right-3 text-lg " />
        </div> */}
        {/* account */}
        {/* <Link href="/login" className="flex flex-col items-center text-white">
          <MdOutlineManageAccounts className="text-3xl cursor-pointer" />
        </Link> */}

        {/* <div>
          <Link
            href="/dashboard"
            className="cursor-pointer border border-red-600 px-4 py-2 rounded-md hover:bg-red-200 hover:text-black transition-all duration-300 ease-in"
          >
            Dashboard
          </Link>
        </div> */}
      </div>
      {/* right side */}
      <div>
        {user ? (
          <div
            onClick={() => {
              Cookies.remove("user");
              setUser({});
            }}
            className="text-black tracking-wider bg-teal-400 px-5 py-2 rounded-md hover:scale-110 transition-all duration-300 ease-in-out hover:tracking-widest cursor-pointer"
          >
            Log Out
          </div>
        ) : (
          <Link
            href="/login"
            className="text-black tracking-wider bg-teal-400 px-5 py-2 rounded-md hover:scale-110 transition-all duration-300 ease-in-out hover:tracking-widest "
          >
            Log in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
