import React, { useState } from "react";
import { FaChevronCircleLeft, FaPowerOff, FaRegUser } from "react-icons/fa";
import { GiClown } from "react-icons/gi";
import { MdAssignmentAdd, MdDashboard } from "react-icons/md";
import MobileSidebar from "./MobileSidebar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Topbar = () => {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState({
    state: false,
    value: "",
  });
  const role: string = Cookies.get("role") || "";
  const havePurchaseWallet: string = Cookies.get("havePurchaseWallet") || "";

  const router = useRouter();

  const navs = [
    {
      id: 1,
      title: "Home",
      // icon: <AppstoreOutlined />,
      link: "/dashboard",
    },
    {
      id: 2,
      title: "Profile",
      // icon: <ProfileOutlined />,
      link: "/dashboard/profile/my-profile",
      subMenu: [
        {
          id: 1,
          title: "My Profile",
          link: "/dashboard/profile/my-profile",
        },
        {
          id: 2,
          title: "Update Profile",
          link: "/dashboard/profile/update-profile",
        },
      ],
    },
    ...(role !== "superAdmin"
      ? [
          {
            id: 3,
            title: "Add Money",
            // icon: <MoneyCollectOutlined />,
            link: "/dashboard/add-money/add-now",
            subMenu: [
              {
                id: 1,
                title: "Add Now",
                link: "/dashboard/add-money/add-now",
              },
              {
                id: 2,
                title: "History",
                link: "/dashboard/add-money/add-money-history",
              },
            ],
          },
        ]
      : []),
    {
      id: 4,
      title: "Wallet",
      // icon: <WalletOutlined />,
      link: "/dashboard/wallet/income-wallet",
      subMenu: [
        {
          id: 1,
          title: "Income Wallet",
          link: "/dashboard/wallet/income-wallet",
        },
        ...(havePurchaseWallet === "yes"
          ? [
              {
                id: 2,
                title: "Purchase Wallet",
                link: "/dashboard/wallet/purchase-wallet",
              },
            ]
          : []),
        {
          id: 3,
          title: "Project Share",
          link: "/dashboard/wallet/project-share",
        },
        {
          id: 4,
          title: "Fixed Deposite",
          link: "/dashboard/wallet/fixed-deposit",
        },
        {
          id: 5,
          title: "Share Holder",
          link: "/dashboard/wallet/share-holder",
        },
        {
          id: 6,
          title: "Partnership",
          link: "/dashboard/wallet/directorship",
        },
      ],
    },
    ...(havePurchaseWallet === "yes"
      ? [
          {
            id: 5,
            title: "Joining",
            // icon: <AuditOutlined />,
            link: "/dashboard/joining",
          },
        ]
      : []),
    {
      id: 6,
      title: "Team Info",
      // icon: <TeamOutlined />,
      link: "/dashboard/team-view/ganealogy-tree",
      subMenu: [
        {
          id: 1,
          title: "View",
          link: "/dashboard/team-view/ganealogy-tree",
        },
        {
          id: 2,
          title: "Refferel Team",
          link: "/dashboard/team-view/refferal-team",
        },
      ],
    },
    ...(role !== "superAdmin"
      ? [
          {
            id: 7,
            title: "Withdraw",
            // icon: <MoneyCollectFilled />,
            link: "/dashboard/withdraw/withdraw-now",
            subMenu: [
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
                id: 1,
                title: "Withdraw Now",
                link: "/dashboard/withdraw/withdraw-now",
              },
              {
                id: 2,
                title: "Withdraw History",
                link: "/dashboard/withdraw/withdraw-report",
              },
            ],
          },
        ]
      : []),

    ...(role === "superAdmin"
      ? [
          {
            id: 8,
            title: "Leaders Club",
            // icon: <SiClubforce />,
            link: "/dashboard/leaders-club",
          },
          {
            id: 9,
            title: "Payable Profit",
            // icon: <GiProfit />,
            link: "/dashboard/payable-profit",
          },
          {
            id: 10,
            title: "History",
            // icon: <MdWorkHistory />,
            link: "/dashboard/history/given-purchase-wallet-history",
            subMenu: [
              {
                id: 1,
                title: "Given Purchase Wallet",
                link: "/dashboard/history/given-purchase-wallet-history",
              },
              {
                id: 2,
                title: "User's Investment",
                link: "/dashboard/history/users-investments",
              },
              {
                id: 3,
                title: "User's Withdraw",
                link: "/dashboard/history/users-withdraw",
              },
            ],
          },
          {
            id: 11,
            title: "Man Management",
            // icon: <FaPeopleGroup />,
            link: "/dashboard/man-management",
          },
          {
            id: 12,
            title: "Withdraw Request",
            // icon: <PiHandWithdrawFill />,
            link: "/dashboard/users-withdraw-request",
          },
        ]
      : []),
    {
      id: 13,
      title: "Supprt",
      // icon: <CloudUploadOutlined />,
      link: "/dashboard/support",
    },
  ];

  return (
    <div className="w-full lg:w-[calc(100vw-300px)] h-20 bg-[#f4f7fa] fixed z-[100] backdrop-blur-xl flex justify-between items-center px-5">
      <div>
        <FaChevronCircleLeft className="text-2xl text-gray-600 hidden lg:block" />
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="block lg:hidden bg-teal-400 text-white px-2 py-1 rounded-md"
        >
          Menu
        </button>
      </div>
      <div className="flex items-center gap-6 relative">
        <MdDashboard className="w-8 h-8 text-gray-700 hover:bg-gray-200 p-2 rounded-full cursor-pointer" />
        <img
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          src="/images/profilePicIcon4.webp"
          alt=""
          onClick={() => setOpenDropDown((prev) => !prev)}
        />
        {/* dropdown */}
        {openDropDown && (
          <div
            style={{
              boxShadow: " rgb(38, 57, 77) 0px 20px 30px -10px",
            }}
            className="w-[350px] md:w-[400px] h-fit bg-white absolute top-12 right-0 rounded-md"
          >
            {/* 1st section */}
            <div className="border-b-2 border-gray-300 p-3">
              <p className="text-xl">Profile</p>
            </div>
            {/* 2nd section */}
            <div className="border-b-2 border-gray-300 p-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex items-center gap-4">
                  <img
                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                    src="/images/profilePicIcon4.webp"
                    alt=""
                  />
                  <div>
                    <p className="">Bondhu Group</p>
                    <p className="text-sm text-gray-600">
                      bondhugroupbd@gmail.com
                    </p>
                  </div>
                </div>
                <div className="bg-orange-100 text-orange-600 px-1 py-1 rounded-md text-sm justify-center items-center gap-x-1 inline-flex">
                  <GiClown />
                  <p className="text-xs">Club Member</p>
                </div>
              </div>
            </div>
            {/* 3rd section */}
            <div className="border-b-2 border-gray-300 px-8 py-5 text-gray-700">
              <div className="flex flex-col gap-y-5 text-lg">
                <div
                  onClick={() =>
                    router.push("/dashboard/profile/update-profile")
                  }
                  className="flex items-center gap-4"
                >
                  <FaRegUser />
                  <p>Edit Profile</p>
                </div>
                <div
                  onClick={() => {
                    router.push("/dashboard/joining");
                  }}
                  className="flex items-center gap-4"
                >
                  <MdAssignmentAdd />
                  <p>Add Account</p>
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
                  className="flex items-center gap-4"
                >
                  <FaPowerOff />
                  <p>Log out</p>
                </div>
              </div>
            </div>
          </div>
        )}
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

export default Topbar;
