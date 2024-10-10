import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full">
      <div
        style={{
          background: "url('/images/heroBanner3.jpeg')",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          width: "100%",
        }}
        className=" bg-contain bg-opacity-95"
      />
      <div className="absolute inset-0 bg-black opacity-35" />
      <div className="w-[50%] absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 z-[2000]   py-16 px-24 bg-opacity-50 rounded-md">
        <div>
          <h1 className="text-white text-6xl text-center font-bold protest-guerrilla-regular tracking-widest">
            {/* Welcome <br />
            To <br /> */}
            Bondhu Group
          </h1>
          <p className="text-center text-white text-lg font-bold mt-5">
            Together We Build Future.{" "}
          </p>
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-3 bg-green-300 px-16 py-3 rounded-lg  text-black cursor-pointer hover:scale-95 transition-all duration-300 ease-in">
              <button className="">Explore More</button>
              {/* <BsArrowRightSquareFill className="text-green-600 text-xl" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
