import HomeBanner from "@/components/HomeBanner";

const HomePage = () => {
  const companies = [
    "Bondhu Group-1",
    "Bondhu Group-2",
    "Bondhu Group-3",
    "Bondhu Group-4",
    "Bondhu Group-5",
    "Bondhu Group-6",
    "Bondhu Group-7",
    "Bondhu Group-8",
    "Bondhu Group-9",
    "Bondhu Group-10",
    "Bondhu Group-11",
    "Bondhu Group-12",
  ];
  return (
    <div className="my-5">
      {/* <HomeBanner /> */}
      {/* company cards */}
      <div className="w-[95%] mx-auto my-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-x-3 gap-y-5">
        {companies.map((c, i) => (
          <div
            style={{
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
            }}
            key={i}
            className="group bg-[#BBF6D0] h-[200px] w-[200px] rounded-lg flex items-center justify-center hover:scale-110 duration-300 ease-out"
          >
            <span className="text-lg font-bold group-hover:scale-75 duration-300 ease-in-out">
              {c}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
