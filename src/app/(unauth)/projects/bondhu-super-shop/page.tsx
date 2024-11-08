import React from "react";

const page = () => {
  return (
    <div>
      <div className="w-[85%] mx-auto flex items-center justify-between mt-10 ">
        <div className="w-full">
          <p className="text-rose-500 font-bold text-2xl mb-3">
            Bondhu Super Shop
          </p>
          <div className="mt-16 w-[85%] mx-auto">
            <p className="text-rose-500 font-bold text-2xl mb-3">Our Mission</p>
            <p className="text-sm text-justify">
              At Bondhu Builders, our mission is to build sustainable,
              affordable, and innovative homes and communities while fostering a
              culture of trust, collaboration, and environmental responsibility.
              We aim to enhance the lives of our customers by providing
              high-quality construction services, creating safe and welcoming
              spaces where families can thrive, and contributing to the
              development of resilient and eco-friendly neighborhoods.
            </p>
          </div>
          <div className="mt-16 w-[85%] mx-auto">
            <p className="text-rose-500 font-bold text-2xl mb-3">Our Vission</p>
            <p className="text-sm text-justify">
              Our vision at Bondhu Builders is to be a leading force in
              transforming the construction industry by setting new standards
              for eco-conscious development, innovation in construction
              practices, and creating vibrant, sustainable communities. We
              envision a future where our buildings not only meet the needs of
              today but contribute positively to the well-being of future
              generations.
            </p>
          </div>
        </div>
        <div className="w-full  flex justify-center">
          <img
            className="h-[50vh] shadow-2xl"
            src="/images/bondhuSuperShop.jpeg"
            alt=""
          />
        </div>
      </div>
      {/* mission and vission */}
    </div>
  );
};

export default page;
