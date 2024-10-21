"use client";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Sidebar } from "@/components/shared/Sidebar";
import Sidebar2 from "@/components/shared/Sidebar2";
import Cookies from "js-cookie";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";

export default function Layout(props: { children: React.ReactNode }) {
  const [userName, setUserName] = useState<string>("");
  const params = useParams();
  const pathname = usePathname();
  // const username: string = Cookies.get("username") || "";

  useEffect(() => {
    const userNameCookies = Cookies?.get("username") || "";
    setUserName(userNameCookies);
  }, []);

  return (
    <div className="mainBg bg-white text-black ">
      {pathname.includes("/dashboard") ? (
        <div className="flex">
          <Sidebar2 />
          <div className="grow self-start flex flex-col  ml-[230px] ">
            <div
              style={{
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
              }}
              className="w-full h-[70px] flex justify-end items-center px-6 shadow-black"
            >
              <div className="flex items-center gap-x-4">
                <p className="text-teal-600 font-bold text-lg">{userName}</p>
                <IoIosNotifications className="text-xl cursor-pointer" />
                <Link
                  href="/login"
                  className="bg-black text-white px-5 py-1 rounded-full hover:scale-105 transition-all duration-300 ease-in"
                >
                  Logout
                </Link>
              </div>
            </div>
            <div className="p-5 bg-gray-100 flex-grow min-h-[100vh]">
              {props.children}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between ">
          <Header />
          <div className="min-h-[100vh] mt-[100px]">{props.children}</div>
          <Footer />
        </div>
      )}
    </div>
  );
}
