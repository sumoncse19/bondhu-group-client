import React from "react";

const page = () => {
  return (
    <div className="py-10 text-red-400 w-[75%] mx-auto">
      {/* heading */}
      <div className="px-2 py-3 border-l-8 border-teal-600">
        <p className="text-2xl font-bold text-black">Our Board of Directors</p>
      </div>
      {/* directors */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-y-6">
        {/* card */}
        {directors?.map((director) => (
          <div
            key={director?.id}
            className="border-2 border-black rounded-md p-2 cursor-pointer overflow-hidden"
          >
            {/* img */}
            <div>
              <img
                className="w-[300px] h-[300px] py-2 hover:scale-110 transition-all duration-300 ease-in"
                src={
                  director?.img
                    ? director?.img
                    : "/images/directors/skeleton.png"
                }
                alt=""
              />
            </div>
            {/* details */}
            <div className="my-5 px-3">
              <p className="text-teal-700 font-bold">{director?.name}</p>
              <p className="text-teal-700 ">{director?.rank}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;

const directors = [
  // {
  //   id: 1,
  //   name: "MD Babul Islam",
  //   rank: "Chairman",
  //   img: "/images/directors/chairman.jpeg",
  // },
  {
    id: 2,
    name: "Obaidur Rahman Titu",
    rank: "Maneging Director",
    img: "/images/directors/md.jpeg",
  },
  {
    id: 3,
    name: "Mohammad Rana Chowdhury",
    rank: "Cheif Executive Officer",
    img: "/images/directors/ceo.jpeg",
  },
  // {
  //   id: 4,
  //   name: "Shakir Ahmad",
  //   rank: "IT Director",
  //   img: "/images/directors/itd.jpeg",
  // },
  // {
  //   id: 5,
  //   name: "H.M Shahadat Hossen",
  //   rank: "Director (Marketing)",
  //   // img: "/images/directors/dm.jpeg",
  // },
  // {
  //   id: 6,
  //   name: "MD Palash Chowdhury",
  //   rank: "Director (Operation)",
  //   // img: "/images/directors/dm.jpeg",
  // },
];
