import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  AuditOutlined,
  MoneyCollectOutlined,
  PlusSquareOutlined,
  HistoryOutlined,
  WalletOutlined,
  TeamOutlined,
  MoneyCollectFilled,
  CloudUploadOutlined,
  UsergroupAddOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { TbUserStar } from "react-icons/tb";
import { RiUser2Fill } from "react-icons/ri";
import { Avatar, ConfigProvider, Menu, type MenuProps } from "antd";
import Link from "next/link";
import Cookies from "js-cookie";
import { FaPeopleGroup } from "react-icons/fa6";

type MenuItem = Required<MenuProps>["items"][number];

const Sidebar: React.FC = () => {
  const [selectedFirstMenuKey, setSelectedFirstMenuKey] = useState<
    string | null
  >("dashboard");
  const [selectedSecondMenuKey, setSelectedSecondMenuKey] = useState<
    string | null
  >(null);

  const [role, setRole] = useState<string>("");
  const [havePurchaseWallet, setHavePurchaseWallet] = useState<string>("");

  // Run this effect to set the client-side only values
  useEffect(() => {
    const roleFromCookie = Cookies.get("role") || "";
    const havePurchaseWalletFromCookie =
      Cookies.get("have_purchase_wallet") || "";

    setRole(roleFromCookie);
    setHavePurchaseWallet(havePurchaseWalletFromCookie);
  }, []);

  // Don't render the component until it is client-side
  // if (!isClient) {
  //   return null; // Return null during SSR
  // }

  const firstMenuItems: MenuItem[] = [
    {
      key: "dashboard",
      label: <Link href="/dashboard">Dashboard</Link>,
      icon: <AppstoreOutlined />,
    },
    {
      key: "profile",
      label: "Profile",
      icon: <ProfileOutlined />,
      children: [
        {
          key: "my-profile",
          icon: <RiUser2Fill />,
          label: <Link href="/dashboard/profile/my-profile">My Profile</Link>,
        },
        {
          key: "update-profile",
          icon: <TbUserStar />,
          label: (
            <Link href="/dashboard/profile/update-profile">Profile Update</Link>
          ),
        },
      ],
    },
    {
      key: "add-money",
      label: "Add Money",
      icon: <MoneyCollectOutlined />,
      children: [
        {
          key: "add-now",
          icon: <PlusSquareOutlined />,
          label: <Link href="/dashboard/add-money/add-now">Add Now</Link>,
        },
        {
          key: "history",
          icon: <HistoryOutlined />,
          label: (
            <Link href="/dashboard/add-money/add-money-history">History</Link>
          ),
        },
      ],
    },
    {
      key: "wallet",
      label: "Wallet",
      icon: <WalletOutlined />,
      children: [
        {
          key: "income-wallet",
          label: <Link href="/dashboard/wallet/income-wallet">Income</Link>,
        },
        ...(havePurchaseWallet === "yes"
          ? [
              {
                key: "purchase-wallet",
                label: (
                  <Link href="/dashboard/wallet/purchase-wallet">Purchase</Link>
                ),
              },
            ]
          : []),
        {
          key: "project-share-wallet",
          label: (
            <Link href="/dashboard/wallet/project-share">Project Share</Link>
          ),
        },
        {
          key: "fix-deposit-wallet",
          label: (
            <Link href="/dashboard/wallet/fixed-deposit">Fixed Deposit</Link>
          ),
        },
        {
          key: "share-holder-wallet",
          label: (
            <Link href="/dashboard/wallet/share-holder">Share Holder</Link>
          ),
        },
        {
          key: "directorship-wallet",
          label: (
            <Link href="/dashboard/wallet/directorship">Directorship</Link>
          ),
        },
      ],
    },
    ...(havePurchaseWallet === "yes"
      ? [
          {
            key: "joining",
            label: <Link href="/dashboard/joining">Joining</Link>,
            icon: <AuditOutlined />,
          },
        ]
      : []),
    {
      key: "team-info",
      label: "Team Info",
      icon: <TeamOutlined />,
      children: [
        {
          key: "referral-team",
          label: (
            <Link href="/dashboard/team-view/refferal-team">Referral Team</Link>
          ),
        },
        {
          key: "genealogy-tree",
          label: (
            <Link href="/dashboard/team-view/ganealogy-tree">Tree View</Link>
          ),
        },
      ],
    },
    {
      key: "withdraw",
      label: "Withdraw",
      icon: <MoneyCollectFilled />,
      children: [
        {
          key: "security-code",
          label: <Link href="/security-code">Security Code</Link>,
        },
        {
          key: "payment-setting",
          label: <Link href="/payment-setting">Payment Setting</Link>,
        },
        {
          key: "withdraw-now",
          label: <Link href="/withdraw-now">Withdraw Now</Link>,
        },
        {
          key: "withdraw-report",
          label: <Link href="/withdraw-report">Withdraw Report</Link>,
        },
      ],
    },
    {
      key: "support",
      label: <Link href="/support">Support</Link>,
      icon: <CloudUploadOutlined />,
    },
    ...(role === "superAdmin"
      ? [
          {
            key: "man-management",
            label: <Link href="/dashboard/man-management">Man Management</Link>,
            icon: <FaPeopleGroup />,
          },
        ]
      : []),
  ];

  const secondMenuItems: MenuItem[] = [
    {
      key: "feedback",
      label: <Link href="/feedback">Feedback</Link>,
      icon: <UsergroupAddOutlined />,
    },
    {
      key: "community-support",
      label: <Link href="/community-support">Community & Support</Link>,
      icon: <UsergroupAddOutlined />,
    },
  ];

  const handleFirstMenuSelect: MenuProps["onSelect"] = ({ key }) => {
    setSelectedFirstMenuKey(key);
    setSelectedSecondMenuKey(null);
  };

  const handleSecondMenuSelect: MenuProps["onSelect"] = ({ key }) => {
    setSelectedSecondMenuKey(key);
    setSelectedFirstMenuKey(null);
  };

  return (
    <div className="lg:flex hidden flex-col items-center gap-5 shadow-lg rounded-md min-h-screen ">
      <Link
        href="/"
        className="border-none text-red-700 hover:text-red-900 pt-5"
      >
        BONDHU Builders
      </Link>

      <div className="flex grow flex-col justify-between">
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemColor: "black",
                iconSize: 20,
                itemSelectedBg: "#c9c3bd",
                itemSelectedColor: "green",
                itemHeight: 42,
                subMenuItemBg: "transparent",
              },
            },
          }}
        >
          <Menu
            style={{
              width: 220,
              backgroundColor: "transparent",
              borderRight: "0",
              color: "red",
            }}
            selectedKeys={[selectedFirstMenuKey!]}
            mode="inline"
            items={firstMenuItems}
            onSelect={handleFirstMenuSelect}
          />
        </ConfigProvider>

        <div className="pb-5">
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemColor: "#807296",
                  iconSize: 20,
                  itemSelectedBg: "black",
                  itemSelectedColor: "white",
                  itemHeight: 42,
                  subMenuItemBg: "transparent",
                },
              },
            }}
          >
            <Menu
              style={{
                width: 220,
                backgroundColor: "transparent",
                borderRight: "0",
              }}
              selectedKeys={[selectedSecondMenuKey!]}
              mode="inline"
              items={secondMenuItems}
              onSelect={handleSecondMenuSelect}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
