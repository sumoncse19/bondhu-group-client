import React from "react";

const ChangePassword = () => {
  return (
    <div className="w-full h-[100vh] ">
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex items-center border border-black p-2 rounded-md ">
          <div className="w-[400px] h-fit border border-black rounded-md p-8 ">
            <div className="flex flex-col items-center gap-y-3">
              <img
                src="/images/profilePicIcon.png"
                className="w-20 h-20"
                alt=""
              />
              <p className="bg-green-400 text-sm text-white px-3 py-0.5 rounded-md">
                Business Account
              </p>
            </div>

            <div className="flex flex-col gap-y-8 mt-8 text-black">
              <div className="relative">
                <label
                  className="absolute -top-3 left-3 bg-[#EAE9E8] px-2"
                  htmlFor="old-pass"
                >
                  Old Password
                </label>
                <input
                  placeholder="Re-enter old password"
                  className="w-full text-sm bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                  type="password"
                  id="old-pass"
                />
              </div>

              <div className="relative">
                <label
                  className="absolute -top-3 left-3 bg-[#EAE9E8] px-2"
                  htmlFor="new-pass"
                >
                  New Password
                </label>
                <input
                  placeholder="Enter new password"
                  className="w-full text-sm bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                  type="password"
                  id="new-pass"
                />
              </div>
              <div className="relative">
                <label
                  className="absolute -top-3 left-3 bg-[#EAE9E8] px-2"
                  htmlFor="confirm-new-pass"
                >
                  Confirm Password
                </label>
                <input
                  placeholder="Confirm password"
                  className="w-full text-sm bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                  type="password"
                  id="confirm-new-pass"
                />
              </div>

              <div className="bg-[#d0b69e] py-2 text-black font-bold hover:tracking-widest hover:shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300 ease-in rounded-md flex justify-center">
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
