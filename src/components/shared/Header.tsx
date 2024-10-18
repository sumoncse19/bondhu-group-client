"use client";

import Link from "next/link";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { NavbarDemo } from "../Navbar-Menu";

const Header = () => {
  const [user, setUser] = useState<Object>();
  const [isDropDownOpen, setIsDropDownOpen] = useState({
    status: false,
    value: "",
  });
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
      <NavbarDemo />
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
