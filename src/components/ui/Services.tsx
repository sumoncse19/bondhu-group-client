import React from "react";

const Services = () => {
  return (
    <div id="services" className="pt-28 bg-green-100 w-full pt-10 pb-40">
      <div className="w-[80%] mx-auto ">
        <div className="w-full flex flex-col justify-center items-center ">
          <h1 className="text-6xl text-black">Our Services</h1>
          <p className="pt-5 text-gray-600 text-center max-w-[500px]">
            Explore our diverse sectors including construction, travel,
            healthcare, and more for your needs.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 pt-16">
          {/* left side image */}
          <div className="relative">
            <img
              className="rounded-lg group-hover:scale-110 transition-all duration-300 ease-out"
              src="/images/serviceImg1.avif"
              alt=""
            />
            <div className="px-12 py-8 bg-white bg-opacity-70 text-black absolute -bottom-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2 hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer group">
              <div className="flex flex-col gap-3 items-center">
                <h1 className="font-bold text-xl">Future Ventures</h1>
                <p className="text-center text-gray-500 text-sm w-[400px]">
                  Upcoming sectors include super shop, agro, food & beverage,
                  and garments for community development.
                </p>
              </div>
            </div>
          </div>
          {/* right side image */}
          <div className="relative">
            <img className="rounded-lg" src="/images/serviceImg2.avif" alt="" />
            <div className="px-12 py-8 bg-white bg-opacity-70 text-black absolute -bottom-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2 hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer">
              <div className="flex flex-col gap-3 items-center">
                <h1 className="font-bold text-xl">Building Dreams</h1>
                <p className="text-center text-gray-500 text-sm w-[400px]">
                  Bondhu Builders Ltd offers investment opportunities through
                  referrals and share sales for financial growth.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-28">
          <div className="relative h-72">
            <img
              className="rounded-lg group-hover:scale-110 transition-all duration-300 ease-out w-[600px] h-full"
              src="/images/serviceImg1.avif"
              alt=""
            />
            <div className="px-12 py-8 bg-white bg-opacity-70 text-black absolute -bottom-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2 hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer group">
              <div className="flex flex-col gap-3 items-center">
                <h1 className="font-bold text-xl">Future Ventures</h1>
                <p className="text-center text-gray-500 text-sm w-[400px]">
                  Upcoming sectors include super shop, agro, food & beverage,
                  and garments for community development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
