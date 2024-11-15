import React from "react";
import toast from "react-hot-toast";

const Setting = ({
  setAccountNo,
  accountNo,
  setBankName,
  bankName,
  setBranchName,
  branchName,
  setRoutingNo,
  routingNo,
  setSwiftCode,
  swiftCode,
  selectedGateway,
  setCurrentTab,
}: {
  setAccountNo: (accNo: string) => void;
  accountNo: string;
  setBankName: (bankName: string) => void;
  bankName: string;
  setBranchName: (branchName: string) => void;
  branchName: string;
  setRoutingNo: (routingNo: string) => void;
  routingNo: string;
  setSwiftCode: (swiftCode: string) => void;
  swiftCode: string;
  selectedGateway: string;
  setCurrentTab: (tabName: string) => void;
}) => {
  return (
    <div>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        className="mt-6 w-[30%] mx-auto bg-white p-5 rounded-md flex flex-col gap-y-4"
      >
        <div className="flex items-center justify-between">
          <label htmlFor="acc_no">Account No</label>
          <input
            value={accountNo}
            onChange={(e) => setAccountNo(e.target.value)}
            type="text"
            placeholder=""
            className="w-52 px-3 py-1 bg-white outline-none border-2 border-slate-600 rounded-md"
          />
        </div>
        {selectedGateway === "bank" && (
          <>
            <div className="flex items-center justify-between">
              <label htmlFor="bank_name">Bank Name</label>
              <input
                onChange={(e) => setBankName(e.target.value)}
                value={bankName}
                type="text"
                placeholder=""
                className="w-52 px-3 py-1 outline-none border-2 bg-transparent border-slate-600 rounded-md"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="branch_name">Branch Name</label>
              <input
                onChange={(e) => setBranchName(e.target.value)}
                value={branchName}
                type="text"
                placeholder=""
                className="w-52 px-3 py-1 outline-none border-2 border-slate-600 rounded-md bg-transparent"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="routing_no">Routing No</label>
              <input
                onChange={(e) => setRoutingNo(e.target.value)}
                value={routingNo}
                type="text"
                placeholder=""
                className="w-52 px-3 py-1 outline-none border-2 border-slate-600 rounded-md bg-transparent"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="swift_code">Swift Code</label>
              <input
                onChange={(e) => setSwiftCode(e.target.value)}
                value={swiftCode}
                type="text"
                placeholder=""
                className="w-52 px-3 py-1 outline-none border-2 border-slate-600 rounded-md bg-transparent"
              />
            </div>
          </>
        )}
        <div className="flex justify-end items-center gap-x-2 mt-10">
          <p
            onClick={() => setCurrentTab("payment-gateway")}
            className="bg-rose-500 text-white font-bold hover:bg-rose-600 px-3 py-1 rounded-md cursor-pointer"
          >
            Back
          </p>
          <p
            onClick={() => {
              if (selectedGateway !== "bank") {
                if (accountNo && accountNo.length == 11) {
                  setCurrentTab("withdraw-request");
                } else {
                  toast.error("Invalid Account No");
                }
              } else {
                if (accountNo && bankName && branchName && routingNo) {
                  setCurrentTab("withdraw-request");
                } else {
                  toast.error("Fiiled all Field First");
                }
              }
            }}
            className="bg-teal-500 text-white font-bold hover:bg-teal-600 px-3 py-1 rounded-md cursor-pointer"
          >
            Continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default Setting;
