"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import useStore from "../../../Zustand/Store/userStore";
import baseUrl from "../../../../config";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Test from "@/components/Test";

const BonusChart = dynamic(
  () => import("./../../../components/Charts/BonusChart"),
  { ssr: false }
);
const IncomeWalletPieChart = dynamic(
  () => import("./../../../components/Charts/IncomeWalletPieChart"),
  {
    ssr: false,
  }
);
const DonutChart = dynamic(
  () => import("./../../../components/Charts/PurchaseWalletChart"),
  { ssr: false }
);
const PurchaseMoneyCostingTable = dynamic(
  () => import("./../../../components/Table/PurchaseMoneyCostingTable"),
  { ssr: false }
);

interface ExpensessInterface {
  _id: string;
  new_partner_id: string;
  partner_name: string;
  partner_user_name: string;
  date: string;
}

interface partnerDetails {
  _id: string;
  name: string;
  user_name: string;
  phone: string;
  email: string;
  nid_passport_no: string;
  registration_date: string;
  createdAt: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<any>({});
  const [isClient, setIsClient] = useState(false);
  const { singleUser, setSingleUser } = useStore();
  const [expensesHistories, setExpensessHistories] =
    useState<ExpensessInterface[]>();
  const [partnersDetails, setPartnersDetails] = useState<partnerDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const id = Cookies.get("id");
  const have_purchase_wallet = Cookies.get("have_purchase_wallet");
  const userCookie = Cookies.get("user");
  const token = Cookies.get("token");

  useEffect(() => {
    setIsClient(true); // Ensure client-side rendering
  }, []);

  // fetch single user
  const fetchSingleUser = async (id: string) => {
    const response = await fetch(`${baseUrl}/user/get-user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data?.success) {
      setUser(data?.data);
      setSingleUser(data?.data);
    }
  };

  useEffect(() => {
    if (userCookie) {
      try {
        let userParse: any = JSON.parse(userCookie); // Parse safely
        fetchSingleUser(userParse?._id);
      } catch (error) {
        console.error("Failed to parse user cookie:", error);
      }
    }
  }, [userCookie]);

  const getExpensessHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/history/get-user-joining-cost-history/${id}?page=1&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setExpensessHistories(data?.data?.joiningCostHistory);
      } else {
        throw new Error(data.message || "Failed to fetch purchase history");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getExpensessHistory();
  }, [id]);

  return (
    <div className="w-full h-full">
      <Test user={user} />
      {/* Purchase Money Costing Table */}
      <div className="my-5 w-full">
        <PurchaseMoneyCostingTable />
      </div>
    </div>
  );
};

export default Dashboard;
