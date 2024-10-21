"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import baseUrl from "../../../../../../../config";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { GrDownload } from "react-icons/gr";
import { GiFastBackwardButton } from "react-icons/gi";
import { useRouter } from "next/navigation";
import PurchaseHistoryDownload from "@/components/DownloadContents/PurchaseHistoryDownload";

interface ExpensessHistoryItem {
  _id: string;
  new_partner_id: number;
  date: string;
}

interface ExpensessInterface {
  _id: string;
  userId: string;
  purchase_amount: string;
  joining_cost_history: ExpensessHistoryItem[];
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

const page = () => {
  const [expensesHistories, setExpensessHistories] =
    useState<ExpensessInterface>();
  const [partnersDetails, setPartnersDetails] = useState<partnerDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const id = Cookies.get("id");
  const token = Cookies.get("token");

  const getExpensessHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/history/get-purchase-history/${id}?page=1&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.success) {
        setExpensessHistories(data?.data?.userPurchaseHistory[0]);

        const joiningCostHistory =
          data?.data?.userPurchaseHistory[0]?.joining_cost_history;

        if (joiningCostHistory?.length) {
          const partnersDetailsPromises = joiningCostHistory.map(
            async (join: ExpensessHistoryItem) => {
              const userResponse = await fetch(
                `${baseUrl}/user/get-user/${join?.new_partner_id}`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              const userData = await userResponse.json();
              if (userData.success) {
                return userData?.data; // Return the partner data
              } else {
                throw new Error(
                  userData.message || "Failed to fetch user details"
                );
              }
            }
          );

          const partnersDetails = await Promise.all(partnersDetailsPromises);

          // Ensure no duplicates before updating the state
          setPartnersDetails((prev) => {
            const newPartners = partnersDetails.filter(
              (newPartner) =>
                !prev.some(
                  (existingPartner) => existingPartner._id === newPartner._id
                )
            );
            return [...prev, ...newPartners];
          });
        }
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

  const formatDate = (backendDate: string): string => {
    // Parse the backend date string into a Date object
    const date = new Date(backendDate);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    // Extract and format the time in 12-hour format with AM/PM
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true, // 12-hour format
    };
    const time = new Intl.DateTimeFormat("en-US", timeOptions).format(date);

    // Extract and format the day and date
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "long", // Full day name (e.g., Wednesday)
      day: "2-digit", // Day of the month (e.g., 02)
      month: "2-digit", // Month (e.g., 10)
      year: "numeric", // Full year (e.g., 2024)
    };
    const formattedDate = new Intl.DateTimeFormat("en-GB", dateOptions).format(
      date
    );

    return `${time}, ${formattedDate}`;
  };

  // const handlePrint = () => {
  //   const input = document.getElementById("print-content") as HTMLElement;

  //   const companyHeader = input.querySelector(".print-head") as HTMLElement;
  //   const table = input.querySelector("#purchase-history-table") as HTMLElement;

  //   companyHeader.style.display = "block";
  //   table.style.display = "block";

  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF({
  //       orientation: "portrait",
  //       unit: "pt",
  //       format: "a4",
  //     });

  //     const pageWidth = pdf.internal.pageSize.getWidth();
  //     const pageHeight = pdf.internal.pageSize.getHeight();

  //     // Define margins
  //     const marginLeft = 20;
  //     const marginRight = 20;
  //     const contentWidth = pageWidth - marginLeft - marginRight;

  //     // Calculate the height of the image with the new width
  //     const imgHeight = (canvas.height * contentWidth) / canvas.width;
  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     // Add the first page with margins
  //     pdf.addImage(
  //       imgData,
  //       "PNG",
  //       marginLeft,
  //       position,
  //       contentWidth,
  //       imgHeight
  //     );
  //     heightLeft -= pageHeight;

  //     // Add more pages if needed
  //     while (heightLeft > 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(
  //         imgData,
  //         "PNG",
  //         marginLeft,
  //         position,
  //         contentWidth,
  //         imgHeight
  //       );
  //       heightLeft -= pageHeight;
  //     }

  //     // Save the PDF
  //     pdf.save("Purchase-History.pdf");

  //     // Restore the visibility of the static content

  //     companyHeader.style.display = "none";
  //     table.style.display = "none";
  //   });
  // };

  useEffect(() => {
    getExpensessHistory();
  }, [id]);

  return (
    <div className="py-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-10">
          <h1 className="text-rose-600 font-bold text-2xl">
            Balance Expensess History
          </h1>
          <div
            onClick={() => router.back()}
            className="cursor-pointer bg-rose-500 hover:bg-rose-600 text-white px-5 py-1 rounded flex items-center gap-2"
          >
            <GiFastBackwardButton />
            <p> Back</p>
          </div>
        </div>
        <div
          // onClick={handlePrint}
          className="bg-teal-500 hover:bg-teal-700 transition-all duration-300 ease-in px-6 py-2 rounded cursor-pointer text-white flex items-center gap-x-3"
        >
          <GrDownload className="text-xl font-bold -mt-1" />
          <p> Download History</p>
        </div>
      </div>

      <div className="mt-5 flex">
        <p className="text-teal-700">Newly Joined User By You</p>
      </div>

      <div>
        {/* users table */}
        <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5 ">
          <table className="w-full text-sm text-left rtl:text-right text-white ">
            <thead className="sticky top-0 text-xs text-black uppercase bg-red-300 border-t-2 border-b-2 border-black">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  New Joined User
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Nid No
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Phone No
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Joined Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="text-center">
                  <td colSpan={7} align="center">
                    <div className="my-5 flex flex-col justify-center items-center">
                      <Circles
                        height="50"
                        width="50"
                        color="#4fa94d"
                        ariaLabel="circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </div>
                  </td>
                </tr>
              ) : partnersDetails && partnersDetails?.length <= 0 ? (
                <tr className="text-center">
                  <td colSpan={7} align="center">
                    <div className="my-5 flex flex-col justify-center items-center">
                      <p className="text-lg text-rose-500">No Data to Show</p>
                    </div>
                  </td>
                </tr>
              ) : (
                partnersDetails?.map((detail: partnerDetails) => (
                  <tr
                    key={detail._id}
                    className="bg-red-100 text-black border-b-2 border-slate-700"
                  >
                    <td className="px-6 py-4 text-center">{detail?.name}</td>
                    <td className="px-6 py-4 text-center">{detail?.email}</td>
                    <td className="px-6 py-4 text-center">
                      {detail?.user_name}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {detail?.nid_passport_no}
                    </td>
                    <td className="px-6 py-4 text-center">{detail?.phone}</td>
                    <td className="px-6 py-4 text-center">
                      {formatDate(detail?.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-center text-red-500">1000</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* download template content */}
      <PurchaseHistoryDownload />
    </div>
  );
};

export default page;
