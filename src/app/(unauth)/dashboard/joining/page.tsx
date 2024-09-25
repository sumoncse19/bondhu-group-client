"use client";

import React, { useRef, useState } from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const page = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef2 = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageUrl2, setImageUrl2] = useState<string | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click(); // Trigger the hidden input
  };
  const handleImageClick2 = () => {
    fileInputRef2.current?.click(); // Trigger the hidden input
  };

  const handleFileUpload = async (file: File) => {
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
        setImageUrl(imageurl);
        console.log("Uploaded image URL:", imageUrl);
      } else {
        console.error("Error uploading to imgbb:", data.error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleFileUpload2 = async (file: File) => {
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
        const imageUrl = data.data.url; // Get the image URL from the response
        setImageUrl2(imageUrl);
        console.log("Uploaded image URL:", imageUrl2);
      } else {
        console.error("Error uploading to imgbb:", data.error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
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

  return (
    <div className="p-5">
      <h1 className="text-xl pb-4">Registration For New user!</h1>
      <div className="mt-10 text-black">
        <div className="flex flex-col gap-10">
          {/* profile pic */}
          <div className="w-full flex flex-col items-center gap-y-2">
            <div className="flex flex-col items-center gap-y-2 cursor-pointer">
              <img
                className="w-28 h-28 rounded-full object-cover cursor-pointer border-2 border-black"
                src={imageUrl || "/images/profilePicIcon.png"} // Use uploaded image if available
                alt="Profile"
                onClick={handleImageClick}
              />
              <span className="flex items-center gap-1">
                <p>{imageUrl ? `Photo uploaded` : "Add Photo First"} </p>
                {imageUrl && (
                  <IoCheckmarkDoneCircle className="text-black text-lg font-bold" />
                )}
              </span>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange} // Trigger upload on file selection
              />
            </div>
          </div>
          {/* name */}
          <div className="relative">
            <label
              className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
              htmlFor="name"
            >
              Name <p className="inline text-red-500 text-lg font-bold">*</p>
            </label>
            <input
              className="w-full bg-[#BBF7D0] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
              type="text"
              id="name"
            />
          </div>
          {/* father and mother name */}
          <div className="flex items-center gap-10">
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
                htmlFor="father or husband name"
              >
                Father/Husband Name
              </label>
              <input
                className="w-full bg-[#BBF7D0] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="father or husband name"
              />
            </div>{" "}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
                htmlFor="mother name"
              >
                Mother Name
              </label>
              <input
                className="w-full bg-[#BBF7D0] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="mother name"
              />
            </div>
          </div>
          {/* nid and dob */}
          <div className="flex items-center gap-10">
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
                htmlFor="nid"
              >
                NID No.{" "}
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                className="w-full bg-[#BBF7D0] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="nid"
              />
            </div>{" "}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
                htmlFor="dob"
              >
                DOB
              </label>
              <input
                placeholder="ex: 12.09.1999"
                className="w-full bg-[#BBF7D0] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="dob"
              />
            </div>
          </div>
          {/* email and password mobile no*/}
          <div className="flex items-center gap-10">
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
                htmlFor="email"
              >
                Email <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                className="w-full bg-[#BBF7D0] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="email"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
                htmlFor="password"
              >
                Password{" "}
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                className="w-full bg-[#BBF7D0] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="password"
                id="password"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
                htmlFor="mobile_no"
              >
                Mobile No{" "}
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                className="w-full bg-[#BBF7D0] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="number"
                id="mobile_no"
              />
            </div>
          </div>
          {/* Present Address */}
          <div className="relative">
            <label
              className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
              htmlFor="present-address"
            >
              Present Address
            </label>
            <textarea
              id="present-address"
              rows={3}
              className="w-full bg-[#BBF7D0] px-12 py-1.5 text-black rounded-md border-2 border-black outline-none group resize-none"
            />
          </div>
          {/* permanent Address */}
          <div className="relative">
            <label
              className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
              htmlFor="permennt-address"
            >
              Permanent Address
            </label>
            <textarea
              id="permennt-address"
              rows={3}
              className="w-full bg-[#BBF7D0] px-12 py-2 text-black rounded-md border-2 border-black outline-none group resize-none"
            />
          </div>
          {/* Profession,refference id  and placement id nationality */}
          <div className="flex items-center gap-10">
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
                htmlFor="profession"
              >
                Profession
              </label>
              <input
                className="w-full bg-[#BBF7D0] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="profession"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
                htmlFor="refernce_id"
              >
                Reference Id{" "}
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                className="w-full bg-[#BBF7D0] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="refernce_id"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
                htmlFor="placement_id"
              >
                Placement Id{" "}
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                className="w-full bg-[#BBF7D0] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="placement_id"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
                htmlFor="nationality"
              >
                Nationality
              </label>
              <input
                className="w-full bg-[#BBF7D0] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
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
                className="bg-[#BBF7D0] border border-black px-8 py-1 rounded-md cursor-pointer"
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
                className="bg-[#BBF7D0] border border-black px-8 py-1 rounded-md cursor-pointer"
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
                className="bg-[#BBF7D0] border border-black px-8 py-1 rounded-md cursor-pointer"
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
                className="bg-[#BBF7D0] border border-black px-8 py-1 rounded-md cursor-pointer"
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

        {/* Nominee's details */}
        <div className="mt-10">
          <p className="text-xl text-red-500">Nominee Details</p>

          <div className="flex flex-col gap-10 mt-5">
            <div className="flex flex-col items-center gap-y-2 cursor-pointer">
              <img
                className="w-28 h-28 rounded-full"
                src={imageUrl2 || "/images/profilePicIcon.png"} // Use uploaded image if available
                alt=""
                onClick={handleImageClick2}
              />
              <span className="flex items-center gap-1">
                <p>{imageUrl2 ? `Photo uploaded` : "Add Photo First"} </p>
                {imageUrl2 && (
                  <IoCheckmarkDoneCircle className="text-black text-lg font-bold" />
                )}
              </span>
              <input
                type="file"
                ref={fileInputRef2}
                style={{ display: "none" }}
                onChange={handleFileChange2} // Trigger upload on file selection
              />
            </div>
            {/* nominne's name, mobile no and relation */}
            <div className="flex items-center gap-10">
              <div className="relative w-full">
                <label
                  className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
                  htmlFor="nominee's_name"
                >
                  Name{" "}
                  <p className="inline text-red-500 text-lg font-bold">*</p>
                </label>
                <input
                  className="w-full bg-[#BBF7D0] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                  type="text"
                  id="nominee's_name"
                />
              </div>
              <div className="relative w-full">
                <label
                  className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
                  htmlFor="nominee's_mobile"
                >
                  Mobile No.{" "}
                  <p className="inline text-red-500 text-lg font-bold">*</p>
                </label>
                <input
                  className="w-full bg-[#BBF7D0] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                  type="number"
                  id="nominee's_mobile"
                />
              </div>
              <div className="relative w-full">
                <label
                  className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
                  htmlFor="relation_with_nominee"
                >
                  Relation
                </label>
                <input
                  className="w-full bg-[#BBF7D0] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                  type="text"
                  id="relation_with_nominee"
                />
              </div>
            </div>
            {/* nominee's address */}
            <div className="relative">
              <label
                className="absolute -top-3 left-3 bg-[#BBF7D0] px-2"
                htmlFor="nominee's-address"
              >
                Address
              </label>
              <textarea
                id="nominee's-address"
                rows={3}
                className="w-full bg-[#BBF7D0] px-12 py-1.5 text-black rounded-md border-2 border-black outline-none group resize-none"
              />
            </div>
          </div>
        </div>
      </div>
      {/* registration Button */}
      <div className="my-10 flex">
        <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
          }}
          className="w-1/2 mx-auto bg-[#7ebc94] cursor-pointer rounded-full flex justify-center hover:scale-95  transition-all duration-300 ease-in"
        >
          <button className="text-red-600 font-bold px-12 py-3 ">
            Complete Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
