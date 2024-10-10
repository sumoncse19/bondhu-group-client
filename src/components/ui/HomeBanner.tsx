import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../Styles/HomeBanner.css";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const HomeBanner = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      // navigation={true}
      modules={[Autoplay]}
      className="mySwiper"
    >
      {images?.map((image) => (
        <SwiperSlide key={image}>
          <img src={image} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeBanner;

const images = ["/images/heroBanner1.jpeg", "/images/heroBanner2.jpeg"];
