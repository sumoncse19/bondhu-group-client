"use client";

import {
  AppstoreOutlined,
  AuditOutlined,
  CloudUploadOutlined,
  MoneyCollectFilled,
  MoneyCollectOutlined,
  ProfileOutlined,
  TeamOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { PiHandWithdrawFill } from "react-icons/pi";
import { SiClubforce } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaAngleDown, FaPowerOff } from "react-icons/fa";
import Cookies from "js-cookie";
import { MdWorkHistory } from "react-icons/md";
import { GiProfit, GiTakeMyMoney } from "react-icons/gi";

const Sidebar2 = () => {
  const [role, setRole] = useState<string>("");
  const [userNmae, setUserName] = useState<string>("");
  const [havePurchaseWallet, setHavePurchaseWallet] = useState<string>("");

  // Run this effect to set the client-side only values
  useEffect(() => {
    const roleFromCookie = Cookies.get("role") || "";
    const userNameFromCookie = Cookies.get("username") || "";
    const havePurchaseWalletFromCookie =
      Cookies.get("have_purchase_wallet") || "";

    setRole(roleFromCookie);
    setUserName(userNameFromCookie);
    setHavePurchaseWallet(havePurchaseWalletFromCookie);
  }, []);
  // Sidebar Menu Data

  const menuItemsData = [
    {
      title: "Home",
      icon: <AppstoreOutlined />,
      link: "/dashboard",
      active: false,
    },
    {
      title: "Profile",
      icon: <ProfileOutlined />,
      link: "/dashboard/profile/my-profile",
      active: false,
      subItems: [
        {
          title: "My Profile",
          link: "/dashboard/profile/my-profile",
          active: false,
        },
        {
          title: "Update Profile",
          link: "/dashboard/profile/update-profile",
          active: false,
        },
      ],
    },
    ...(role !== "superAdmin"
      ? [
          {
            title: "Add Money",
            icon: <MoneyCollectOutlined />,
            link: "/dashboard/add-money/add-now",
            active: false,
            subItems: [
              {
                title: "Add Now",
                link: "/dashboard/add-money/add-now",
                active: false,
              },
              {
                title: "History",
                link: "/dashboard/add-money/add-money-history",
                active: false,
              },
            ],
          },
        ]
      : []),
    {
      title: "Wallet",
      icon: <WalletOutlined />,
      link: "/dashboard/wallet/income-wallet",
      active: false,
      subItems: [
        {
          title: "Income Wallet",
          link: "/dashboard/wallet/income-wallet",
          active: false,
        },
        ...(havePurchaseWallet === "yes"
          ? [
              {
                title: "Purchase Wallet",
                link: "/dashboard/wallet/purchase-wallet",
                active: false,
              },
            ]
          : []),
        {
          title: "Project Share",
          link: "/dashboard/wallet/project-share",
          active: false,
        },
        {
          title: "Fixed Deposite",
          link: "/dashboard/wallet/fixed-deposit",
          active: false,
        },
        {
          title: "Share Holder",
          link: "/dashboard/wallet/share-holder",
          active: false,
        },
        {
          title: "Partnership",
          link: "/dashboard/wallet/directorship",
          active: false,
        },
      ],
    },
    ...(havePurchaseWallet === "yes"
      ? [
          {
            title: "Joining",
            icon: <AuditOutlined />,
            link: "/dashboard/joining",
            active: false,
          },
        ]
      : []),
    {
      title: "Team Info",
      icon: <TeamOutlined />,
      link: "/dashboard/team-view/ganealogy-tree",
      active: false,
      subItems: [
        {
          title: "View",
          link: "/dashboard/team-view/ganealogy-tree",
          active: false,
        },
        {
          title: "Refferel Team",
          link: "/dashboard/team-view/refferal-team",
          active: false,
        },
      ],
    },
    ...(role !== "superAdmin"
      ? [
          {
            title: "Withdraw",
            icon: <MoneyCollectFilled />,
            link: "/dashboard/withdraw/withdraw-now",
            active: false,
            subItems: [
              // {
              //   title: "Security Code",
              //   link: "/dashboard/withdraw/security-code",
              //   active: false,
              // },
              // {
              //   title: "Payment Setting",
              //   link: "/dashboard/withdraw/payment-setting",
              //   active: false,
              // },
              {
                title: "Withdraw Now",
                link: "/dashboard/withdraw/withdraw-now",
                active: false,
              },
              {
                title: "Withdraw History",
                link: "/dashboard/withdraw/withdraw-report",
                active: false,
              },
            ],
          },
        ]
      : []),

    ...(role === "superAdmin"
      ? [
          // {
          //   title: "Leaders Club",
          //   icon: <SiClubforce />,
          //   link: "/dashboard/leaders-club",
          //   active: false,
          // },
          {
            title: "Payable Profit",
            icon: <GiProfit />,
            link: "/dashboard/payable-profit",
            active: false,
          },
          {
            title: "History",
            icon: <MdWorkHistory />,
            link: "/dashboard/history/users-investments",
            active: false,
            subItems: [
              {
                title: "User's Investment",
                link: "/dashboard/history/users-investments",
                active: false,
              },
              {
                title: "Given Purchase Wallet",
                link: "/dashboard/history/given-purchase-wallet-history",
                active: false,
              },
              {
                title: "User's Withdraw",
                link: "/dashboard/history/users-withdraw",
                active: false,
              },
            ],
          },
          {
            title: "Man Management",
            icon: <FaPeopleGroup />,
            link: "/dashboard/man-management",
            active: false,
          },
          {
            title: "Withdraw Request",
            icon: <PiHandWithdrawFill />,
            link: "/dashboard/users-withdraw-request",
            active: false,
          },
          {
            title: "Investment Request",
            icon: <GiTakeMyMoney />,
            link: "/dashboard/investment-request",
            active: false,
          },
        ]
      : []),
  ];

  const router = useRouter();

  const [menuItems, setMenuItems] = useState(menuItemsData);
  const [isShowMenuItem, setIsShowMenuItem] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setMenuItems(menuItemsData);
  }, [role, havePurchaseWallet]);

  useEffect(() => {
    const updatedMenuItems = menuItemsData.map((menuItem) => {
      if (menuItem.subItems) {
        const updatedSubItems = menuItem.subItems.map((subItem) => ({
          ...subItem,
          active: pathname === subItem.link,
        }));
        return {
          ...menuItem,
          active: updatedSubItems.some((subItem) => subItem.active),
          subItems: updatedSubItems,
        };
      }
      return {
        ...menuItem,
        active: pathname === menuItem.link,
      };
    });

    setMenuItems(updatedMenuItems);
  }, [pathname]);

  // useEffect(() => {
  //   if (pathname.includes("/dashboard")) {
  //     const currentSelectedTeam = teamPersons.find(
  //       (person) => person.id === selectedTeam
  //     );

  //     if (currentSelectedTeam) {
  //       setSelectedTeamName(currentSelectedTeam.name);
  //       if (pathname.includes("/dashboard/my-team/")) {
  //         router.push(currentSelectedTeam?.link);
  //       }
  //     }
  //   }
  // }, [selectedTeam, teamPersons, router, pathname]);

  // const handleTeamSelection = (
  //   teamId: number,
  //   teamName: string,
  //   link: string
  // ) => {
  //   setSelectedTeam(teamId);
  //   setSelectedTeamName(teamName);
  //   setIsShowMenuItem(false);
  //   router.push(link);
  // };

  // Function to handle submenu item activation
  const handleSubMenuItemClick = (
    parentTitle: string,
    subItemTitle: string
  ) => {
    const updatedSubMenuItems = menuItems.map((menuItem) => {
      if (menuItem.title === parentTitle) {
        return {
          ...menuItem,
          subItems: menuItem.subItems?.map((subItem) => {
            return {
              ...subItem,
              active: subItem.title === subItemTitle, // Activate only the clicked subItem
            };
          }),
          active: true, // Keep parent active
        };
      }
      return { ...menuItem }; // Keep others unchanged
    });
    setMenuItems(updatedSubMenuItems);
  };

  // Function to handle parent menu item activation
  const handleMenuItemClick = (title: string) => {
    const updatedMenuItems = menuItems.map((menuItem) => {
      if (menuItem.title === title) {
        if (menuItem.subItems && menuItem.subItems.length > 0) {
          const updatedSubItems = menuItem.subItems.map((subItem, index) => {
            return { ...subItem, active: index === 0 };
          });
          return {
            ...menuItem,
            active: !menuItem.active,
            subItems: updatedSubItems,
          };
        }
        return { ...menuItem, active: !menuItem.active };
      }

      return { ...menuItem, active: false };
    });

    setMenuItems(updatedMenuItems);
  };

  return (
    <div
      // style={{ boxShadow: "10px 10px 5px -10px rgba(0, 0, 0, 0.8)" }}
      className="sidebar hidden lg:flex min-w-[280px] h-full overflow-y-auto flex-col justify-between gap-12 rounded-l-xl bg-white fixed"
    >
      <div className="flex flex-col gap-[30px] px-[18px] py-6">
        <div className="">
          <Link className="flex items-center gap-x-2" href="">
            <Image
              src="/images/logo1.png"
              width={50}
              height={50}
              alt="logo"
              className="object-cover"
            />
            <p className="text-sm">BONDHU GROUP</p>
          </Link>
        </div>

        <div className="flex flex-col gap-[18px]">
          {/* Sidebar Menu */}
          <div className="flex flex-col gap-1.5">
            <h4 className="text-[10px] font-bold text-[#929292]">MENU</h4>
            {menuItems.map((menuItem) => (
              <div key={menuItem.title} className="flex flex-col">
                <Link
                  href={menuItem.link}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-md ${
                    menuItem.active
                      ? "bg-[#E3E3FD] font-bold text-purple-600"
                      : ""
                  } px-1.5 py-2.5`}
                  onClick={() => handleMenuItemClick(menuItem.title)} // Click to toggle parent active
                >
                  <div className="flex gap-3">
                    {menuItem.icon}
                    <p className="leading-[18px]">{menuItem.title}</p>
                  </div>

                  {menuItem.subItems && (
                    <FaAngleDown
                      className={menuItem.active ? "rotate-180" : ""}
                    />
                  )}
                </Link>

                {/* Render SubItems if parent is active */}
                {menuItem.subItems &&
                  menuItem.active &&
                  menuItem.subItems.map((subItem) => (
                    <Link key={subItem.title} href={subItem.link}>
                      <div
                        className="relative my-2.5 flex w-full cursor-pointer items-center gap-1.5 rounded-md px-1.5"
                        onClick={() =>
                          handleSubMenuItemClick(menuItem.title, subItem.title)
                        }
                      >
                        <div
                          className={`absolute left-3 top-0 h-full w-0.5 ${
                            subItem.active ? "bg-[#000091]" : ""
                          }`}
                        />
                        <p
                          className={`pl-5 text-xs font-bold leading-[18px] ${
                            subItem.active ? "text-[#000091]" : "text-[#161616]"
                          }`}
                        >
                          {subItem.title}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between h-16 border-t-2 border-gray-200 px-3 py-2">
        <div className="flex items-center gap-3 h-full">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src="/images/profilePicIcon4.webp"
            alt=""
          />
          <div className="h-full flex flex-col justify-center">
            <p className="text-gray-800 leading-none">{userNmae}</p>
            <p className="text-sm text-gray-500">
              {role === "superAdmin"
                ? "Super Admin"
                : role === "admin"
                  ? "Admin"
                  : "User"}
            </p>
          </div>
        </div>
        <div
          onClick={() => {
            router.push("/login");
            Cookies.remove("user");
            Cookies.remove("token");
            Cookies.remove("id");
            Cookies.remove("username");
            Cookies.remove("role");
            Cookies.remove("have_purchase_wallet");
          }}
          className=""
        >
          <FaPowerOff className="text-xl cursor-pointer" />
        </div>
      </div>

      {/* <div>
        <h4 className="text-[10px] font-bold text-[#929292]">OPTIONS</h4>
        {menuItems
          .slice(1)
          .slice(-2)
          .map((menuItem) => (
            <div key={menuItem.title} className="flex flex-col">
              <Link
                href={menuItem.link}
                className={`flex w-full cursor-pointer items-center justify-between rounded-md ${
                  menuItem.active ? "bg-[#E3E3FD]" : ""
                } px-1.5 py-2.5`}
                onClick={() => handleMenuItemClick(menuItem.title)} // Click to toggle parent active
              >
                <div className="flex gap-1.5">
                  {menuItem.icon}
                  <p
                    className={`text-xs font-bold leading-[18px] ${
                      menuItem.active ? "text-[#000091]" : "text-[#161616]"
                    }`}
                  >
                    {menuItem.title}
                  </p>
                </div>
                {menuItem.subItems && (
                  <Image
                    src="/assets/icons/down_arrow.svg"
                    width={12}
                    height={12}
                    alt="down_arrow"
                    className={menuItem.active ? "rotate-180" : ""}
                  />
                )}
              </Link>
            </div>
          ))}

        <div className="my-3 h-0.5 w-full bg-[#DDDDDD]" />
        <div
          className="flex w-full cursor-pointer items-center justify-between rounded-md px-1.5 py-2.5"
          onClick={() => router.push("/")}
        >
          <div className="flex gap-1.5">
            <Image
              src="/assets/icons/logout_icon.svg"
              width={18}
              height={18}
              alt="logout_icon"
            />
            <p className="text-xs font-bold leading-[18px] text-[#161616]">
              Se déconnecter
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar2;
