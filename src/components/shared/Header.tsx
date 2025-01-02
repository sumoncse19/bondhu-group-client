"use client";
import Link from "next/link";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaMinus, FaPlus, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { NavbarDemo } from "../Navbar-Menu";
import WariningMessage from "./Warning";
import WarningMessage from "./Warning";
import { BsMenuButtonWideFill } from "react-icons/bs";
import SubMenu from "antd/es/menu/SubMenu";
import { AiFillCloseSquare } from "react-icons/ai";
import MobileSidebar from "./MobileSidebar";

const Header = () => {
  const [user, setUser] = useState<Object>();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState({
    state: false,
    value: "",
  });

  const router = useRouter();
  const pathname = usePathname();
  // const location=use

  let userCookie;
  useEffect(() => {
    userCookie = Cookies.get("user");
    setUser(userCookie);
  }, [user]);

  return (
    <div>
      <div
        // style={{
        //   boxShadow:
        //     " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        // }}
        className="bg-white fixed top-0 py-3  w-full z-[10000000000000000] overflow-hidden"
      >
        <div className="w-[90%] mx-auto flex justify-between items-center bg-white">
          {/* left side */}
          <div className="flex items-center ">
            <div
              onClick={() => {
                router.push("/");
              }}
              className="flex items-center gap-1 lg:gap-3 cursor-pointer"
            >
              <img
                className="w-14 lg:w-20 h-14 lg:h-20 p-2 rounded-full"
                src="/images/logo1.png"
                alt=""
              />
              <p className="text-base lg:text-lg text-black uppercase">
                Bondhu Group
              </p>
            </div>
          </div>

          {/* middle side */}
          <NavbarDemo />
          {/* right side */}
          <div className="flex items-center gap-4">
            {pathname !== "/login" && (
              <div>
                {user ? (
                  <div
                    onClick={() => {
                      Cookies.remove("user");
                      Cookies.remove("id");
                      Cookies.remove("have_purchase_wallet");
                      Cookies.remove("role");
                      Cookies.remove("username");
                      Cookies.remove("token");
                      setUser({});
                    }}
                    className="text-white tracking-wider bg-teal-500 px-3 lg:px-5 py-0.5 lg:py-2 font-bold rounded-md hover:scale-105 transition-all duration-300 ease-in-out hover:tracking-widest cursor-pointer"
                  >
                    Log Out
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="text-white tracking-wider bg-teal-500 px-3 lg:px-5 py-0.5 lg:py-2 rounded-md hover:scale-105 transition-all duration-300 ease-in-out hover:tracking-widest "
                  >
                    Let's Start
                  </Link>
                )}
              </div>
            )}
            <BsMenuButtonWideFill
              onClick={() => setIsSidebarOpen(true)}
              className="text-xl text-teal-500 lg:hidden"
            />
          </div>
        </div>
      </div>

      {/* MobileSidebar */}
      {isSidebarOpen && (
        <MobileSidebar
          navs={navs}
          setIsSidebarOpen={setIsSidebarOpen}
          isSubMenuOpen={isSubMenuOpen}
          setIsSubMenuOpen={setIsSubMenuOpen}
        />
      )}
    </div>
  );
};

export default Header;

const navs = [
  { id: 1, title: "Home", link: "/" },
  {
    id: 2,
    title: "Institution",
    link: "/institutional/board-directors",
    subMenu: [
      {
        id: 21,
        title: "Board Directors",
        link: "/institutional/board-directors",
      },
      { id: 22, title: "Company Principles", link: "" },
      {
        id: 23,
        title: "Our Certificates",
        link: "/institutional/certificates",
      },
    ],
  },
  {
    id: 3,
    title: "Projects",
    link: "/projects/bondhu-builders",
    subMenu: [
      {
        id: 1,
        title: "Bondhu Builders",
        link: "/projects/bondhu-builders",
      },
      {
        id: 2,
        title: "Bondhu Super Shop",
        link: "/projects/bondhu-super-shop",
      },
      {
        id: 3,
        title: "Bondhu Agro & Agriculture",
        link: "/projects/bondhu-agro-argriculture",
      },
      {
        id: 4,
        title: "Bondhu Resort",
        link: "/projects/bondhu-resort",
      },
      {
        id: 5,
        title: "Bondhu Brokerage",
        link: "/projects/bondhu-brokerage",
      },
      {
        id: 6,
        title: "Bondhu IT Institute",
        link: "/projects/bondhu-it-institute",
      },
      {
        id: 7,
        title: "Bondhu Tour & Travells",
        link: "/projects/bondhu-tour-travells",
      },
      {
        id: 8,
        title: "Bondhu General Hospital",
        link: "/projects/bondhu-general-hospital",
      },
      {
        id: 9,
        title: "Bondhu Food & Beverage",
        link: "/projects/bondhu-food-beverage",
      },
      {
        id: 10,
        title: "Bondhu General Hospital",
        link: "/projects/bondhu-general-hospital",
      },
      {
        id: 11,
        title: "Bondhu Garments",
        link: "/projects/bondhu-garments",
      },
      {
        id: 12,
        title: "Bondhu Parcel & Currier Service",
        link: "/projects/bondhu-parcel-currier",
      },
      {
        id: 13,
        title: "Bondhu Transport",
        link: "/projects/bondhu-transport",
      },
    ],
  },
  { id: 4, title: "Events", link: "/events" },
  { id: 5, title: "Magazine", link: "/magazine" },
  { id: 6, title: "Media Partner", link: "/media-partner" },
];
