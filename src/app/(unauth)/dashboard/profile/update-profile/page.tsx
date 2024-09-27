import ProfileHeader from "@/components/ui/ProfileHeader";
import React from "react";

const UpdateProfile = () => {
  return (
    <div>
      <ProfileHeader />
      <div className="mt-10 text-black">
        <div className="flex flex-col gap-10">
          {/* name */}
          <div className="relative">
            <label
              className="absolute -top-3 left-3 bg-[#EAE9E8] px-2"
              htmlFor="name"
            >
              Name <p className="inline text-red-500 text-lg font-bold">*</p>
            </label>
            <input
              className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
              type="text"
              id="name"
            />
          </div>
          {/* father and mother name */}
          <div className="flex items-center gap-10">
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2"
                htmlFor="father or husband name"
              >
                Father/Husband Name
              </label>
              <input
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="father or husband name"
              />
            </div>{" "}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2"
                htmlFor="mother name"
              >
                Mother Name
              </label>
              <input
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="mother name"
              />
            </div>
          </div>
          {/* nid and dob */}
          <div className="flex items-center gap-10">
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2"
                htmlFor="nid"
              >
                NID No.{" "}
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="nid"
              />
            </div>{" "}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2"
                htmlFor="dob"
              >
                DOB
              </label>
              <input
                placeholder="ex: 12.09.1999"
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="dob"
              />
            </div>
          </div>
          {/* email and password mobile no*/}
          <div className="flex items-center gap-10">
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2"
                htmlFor="email"
              >
                Email <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="email"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2"
                htmlFor="password"
              >
                Password{" "}
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="password"
                id="password"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2"
                htmlFor="mobile_no"
              >
                Mobile No{" "}
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="number"
                id="mobile_no"
              />
            </div>
          </div>
          {/* Present Address */}
          <div className="relative">
            <label
              className="absolute -top-3 left-3 bg-[#EAE9E8] px-2"
              htmlFor="present-address"
            >
              Present Address
            </label>
            <textarea
              id="present-address"
              rows={3}
              className="w-full bg-[#EAE9E8] px-12 py-1.5 text-black rounded-md border-2 border-black outline-none group resize-none"
            />
          </div>
          {/* permanent Address */}
          <div className="relative">
            <label
              className="absolute -top-3 left-3 bg-[#EAE9E8] px-2"
              htmlFor="permennt-address"
            >
              Permanent Address
            </label>
            <textarea
              id="permennt-address"
              rows={3}
              className="w-full bg-[#EAE9E8] px-12 py-2 text-black rounded-md border-2 border-black outline-none group resize-none"
            />
          </div>
          {/* Profession,refference id  and placement id nationality */}
          <div className="flex items-center gap-10">
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2"
                htmlFor="profession"
              >
                Profession
              </label>
              <input
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="profession"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2"
                htmlFor="refernce_id"
              >
                Reference Id{" "}
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="refernce_id"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2"
                htmlFor="placement_id"
              >
                Placement Id{" "}
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="placement_id"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2"
                htmlFor="nationality"
              >
                Nationality
              </label>
              <input
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="nationality"
              />
            </div>
          </div>
          {/* religion,maritual,team and blood gp */}
          <div className="flex items-center gap-10">
            <div className=" w-full">
              <label className=" px-2" htmlFor="religion">
                Religion
              </label>
              <select
                className="bg-[#EAE9E8] border border-black px-8 py-1 rounded-md cursor-pointer"
                name=""
                id="religion"
              >
                <option value="">Select</option>
                <option value="">Islam</option>
                <option value="">Hinduism</option>
                <option value="">Buddhist</option>
                <option value="">Christian</option>
              </select>
            </div>
            <div className=" w-full">
              <label className=" px-2" htmlFor="maritual_status">
                Maritual Status
              </label>
              <select
                className="bg-[#EAE9E8] border border-black px-8 py-1 rounded-md cursor-pointer"
                name=""
                id="maritual_status"
              >
                <option value="">Select</option>
                <option value="">Married</option>
                <option value="">Single</option>
              </select>
            </div>
            <div className=" w-full">
              <label className=" px-2" htmlFor="team_side">
                Choice of Team{" "}
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <select
                className="bg-[#EAE9E8] border border-black px-8 py-1 rounded-md cursor-pointer"
                name=""
                id="team_side"
              >
                <option value="">Select</option>
                <option value="">A</option>
                <option value="">B</option>
              </select>
            </div>
            <div className=" w-full">
              <label className=" px-2" htmlFor="blood_gp">
                Blood Group
              </label>
              <select
                className="bg-[#EAE9E8] border border-black px-8 py-1 rounded-md cursor-pointer"
                name=""
                id="blood_gp"
              >
                <option value="">Select</option>
                <option value="">A+</option>
                <option value="">A-</option>
                <option value="">B+</option>
                <option value="">B-</option>
                <option value="">AB+</option>
                <option value="">AB-</option>
                <option value="">0+</option>
                <option value="">0-</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* registration Button */}
      <div className="my-16 flex">
        <div
          // style={{
          //   boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
          // }}
          className="w-1/2 mx-auto bg-[#cec8c3] shadow-lg cursor-pointer rounded-xl flex justify-center hover:scale-95  transition-all duration-300 ease-in"
        >
          <button className="text-black font-bold px-12 py-3 ">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
