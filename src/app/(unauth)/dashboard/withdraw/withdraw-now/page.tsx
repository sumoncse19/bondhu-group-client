"use client";
import PaymentGateway from "@/components/ui/Withdraw/PaymentGateway";
import Setting from "@/components/ui/Withdraw/Setting";
import WithdrawRequest from "@/components/ui/Withdraw/WithdrawRequest";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import baseUrl from "../../../../../../config";
import Cookies from "js-cookie";

const page = () => {
  const [currentTab, setCurrentTab] = useState<string>("payment-gateway");
  const [selectedGateway, setSelectedGateway] = useState<string>("");
  const [accountNo, setAccountNo] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [branchName, setBranchName] = useState<string>("");
  const [routingNo, setRoutingNo] = useState<string>("");
  const [swiftCode, setSwiftCode] = useState<string>("");
  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [securityCodeModal, setSecurityModal] = useState(false);
  const [securityCode, setSecurityCode] = useState<string>("");

  const id: string = Cookies.get("id") || "";
  const token: string = Cookies.get("token") || "";

  const handleSetSecurityCode = async () => {
    try {
      axios
        .put(
          `${baseUrl}/user/auth/${id}`,
          { security_code: securityCode },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.data?.success) {
            toast.success("Set Security Code Sucessfully");
          }
        });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  return (
    <div className="relative">
      {/* headers */}
      <div className="flex items-center justify-between">
        <p className="text-rose-500 text-xl font-bold">
          Withdraw Configuration
        </p>
        <p
          style={{
            boxShadow:
              "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
          }}
          onClick={() => setSecurityModal(true)}
          className="bg-teal-500 px-5 py-2 rounded-full cursor-pointer text-white  border-black border-2 hover:scale-105 transition-all duration-300 ease-in"
        >
          Set Security Code
        </p>
      </div>

      {/* tabss */}
      <div className="mt-10">
        <div className="flex items-center gap-x-5">
          <div
            className={`pb-2 text-gray-700  ${currentTab === "payment-gateway" && " text-black font-bold border-b-2 border-gray-700"}`}
          >
            Payment Gateway
          </div>
          <div
            className={`pb-2 text-gray-700  ${currentTab === "setting" && " text-black font-bold border-b-2 border-gray-700"}`}
          >
            Setting
          </div>
          <div
            className={`pb-2 text-gray-700  ${currentTab === "withdraw-request" && " text-black font-bold border-b-2 border-gray-700"}`}
          >
            Withdraw Request
          </div>
        </div>
      </div>

      {/* tabs body */}
      <div className="mt-8">
        {currentTab === "payment-gateway" ? (
          <PaymentGateway
            selectedGateway={selectedGateway}
            setSelectedGateway={setSelectedGateway}
            setCurrentTab={setCurrentTab}
          />
        ) : currentTab === "setting" ? (
          <Setting
            setAccountNo={setAccountNo}
            accountNo={accountNo}
            setBankName={setBankName}
            bankName={bankName}
            setBranchName={setBranchName}
            branchName={branchName}
            setRoutingNo={setRoutingNo}
            routingNo={routingNo}
            setSwiftCode={setSwiftCode}
            swiftCode={swiftCode}
            selectedGateway={selectedGateway}
            setCurrentTab={setCurrentTab}
          />
        ) : currentTab === "withdraw-request" ? (
          <WithdrawRequest
            setCurrentTab={setCurrentTab}
            setSelectedWallet={setSelectedWallet}
            setWithdrawAmount={setWithdrawAmount}
            setCode={setCode}
            accountNo={accountNo}
            bankName={bankName}
            branchName={branchName}
            routingNo={routingNo}
            swiftCode={swiftCode}
            selectedWallet={selectedWallet}
            withdrawAmount={withdrawAmount}
            code={code}
            selectedGateway={selectedGateway}
          />
        ) : null}
      </div>

      {/* security code modal */}
      {securityCodeModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSecurityModal(false);
            }
          }}
          className="w-full min-h-[100vh] bg-black bg-opacity-80 fixed top-0 right-0 flex justify-center items-center cursor-pointer"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-[400px] h-fit pb-3 bg-white rounded"
          >
            {/* head */}
            <div className="py-4 px-6 flex justify-between items-center rounded bg-gray-300 text-black">
              <p>Set Security Code</p>
              <p
                onClick={() => setSecurityModal(false)}
                className="bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in px-3 py-1 rounded-md cursor-pointer text-white"
              >
                Close
              </p>
            </div>

            {/* body */}
            <div className="mt-5 px-3 flex flex-col gap-y-10 ">
              <div className="flex items-center justify-between gap-10">
                <label
                  htmlFor="code"
                  className="text-black font-bold  tracking-wider"
                >
                  Set Code
                </label>
                <input
                  onChange={(e) => setSecurityCode(e.target.value)}
                  type="text"
                  className="border border-gray-700 w-[200px] px-5 py-2  rounded-md bg-transparent"
                  placeholder="Enter Code"
                />
              </div>
            </div>
            {/* footer */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={handleSetSecurityCode}
                className="bg-teal-500 px-6 py-2 rounded-md cursor-pointer text-white hover:scale-105 hover:tracking-widest transition-all duration-300 ease-in"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
