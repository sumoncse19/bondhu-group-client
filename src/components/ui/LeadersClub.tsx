import React, { useState } from "react";
import { FaHandPointDown, FaHandPointUp } from "react-icons/fa";
import { TbBulbFilled } from "react-icons/tb";

const LeadersClub = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <div className="bg-[#4f4a4e] p-3 rounded">
      <div className="flex items-center justify-between text-orange-400">
        <div className="flex items-center gap-x-2">
          <TbBulbFilled className=" text-4xl" />
          <div className="text-xl">
            Know About <p className="font-bold inline">Leaders Club</p>
          </div>
        </div>
        {showMore ? (
          <FaHandPointUp
            onClick={() => setShowMore((prev) => !prev)}
            className=" text-2xl cursor-pointer hover:scale-110 transition-all duration-300 ease-in animate-bounce"
          />
        ) : (
          <FaHandPointDown
            onClick={() => setShowMore((prev) => !prev)}
            className=" text-2xl cursor-pointer hover:scale-110 transition-all duration-300 ease-in animate-bounce"
          />
        )}
      </div>
      {/* image */}
      <div className="my-2 flex justify-center">
        <img
          className="w-60 h-60 rounded-full"
          src="/images/leadersClubImg.jpeg"
          alt=""
        />
      </div>
      {/* body */}
      <div className={`${showMore ? "block" : "hidden"}`}>
        {/* details */}
        <p className="text-orange-200 px-5">
          Leader's Club is typically a program designed to develop leadership
          skills among young individuals, often within community or youth
          organizations. It focuses on fostering teamwork, communication, and
          problem-solving abilities through various activities and projects.{" "}
          <br /> <br /> Participants usually engage in workshops, mentoring, and
          community service, allowing them to take on leadership roles and learn
          valuable life skills. The program emphasizes personal growth, social
          responsibility, and the importance of being active, engaged members of
          their communities. <br />
          <br />
          The structure may vary depending on the organization, but the core
          goal remains: to empower youth to become confident leaders who can
          inspire and positively influence others. <br /> <br /> Leader's Club
          is a community badge program that recognizes and connects business
          owners and entrepreneurs, such as restaurant owners, shopping mall
          proprietors, company executives, and network marketers. It provides a
          platform for these leaders to collaborate, share resources, and
          support one another in their ventures. <br /> <br /> Members typically
          benefit from networking opportunities, workshops, and access to
          valuable insights that can help them grow their businesses. The
          program emphasizes community engagement, leadership development, and
          the sharing of best practices among diverse business sectors,
          fostering a supportive environment for entrepreneurship.
        </p>
        <p className="text-orange-200 px-5 mt-5">
          Leader's Club also focuses on social responsibility and community
          support, organizing initiatives to address various challenges such as
          natural disasters and seasonal needs. This includes:
        </p>
        <ul className="text-orange-400 px-8 mt-5 list-decimal flex flex-col gap-y-5">
          <li>
            Disaster Relief: Coordinating efforts during natural disasters to
            provide aid and support to affected communities, including food,
            shelter, and resources.
          </li>
          <li>
            Winter Sessions: Organizing drives to collect warm clothing,
            blankets, and supplies for those in need during colder months.
          </li>
          <li>
            Educational Workshops: Offering training and resources to help
            community members prepare for and respond to emergencies.
          </li>
          <li>
            Community Engagement: Encouraging members to participate in local
            initiatives that promote resilience and sustainability.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeadersClub;
