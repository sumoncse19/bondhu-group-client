"use client";
import PaymentGateway from "@/components/ui/Withdraw/PaymentGateway";
import Setting from "@/components/ui/Withdraw/Setting";
import WithdrawRequest from "@/components/ui/Withdraw/WithdrawRequest";
import { useState } from "react";

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
  return (
    <div>
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
    </div>
  );
};

export default page;
