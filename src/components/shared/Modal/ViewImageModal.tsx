import React from "react";

const ViewImageModal = ({ setIsOpenImageModal, image }: any) => {
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpenImageModal(false);
        }
      }}
      className="w-full min-h-[100vh] bg-black bg-opacity-80 fixed top-0 right-0 z-[2000000] flex justify-center items-center cursor-pointer"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="h-[80vh] rounded"
      >
        {/* head */}
        {/* <div className="py-4 px-6 flex justify-between items-center rounded bg-gray-300 text-black">
          <p>Send Purchase Wallter</p>
          
        </div> */}
        <div className="flex justify-end mb-3">
          <p
            onClick={() => setIsOpenImageModal(false)}
            className="bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in px-3 py-1 rounded-md cursor-pointer text-white"
          >
            Close
          </p>
        </div>
        {/* body */}
        <div className=" h-full">
          <img
            className="h-full"
            src={image ? image : "/images/paymentPictureDummy.jpg"}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ViewImageModal;
