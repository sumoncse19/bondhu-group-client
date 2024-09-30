import React from "react";

const Projects = () => {
  return (
    <div id="projects" className="pt-28 w-full">
      {/* heading */}
      <div className="w-[80%] mx-auto ">
        <div className="w-full flex flex-col justify-center items-center ">
          <h1 className="text-6xl text-black">Our Projects</h1>
          <p className="pt-5 text-gray-600 text-center max-w-[500px]">
            Explore our diverse sectors and innovative business ventures.
          </p>
        </div>
      </div>

      {/* all cards */}
      <div className="mt-10 w-[80%] mx-auto grid grid-cols-2 gap-10">
        {projects?.map((p) => (
          <div className="flex justify-center items-center  " key={p?.id}>
            <div className="flex flex-col">
              <div className="w-[550px] overflow-hidden rounded-3xl border-2 border-black p-1">
                <div className="border-2 border-black p-1 rounded-3xl">
                  <img
                    className="w-full h-[400px]  object-fill rounded-3xl hover:scale-110 transition-all duration-300 ease-out"
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
        ))}
      </div>
    </div>
  );
};

export default Projects;

const projects = [
  {
    id: 1,
    title: "Bondhu Builder's ",
    image: "/images/projectImg1.avif",
    details:
      "Leading construction company with investment opportunities available.",
  },
  {
    id: 2,
    title: "Bondhu Super Shop",
    image: "/images/projectImg2.avif",
    details: "Exciting retail experience coming soon for everyone.",
  },
  {
    id: 3,
    title: "Bondhu Agro",
    image: "/images/projectImg3.avif",
    details: "Sustainable agriculture solutions launching soon for farmers.",
  },
  {
    id: 4,
    title: "Bondhu IT Institute",
    image: "/images/projectImg4.jpeg",
    details: "Empowering future tech leaders with quality education programs.",
  },
  {
    id: 5,
    title: "Bondhu Brokerage ",
    image: "/images/projectImg1.avif",
    details:
      "Leading construction company with investment opportunities available.",
  },
  {
    id: 6,
    title: "Bondhu Food & Beverage",
    image: "/images/projectImg2.avif",
    details: "Exciting retail experience coming soon for everyone.",
  },
];
