"use client";
import React, { useEffect, useRef, useState } from "react";
import { TiPin } from "react-icons/ti";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { ColorRing, ThreeCircles } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import baseUrl from "../../../../../../config";
import axios from "axios";
import { IoMdInformationCircleOutline } from "react-icons/io";

const page = () => {
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [totalProjectShare, setTotalProjectShare] = useState<number>(0);
  const [projectShareAmount, setProjectShareAmount] = useState<number>(0);
  const [fixedDepositAmount, setFixedDepositAmount] = useState<any>(0);
  const [shareHolderAmount, setShareHolderAmount] = useState<any>(0);
  const [directorshipAmount, setDirectorshipAmount] = useState<any>(0);
  const [totalPlanCost, setTotalPlanCost] = useState<number>(0);

  const [moneyRecieptNumber, setMoneyRecieptNumber] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [bankAccNo, setBankAccNo] = useState<string>("");
  const [bankAccName, setBankAccName] = useState<string>("");
  const [bankBranchName, setBankBranchName] = useState<string>("");
  const [paymentPicture, setPaymentPicture] = useState<string>("");
  const [paymentPicture2, setPaymentPicture2] = useState<string>("");
  const [isLoadingForImage, setIsLoadingForImage] = useState<boolean>(false);
  const [isLoadingForImage2, setIsLoadingForImage2] = useState<boolean>(false);
  const [paymentDate, setPaymentDate] = useState<string>("");

  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");

  const fixedDepositInputRef = useRef<HTMLInputElement>(null);
  const shareHolderInputRef = useRef<HTMLInputElement>(null);
  const directorshipInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef2 = useRef<HTMLInputElement | null>(null);

  const token = Cookies.get("token");
  const userCookie = Cookies.get("user");
  const router = useRouter();

  // manage cookie
  useEffect(() => {
    if (userCookie) {
      try {
        let userParse: any = JSON.parse(userCookie); // Parse safely
        setUser(userParse);
      } catch (error) {
        console.error("Failed to parse user cookie:", error);
      }
    }
  }, [userCookie]);

  useEffect(() => {
    setProjectShareAmount(totalProjectShare * 10000);
    // setTotalPlanCost(totalPlanCost + projectShareAmount);
  }, [totalProjectShare]);

  const handleImageClick = () => {
    fileInputRef.current?.click(); // Trigger the hidden input
  };
  const handleImageClick2 = () => {
    fileInputRef2.current?.click(); // Trigger the hidden input
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file); // Upload the selected file
    }
  };
  const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload2(file); // Upload the selected file
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsLoadingForImage(true);
    const apiKey = "fb3740bc653a7910499d04a143f890fc"; // Replace with your imgbb API key

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        const imageurl = data.data.url; // Get the image URL from the response
        setPaymentPicture(imageurl);
        setIsLoadingForImage(false);
      } else {
        toast.error("Error uploading to imgbb:", data.error);
        setIsLoadingForImage(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoadingForImage(false);
    }
  };
  const handleFileUpload2 = async (file: File) => {
    setIsLoadingForImage2(true);
    const apiKey = "fb3740bc653a7910499d04a143f890fc"; // Replace with your imgbb API key

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        const imageurl = data.data.url; // Get the image URL from the response
        setPaymentPicture2(imageurl);
        setIsLoadingForImage2(false);
      } else {
        toast.error("Error uploading to imgbb:", data.error);
        setIsLoadingForImage2(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoadingForImage2(false);
    }
  };

  const handleRequestToAdmin = async () => {
    if (paymentMethod !== "cash") {
      if (
        (totalPlanCost > 0 && !moneyRecieptNumber) ||
        !mobileNumber ||
        !paymentMethod
      ) {
        toast.error("Fill all field first 1");
        return;
      }
    } else {
      if (
        (totalPlanCost > 0 && !moneyRecieptNumber) ||
        !mobileNumber ||
        !paymentMethod
      ) {
        toast.error("Fill all field first 2");
        return;
      }
    }

    // if (paymentMethod === "bank") {
    //   if (!bankName || !bankAccName || !bankBranchName || !bankAccNo) {
    //     toast.error("Fill all bank info first");
    //     return;
    //   }
    // }

    const paymentData = {
      userId: user?._id,
      project_share: projectShareAmount,
      fixed_deposit: parseInt(fixedDepositAmount),
      share_holder: parseInt(shareHolderAmount),
      directorship: parseInt(directorshipAmount),
      total_amount: totalPlanCost,
      money_receipt_number: moneyRecieptNumber,
      phone: mobileNumber,
      payment_method: paymentMethod,
      bank_name: bankName,
      account_no: bankAccNo,
      bank_account_name: bankAccName,
      branch_name: bankBranchName,
      transaction_id: transactionId ? transactionId : "",
      picture: paymentPicture ? paymentPicture : "",
      payment_picture: paymentPicture2,
      date: paymentDate,
      is_approved: false,
      name: user?.name,
      user_name: user?.user_name,
    };

    setIsLoading(true);
    try {
      await axios
        .post(`${baseUrl}/add-money/new-request`, paymentData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res, "ress");

          if (res?.data?.success) {
            router.push("/dashboard/add-money/add-money-history");
            toast.success("Investment Request to Admin Successfully");
          }
        });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // This ensures that error.response exists
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        // Handle other types of errors
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTotalPlanCost(
      projectShareAmount +
        parseInt(fixedDepositAmount) +
        parseInt(shareHolderAmount) +
        parseInt(directorshipAmount)
    );
  }, [
    projectShareAmount,
    fixedDepositAmount,
    shareHolderAmount,
    directorshipAmount,
  ]);

  return (
    <div className="w-full h-full  text-black mb-20">
      <h1 className="text-2xl text-rose-600 font-bold tracking-widest animate-bounce">
        Pick Your Plan
      </h1>

      {/* plans */}
      <div className="mt-10 flex items-center gap-8">
        {/* Project Share part */}
        <div
          className={`border-2  rounded-xl ${selectedPlans.includes("project-share") && "shadow-2xl border-orange-500"}`}
        >
          {/* plan */}
          <div
            onClick={() => {
              if (selectedPlans.includes("project-share")) {
                setTotalProjectShare(0);
                const neww = selectedPlans.filter((p) => p != "project-share");
                setSelectedPlans(neww);
              } else {
                setSelectedPlans((prev) => {
                  return [...prev, "project-share"]; // Return the new array
                });
              }
            }}
            className={`w-[200px] h-[150px]  flex justify-center items-center  rounded-md cursor-pointer relative `}
          >
            <div className="flex flex-col items-center gap-y-2">
              <img
                className={`w-16 h-16 ${!selectedPlans.includes("project-share") && "filter grayscale"}`}
                src="/images/projectShareIcon.png"
                alt=""
              />
              <p
                className={`text-xl ${selectedPlans.includes("project-share") ? "font-bold" : ""}`}
              >
                Project Share
              </p>
            </div>
            {selectedPlans.includes("project-share") && (
              <TiPin className="text-6xl absolute -top-7 -right-7 text-rose-600" />
            )}
          </div>
          {/* plan details */}
          <div
            className={`w-[200px] h-[150px]  mt-6 p-3 flex flex-col justify-between gap-y-3 ${!selectedPlans.includes("project-share") && "cursor-not-allowed  text-gray-500"}`}
          >
            <p>Share Price: &#2547; 10,000</p>
            <div className="flex items-center gap-4">
              <p>Pick Share</p>
              <span className="flex items-center gap-3">
                <FaCircleMinus
                  onClick={() => {
                    if (selectedPlans.includes("project-share")) {
                      if (totalProjectShare == 0) {
                        return;
                      } else {
                        setTotalProjectShare(totalProjectShare - 1);
                        // addCost();
                      }
                    }
                  }}
                  className="text-xl cursor-pointer"
                />
                <p>{totalProjectShare}</p>
                <FaCirclePlus
                  onClick={() => {
                    if (selectedPlans.includes("project-share")) {
                      if (totalProjectShare == 100) {
                        return;
                      } else {
                        setTotalProjectShare(totalProjectShare + 1);
                        // addCost();
                      }
                    }
                  }}
                  className="text-xl cursor-pointer"
                />
              </span>
            </div>

            <p className="text-xl ">Total: {projectShareAmount}</p>
          </div>
        </div>

        {/* Fixed Deposit part */}
        <div
          className={`border-2  rounded-xl ${selectedPlans.includes("fixed-deposit") && "shadow-2xl border-orange-500"}`}
        >
          {/* plan */}
          <div
            onClick={() => {
              if (selectedPlans.includes("fixed-deposit")) {
                // setTotalProjectShare(0);
                const neww = selectedPlans.filter((p) => p != "fixed-deposit");

                setSelectedPlans(neww);
              } else {
                setSelectedPlans((prev) => {
                  return [...prev, "fixed-deposit"]; // Return the new array
                });
              }
            }}
            className={`w-[200px] h-[150px]  flex justify-center items-center  rounded-md cursor-pointer relative `}
          >
            <div className="flex flex-col items-center gap-y-2">
              <img
                className={`w-16 h-16 ${!selectedPlans.includes("fixed-deposit") && "filter grayscale"}`}
                src="/images/fixedDepositIcon.png"
                alt=""
              />
              <p
                className={`text-xl ${selectedPlans.includes("fixed-deposit") ? "font-bold" : ""}`}
              >
                Fixed Deposit
              </p>
            </div>
            {selectedPlans.includes("fixed-deposit") && (
              <TiPin className="text-6xl absolute -top-7 -right-7 text-rose-600" />
            )}
          </div>
          {/* plan details */}
          <div
            className={`w-[200px] h-[150px]  mt-6 p-3 flex flex-col justify-between gap-y-3 ${!selectedPlans.includes("fixed-deposit") && "cursor-not-allowed  text-gray-500"}`}
          >
            <div className="flex flex-col gap-y-3">
              <label htmlFor="price">Enter Amount:</label>
              <input
                ref={fixedDepositInputRef}
                type="number"
                defaultValue=""
                className="outline-none border border-black rounded-md bg-[#EAE9E8] px-3 "
                disabled={!selectedPlans.includes("fixed-deposit")}
              />
              {selectedPlans.includes("fixed-deposit") && (
                <p
                  onClick={() => {
                    if (
                      fixedDepositInputRef.current &&
                      fixedDepositInputRef?.current?.value !== "" &&
                      fixedDepositInputRef?.current?.value !== null
                    ) {
                      setFixedDepositAmount(
                        fixedDepositInputRef.current?.value
                      );
                      fixedDepositInputRef.current.value = "";
                    }
                  }}
                  className={`bg-green-700 px-3 py-0.5 rounded-md hover:scale-105 hover:tracking-widest transition-all duration-300 ease-in  text-white font-bold text-center cursor-pointer `}
                >
                  Submit
                </p>
              )}
            </div>
          </div>
        </div>

        {/* share holder */}
        <div
          className={`border-2  rounded-xl ${selectedPlans.includes("share-holder") && "shadow-2xl border-orange-500"}`}
        >
          {/* plan */}
          <div
            onClick={() => {
              if (selectedPlans.includes("share-holder")) {
                // setTotalProjectShare(0);
                const neww = selectedPlans.filter((p) => p != "share-holder");
                setSelectedPlans(neww);
              } else {
                setSelectedPlans((prev) => {
                  return [...prev, "share-holder"]; // Return the new array
                });
              }
            }}
            className={`w-[200px] h-[150px]  flex justify-center items-center rounded-md cursor-pointer relative `}
          >
            <div className="flex flex-col items-center gap-y-2">
              <img
                className={`w-20 h-20 ${!selectedPlans.includes("share-holder") && "filter grayscale"}`}
                src="/images/shareholderIcon.png"
                alt=""
              />
              <p
                className={`text-xl ${selectedPlans.includes("share-holder") ? "font-bold" : ""}`}
              >
                Share Holder
              </p>
            </div>
            {selectedPlans.includes("share-holder") && (
              <TiPin className="text-6xl absolute -top-7 -right-7 text-rose-600" />
            )}
          </div>
          {/* plan details */}
          <div
            className={`w-[200px] h-[150px]  mt-6 p-3 flex flex-col justify-between gap-y-3 ${!selectedPlans.includes("share-holder") && "cursor-not-allowed  text-gray-500"}`}
          >
            <div className="flex flex-col gap-y-3">
              <label htmlFor="price">Enter Amount:</label>
              <input
                // onChange={(e) => setShareHolderAmount(e.target.value)}
                ref={shareHolderInputRef}
                type="number"
                defaultValue=""
                className="outline-none border border-black rounded-md bg-[#EAE9E8] px-3 "
                disabled={!selectedPlans.includes("share-holder")}
              />
              {selectedPlans.includes("share-holder") && (
                <p
                  onClick={() => {
                    if (
                      shareHolderInputRef.current &&
                      shareHolderInputRef?.current?.value !== "" &&
                      shareHolderInputRef?.current?.value !== null
                    ) {
                      setShareHolderAmount(shareHolderInputRef.current?.value);
                      shareHolderInputRef.current.value = "";
                    }
                  }}
                  className="bg-green-700 px-3 py-0.5 rounded-md hover:scale-105 hover:tracking-widest transition-all duration-300 ease-in text-white font-bold text-center cursor-pointer"
                >
                  Submit
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Directorship */}
        <div
          className={`border-2 rounded-xl ${selectedPlans.includes("directorship") && "shadow-2xl border-orange-500 "}`}
        >
          {/* plan */}
          <div
            onClick={() => {
              if (selectedPlans.includes("directorship")) {
                // setTotalProjectShare(0);
                const neww = selectedPlans.filter((p) => p != "directorship");
                setSelectedPlans(neww);
              } else {
                setSelectedPlans((prev) => {
                  return [...prev, "directorship"]; // Return the new array
                });
              }
            }}
            className={`w-[200px] h-[150px]  flex justify-center items-center  rounded-md cursor-pointer relative `}
          >
            <div className="flex flex-col items-center gap-y-2">
              <img
                className={`w-20 h-20 ${!selectedPlans.includes("directorship") && "filter grayscale"}`}
                src="/images/directorshipIcon.png"
                alt=""
              />
              <p
                className={`text-xl ${selectedPlans.includes("directorship") ? "font-bold" : ""}`}
              >
                Partnership
              </p>
            </div>
            {selectedPlans.includes("directorship") && (
              <TiPin className="text-6xl absolute -top-7 -right-7 text-rose-600" />
            )}
          </div>
          {/* plan details */}
          <div
            className={`w-[200px] h-[150px]  mt-6 p-3 flex flex-col justify-between gap-y-3 ${!selectedPlans.includes("directorship") && "cursor-not-allowed  text-gray-500"}`}
          >
            <div className="flex flex-col gap-y-3">
              <label htmlFor="price">Enter Amount:</label>
              <input
                // onChange={(e) => setDirectorshipAmount(e.target.value)}
                ref={directorshipInputRef}
                type="number"
                defaultValue=""
                className="outline-none border border-black rounded-md bg-[#EAE9E8] px-3 "
                disabled={!selectedPlans.includes("directorship")}
              />
              {selectedPlans.includes("directorship") && (
                <p
                  onClick={() => {
                    if (
                      directorshipInputRef.current &&
                      directorshipInputRef.current.value !== "" &&
                      directorshipInputRef.current.value !== null
                    ) {
                      setDirectorshipAmount(
                        directorshipInputRef.current?.value
                      );
                      directorshipInputRef.current.value = "";
                    }
                  }}
                  className="bg-green-700 px-3 py-0.5 rounded-md hover:scale-105 hover:tracking-widest transition-all duration-300 ease-in text-white font-bold text-center cursor-pointer"
                >
                  Submit
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Plans Summary and Payment details */}
      <div className="mt-16 flex gap-x-10">
        {/* plan summary */}
        <div className="w-full min-h-[400px] ">
          <div className="flex items-center justify-between px-4 py-2 border-4 rounded-full border-black text-white">
            <p className="text-rose-700 font-bold text-2xl ">Plan Summary</p>
            <p className="text-black tracking-wider">
              Total: &#2547; {totalPlanCost}
            </p>
          </div>

          <div className=" flex flex-col">
            {projectShareAmount <= 0 &&
              fixedDepositAmount <= 0 &&
              shareHolderAmount <= 0 &&
              directorshipAmount <= 0 && (
                <p className="text-center mt-3 text-xl">No Plan yet</p>
              )}
            {projectShareAmount > 0 && (
              <div className="flex items-center justify-between  px-4 py-3 border-b-2 border-black text-black">
                <div className="flex items-center gap-3 ">
                  <p>Project Share</p>
                  <p className="">{totalProjectShare}</p>
                </div>
                <p className="text-sm tracking-widest">
                  &#2547; {projectShareAmount}
                </p>
              </div>
            )}
            {parseInt(fixedDepositAmount) > 0 && (
              <div className="flex items-center justify-between  px-4 py-3 border-b-2 border-black text-black">
                <div className="flex items-center gap-3">
                  <p>Fixed Deposit</p>
                </div>
                <p className="text-sm tracking-widest">
                  &#2547; {fixedDepositAmount}
                </p>
              </div>
            )}
            {parseInt(shareHolderAmount) > 0 && (
              <div className="flex items-center justify-between  px-4 py-3 border-b-2 border-black text-black">
                <div className="flex items-center gap-3">
                  <p>Share Holder</p>
                </div>
                <p className="text-sm tracking-widest">
                  &#2547; {shareHolderAmount}
                </p>
              </div>
            )}
            {parseInt(directorshipAmount) > 0 && (
              <div className="flex items-center justify-between  px-4 py-3 border-b-2 border-black text-black">
                <div className="flex items-center gap-3">
                  <p>Partnership</p>
                </div>
                <p className="text-sm tracking-widest">
                  &#2547; {directorshipAmount}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* payment details */}
        <div className="w-full">
          {/* head */}
          <div className="flex items-center justify-between px-4 py-2 bg-white border-4 border-black rounded-full">
            <p className="text-rose-700 font-bold text-2xl ">Payment Summary</p>
            {/* <p className=" tracking-wider">Total: &#2547; {totalPlanCost}</p> */}
          </div>

          <div className="mt-5 px-6 flex flex-col gap-y-5">
            {/* money reciept no */}
            <div className="flex items-center justify-between">
              <label htmlFor="money-reciept-no">Money Reciept No</label>
              <input
                type="text"
                name=""
                id="money-reciept-no"
                onChange={(e) => setMoneyRecieptNumber(e.target.value)}
                className="bg-gray-200 px-4 py-2 rounded-md w-80 border-2 border-black text-black outline-none focus:border-red-600"
                placeholder="Enter money reciept number"
              />
            </div>
            {/* mobile no */}
            <div className="flex  justify-between">
              <label htmlFor="mobile-number">Mobile Number</label>
              <div>
                <input
                  type="text"
                  name=""
                  id="mobile-number"
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="bg-gray-300 px-4 py-2 rounded-md w-80 border-2 border-black text-black outline-none focus:border-red-600"
                  placeholder="enter mobile number"
                />
                <div className="flex items-center gap-1 py-1 px-1 text-teal-600 font-bold text-sm">
                  <IoMdInformationCircleOutline />
                  <p className="">Mobile Number should be 11 digit</p>
                </div>
              </div>
            </div>
            {/* payment method */}
            <div className="flex items-center justify-between">
              <label htmlFor="payment-method">Payment Method</label>
              <select
                name=""
                id="payment-method"
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="bg-[#d9d7d5] cursor-pointer px-4 py-2 rounded-md w-80 border-2 border-black text-black outline-none focus:border-red-600"
              >
                <option value="">Select Method</option>
                <option value="cash">Cash</option>
                <option value="bKash">Bkash</option>
                <option value="rocket">Rocket</option>
                <option value="nagad">Nagad</option>
                <option value="bank">Online Bank</option>
              </select>
            </div>
            {/* {paymentMethod === "bank" && (
              <div className="flex flex-col gap-y-5">
              
                <div className="flex items-center justify-between">
                  <label htmlFor="bank-name">Bank Name</label>
                  <input
                    type="text"
                    name=""
                    id="bank-name"
                    onChange={(e) => setBankName(e.target.value)}
                    className="bg-[#d9d7d5] px-4 py-2 rounded-md w-80 border-2 border-black text-black outline-none focus:border-red-600"
                    placeholder="enter bank name"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label htmlFor="bank-acc-name">Bank Account Name</label>
                  <input
                    type="text"
                    name=""
                    id="bank-acc-name"
                    onChange={(e) => setBankAccName(e.target.value)}
                    className="bg-[#d9d7d5] px-4 py-2 rounded-md w-80 border-2 border-black text-black outline-none focus:border-red-600"
                    placeholder="enter acc name"
                  />
                </div>
      
                <div className="flex items-center justify-between">
                  <label htmlFor="bank-acc-no">Bank Account No</label>
                  <input
                    type="text"
                    name=""
                    id="bank-acc-no"
                    onChange={(e) => setBankAccNo(e.target.value)}
                    className="bg-[#d9d7d5] px-4 py-2 rounded-md w-80 border-2 border-black text-black outline-none focus:border-red-600"
                    placeholder="enter acc no"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label htmlFor="bank-branch-name">Bank Branch Name</label>
                  <input
                    type="text"
                    name=""
                    id="bank-branch-name"
                    onChange={(e) => setBankBranchName(e.target.value)}
                    className="bg-[#d9d7d5] px-4 py-2 rounded-md w-80 border-2 border-black text-black outline-none focus:border-red-600"
                    placeholder="enter branch name"
                  />
                </div>
              </div>
            )} */}
            {/* payment picture upload */}
            {/* {paymentMethod !== "cash" && (
              <div className="flex items-center justify-between">
                <label htmlFor="transaction-id">Transaction Picture</label>
                <div className="w-80 flex flex-col items-center gap-y-2 cursor-pointer">
                  <img
                    className="w-20 h-20 rounded-full object-cover cursor-pointer border-2 border-black"
                    src={paymentPicture || "/images/paymentPictureDummy.jpg"} // Use uploaded image if available
                    alt="Profile"
                    onClick={handleImageClick}
                  />

                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange} // Trigger upload on file selection
                  />
                  <p>
                    {isLoadingForImage && (
                      <ColorRing
                        visible={true}
                        height="40"
                        width="40"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={[
                          "#e15b64",
                          "#f47e60",
                          "#f8b26a",
                          "#abbd81",
                          "#849b87",
                        ]}
                      />
                    )}
                  </p>
                </div>
              </div>
            )} */}
            {/* Money Receipt picture upload */}
            {/* <div className="flex items-center justify-between">
              <label htmlFor="transaction-id">Money Reciept Picture</label>
              <div className="w-80 flex flex-col items-center gap-y-2 cursor-pointer">
                <img
                  className="w-20 h-20 rounded-full object-cover cursor-pointer border-2 border-black"
                  src={paymentPicture2 || "/images/paymentPictureDummy.jpg"} // Use uploaded image if available
                  alt="Profile"
                  onClick={handleImageClick2}
                />

                <input
                  type="file"
                  ref={fileInputRef2}
                  style={{ display: "none" }}
                  onChange={handleFileChange2} // Trigger upload on file selection
                />
                <p>
                  {isLoadingForImage2 && (
                    <ColorRing
                      visible={true}
                      height="40"
                      width="40"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={[
                        "#e15b64",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                      ]}
                    />
                  )}
                </p>
              </div>
            </div> */}
            {/* tranxId */}
            {/* {paymentMethod !== "cash" && (
              <div className="flex items-center justify-between">
                <label htmlFor="transaction-id">Transaction Number</label>
                <input
                  type="text"
                  name=""
                  id="transaction-id"
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="bg-[#d9d7d5] px-4 py-2 rounded-md w-80 border-2 border-black text-black outline-none focus:border-red-600"
                  placeholder="enter transaction number"
                />
              </div>
            )} */}
            {/* // Inside your component, add the payment date section */}
            <div className="flex items-center justify-between mt-5">
              <label htmlFor="payment-date">Payment Date</label>
              <input
                type="date"
                id="payment-date"
                onChange={(e) => setPaymentDate(e.target.value)}
                className="bg-gray-200 px-4 py-2 rounded-md w-80 border-2 border-black text-black outline-none focus:border-red-600"
              />
            </div>
            {/* requested button */}
            <div
              onClick={
                totalPlanCost > 0
                  ? handleRequestToAdmin
                  : (e) => e.preventDefault()
              }
              className={`${totalPlanCost <= 0 ? "cursor-not-allowed bg-gray-400" : "bg-rose-600 cursor-pointer hover:scale-95 hover:tracking-normal"} flex items-center justify-center py-2  rounded text-white font-bold  tracking-widest  transition-all duration-500 ease-in`}
            >
              {isLoading ? (
                <ThreeCircles
                  visible={true}
                  height="30"
                  width="30"
                  color="#fff"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <button
                  className={`${totalPlanCost <= 0 ? "cursor-not-allowed" : " cursor-pointer"}`}
                >
                  Request to Admin
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
