"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";

const HomeBanner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000, // Time in ms between slides
          disableOnInteraction: false, // Autoplay won't stop on user interactions
        }}
        loop={true} // Enables infinite loop
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        {banners.map((banner, i) => (
          <SwiperSlide className="h-[500px]" key={i}>
            <img
              className="w-[95%] mx-auto h-[500px] object-cover rounded"
              src={banner}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HomeBanner;

const banners = [
  "/images/banner1.webp",
  "/images/banner2.jpeg",
  "/images/banner3.jpeg",
];
