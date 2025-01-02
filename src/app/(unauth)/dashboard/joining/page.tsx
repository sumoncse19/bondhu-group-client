"use client";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import baseUrl from "../../../../../config";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ThreeCircles } from "react-loader-spinner";
import { isAxiosError } from "axios";
import { CustomSelect } from "@/components/CustomSelect";
import { CustomSelect2 } from "@/components/CustomSelect2";
import { FaExclamation, FaEye, FaEyeSlash } from "react-icons/fa";

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
  registration_date?: string;
}

const page = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef2 = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageUrl2, setImageUrl2] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [idNo, setIdNo] = useState<string>("");
  const [fatherOrHusbandName, setFatherOrHusbandName] = useState<string>("");
  const [motherName, setMotherName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [nidNo, setNidNo] = useState<string>("");
  const [isNidLessThan11, setIsNidLessThan11] = useState(false);
  const [dob, setDob] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConFrimPassword] = useState<string>("");
  const [mobileNo, setMobileNo] = useState<string>("");
  const [isMobileNoLessThan11, setIsMobileNoLessThan11] = useState(false);
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
  const [allUser, setAllUser] = useState<[]>([]);
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
  const [showedPassword, setShowedPassword] = useState<boolean>(false);
  const [showedConfirmPassword, setShowedConfirmPassword] =
    useState<boolean>(false);
  const router = useRouter();

  const userCookie = Cookies.get("user");
  const token = Cookies.get("token");
  const id: string = Cookies.get("id") || "";

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

    if (maritualStatus === "") {
      toast.error("Maritual status cannot be empty");
      return;
    }

    if (role === "") {
      toast.error("Role cannot be empty");
      return;
    }
    setIsLoading(true);

    // Get the current date
    const currentDate = new Date();

    // Format the date as dd-mm-yyyy
    const formattedDate = `${String(currentDate.getDate()).padStart(2, "0")}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${currentDate.getFullYear()}`;

    const userData = {
      name,
      user_name: userName.toLocaleLowerCase(),
      serial_number: idNo,
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
      reference_id: referenceId ?? "",
      parent_placement_id: parentPlacementId,
      nominee_name: nomineeName,
      relation_with_nominee: nomineeRelation,
      nominee_address: nomineeAddress,
      nominee_mobile_no: nomineePhoneNo,
      nominee_picture: imageUrl2,
      registration_date: formattedDate,
      agent_id: id,
    };

    try {
      const response = await fetch(`${baseUrl}/user/auth/register`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        router.push(
          "/dashboard/wallet/purchase-wallet/balance-expensses-history"
        );
        toast.success("Successfully added new User");
      } else {
        if (data?.statusCode == 400) {
          toast.error(data?.errors[0].message);
        } else {
          toast.error(data?.errors[0]);
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // fetch all user
  const fetchChildUsersLevel1 = async () => {
    const response = await fetch(`${baseUrl}/user/get-all-user-name`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      setAllUser(data?.data);
    }
  };

  // fetch child user
  const fetchChildUsersLevel2 = async (id: string) => {
    const response = await fetch(`${baseUrl}/team/get-child-users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

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
        // fetchChildUsersLevel2(id);
        fetchChildUsersLevel1();
      } catch (error) {
        console.error("Failed to parse user cookie:", error);
      }
    }

    // get all child users
  }, [userCookie]);

  return (
    <div className="">
      <h1 className="text-xl pb-4 text-rose-600 font-bold">
        New User Joining Form
      </h1>
      <div className="mt-10 text-black">
        <div className="flex flex-col gap-6 xl:gap-10">
          {/* profile pic */}
          <div className="w-full flex flex-col items-center gap-y-2">
            <div className="flex flex-col items-center gap-y-2 cursor-pointer">
              <img
                className="w-28 h-28 rounded-full object-cover cursor-pointer border-2 border-black"
                src={imageUrl || "/images/profilePicIcon3.png"} // Use uploaded image if available
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
          {/* serial no, ref id, placement id and team */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 xl:gap-10">
            {/* serial id */}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="id"
              >
                ID No <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setIdNo(e.target.value)}
                value={idNo}
                className="w-full bg-[#F3F4F6] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="id"
              />
            </div>
            {/* reference id */}
            <CustomSelect2
              allUser={allUser}
              setReferenceId={setReferenceId}
              fetchChildUsersLevel2={fetchChildUsersLevel2}
            />
            {/* placement id */}
            <CustomSelect
              childUsers={childUsers}
              setParentPlacementId={setParentPlacementId}
              setCurrentOptions={setCurrentOptions}
            />
            {/* team choice */}
            <div className="relative w-full flex flex-col gap-2">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="team_side"
              >
                Choice of Team{" "}
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <select
                onChange={(e) => setTeams(e.target.value)}
                value={team}
                className="w-full cursor-pointer bg-[#F3F4F6] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
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
          {/* username, name*/}
          <div className="flex flex-col sm:flex-row items-center gap-10">
            {/* name */}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="name"
              >
                Name <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full bg-[#F3F4F6] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="name"
              />
            </div>
            {/* username */}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="username"
              >
                Username{" "}
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                className="w-full bg-[#F3F4F6] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="username"
              />
            </div>
          </div>
          {/* father and mother name */}
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 text-sm bg-[#F3F4F6] px-2"
                htmlFor="father or husband name"
              >
                Father/Husband Name
              </label>
              <input
                onChange={(e) => setFatherOrHusbandName(e.target.value)}
                value={fatherOrHusbandName}
                className="w-full bg-[#F3F4F6] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="father or husband name"
              />
            </div>{" "}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="mother name"
              >
                Mother Name
              </label>
              <input
                onChange={(e) => setMotherName(e.target.value)}
                value={motherName}
                className="w-full bg-[#F3F4F6] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="mother name"
              />
            </div>
          </div>
          {/* nid, dob, profession and nationality */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 xl:gap-10">
            {/* nid */}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="nid"
              >
                NID No.
                <p className="inline text-red-500 text-lg font-bold">*</p>
                <p className="inline text-xs px-1">
                  (Nid No should be atleast 11 digit)
                </p>
              </label>
              <input
                onChange={(e) => {
                  setNidNo(e.target.value);
                }}
                onFocus={() => {
                  if (nidNo.length < 11) {
                    setIsNidLessThan11(true);
                  }
                }}
                value={nidNo}
                className={`w-full bg-[#F3F4F6] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group`}
                type="number"
                id="nid"
              />
              {isNidLessThan11 && nidNo.length < 11 && (
                <FaExclamation className="absolute top-[50%] -translate-y-1/2 right-3 text-red-500 font-bold animate-pulse " />
              )}
            </div>
            {/* dob */}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="dob"
              >
                DOB
              </label>
              <input
                onChange={(e) => setDob(e.target.value)}
                value={dob}
                placeholder="ex: 12.09.1999"
                className="w-full bg-[#F3F4F6] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="date"
                id="dob"
              />
            </div>
            {/* profession */}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="profession"
              >
                Profession
              </label>
              <input
                onChange={(e) => setProfession(e.target.value)}
                value={profession}
                className="w-full bg-[#F3F4F6] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="profession"
              />
            </div>
            {/* nationality */}
            <div className="relative w-full flex flex-col xl:flex-row xl:items-center gap-2">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="nationality"
              >
                Nationality
              </label>
              <select
                onChange={(e) => setNationality(e.target.value)}
                className="w-full cursor-pointer bg-[#F3F4F6] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                name=""
                id="nationality"
              >
                <option value="">Select</option>
                <option value="Alberia">Alberia</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Canada">Canada</option>
                <option value="Finland">Finland</option>
                <option value="India">India</option>
                <option value="Mexico">Mexico</option>
                <option value="Nepal">Nepal</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Srilanka">Srilanka</option>
              </select>
            </div>
          </div>
          {/* email and password,con pass mobile no*/}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 xl:gap-10">
            {/* email */}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="email"
              >
                Email <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full bg-[#F3F4F6] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="email"
                id="email"
              />
            </div>
            {/* pass */}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="password"
              >
                Password
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>{" "}
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full bg-[#F3F4F6] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type={showedPassword ? "text" : "password"}
                id="password"
              />
              {showedPassword ? (
                <FaEye
                  onClick={() => setShowedPassword(false)}
                  className="absolute top-[50%] -translate-y-1/2 right-3 text-lg cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowedPassword(true)}
                  className="absolute top-[50%] -translate-y-1/2 right-3 text-lg cursor-pointer"
                />
              )}
            </div>
            {/* con pass */}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="confirm-password"
              >
                Confirm Password
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setConFrimPassword(e.target.value)}
                value={confirmPassword}
                className="w-full bg-[#F3F4F6] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type={showedConfirmPassword ? "text" : "password"}
                id="confirm-password"
              />
              {showedConfirmPassword ? (
                <FaEye
                  onClick={() => setShowedConfirmPassword(false)}
                  className="absolute top-[50%] -translate-y-1/2 right-3 text-lg cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowedConfirmPassword(true)}
                  className="absolute top-[50%] -translate-y-1/2 right-3 text-lg cursor-pointer"
                />
              )}
            </div>
            {/* phone no */}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="mobile_no"
              >
                Mobile No
                <p className="inline text-red-500 text-lg font-bold">*</p>
                <p className="inline text-xs px-1">(Must be 11 digit)</p>
              </label>
              <input
                onChange={(e) => {
                  setMobileNo(e.target.value);
                }}
                onFocus={() => {
                  if (mobileNo.length < 11) {
                    setIsMobileNoLessThan11(true);
                  }
                }}
                value={mobileNo}
                className="w-full bg-[#F3F4F6] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="number"
                id="mobile_no"
              />
              {isMobileNoLessThan11 && mobileNo.length != 11 && (
                <FaExclamation className="absolute top-[50%] -translate-y-1/2 right-3 text-red-500 font-bold animate-pulse " />
              )}
            </div>
          </div>
          {/* Present Address */}
          <div className="relative">
            <label
              className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
              htmlFor="present-address"
            >
              Present Address
            </label>
            <textarea
              onChange={(e) => setPresentAddress(e.target.value)}
              value={presentAddress}
              id="present-address"
              rows={3}
              className="w-full bg-[#F3F4F6] px-12 py-1.5 text-black rounded-md border-2 border-black outline-none group resize-none"
            />
          </div>
          {/* permanent Address */}
          <div className="relative">
            <label
              className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
              htmlFor="permennt-address"
            >
              Permanent Address
            </label>
            <textarea
              onChange={(e) => setPermanentAddress(e.target.value)}
              value={permanentAddress}
              id="permennt-address"
              rows={3}
              className="w-full bg-[#F3F4F6] px-12 py-2 text-black rounded-md border-2 border-black outline-none group resize-none"
            />
          </div>

          {/* religion,maritual,team and blood gp */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-10">
            {/* role */}
            <div className="relative w-full flex flex-col gap-2 xl:flex-row xl:items-center">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="role"
              >
                Role
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <select
                onChange={(e) => setRole(e.target.value)}
                value={role}
                className="w-full bg-[#F3F4F6] border border-black px-8 py-3 rounded-md cursor-pointer"
                name=""
                id="role"
              >
                <option value="">Select</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {/* religion */}
            <div className="relative w-full flex flex-col gap-2 xl:flex-row xl:items-center">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="religion"
              >
                Religion
              </label>
              <select
                onChange={(e) => setReligion(e.target.value)}
                value={religion}
                className="w-full bg-[#F3F4F6] border border-black px-8 py-3 rounded-md cursor-pointer"
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
            {/* marital status */}
            <div className="relative w-full flex flex-col gap-2 xl:flex-row xl:items-center">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="maritual_status"
              >
                Maritual Status
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <select
                onChange={(e) => setMaritualStatus(e.target.value)}
                value={maritualStatus}
                className="w-full bg-[#F3F4F6] border border-black px-8 py-3 rounded-md cursor-pointer"
                name=""
                id="maritual_status"
              >
                <option value="">Select</option>
                <option value="married">Married</option>
                <option value="single">Single</option>
              </select>
            </div>
            {/* blood grp */}
            <div className="relative w-full flex flex-col gap-2 xl:flex-row xl:items-center">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="blood_gp"
              >
                Blood Group
              </label>
              <select
                onChange={(e) => setBloodGroup(e.target.value)}
                value={bloodGroup}
                className="w-full bg-[#F3F4F6] border border-black px-8 py-3 rounded-md cursor-pointer"
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
                src={imageUrl2 || "/images/profilePicIcon3.png"} // Use uploaded image if available
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
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center gap-6 xl:gap-10">
              <div className="relative w-full">
                <label
                  className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                  htmlFor="nominee's_name"
                >
                  Name
                  <p className="inline text-red-500 text-lg font-bold">*</p>
                </label>
                <input
                  onChange={(e) => setNomineeName(e.target.value)}
                  value={nomineeName}
                  className="w-full bg-[#F3F4F6] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                  type="text"
                  id="nominee's_name"
                />
              </div>
              <div className="relative w-full">
                <label
                  className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                  htmlFor="nominee's_mobile"
                >
                  Mobile No.
                  <p className="inline text-xs px-1">(Must be 11 digit)</p>
                </label>
                <input
                  onChange={(e) => setNomineePhoneNo(e.target.value)}
                  value={nomineePhoneNo}
                  className="w-full bg-[#F3F4F6] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                  type="number"
                  id="nominee's_mobile"
                />
              </div>
              <div className="relative w-full">
                <label
                  className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                  htmlFor="relation_with_nominee"
                >
                  Relation
                </label>
                <input
                  onChange={(e) => setNomineeRelation(e.target.value)}
                  value={nomineeRelation}
                  className="w-full bg-[#F3F4F6] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                  type="text"
                  id="relation_with_nominee"
                />
              </div>
            </div>
            {/* nominee's address */}
            <div className="relative">
              <label
                className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
                htmlFor="nominee's-address"
              >
                Address
              </label>
              <textarea
                onChange={(e) => setNomineeAddress(e.target.value)}
                value={nomineeAddress}
                id="nominee's-address"
                rows={3}
                className="w-full bg-[#F3F4F6] px-12 py-1.5 text-black rounded-md border-2 border-black outline-none group resize-none"
              />
            </div>
          </div>
        </div>
      </div>
      {/* registration Button */}
      <div className="my-10 flex">
        <div
          style={{
            boxShadow:
              "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
          }}
          className="-[90%] xl:w-1/2 mx-auto bg-teal-400 text-white shadow-lg cursor-pointer rounded-xl flex justify-center hover:scale-105  transition-all duration-300 ease-in"
        >
          <button
            onClick={() => {
              if (!isLoading) {
                handleRegistration();
              }
            }}
            className="text-black font-bold px-12 py-3 flex justify-center items-center"
          >
            {isLoading ? (
              <ThreeCircles
                visible={true}
                height="30"
                width="30"
                color="#fff"
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
