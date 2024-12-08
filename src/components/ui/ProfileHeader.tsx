import React, { useRef, useState } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { LuUser2 } from "react-icons/lu";
import { IoCall } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { UserData } from "@/type";
import toast from "react-hot-toast";
import baseUrl from "../../../config";
import Cookies from "js-cookie";
import axios from "axios";

interface ProfileHeaderProps {
  name?: string;
  user_name?: string;
  phone?: string;
  registration_date?: string;
  picture?: string;
  cover_photo?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  user_name,
  phone,
  registration_date,
  picture,
  cover_photo,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [coverImage, setCoverImage] = useState<string>("");

  // cookies value
  const id: string = Cookies.get("id") || "";
  const token: string = Cookies.get("token") || "";

  const uploadCoverImage = async (image: string) => {
    await axios
      .put(
        `${baseUrl}/user/auth/${id}`,
        { cover_photo: image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res?.data.success) {
          toast.success("Updated Cover Photo");
          window.location.reload();
        } else {
          toast.error(res?.data?.errors[0]);
        }
      });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click(); // Trigger the hidden input
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
        setCoverImage(imageurl);
        uploadCoverImage(imageurl);
      } else {
        toast.error("Error uploading to imgbb:", data.error);
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

  return (
    <div className="w-full h-fit flex flex-col rounded-md border overflow-hidden bg-[#dfd5cf] shadow">
      {/* cover image */}
      <div
        style={{
          backgroundImage: cover_photo
            ? `url(${cover_photo})`
            : `url('/images/defaultCoverImage.jpeg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center", // This will center the image
        }}
        className="w-full h-[200px]  pt-10 px-16 relative"
      >
        <div className=" absolute bottom-8 right-10">
          <div
            onClick={handleImageClick}
            className="flex items-center gap-2 bg-white px-5 py-2 border border-black cursor-pointer text-black rounded-md"
          >
            <FaCameraRetro />
            <p>Edit Cover</p>
          </div>
          <input
            ref={fileInputRef}
            onChange={handleFileChange}
            hidden
            type="file"
            name=""
            id=""
          />
        </div>
      </div>
      {/* profile image and intro */}
      <div className="w-full h-[40%] px-6 lg:px-10 xl:px-16 pt-2 pb-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* profile pic */}
          <div className="-mt-12 z-[2000] p-2 relative">
            <img
              className="w-24 h-24 rounded-full border-4 border-red-500"
              src={picture ? picture : "/images/profilePicIcon.png"}
              alt=""
            />
            {/* <FaCameraRetro className="text-white text-2xl absolute bottom-5 right-3 bg-black p-1 rounded-full" /> */}
          </div>
          <div className="lg:pt-3">
            <div className=" flex items-center gap-3 lg:gap-10">
              <p className="text-xl font-bold text-black">{name}</p>
              <span className="flex items-center gap-2">
                <AiOutlineSafetyCertificate className="text-green-500 text-xl font-bold" />
                <p className="bg-green-500 px-3 rounded-lg text-white font-bold">
                  Business Account
                </p>
              </span>
            </div>

            <div className="mt-5 flex items-center gap-5 text-slate-600 text-sm">
              <span className="flex items-center gap-1">
                <LuUser2 />
                <p>{user_name}</p>
              </span>
              <span className="flex items-center gap-1">
                <IoCall />
                <p>{phone}</p>
              </span>
              <span className="flex items-center gap-2">
                <SlCalender />
                <p>Joined {registration_date}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
