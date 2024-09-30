import React from "react";

const page = () => {
  return (
    <div className="w-full h-full p-10">
      <h1 className="text-center text-3xl text-black font-bold">
        Purchase Wallet
      </h1>

      {/* balance inflow and cost */}
      <div className="mt-16 w-full  flex  justify-between gap-x-10">
        {/* inflow */}
        <div
          style={{
            boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
          }}
          className="w-full rounded-md bg-black"
        >
          <div className="border-4 border-black rounded-md">
            <div className="bg-green-700 text-rose-300 font-bold py-5 px-2 border-b-4 border-black  text-xl">
              Balance Inflow
            </div>
            {/* deposite */}
            <div className="flex items-center bg-green-600 text-black  px-2">
              <div className="w-[60%] border-r-4 border-black py-4">
                Deposite
              </div>
              <div className="w-[20%] text-center  border-r-4 border-black py-4">
                0.00
              </div>
              <div className="w-[20%] text-center">view</div>
            </div>
            {/* from admin */}
            <div className="flex items-center bg-green-500   text-black px-2">
              <div className="w-[60%] border-r-4 border-black py-4">
                In From Admin
              </div>
              <div className="w-[20%] text-center  border-r-4 border-black py-4">
                0.00
              </div>
              <div className="w-[20%] text-center">view</div>
            </div>

            {/* total */}
            <div className="flex items-center bg-green-400 text-black font-bold border-t-4 border-black  px-2">
              <div className="w-[60%] border-r-4 border-black py-4">
                Total Inflow
              </div>
              <div className="w-[20%] text-center py-4">0.00</div>
            </div>
          </div>
        </div>
        {/* expenses */}
        <div
          style={{
            boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
          }}
          className="w-full rounded-md"
        >
          <div className="border-4 border-black rounded-md">
            <div className="bg-red-300 text-teal-900 font-bold py-5 px-2 border-b-4 border-black  text-xl">
              Balance Expenses
            </div>
            {/* deposite */}
            <div className="flex items-center bg-red-400 text-white  px-2">
              <div className="w-[60%] border-r-4 border-black py-4">
                Deposite
              </div>
              <div className="w-[20%] text-center  border-r-4 border-black py-4">
                0.00
              </div>
              <div className="w-[20%] text-center">view</div>
            </div>
            {/* from admin */}
            <div className="flex items-center bg-red-500   text-white px-2">
              <div className="w-[60%] border-r-4 border-black py-4">
                In From Admin
              </div>
              <div className="w-[20%] text-center  border-r-4 border-black py-4">
                0.00
              </div>
              <div className="w-[20%] text-center">view</div>
            </div>

            {/* total */}
            <div className="flex items-center bg-red-600 text-white font-bold border-t-4 border-black  px-2">
              <div className="w-[60%] border-r-4 border-black py-4">
                Total Inflow
              </div>
              <div className="w-[20%] text-center   py-4">0.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
