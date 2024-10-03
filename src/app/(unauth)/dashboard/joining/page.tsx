"use client";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import baseUrl from "../../../../../config";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ThreeCircles } from "react-loader-spinner";

// Define your UserData interface
interface UserData {
  _id?: string;
  name: string;
  user_name: string;
  father_or_husband_name: string;
  mother_name: string;
  picture: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  present_address: string;
  permanent_address: string;
  nationality: string;
  religion: string;
  blood_group: string;
  nid_passport_no: string;
  dob: string;
  choice_side: string;
  marital_status: string;
  profession: string;
  reference_id: string;
  parent_placement_id: string;
  nominee_name: string;
  relation_with_nominee: string;
  nominee_address: string;
  nominee_mobile_no: string;
  nominee_picture: string;
  registration_date: string;
}

const page = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef2 = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageUrl2, setImageUrl2] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [fatherOrHusbandName, setFatherOrHusbandName] = useState<string>("");
  const [motherName, setMotherName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [nidNo, setNidNo] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConFrimPassword] = useState<string>("");
  const [mobileNo, setMobileNo] = useState<string>("");
  const [presentAddress, setPresentAddress] = useState<string>("");
  const [permanentAddress, setPermanentAddress] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const [referenceId, setReferenceId] = useState<string>("");
  const [parentPlacementId, setParentPlacementId] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [religion, setReligion] = useState<string>("");
  const [maritualStatus, setMaritualStatus] = useState<string>("");
  const [team, setTeams] = useState<string>("");
  const [bloodGroup, setBloodGroup] = useState<string>("");
  const [nomineeName, setNomineeName] = useState<string>("");
  const [nomineePhoneNo, setNomineePhoneNo] = useState<string>("");
  const [nomineeRelation, setNomineeRelation] = useState<string>("");
  const [nomineeAddress, setNomineeAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserData>();
  const [childUsers, setChildUsers] = useState<[]>([]);
  const [currentOptions, setCurrentOptions] = useState<any>([
    {
      label: "A",
      value: "a",
    },
    {
      label: "B",
      value: "b",
    },
  ]);

  const router = useRouter();

  const userCookie = Cookies.get("user");
  const token = Cookies.get("token");

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
      } else {
        toast.error("Error uploading to imgbb:", data.error);
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

  // Function to handle registration
  const handleRegistration = async () => {
    if (password != confirmPassword) {
      toast.error("Password doesnt match");
      return;
    }
    setIsLoading(true);
    const userData: UserData = {
      name,
      user_name: userName,
      father_or_husband_name: fatherOrHusbandName,
      mother_name: motherName,
      picture: imageUrl,
      email: email,
      password: password,
      phone: mobileNo,
      role,
      present_address: presentAddress,
      permanent_address: permanentAddress,
      nationality,
      religion,
      blood_group: bloodGroup,
      nid_passport_no: nidNo,
      dob,
      choice_side: team,
      marital_status: maritualStatus,
      profession,
      reference_id: user?._id ?? "",
      parent_placement_id: parentPlacementId,
      nominee_name: nomineeName,
      relation_with_nominee: nomineeRelation,
      nominee_address: nomineeAddress,
      nominee_mobile_no: nomineePhoneNo,
      nominee_picture: imageUrl2,
      registration_date: "30.09.2024",
    };

    try {
      const response = await fetch(`${baseUrl}/user/auth/register`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error(
          "Registration Failed. Fill all the necessary fields and Try again"
        );
      }

      const data = await response.json();

      if (data.success) {
        router.push("/dashboard/wallet/purchase-wallet");
        toast.success("Successfully added new User");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // fetch child user
  const fetchChildUsers = async (userParse: UserData) => {
    const response = await fetch(
      `${baseUrl}/team/get-child-users/${userParse?._id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      setChildUsers(data?.data);
    }
  };

  useEffect(() => {
    if (userCookie) {
      try {
        let userParse: UserData = JSON.parse(userCookie); // Parse safely
        setUser(userParse);
        fetchChildUsers(userParse);
      } catch (error) {
        console.error("Failed to parse user cookie:", error);
      }
    }

    // get all child users
  }, [userCookie]);

  console.log("child", childUsers);
  return (
    <div className="p-5">
      <h1 className="text-xl pb-4 text-rose-600 font-bold">
        New User Joining Form
      </h1>
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
                <span>
                  {imageUrl ? (
                    `Photo uploaded`
                  ) : (
                    <p className="font-bold animate-bounce">Add Photo First</p>
                  )}{" "}
                </span>
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
          {/* name and userName */}
          <div className="flex items-center gap-10">
            {/* name */}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2 text-sm"
                htmlFor="name"
              >
                Name <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="name"
              />
            </div>
            {/* username */}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2 text-sm"
                htmlFor="username"
              >
                Username{" "}
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="username"
              />
            </div>
          </div>
          {/* father and mother name */}
          <div className="flex items-center gap-10">
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 text-sm bg-[#EAE9E8] px-2"
                htmlFor="father or husband name"
              >
                Father/Husband Name
              </label>
              <input
                onChange={(e) => setFatherOrHusbandName(e.target.value)}
                value={fatherOrHusbandName}
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="father or husband name"
              />
            </div>{" "}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2 text-sm"
                htmlFor="mother name"
              >
                Mother Name
              </label>
              <input
                onChange={(e) => setMotherName(e.target.value)}
                value={motherName}
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
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2 text-sm"
                htmlFor="nid"
              >
                NID No.
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setNidNo(e.target.value)}
                value={nidNo}
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="number"
                id="nid"
              />
            </div>{" "}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2 text-sm"
                htmlFor="dob"
              >
                DOB
              </label>
              <input
                onChange={(e) => setDob(e.target.value)}
                value={dob}
                placeholder="ex: 12.09.1999"
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="dob"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2 text-sm"
                htmlFor="profession"
              >
                Profession
              </label>
              <input
                onChange={(e) => setProfession(e.target.value)}
                value={profession}
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="profession"
              />
            </div>
            <div className="relative w-full flex items-center gap-x-2">
              <label className="px-2 text-sm" htmlFor="nationality">
                Nationality
              </label>
              <select
                onChange={(e) => setNationality(e.target.value)}
                className="w-full cursor-pointer bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                name=""
                id="nationality"
              >
                <option value="">Select</option>
                <option value="Bangladesh">Bangladesh</option>
              </select>
            </div>
          </div>
          {/* email and password,con pass mobile no*/}
          <div className="flex items-center gap-10">
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2 text-sm"
                htmlFor="email"
              >
                Email <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="email"
                id="email"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2 text-sm"
                htmlFor="password"
              >
                Password
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="password"
                id="password"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2 text-sm"
                htmlFor="confirm-password"
              >
                Confirm Password
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setConFrimPassword(e.target.value)}
                value={confirmPassword}
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="password"
                id="confirm-password"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2 text-sm"
                htmlFor="mobile_no"
              >
                Mobile No
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setMobileNo(e.target.value)}
                value={mobileNo}
                className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="number"
                id="mobile_no"
              />
            </div>
          </div>
          {/* Present Address */}
          <div className="relative">
            <label
              className="absolute -top-3 left-3 bg-[#EAE9E8] px-2 text-sm"
              htmlFor="present-address"
            >
              Present Address
            </label>
            <textarea
              onChange={(e) => setPresentAddress(e.target.value)}
              value={presentAddress}
              id="present-address"
              rows={3}
              className="w-full bg-[#EAE9E8] px-12 py-1.5 text-black rounded-md border-2 border-black outline-none group resize-none"
            />
          </div>
          {/* permanent Address */}
          <div className="relative">
            <label
              className="absolute -top-3 left-3 bg-[#EAE9E8] px-2 text-sm"
              htmlFor="permennt-address"
            >
              Permanent Address
            </label>
            <textarea
              onChange={(e) => setPermanentAddress(e.target.value)}
              value={permanentAddress}
              id="permennt-address"
              rows={3}
              className="w-full bg-[#EAE9E8] px-12 py-2 text-black rounded-md border-2 border-black outline-none group resize-none"
            />
          </div>
          {/* Profession,refference id  and placement id nationality */}
          <div className="flex items-center gap-6">
            <div className="relative w-full flex items-center gap-x-2">
              <label className="px-2 text-sm" htmlFor="reference_id">
                Reference ID
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <select
                onChange={(e) => setReferenceId(e.target.value)}
                className="w-full cursor-pointer bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                name=""
                id="reference_id"
              >
                <option value="">Select</option>
                {childUsers?.map((child: { name: string; _id: string }, i) => (
                  <option value={child?._id} key={i}>
                    {child?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative w-full flex items-center gap-x-2">
              <label className="px-2 text-sm" htmlFor="role">
                Placement ID
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>

              <select
                onChange={(e) => {
                  setParentPlacementId(e.target.value);
                  const selectedParent: any = childUsers.find(
                    (user: any) => user?._id === e.target.value
                  );
                  const currentAvailableSides = [];

                  if (selectedParent.left_side_partner === null) {
                    currentAvailableSides.push({
                      value: "a",
                      label: "A",
                    });
                  }
                  if (selectedParent.right_side_partner === null) {
                    currentAvailableSides.push({
                      value: "b",
                      label: "B",
                    });
                  }
                  if (
                    selectedParent.left_side_partner !== null &&
                    selectedParent.right_side_partner !== null
                  ) {
                    currentAvailableSides.push({
                      value: "",
                      label: "Both Sides are fillup",
                    });
                  }
                  setCurrentOptions(currentAvailableSides);
                }}
                className="w-full cursor-pointer bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                name=""
                id="placement_id"
              >
                <option value="">Select</option>
                {childUsers?.map((child: { name: string; _id: string }, i) => (
                  <option value={child?._id} key={i}>
                    {child?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className=" w-full flex items-center">
              <label className=" px-2" htmlFor="team_side">
                Choice of Team{" "}
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <select
                onChange={(e) => setTeams(e.target.value)}
                value={team}
                className="w-full cursor-pointer bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                name=""
                id="team_side"
              >
                <option value="">Select</option>
                {currentOptions?.map((opt: any) => (
                  <option value={opt?.value}>{opt?.label}</option>
                ))}
              </select>
            </div>
          </div>
          {/* religion,maritual,team and blood gp */}
          <div className="flex items-center gap-3 mt-10">
            {/* role */}
            <div className="w-full flex items-center">
              <label className="px-2 text-sm" htmlFor="role">
                Role
              </label>
              <select
                onChange={(e) => setRole(e.target.value)}
                value={role}
                className="bg-[#EAE9E8] border border-black px-8 py-1 rounded-md cursor-pointer"
                name=""
                id="role"
              >
                <option value="">Select</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className=" w-full flex items-center">
              <label className="px-2 text-sm" htmlFor="religion">
                Religion
              </label>
              <select
                onChange={(e) => setReligion(e.target.value)}
                value={religion}
                className="bg-[#EAE9E8] border border-black px-8 py-1 rounded-md cursor-pointer"
                name=""
                id="religion"
              >
                <option value="">Select</option>
                <option value="Islam">Islam</option>
                <option value="Hinduism">Hinduism</option>
                <option value="Buddhist">Buddhist</option>
                <option value="Cristian">Christian</option>
              </select>
            </div>
            <div className=" w-full flex items-center">
              <label className=" px-2 text-sm" htmlFor="maritual_status">
                Maritual Status
              </label>
              <select
                onChange={(e) => setMaritualStatus(e.target.value)}
                value={maritualStatus}
                className="bg-[#EAE9E8] border border-black px-8 py-1 rounded-md cursor-pointer"
                name=""
                id="maritual_status"
              >
                <option value="">Select</option>
                <option value="married">Married</option>
                <option value="single">Single</option>
              </select>
            </div>

            <div className=" w-full flex items-center">
              <label className=" px-2 text-sm" htmlFor="blood_gp">
                Blood Group
              </label>
              <select
                onChange={(e) => setBloodGroup(e.target.value)}
                value={bloodGroup}
                className="bg-[#EAE9E8] border border-black px-8 py-1 rounded-md cursor-pointer"
                name=""
                id="blood_gp"
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
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
                  className="absolute -top-3 left-3 bg-[#EAE9E8] px-2 text-sm"
                  htmlFor="nominee's_name"
                >
                  Name
                  <p className="inline text-red-500 text-lg font-bold">*</p>
                </label>
                <input
                  onChange={(e) => setNomineeName(e.target.value)}
                  value={nomineeName}
                  className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                  type="text"
                  id="nominee's_name"
                />
              </div>
              <div className="relative w-full">
                <label
                  className="absolute -top-3 left-3 bg-[#EAE9E8] px-2 text-sm"
                  htmlFor="nominee's_mobile"
                >
                  Mobile No.
                </label>
                <input
                  onChange={(e) => setNomineePhoneNo(e.target.value)}
                  value={nomineePhoneNo}
                  className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                  type="number"
                  id="nominee's_mobile"
                />
              </div>
              <div className="relative w-full">
                <label
                  className="absolute -top-3 left-3 bg-[#EAE9E8] px-2 text-sm"
                  htmlFor="relation_with_nominee"
                >
                  Relation
                </label>
                <input
                  onChange={(e) => setNomineeRelation(e.target.value)}
                  value={nomineeRelation}
                  className="w-full bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                  type="text"
                  id="relation_with_nominee"
                />
              </div>
            </div>
            {/* nominee's address */}
            <div className="relative">
              <label
                className="absolute -top-3 left-3 bg-[#EAE9E8] px-2 text-sm"
                htmlFor="nominee's-address"
              >
                Address
              </label>
              <textarea
                onChange={(e) => setNomineeAddress(e.target.value)}
                value={nomineeAddress}
                id="nominee's-address"
                rows={3}
                className="w-full bg-[#EAE9E8] px-12 py-1.5 text-black rounded-md border-2 border-black outline-none group resize-none"
              />
            </div>
          </div>
        </div>
      </div>
      {/* registration Button */}
      <div className="my-10 flex">
        <div
          onClick={handleRegistration}
          // style={{
          //   boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
          // }}
          className="w-1/2 mx-auto bg-[#cec8c3] shadow-lg cursor-pointer rounded-xl flex justify-center hover:scale-95  transition-all duration-300 ease-in"
        >
          <button className="text-black font-bold px-12 py-3 flex justify-center items-center">
            {isLoading ? (
              <ThreeCircles
                visible={true}
                height="30"
                width="30"
                color="#00A884"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <p>Complete Registration</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
