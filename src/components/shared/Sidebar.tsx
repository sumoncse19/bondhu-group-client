"use client";

import {
  AppstoreOutlined,
  CloudUploadOutlined,
  CustomerServiceOutlined,
  GlobalOutlined,
  HistoryOutlined,
  KeyOutlined,
  MedicineBoxOutlined,
  MoneyCollectFilled,
  MoneyCollectOutlined,
  PlusSquareOutlined,
  ProfileOutlined,
  ProfileTwoTone,
  ProjectOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Avatar, ConfigProvider, Menu, type MenuProps } from "antd";
import Link from "next/link";
import React, { useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

const firstMenuItems: MenuItem[] = [
  {
    key: "dashboard",
    label: <Link href="/">Dashboard</Link>,
    icon: <AppstoreOutlined />,
  },
  {
    key: "profile",
    label: "Profile",
    icon: <ProfileOutlined />,
    children: [
      {
        key: "my-profile",
        icon: <Avatar />,
        label: <Link href="/profile/my-profile">My Profile</Link>,
      },
      {
        key: "update-profile",
        label: <Link href="/profile/update-profile">Profile Update</Link>,
      },
      {
        key: "change-password",
        icon: <KeyOutlined />,
        label: <Link href="/profile/change-password">Change Password</Link>,
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
        label: <Link href="/add-now">Add Now</Link>,
      },
      {
        key: "history",
        icon: <HistoryOutlined />,
        label: <Link href="/history">History</Link>,
      },
      {
        key: "invest-now",
        label: <Link href="/invest-now">Invest Now</Link>,
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
        label: <Link href="/income-wallet">Income Wallet</Link>,
      },
      {
        key: "return-purchase-wallet",
        label: (
          <Link href="/return-purchase-wallet">Return Purchase Wallet</Link>
        ),
      },
      {
        key: "share-holder-wallet",
        label: <Link href="/share-holder-wallet">Share Holder Wallet</Link>,
      },
      {
        key: "fix-deposit-wallet",
        label: <Link href="/fix-deposit-wallet">Fix Deposit Wallet</Link>,
      },
    ],
  },
  {
    key: "team-info",
    label: "Team Info",
    icon: <TeamOutlined />,
    children: [
      {
        key: "referral-team",
        label: <Link href="/referral-team">Referral Team</Link>,
      },
      {
        key: "genealogy-tree",
        label: <Link href="/genealogy-tree">Genealogy Tree</Link>,
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
];

const secondMenuItems: MenuItem[] = [
  {
    key: "divider",
    type: "divider",
  },
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

const Sidebar: React.FC = () => {
  const [selectedFirstMenuKey, setSelectedFirstMenuKey] = useState<
    string | null
  >("dashboard");
  const [selectedSecondMenuKey, setSelectedSecondMenuKey] = useState<
    string | null
  >(null);

  const handleFirstMenuSelect: MenuProps["onSelect"] = ({ key }) => {
    setSelectedFirstMenuKey(key);
    setSelectedSecondMenuKey(null);
  };

  const handleSecondMenuSelect: MenuProps["onSelect"] = ({ key }) => {
    setSelectedSecondMenuKey(key);
    setSelectedFirstMenuKey(null);
  };

  return (
    <div className="flex flex-col items-center gap-5 shadow-lg rounded-md min-h-screen">
      <Link
        href="/"
        className="border-none text-red-700 hover:text-red-900 pt-5"
      >
        BONDHU GROUP
      </Link>

      <div className="flex grow flex-col justify-between">
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemColor: "green",
                iconSize: 20,
                itemSelectedBg: "#38c438ab",
                itemSelectedColor: "red",
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
