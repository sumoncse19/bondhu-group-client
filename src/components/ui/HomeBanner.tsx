import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../../src/Styles/HomeBanner.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 }, // Changed min to 0 to ensure small screens are covered
    items: 2,
    slidesToSlide: 1,
  },
};

const sliderImageUrl = [
  //First image url
  {
    url: "/images/heroBanner5.jpeg",
  },
  {
    url: "/images/heroBanner6.jpeg",
  },
  //Second image url
  {
    url: "/images/heroBanner7.jpeg",
  },
  //Third image url
  {
    url: "/images/heroBanner8.jpeg",
  },

  //Fourth image url

  {
    url: "/images/heroBanner9.jpeg",
  },
];
const Slider = () => {
  return (
    <div className="parent">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={2000}
        arrows={true}
        swipeable={true}
        draggable={true}
        // showDots={true}
        infinite={true}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
      >
        {sliderImageUrl.map((imageUrl, index) => {
          return (
            <div className="slider h-full" key={index}>
              <img className="h-full" src={imageUrl.url} alt="movie" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Slider;
