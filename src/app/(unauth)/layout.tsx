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
            <div className="p-5  bg-gray-100 flex-grow min-h-[100vh]">
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
