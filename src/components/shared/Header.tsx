"use client";
import Link from "next/link";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaMinus, FaPlus, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { NavbarDemo } from "../Navbar-Menu";
import WariningMessage from "./Warning";
import WarningMessage from "./Warning";
import { BsMenuButtonWideFill } from "react-icons/bs";
import SubMenu from "antd/es/menu/SubMenu";
import { AiFillCloseSquare } from "react-icons/ai";

const Header = () => {
  const [user, setUser] = useState<Object>();
  const [isDropDownOpen, setIsDropDownOpen] = useState({
    status: false,
    value: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState({
    state: false,
    value: "",
  });

  const router = useRouter();
  const { pathname } = router;
  // const location=use

  let userCookie;
  useEffect(() => {
    userCookie = Cookies.get("user");
    setUser(userCookie);
  }, [user]);

  console.log(isSidebarOpen, "sidebar");

  return (
    <div>
      <div
        // style={{
        //   boxShadow:
        //     " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        // }}
        className={`" bg-white fixed
          top-0 flex justify-between items-center px-3 md:px-6 lg:px-12 py-3  w-full z-[10] " }`}
      >
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
        <div className="">
          <BsMenuButtonWideFill
            onClick={() => setIsSidebarOpen(true)}
            className="text-xl text-teal-500 lg:hidden"
          />
          {/* {user ? (
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
              className="text-white tracking-wider bg-teal-700 px-5 py-2 font-bold rounded-md hover:scale-105 transition-all duration-300 ease-in-out hover:tracking-widest cursor-pointer"
            >
              Log Out
            </div>
          ) : (
            <Link
              href="/login"
              className="text-white tracking-wider bg-teal-700 px-5 py-2 rounded-md hover:scale-105 transition-all duration-300 ease-in-out hover:tracking-widest "
            >
              Log in
            </Link>
          )} */}
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="w-52 h-full overflow-y-auto bg-red-50 fixed top-0 right-0 z-[10000] py-8 px-4">
          {/* close button */}
          <div className="mb-3">
            <AiFillCloseSquare
              onClick={() => setIsSidebarOpen(false)}
              className="text-2xl mb-3"
            />
          </div>
          <div className="flex flex-col gap-y-4">
            {navs?.map((nav) => (
              <div>
                {/* main menu */}
                <div
                  key={nav.id}
                  className={` ${pathname === nav.link && "bg-teal-200"} text-black border-2 p-2 rounded-md flex justify-between items-center`}
                >
                  <p onClick={() => router.push(nav.link)}> {nav.title}</p>
                  {nav?.subMenu &&
                    (isSubMenuOpen.state &&
                    isSubMenuOpen.value === nav.title ? (
                      <FaMinus
                        onClick={() =>
                          setIsSubMenuOpen({ state: false, value: "" })
                        }
                      />
                    ) : (
                      <FaPlus
                        onClick={() =>
                          setIsSubMenuOpen({ state: true, value: nav.title })
                        }
                      />
                    ))}
                </div>

                {/* sub menu */}
                {isSubMenuOpen.state && isSubMenuOpen.value === nav.title && (
                  <div className="flex flex-col gap-y-4 px-4 py-2 text-sm">
                    {nav?.subMenu?.map((submenu) => (
                      <div className="px-2 py-1 rounded-md" key={submenu.id}>
                        <p
                          className="border-b pb-2"
                          onClick={() => router.push(submenu.link)}
                        >
                          {" "}
                          {submenu?.title}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
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
