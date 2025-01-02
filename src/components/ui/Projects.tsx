"use client";
import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { TbBulbFilled } from "react-icons/tb";
import { FaHandPointDown } from "react-icons/fa";

import "../../Styles/Projects.css";
import LeadersClub from "./LeadersClub";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Projects = () => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const visibleItems = showAll ? projects : projects.slice(0, 6);
  const router = useRouter();
  return (
    <div
      // style={{
      //   backgroundImage: `url('/images/bg/bg3.jpg')`,
      //   backgroundPosition: "center",
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      // }}
      className="py-20"
    >
      <div id="projects" className="pt-28 w-[90%] mx-auto">
        {/* heading */}
        <div className="w-[80%] mx-auto ">
          <div className="w-full flex flex-col justify-center items-center ">
            <h1 className="text-xl lg:text-6xl text-black">Our Projects</h1>
            <p className="pt-5 text-gray-600 text-center max-w-[500px]">
              Explore our diverse sectors and innovative business ventures.
            </p>
          </div>
        </div>

        {/* all cards */}
        <div>
          <TransitionGroup
            component="div"
            className="mt-10  grid grid-cols-1 lg:grid-cols-2 gap-10 place-items-center justify-items-center px-2"
          >
            {visibleItems?.map((p) => (
              <CSSTransition key={p?.id} timeout={500} classNames="fade">
                <div className="flex justify-center items-center cursor-pointer ">
                  <div className="flex flex-col">
                    <div className="w-[400px] lg:w-[400px] xl:w-[550px] overflow-hidden rounded-3xl border-2 border-black p-1">
                      <div
                        // href={p?.path}
                        onClick={() => {
                          router.push(p?.path);
                        }}
                        className="border-2 border-black p-1 rounded-3xl"
                      >
                        <img
                          className="w-full h-[400px]  object-cover rounded-3xl hover:scale-110 transition-all duration-300 ease-out"
                          src={p?.image}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="pt-5 px-3">
                      <p className="text-xl text-black font-bold">{p.title}</p>
                      <p className="py-2 text-sm text-gray-500">{p?.details}</p>
                    </div>
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <div className="flex justify-end">
          <p
            style={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
            onClick={() => {
              if (showAll) {
                setShowAll(false);
              } else {
                setShowAll(true);
              }
            }}
            className="bg-teal-400 px-5 py-2 rounded-md hover:animate-pulse text-black shadow-2xl cursor-pointer "
          >
            {showAll ? "Show Less" : "Show More"}
          </p>
        </div>

        {/* Leaders Club */}
        <div className="mt-10 w-[95%] lg:w-[70%] mx-auto">
          <LeadersClub />
        </div>
      </div>
    </div>
  );
};

export default Projects;

const projects = [
  {
    id: 1,
    title: "Bondhu Builder's ",
    image: "/images/bondhuBuilders.jpeg",
    path: "/projects/bondhu-builders",
    details:
      "Leading construction company with investment opportunities available.",
  },
  {
    id: 2,
    title: "Bondhu Super Shop",
    path: "/projects/bondhu-builders",
    image: "/images/bondhuSuperShop.jpeg",
    details: "Exciting retail experience coming soon for everyone.",
  },
  {
    id: 3,
    title: "Bondhu Agriculture & Agro",
    path: "/projects/bondhu-builders",
    image: "/images/bondhuAgro.jpeg",
    details: "Sustainable agriculture solutions launching soon for farmers.",
  },
  {
    id: 6,
    title: "Bondhu IT Institute",
    path: "/projects/bondhu-builders",
    image: "/images/bondhuIT.jpeg",
    details: "Exciting retail experience coming soon for everyone.",
  },

  {
    id: 5,
    title: "Bondhu Brokerage ",
    path: "/projects/bondhu-builders",
    image: "/images/bondhuBrokerage.jpg",
    details:
      "Leading construction company with investment opportunities available.",
  },
  {
    id: 4,
    title: "Bondhu Resort",
    path: "/projects/bondhu-builders",
    image: "/images/bondhuResort.jpeg",
    details: "Empowering future tech leaders with quality education programs.",
  },
  {
    id: 7,
    title: "Bondhu Tour & Travels",
    path: "/projects/bondhu-builders",
    image: "/images/bondhuTourTravels.jpg",
    details: "Exciting retail experience coming soon for everyone.",
  },
  {
    id: 8,
    title: "Bondhu General Hospital",
    path: "/projects/bondhu-builders",
    image: "/images/bondhuHospitals.jpeg",
    details: "Exciting retail experience coming soon for everyone.",
  },
  {
    id: 9,
    title: "Bondhu Food & Bevarage",
    path: "/projects/bondhu-builders",
    image: "/images/bondhuBevarage.webp",
    details: "Exciting retail experience coming soon for everyone.",
  },
  {
    id: 10,
    title: "Bondhu Garments",
    path: "/projects/bondhu-builders",
    image: "/images/bondhuGarments.webp",
    details: "Exciting retail experience coming soon for everyone.",
  },
  {
    id: 11,
    title: "Bondhu Parcel And Currier Service",
    path: "/projects/bondhu-builders",
    image: "/images/bondhuParcel.webp",
    details: "Exciting retail experience coming soon for everyone.",
  },
  {
    id: 12,
    title: "Bondhu Transport",
    path: "/projects/bondhu-builders",
    image: "/images/bondhuTransport.jpeg",
    details: "Exciting retail experience coming soon for everyone.",
  },
];
