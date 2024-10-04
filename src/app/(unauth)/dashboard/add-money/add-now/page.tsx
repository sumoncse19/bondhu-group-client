"use client";
import React, { useEffect, useRef, useState } from "react";
import { TiPin } from "react-icons/ti";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
import { useRouter } from "next/navigation";

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
  const [bankAccName, setBankAccName] = useState<string>("");
  const [bankBranchName, setBankBranchName] = useState<string>("");
  const [paymentPicture, setPaymentPicture] = useState<string>("");
  const [isLoadingForImage, setIsLoadingForImage] = useState<boolean>(false);

  const [user, setUser] = useState<any>({});

  const fixedDepositInputRef = useRef<HTMLInputElement>(null);
  const shareHolderInputRef = useRef<HTMLInputElement>(null);
  const directorshipInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file); // Upload the selected file
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

  const handleRequestToAdmin = () => {
    if (
      (totalPlanCost > 0 && !moneyRecieptNumber) ||
      !mobileNumber ||
      !paymentMethod ||
      !transactionId ||
      !paymentPicture
    ) {
      toast.error("Fill all field first");
      return;
    }
    if (paymentMethod === "bank") {
      if (!bankName || !bankAccName || !bankBranchName)
        toast.error("Fill all bank info first");
      return;
    }

    const paymentData = {
      userId: user?._id,
      project_share: projectShareAmount,
      fixed_deposit: fixedDepositAmount,
      share_holder: shareHolderAmount,
      directorship: directorshipAmount,
      total_amount: totalPlanCost,
      add_money_history: {
        money_receipt_number: moneyRecieptNumber,
        phone: mobileNumber,
        payment_method: paymentMethod,
        bank_name: bankName,
        bank_account_name: bankAccName,
        branch_name: bankBranchName,
        transaction_id: transactionId,
        picture: paymentPicture,
      },
    };

    router.push("/dashboard/add-money/add-money-history");
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
    <div className="w-full h-full  text-black">
      <h1 className="text-2xl text-rose-600 font-bold tracking-widest animate-bounce">
        Pick Your Plan
      </h1>

      {/* plans */}
      <div className="mt-10 flex items-center gap-8">
        {/* Project Share part */}
        <div>
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
            className={`w-[200px] h-[150px]  flex justify-center items-center border border-black rounded-md cursor-pointer relative ${selectedPlans.includes("project-share") && "shadow-2xl"}`}
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
        <div>
          {/* plan */}
          <div
            onClick={() => {
              if (selectedPlans.includes("fixed-deposit")) {
                setTotalProjectShare(0);
                const neww = selectedPlans.filter((p) => p != "fixed-deposit");
                setFixedDepositAmount("");
                setSelectedPlans(neww);
              } else {
                setSelectedPlans((prev) => {
                  return [...prev, "fixed-deposit"]; // Return the new array
                });
              }
            }}
            className={`w-[200px] h-[150px]  flex justify-center items-center border border-black rounded-md cursor-pointer relative ${selectedPlans.includes("fixed-deposit") && "shadow-2xl"}`}
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
        <div>
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
            className={`w-[200px] h-[150px]  flex justify-center items-center border border-black rounded-md cursor-pointer relative ${selectedPlans.includes("fixed-deposit") && "shadow-2xl"}`}
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
        <div>
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
            className={`w-[200px] h-[150px]  flex justify-center items-center border border-black rounded-md cursor-pointer relative ${selectedPlans.includes("fixed-deposit") && "shadow-2xl"}`}
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
                Directorship
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
          <div className="flex items-center justify-between px-4 py-2 bg-[#C9C3BD]">
            <p className="text-rose-700 font-bold text-2xl ">Plan Summary</p>
            <p className=" tracking-wider">Total: &#2547; {totalPlanCost}</p>
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
                  <p>{totalProjectShare}</p>
                </div>
                <p className="text-sm">&#2547; {projectShareAmount}</p>
              </div>
            )}
            {parseInt(fixedDepositAmount) > 0 && (
              <div className="flex items-center justify-between  px-4 py-3 border-b-2 border-black text-black">
                <div className="flex items-center gap-3">
                  <p>Fixed Deposit</p>
                </div>
                <p className="text-sm">&#2547; {fixedDepositAmount}</p>
              </div>
            )}
            {parseInt(shareHolderAmount) > 0 && (
              <div className="flex items-center justify-between  px-4 py-3 border-b-2 border-black text-black">
                <div className="flex items-center gap-3">
                  <p>Share Holder</p>
                </div>
                <p className="text-sm">&#2547; {shareHolderAmount}</p>
              </div>
            )}
            {parseInt(directorshipAmount) > 0 && (
              <div className="flex items-center justify-between  px-4 py-3 border-b-2 border-black text-black">
                <div className="flex items-center gap-3">
                  <p>Directorship</p>
                </div>
                <p className="text-sm">&#2547; {directorshipAmount}</p>
              </div>
            )}
          </div>
        </div>

        {/* payment details */}
        <div className="w-full">
          {/* head */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#C9C3BD]">
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
                className="bg-[#d9d7d5] px-4 py-2 rounded-md w-80 border-2 border-black text-black outline-none focus:border-red-600"
                placeholder="enter money reciept number"
              />
            </div>
            {/* mobile no */}
            <div className="flex items-center justify-between">
              <label htmlFor="mobile-number">Mobile Number</label>
              <input
                type="text"
                name=""
                id="mobile-number"
                onChange={(e) => setMobileNumber(e.target.value)}
                className="bg-[#d9d7d5] px-4 py-2 rounded-md w-80 border-2 border-black text-black outline-none focus:border-red-600"
                placeholder="enter mobile number"
              />
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
            {paymentMethod === "bank" && (
              <div className="flex flex-col gap-y-5">
                {/* bank name */}
                <div className="flex items-center justify-between">
                  <label htmlFor="bank-name">Bank Name</label>
                  <input
                    type="text"
                    name=""
                    id="bank-name"
                    onChange={(e) => setBankName(e.target.value)}
                    className="bg-[#d9d7d5] px-4 py-2 rounded-md w-80 border-2 border-black text-black outline-none focus:border-red-600"
                    placeholder="enter money reciept number"
                  />
                </div>
                {/* bank acc name */}
                <div className="flex items-center justify-between">
                  <label htmlFor="bank-acc-name">Bank Account Name</label>
                  <input
                    type="text"
                    name=""
                    id="bank-acc-name"
                    onChange={(e) => setBankAccName(e.target.value)}
                    className="bg-[#d9d7d5] px-4 py-2 rounded-md w-80 border-2 border-black text-black outline-none focus:border-red-600"
                    placeholder="enter money reciept number"
                  />
                </div>
                {/* bank branch name */}
                <div className="flex items-center justify-between">
                  <label htmlFor="bank-branch-name">Bank Branch Name</label>
                  <input
                    type="text"
                    name=""
                    id="bank-branch-name"
                    onChange={(e) => setBankBranchName(e.target.value)}
                    className="bg-[#d9d7d5] px-4 py-2 rounded-md w-80 border-2 border-black text-black outline-none focus:border-red-600"
                    placeholder="enter money reciept number"
                  />
                </div>
              </div>
            )}

            {/* image upload */}
            <div className="flex items-center justify-between">
              <label htmlFor="transaction-id">Payment Picture</label>
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

            {/* tranxId */}
            {paymentMethod !== "cash" && (
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
            )}

            {/* requested button */}
            <div
              onClick={
                totalPlanCost > 0
                  ? handleRequestToAdmin
                  : (e) => e.preventDefault()
              }
              className={`${totalPlanCost <= 0 ? "cursor-not-allowed bg-gray-400" : "bg-rose-600 cursor-pointer hover:scale-95 hover:tracking-normal"} flex items-center justify-center py-2  rounded text-white font-bold  tracking-widest  transition-all duration-500 ease-in`}
            >
              <button
                className={`${totalPlanCost <= 0 ? "cursor-not-allowed" : " cursor-pointer"}`}
              >
                Request to Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
