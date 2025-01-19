"use client";

import ProfileHeader from "@/components/ui/ProfileHeader";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import baseUrl from "../../../../../../../config";
import { UserData } from "@/type";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { ThreeCircles } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";
import { GiFastBackwardButton } from "react-icons/gi";
const UpdateProfile = () => {
  const params = useParams();
  const UserId = params.id;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef2 = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageUrl2, setImageUrl2] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [serialNo, setSerialNo] = useState<string>("");
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
  const [isChecked, setIsChecked] = useState<boolean>(false);
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
  const id: string = Cookies.get("id") || "";
  const token: string = Cookies.get("token") || "";

  const fetchSignleUser = async () => {
    const response = await fetch(`${baseUrl}/user/get-user/${UserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    // console.log(data?.data);

    if (data?.success) {
      setUser(data?.data);
      setImageUrl(data?.data?.picture);
      setName(data?.data?.name);
      setUserName(data?.data?.user_name);
      setSerialNo(data?.data?.serial_number);
      setFatherOrHusbandName(data?.data?.father_or_husband_name);
      setMotherName(data?.data?.mother_name);
      setNidNo(data?.data?.nid_passport_no);
      setDob(data?.data?.dob);
      setProfession(data?.data?.profession);
      setNationality(data?.data?.nationality);
      setEmail(data?.data?.email);
      setMobileNo(data?.data?.phone);
      setPresentAddress(data?.data?.present_address);
      setPermanentAddress(data?.data?.permanent_address);
      setReferenceId(data?.data?.reference_id?._id);
      setParentPlacementId(data?.data?.parent_placement_id?._id);
      setRole(data?.data?.role);
      setReligion(data?.data?.religion);
      setMaritualStatus(data?.data?.marital_status);
      setBloodGroup(data?.data?.blood_group);
      setImageUrl2(data?.data?.nominee_picture);
      setNomineeName(data?.data?.nominee_name);
      setNomineePhoneNo(data?.data?.nominee_mobile_no);
      setNomineeAddress(data?.data?.nominee_address);
      setNomineeRelation(data?.data?.relation_with_nominee);
    }
  };

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
  // const handleUpdateUser = async () => {
  //   // if (password != confirmPassword) {
  //   //   toast.error("Password doesnt match");
  //   //   return;
  //   // }
  //   setIsLoading(true);
  //   const userData = {
  //     name,
  //     user_name: userName,
  //     father_or_husband_name: fatherOrHusbandName,
  //     mother_name: motherName,
  //     picture: imageUrl,
  //     email: email,
  //     password: password,
  //     phone: mobileNo,
  //     role,
  //     present_address: presentAddress,
  //     permanent_address: permanentAddress,
  //     nationality,
  //     religion,
  //     blood_group: bloodGroup,
  //     nid_passport_no: nidNo,
  //     dob,
  //     choice_side: team,
  //     marital_status: maritualStatus,
  //     profession,
  //     reference_id: referenceId,
  //     parent_placement_id: parentPlacementId,
  //     nominee_name: nomineeName,
  //     relation_with_nominee: nomineeRelation,
  //     nominee_address: nomineeAddress,
  //     nominee_mobile_no: nomineePhoneNo,
  //     nominee_picture: imageUrl2,
  //     registration_date: "30.09.2024",
  //   };

  //   try {
  //     const response = await fetch(`${baseUrl}/user/auth/${id}`, {
  //       method: "POST",
  //       body: JSON.stringify(userData),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const data = await response.json();

  //     if (data.success) {
  //       router.push(`/man-management/userDetails/${id}`);
  //       toast.success("Successfully Updated User");
  //     }
  //   } catch (error: any) {
  //     toast.error(error.response?.data?.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // fetch child user
  const fetchChildUsers = async () => {
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
    fetchSignleUser();
    fetchChildUsers();
  }, [id]);

  // Function to handle update user
  const handleUpdateUser = async () => {
    const usersData = {
      name,
      user_name: userName,
      father_or_husband_name: fatherOrHusbandName,
      mother_name: motherName,
      picture: imageUrl,
      email: email,
      password: password || undefined,
      phone: mobileNo,
      role,
      present_address: presentAddress,
      permanent_address: permanentAddress,
      nationality,
      religion,
      blood_group: bloodGroup,
      nid_passport_no: nidNo,
      dob,
      // choice_side: team,
      marital_status: maritualStatus,
      profession,
      // reference_id: user?._id ?? "",
      // parent_placement_id: parentPlacementId,
      nominee_name: nomineeName,
      relation_with_nominee: nomineeRelation,
      nominee_address: nomineeAddress,
      nominee_mobile_no: nomineePhoneNo,
      nominee_picture: imageUrl2,
    };

    Object.keys(usersData).forEach((key) => {
      const typedKey = key as keyof typeof usersData;
      if (usersData[typedKey] == null || usersData[typedKey] === "") {
        delete usersData[typedKey];
      }
    });

    if (password) {
      if (password !== confirmPassword) {
        toast.error("Doesnt match password");
        return;
      }
    }
    try {
      setIsLoading(true);

      const response = await fetch(`${baseUrl}/user/auth/${user?._id}`, {
        method: "PUT",
        body: JSON.stringify(usersData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        // router.push(`/man-management/userDetails/${id}`);
        toast.success("Successfully Updated User");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="flex items-center gap-5">
        <h1 className="text-xl text-rose-600 font-bold tracking-widest">
          Edit User Profile
        </h1>
        <div
          onClick={() => router.back()}
          className="border-2 border-black hover:bg-black hover:text-white transition-all duration-300 ease-in cursor-pointer text-black px-5 py-1 rounded-full flex items-center gap-3"
        >
          <GiFastBackwardButton />
          <p>Back</p>
        </div>
      </div>
      {/* <ProfileHeader
        name={user?.name}
        user_name={user?.user_name}
        phone={user?.phone}
        registration_date={user?.registration_date}
        picture={user?.picture}
      /> */}
      <div className="mt-10 text-black">
        <div className="flex flex-col gap-10">
          {/* profile pic */}
          <div className="w-full flex flex-col items-center gap-y-2">
            <div className="flex flex-col items-center gap-y-2 cursor-pointer">
              <img
                className="w-28 h-28 rounded-full object-cover cursor-pointer border-2 border-black"
                src={imageUrl ? imageUrl : "/images/profilePicIcon.png"} // Use uploaded image if available
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
                className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                htmlFor="name"
              >
                Name <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="name"
              />
            </div>
            {/* username */}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                htmlFor="username"
              >
                Username{" "}
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="username"
              />
            </div>
            {/* serial_no */}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                htmlFor="serial_no"
              >
                Serial No
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setSerialNo(e.target.value)}
                value={serialNo}
                className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="serial_no"
              />
            </div>
          </div>
          {/* father and mother name */}
          <div className="flex items-center gap-10">
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 text-sm bg-gray-100 px-2"
                htmlFor="father or husband name"
              >
                Father/Husband Name
              </label>
              <input
                onChange={(e) => setFatherOrHusbandName(e.target.value)}
                value={fatherOrHusbandName}
                className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="father or husband name"
              />
            </div>{" "}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                htmlFor="mother name"
              >
                Mother Name
              </label>
              <input
                onChange={(e) => setMotherName(e.target.value)}
                value={motherName}
                className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="mother name"
              />
            </div>
          </div>
          {/* nid and dob */}
          <div className="flex items-center gap-10">
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                htmlFor="nid"
              >
                NID No.
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setNidNo(e.target.value)}
                value={nidNo}
                className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="number"
                id="nid"
              />
            </div>{" "}
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                htmlFor="dob"
              >
                DOB
              </label>
              <input
                onChange={(e) => setDob(e.target.value)}
                value={dob}
                placeholder="ex: 12.09.1999"
                className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="text"
                id="dob"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                htmlFor="profession"
              >
                Profession
              </label>
              <input
                onChange={(e) => setProfession(e.target.value)}
                value={profession}
                className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
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
                value={nationality}
                className="w-full cursor-pointer bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                name=""
                id="nationality"
              >
                {nationality == "" && <option value="">Select</option>}
                <option value="Bangladesh">Bangladesh</option>
              </select>
            </div>
          </div>
          {/* email and password,con pass mobile no*/}
          <div className="flex items-center gap-10">
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                htmlFor="email"
              >
                Email <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="email"
                id="email"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                htmlFor="password"
              >
                Password
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="password"
                id="password"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                htmlFor="confirm-password"
              >
                Confirm Password
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setConFrimPassword(e.target.value)}
                value={confirmPassword}
                className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="password"
                id="confirm-password"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                htmlFor="mobile_no"
              >
                Mobile No
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <input
                onChange={(e) => setMobileNo(e.target.value)}
                value={mobileNo}
                className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                type="number"
                id="mobile_no"
              />
            </div>
          </div>
          {/* Present Address */}
          <div className="relative">
            <label
              className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
              htmlFor="present-address"
            >
              Present Address
            </label>
            <textarea
              onChange={(e) => setPresentAddress(e.target.value)}
              value={presentAddress}
              id="present-address"
              rows={3}
              className="w-full bg-gray-100 px-12 py-1.5 text-black rounded-md border-2 border-black outline-none group resize-none"
            />
          </div>
          {/* permanent Address */}
          <div className="relative">
            <label
              className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
              htmlFor="permennt-address"
            >
              Permanent Address
            </label>
            <textarea
              onChange={(e) => setPermanentAddress(e.target.value)}
              value={permanentAddress}
              id="permennt-address"
              rows={3}
              className="w-full bg-gray-100 px-12 py-2 text-black rounded-md border-2 border-black outline-none group resize-none"
            />
          </div>
          {/* Profession,refference id  and placement id nationality */}
          <div className="flex items-center gap-6">
            {/* <div className="relative w-full flex items-center gap-x-2">
              <label className="px-2 text-sm" htmlFor="reference_id">
                Reference ID
                <p className="inline text-red-500 text-lg font-bold">*</p>
              </label>
              <select
                onChange={(e) => setReferenceId(e.target.value)}
                value={referenceId}
                className="w-full cursor-pointer bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                name=""
                id="reference_id"
              >
                {referenceId == "" && user?.role !== "superAdmin" && (
                  <option value="">Select</option>
                )}
                {user?.role == "superAdmin" && (
                  <option value="">Root User!</option>
                )}
                {user?.role !== "superAdmin" &&
                  childUsers?.map((child: { name: string; _id: string }, i) => (
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
                value={parentPlacementId}
                className="w-full cursor-pointer bg-[#EAE9E8] text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                name=""
                id="placement_id"
              >
                {parentPlacementId == "" && user?.role !== "superAdmin" && (
                  <option value="">Select</option>
                )}
                {user?.role == "superAdmin" && (
                  <option value="">Root User!</option>
                )}
                {user?.role !== "superAdmin" &&
                  childUsers?.map((child: { name: string; _id: string }, i) => (
                    <option value={child?._id} key={i}>
                      {child?.name}
                    </option>
                  ))}
              </select>
            </div> */}

            {/* <div className=" w-full flex items-center">
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
            </div> */}
          </div>
          {/*role, religion,maritual,team and blood gp */}
          <div className="flex items-center gap-3 mt-5">
            {/* role */}
            <div className="w-full flex items-center">
              <label className="px-2 text-sm" htmlFor="role">
                Role
              </label>
              <select
                onChange={(e) => setRole(e.target.value)}
                value={role}
                className="bg-gray-100 border border-black px-8 py-1 rounded-md cursor-pointer"
                name=""
                id="role"
              >
                {role == "" && <option value="">Select</option>}
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
                className="bg-gray-100 border border-black px-8 py-1 rounded-md cursor-pointer"
                name=""
                id="religion"
              >
                {religion == "" && <option value="">Select</option>}
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
                className="bg-gray-100 border border-black px-8 py-1 rounded-md cursor-pointer"
                name=""
                id="maritual_status"
              >
                {maritualStatus == "" && <option value="">Select</option>}
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
                className="bg-gray-100 border border-black px-8 py-1 rounded-md cursor-pointer"
                name=""
                id="blood_gp"
              >
                {bloodGroup == "" && <option value="">Select</option>}
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
                  className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                  htmlFor="nominee's_name"
                >
                  Name
                  <p className="inline text-red-500 text-lg font-bold">*</p>
                </label>
                <input
                  onChange={(e) => setNomineeName(e.target.value)}
                  value={nomineeName}
                  className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                  type="text"
                  id="nominee's_name"
                />
              </div>
              <div className="relative w-full">
                <label
                  className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                  htmlFor="nominee's_mobile"
                >
                  Mobile No.
                </label>
                <input
                  onChange={(e) => setNomineePhoneNo(e.target.value)}
                  value={nomineePhoneNo}
                  className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                  type="number"
                  id="nominee's_mobile"
                />
              </div>
              <div className="relative w-full">
                <label
                  className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                  htmlFor="relation_with_nominee"
                >
                  Relation
                </label>
                <input
                  onChange={(e) => setNomineeRelation(e.target.value)}
                  value={nomineeRelation}
                  className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                  type="text"
                  id="relation_with_nominee"
                />
              </div>
            </div>
            {/* nominee's address */}
            <div className="relative">
              <label
                className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                htmlFor="nominee's-address"
              >
                Address
              </label>
              <textarea
                onChange={(e) => setNomineeAddress(e.target.value)}
                value={nomineeAddress}
                id="nominee's-address"
                rows={3}
                className="w-full bg-gray-100 px-12 py-1.5 text-black rounded-md border-2 border-black outline-none group resize-none"
              />
            </div>
          </div>
        </div>

        {/* more details */}
        <div className="mt-10">
          <div className="text-xl text-red-500 flex items-center gap-x-3">
            <p>Add More Information</p>
            <input
              onChange={(e) => setIsChecked(e.target.checked)}
              className="w-5 h-5"
              type="checkbox"
              checked={isChecked}
              name=""
              id=""
            />
          </div>
          <AnimatePresence initial={false}>
            {isChecked && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div
                  className={`flex flex-col gap-5 mt-5 transition-all duration-5000 ease-in-out transform 
       ${isChecked ? "opacity-100 scale-100 max-h-[1000px]" : "opacity-0 scale-5 max-h-0 overflow-hidden"}`}
                >
                  {/* bkash, rocket, nagad details */}
                  <div>
                    <p className="mb-5 font-bold text-teal-500 tracking-wider">
                      Mobile Banking Information
                    </p>
                    <div className="flex items-center gap-10">
                      <div className="relative w-full">
                        <label
                          className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                          htmlFor="bkash_no"
                        >
                          Bkash Number
                        </label>
                        <input
                          onChange={(e) => setNomineeName(e.target.value)}
                          // value={nomineeName}
                          className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                          type="text"
                          id="bkash_no"
                        />
                      </div>
                      <div className="relative w-full">
                        <label
                          className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                          htmlFor="rocket_no"
                        >
                          Rocket Number
                        </label>
                        <input
                          onChange={(e) => setNomineePhoneNo(e.target.value)}
                          // value={nomineePhoneNo}
                          className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                          type="number"
                          id="rocket_no"
                        />
                      </div>
                      <div className="relative w-full">
                        <label
                          className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                          htmlFor="nagad_no"
                        >
                          Nagad Number
                        </label>
                        <input
                          onChange={(e) => setNomineeRelation(e.target.value)}
                          // value={nomineeRelation}
                          className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                          type="text"
                          id="nagad_no"
                        />
                      </div>
                    </div>
                  </div>
                  {/* bank details*/}
                  <div>
                    <p className="mb-5 font-bold text-teal-500 tracking-wider">
                      Bank Information
                    </p>
                    <div className="flex items-center gap-10">
                      <div className="relative w-full">
                        <label
                          className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                          htmlFor="bank_acc_name"
                        >
                          Acc Name
                        </label>
                        <input
                          onChange={(e) => setNomineeName(e.target.value)}
                          // value={nomineeName}
                          className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                          type="text"
                          id="bank_acc_name"
                        />
                      </div>

                      <div className="relative w-full">
                        <label
                          className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                          htmlFor="bank_acc_no"
                        >
                          Acc No
                        </label>
                        <input
                          onChange={(e) => setNomineeName(e.target.value)}
                          // value={nomineeName}
                          className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                          type="text"
                          id="bank_acc_no"
                        />
                      </div>

                      <div className="relative w-full">
                        <label
                          className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                          htmlFor="bank_name"
                        >
                          Bank Name
                        </label>
                        <input
                          onChange={(e) => setNomineeRelation(e.target.value)}
                          // value={nomineeRelation}
                          className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                          type="text"
                          id="bank_name"
                        />
                      </div>
                      <div className="relative w-full">
                        <label
                          className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                          htmlFor="bank_branch"
                        >
                          Branch Name
                        </label>
                        <input
                          onChange={(e) => setNomineeRelation(e.target.value)}
                          // value={nomineeRelation}
                          className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                          type="text"
                          id="bank_branch"
                        />
                      </div>
                      <div className="relative w-full">
                        <label
                          className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                          htmlFor="bank_routing_no"
                        >
                          Routing Number
                        </label>
                        <input
                          onChange={(e) => setNomineeRelation(e.target.value)}
                          // value={nomineeRelation}
                          className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                          type="text"
                          id="bank_routing_no"
                        />
                      </div>
                      <div className="relative w-full">
                        <label
                          className="absolute -top-3 left-3 bg-gray-100 px-2 text-sm"
                          htmlFor="bank_swift_code"
                        >
                          Swift Code
                        </label>
                        <input
                          onChange={(e) => setNomineePhoneNo(e.target.value)}
                          // value={nomineePhoneNo}
                          className="w-full bg-gray-100 text-gray-600 px-5 py-3  rounded-md border-2 border-black outline-none group"
                          type="number"
                          id="bank_swift_code"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* registration Button */}
      <div className="my-16 flex">
        <div
          // style={{
          //   boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
          // }}
          onClick={handleUpdateUser}
          className="w-1/2 mx-auto bg-[#cec8c3] shadow-lg cursor-pointer rounded-xl flex justify-center hover:scale-95  transition-all duration-300 ease-in"
        >
          <button className="text-black font-bold px-12 py-3 ">
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
              <p>Update Profile</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
