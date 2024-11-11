import React from "react";
import toast from "react-hot-toast";

const PaymentGateway = ({
  selectedGateway,
  setSelectedGateway,
  setCurrentTab,
}: {
  selectedGateway: string;
  setSelectedGateway: (gateway: string) => void;
  setCurrentTab: (tabName: string) => void;
}) => {
  return (
    <div>
      <div className="mt-8 w-[50%] mx-auto ">
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex items-center justify-between gap-4 ">
            {/* nagad */}
            <div
              onClick={() => setSelectedGateway("nagad")}
              className={`flex justify-between items-center gap-5 border-2  p-2 rounded-2xl cursor-pointer ${selectedGateway === "nagad" ? "border-teal-600 bg-teal-100" : "border-slate-400"}`}
            >
              <div className="bg-white border border-slate-400 rounded-2xl p-2 overflow-hidden">
                <img
                  className="w-52 h-24 object-fill"
                  src="/images/logos/nagadLogo.png"
                  alt="Nagad Logo"
                />
              </div>
            </div>

            {/* bkash */}
            <div
              onClick={() => setSelectedGateway("bKash")}
              className={`flex justify-between items-center gap-5 border-2  p-2 rounded-2xl cursor-pointer ${selectedGateway === "bKash" ? "border-teal-600 bg-teal-100" : "border-slate-400"}`}
            >
              <div className="bg-white border border-slate-400 rounded-2xl p-2 overflow-hidden">
                <img
                  className="w-52 h-24 object-cover"
                  src="/images/logos/bkashLogo.png"
                  alt="bKash Logo"
                />
              </div>
            </div>
            {/* rocket */}
            <div
              onClick={() => setSelectedGateway("rocket")}
              className={`flex justify-between items-center gap-5 border-2  p-2 rounded-2xl cursor-pointer ${selectedGateway === "rocket" ? "border-teal-600 bg-teal-100" : "border-slate-400"}`}
            >
              <div className="bg-white border border-slate-400 rounded-2xl p-2 overflow-hidden">
                <img
                  className="w-52 h-24 object-fill"
                  src="/images/logos/rocketLogo.png"
                  alt="Rocket Logo"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            {/* cash */}
            <div
              onClick={() => setSelectedGateway("cash")}
              className={`flex justify-between items-center gap-5 border-2  p-2 rounded-2xl cursor-pointer ${selectedGateway === "cash" ? "border-teal-600 bg-teal-100" : "border-slate-400"}`}
            >
              <div className="bg-white border border-slate-400 rounded-2xl p-2 overflow-hidden">
                <img
                  className="w-52 h-24 object-cover rounded-2xl"
                  src="/images/logos/cashLogo.png"
                  alt="cash Logo"
                />
              </div>
            </div>

            {/* bank */}
            <div
              onClick={() => setSelectedGateway("bank")}
              className={`flex justify-between items-center gap-5 border-2  p-2 rounded-2xl cursor-pointer ${selectedGateway === "bank" ? "border-teal-600 bg-teal-100" : "border-slate-400"}`}
            >
              <div className="bg-white border border-slate-400 rounded-2xl p-2 overflow-hidden">
                <img
                  className="w-64 h-32 object-cover"
                  src="/images/logos/bankLogo.webp"
                  alt="Bank Logo"
                />
              </div>
            </div>
          </div>
        </div>

        {/* continue */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={() => {
              if (selectedGateway !== "") {
                if (selectedGateway === "cash") {
                  setCurrentTab("withdraw-request");
                } else {
                  setCurrentTab("setting");
                }
              } else {
                toast.error("Select a gateway first");
              }
            }} // example of setting the next tab
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-5 py-2 rounded-xl"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
