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

interface PurchaseHistoryItem {
  _id: string;
  purchase_amount: number;
  date: string;
}

interface purchaseInterface {
  _id: string;
  userId: string;
  purchase_amount: string;
  purchase_amount_history: PurchaseHistoryItem[];
}

const page = () => {
  const [purchaseHistories, setPurchaseHistories] = useState<
    PurchaseHistoryItem[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(1);
  const router = useRouter();

  const id = Cookies.get("id");
  const token = Cookies.get("token");

  const getPurchaseHistory = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${baseUrl}/history/get-user-purchase-history/${id}?page=${pageNo}&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Ensure the response is okay
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.success) {
        setPurchaseHistories(data.data?.purchaseAmountHistory);
      } else {
        // Handle case where the success flag is false
        throw new Error(data.message || "Failed to fetch purchase history");
      }
    } catch (error) {
      // Check if the error is an instance of Error to access the message
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

  const handlePrint = () => {
    const input = document.getElementById("print-content") as HTMLElement;

    const companyHeader = input.querySelector(".print-head") as HTMLElement;
    const table = input.querySelector("#purchase-history-table") as HTMLElement;

    companyHeader.style.display = "block";
    table.style.display = "block";

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Define margins
      const marginLeft = 20;
      const marginRight = 20;
      const contentWidth = pageWidth - marginLeft - marginRight;

      // Calculate the height of the image with the new width
      const imgHeight = (canvas.height * contentWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add the first page with margins
      pdf.addImage(
        imgData,
        "PNG",
        marginLeft,
        position,
        contentWidth,
        imgHeight
      );
      heightLeft -= pageHeight;

      // Add more pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          marginLeft,
          position,
          contentWidth,
          imgHeight
        );
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save("Purchase-History.pdf");

      // Restore the visibility of the static content

      companyHeader.style.display = "none";
      table.style.display = "none";
    });
  };

  useEffect(() => {
    getPurchaseHistory();
  }, [id]);

  return (
    <div className="py-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-10">
          <h1 className="text-rose-600 font-bold text-2xl">
            Wallet Purchase History
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
          onClick={handlePrint}
          className="bg-teal-500 hover:bg-teal-700 transition-all duration-300 ease-in px-6 py-2 rounded cursor-pointer text-white flex items-center gap-x-3"
        >
          <GrDownload className="text-xl font-bold -mt-1" />
          <p> Download History</p>
        </div>
      </div>

      <div>
        {/* users table */}
        <div className="relative overflow-x-auto max-h-screen overflow-y-auto my-5 ">
          <table className="w-full text-sm text-left rtl:text-right text-white">
            <thead className="sticky top-0 text-xs text-black uppercase bg-teal-300 border-2 border-black">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Source
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="text-center">
                  <td colSpan={3} align="center">
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
              ) : purchaseHistories && purchaseHistories.length <= 0 ? (
                <tr className="text-center">
                  <td colSpan={3} align="center">
                    <div className="my-5 flex flex-col justify-center items-center">
                      <p className="text-lg text-rose-500">No Data to Show</p>
                    </div>
                  </td>
                </tr>
              ) : (
                purchaseHistories?.map(
                  (
                    history: {
                      _id: string;
                      purchase_amount: number;
                      date: string;
                    },
                    i
                  ) => (
                    <tr
                      key={history?._id}
                      className={`${i % 2 == 0 ? "bg-teal-50" : "bg-teal-100"} text-black border-2 border-slate-700`}
                    >
                      <td className="px-6 py-4 text-center">Super Admin</td>
                      <td className="px-6 py-4 text-center">
                        {history?.purchase_amount}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {formatDate(history?.date)}
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* download template content */}
      {/* <PurchaseHistoryDownload /> */}
    </div>
  );
};

export default page;
