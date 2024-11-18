"use client";
import ViewImageModal from "@/components/shared/Modal/ViewImageModal";
import React, { useState } from "react";

const page = () => {
  const [hoverOnImage, setHoverOnImage] = useState<{
    status: boolean;
    id: number;
  }>({ status: false, id: -1 });
  const [isOpenImageModal, setIsOpenImageModal] = useState<{
    status: boolean;
    value: string;
  }>({ status: false, value: "" });
  return (
    <div className="py-10 text-red-400 w-[75%] mx-auto">
      {/* heading */}
      <div className="px-2 py-3 border-l-8 border-red-600">
        <p className="text-2xl font-bold text-black">Our Certificates</p>
      </div>
      {/* directors */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-3">
        {/* card */}
        {certificates?.map((certificate) => (
          <div
            onMouseEnter={() =>
              setHoverOnImage({ status: true, id: certificate.id })
            }
            onMouseLeave={() => setHoverOnImage({ status: false, id: -1 })}
            key={certificate?.id}
            className="h-[400px] border-2 border-black rounded-md p-2 cursor-pointer overflow-hidden"
          >
            {/* img */}
            <div>
              <img
                className="w-[300px] h-[400px] py-2 hover:scale-110 transition-all duration-300 ease-in"
                src={
                  certificate?.img
                    ? certificate?.img
                    : "/images/directors/skeleton.png"
                }
                alt=""
              />
            </div>
            {/* details */}
            {/* <div className="my-5 px-3">
              <p className="text-teal-700 font-bold">{director?.name}</p>
              <p className="text-teal-700 ">{director?.rank}</p>
            </div> */}

            <div
              className={`w-[300px] h-[390px] bg-black bg-opacity-70 transition-all duration-500 ease-in flex justify-center items-center ${hoverOnImage.status && hoverOnImage.id == certificate.id && "-translate-y-[400px]"}`}
            >
              <div>
                <p
                  onClick={() =>
                    setIsOpenImageModal({
                      status: true,
                      value: certificate.img,
                    })
                  }
                  className="bg-teal-500 hover:bg-teal-600 transition-all duration-500 ease-in px-6 py-1 rounded-md cursor-pointer text-white"
                >
                  View
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isOpenImageModal.status && (
        <ViewImageModal
          image={isOpenImageModal.value}
          setIsOpenImageModal={setIsOpenImageModal}
        />
      )}
    </div>
  );
};

export default page;

const certificates = [
  {
    id: 1,
    img: "/images/certificates/tradeLicense.jpg",
  },
  {
    id: 2,
    img: "/images/certificates/Incorporation.jpg",
  },
];
