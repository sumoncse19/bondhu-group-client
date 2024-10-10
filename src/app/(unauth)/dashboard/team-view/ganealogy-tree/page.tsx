"use client";
import React, { useEffect, useRef, useState } from "react";
import baseUrl from "../../../../../../config";
import Cookies from "js-cookie";
import TreeModal from "@/components/shared/Modal/TreeModal";
import toast from "react-hot-toast";
import { CirclesWithBar } from "react-loader-spinner";

interface WalletData {
  purchase_wallet: number;
  income_wallet: number;
  reference_bonus: number;
}
interface TeamViewData {
  _id: string;
  reference_id: string;
  picture: string;
  parent_placement_id: string;
  name: string;
  email: string;
  left_side_partner: TeamViewData | null;
  right_side_partner: TeamViewData | null;
  wallet: WalletData | null;
  accountable: {
    total_carry: number;
    total_point: number;
  };
}

interface TreeModalProps {
  open: boolean;
  value: TeamViewData;
}

const page = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const [fullTeams, setFullTeams] = useState<TeamViewData>();
  // 2nd level
  const [secondLevelLeftPartner, setSecondLevelLeftPartner] =
    useState<TeamViewData>();
  const [secondLevelRightPartner, setSecondLevelRightPartner] =
    useState<TeamViewData>();

  // 3rd level
  const [thirdLeveLeftLeftPartner, setThirdLeveLeftLeftPartner] =
    useState<TeamViewData>();
  const [thirdLeveLeftRightPartner, setThirdLeveLeftRightPartner] =
    useState<TeamViewData>();
  const [thirdLeveRightLeftPartner, setThirdLeveRightLeftPartner] =
    useState<TeamViewData>();
  const [thirdLeveRightRightPartner, setThirdLeveRightRightPartner] =
    useState<TeamViewData>();
  const [treeModal, setTreeModal] = useState<TreeModalProps>({
    open: false,
    value: {
      _id: "",
      reference_id: "",
      picture: "",
      parent_placement_id: "",
      name: "",
      email: "",
      left_side_partner: null,
      right_side_partner: null,
      wallet: { purchase_wallet: 0, income_wallet: 0, reference_bonus: 0 },
      accountable: {
        total_carry: 0,
        total_point: 0,
      },
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allUser, setAlluser] = useState([]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  // Cookies value
  const id: string = Cookies.get("id") || "";
  const token: string = Cookies.get("token") || "";

  // get team views
  const fetchTeamViews = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/team/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setFullTeams(data.data);
        setSecondLevelLeftPartner(data?.data?.left_side_partner);
        setSecondLevelRightPartner(data?.data?.right_side_partner);
        setThirdLeveLeftLeftPartner(
          data?.data?.left_side_partner?.left_side_partner
        );
        setThirdLeveLeftRightPartner(
          data?.data?.left_side_partner?.right_side_partner
        );
        setThirdLeveRightLeftPartner(
          data?.data?.right_side_partner?.left_side_partner
        );
        setThirdLeveRightRightPartner(
          data?.data?.right_side_partner?.right_side_partner
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // get all user
  const getAllUser = async () => {
    const response = await fetch(`${baseUrl}/user/get-all-users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.success) {
      setAlluser(data?.data);
    }
  };

  const handleSearchUser = (value) => {
    const searchedUser = allUser.find((user) => user.user_name === value);
    fetchTeamViews(searchedUser?._id);
  };

  useEffect(() => {
    fetchTeamViews(id);
    getAllUser();
    // for 1st level
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D; // Type for 2D context

      // Drawing the line
      ctx.beginPath();
      ctx.moveTo(500, 10); // start
      ctx.lineTo(500, 50); // first line  break
      ctx.moveTo(500, 50);
      ctx.lineTo(300, 50); //left side move
      ctx.lineTo(700, 50); // right side move

      // left to down
      ctx.moveTo(300, 50);
      ctx.lineTo(300, 100);

      // right to down
      ctx.moveTo(700, 50);
      ctx.lineTo(700, 100);

      ctx.strokeStyle = "#00f";
      ctx.lineWidth = 5;
      ctx.stroke();
    }
  }, []);

  // when page is loading
  if (isLoading) {
    return (
      <div className="w-full h-[90vh]  bg-opacity-60">
        <div className="w-full h-full flex justify-center items-center">
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-[100vh] p-10">
      {/* <div className="w-full h-full flex flex-col  items-center relative bg-red-400">
        <div className="w-[70%] mx-auto bg-red-950 flex justify-center">
          <img
            className="w-10 h-10 lg:w-24 lg:h-24 rounded-full border-4 border-black"
            src="/images/profilePicIcon.png"
            alt=""
          />
        </div>

        
        <div className="pl-10 w-[70%] mx-auto flex justify-center bg-red-600">
          <img src="/images/tree.png" alt="" />
        </div>

        <div className="w-[70%] mx-auto flex justify-between bg-blue-400">
          <div className="w-1/2 flex flex-col items-center -ml-8">
            <img
              className="w-10 h-10 lg:w-24 lg:h-24 rounded-full border-4 border-black"
              src="/images/profilePicIcon.png"
              alt=""
            />
          
            <div className="pl-3 w-[70%] mx-auto flex justify-center bg-red-600">
              <img src="/images/tree.png" alt="" />
            </div>
          </div>

          <div className="w-1/2 flex flex-col items-center -mr-8">
            <img
              className="w-10 h-10 lg:w-24 lg:h-24 rounded-full border-4 border-black"
              src="/images/profilePicIcon.png"
              alt=""
            />
            
            <div className="pl-4 w-[70%] mx-auto flex justify-center bg-red-600">
              <img src="/images/tree.png" alt="" />
            </div>
          </div>
        </div>
      </div> */}

      {/* search box */}
      <div className="flex items-center gap-x-3">
        <input
          ref={searchInputRef}
          defaultValue=""
          type="text"
          placeholder="search by username"
          className="px-4 py-1 rounded-md outline-none border-2 border-black focus:border-green-600"
        />
        <button
          onClick={() => {
            // setSearchValue();
            handleSearchUser(searchInputRef?.current?.value);
          }}
          className="bg-teal-500 px-4 py-1 rounded-md text-white"
        >
          Search
        </button>
      </div>

      <table className="w-full  text-sm text-left rtl:text-right text-white dark:text-gray-400">
        <tbody>
          {/* 1st level */}
          <tr className="">
            <td className="py-3 flex justify-center items-center ">
              {" "}
              <div className=" flex flex-col items-center relative">
                <div className="group ">
                  <img
                    src={
                      fullTeams
                        ? "/images/profilePicIcon.png"
                        : "/images/profilePicIcon2.png"
                    }
                    className="w-16 h-16 cursor-pointer"
                    onClick={() => {
                      if (fullTeams) {
                        setTreeModal({
                          open: true,
                          value: {
                            _id: fullTeams?._id || "",
                            reference_id: fullTeams?.reference_id || "",
                            picture: fullTeams?.picture || "",
                            parent_placement_id:
                              fullTeams?.parent_placement_id || "",
                            name: fullTeams?.name || "",
                            email: fullTeams?.email || "",
                            left_side_partner:
                              fullTeams?.left_side_partner || null,
                            right_side_partner:
                              fullTeams?.right_side_partner || null,
                            wallet: {
                              purchase_wallet:
                                fullTeams?.wallet?.purchase_wallet || 0,
                              income_wallet:
                                fullTeams?.wallet?.income_wallet || 0,
                              reference_bonus:
                                fullTeams?.wallet?.reference_bonus || 0,
                            },
                            accountable: {
                              total_point: fullTeams?.accountable?.total_point,
                              total_carry: fullTeams?.accountable?.total_carry,
                            },
                          },
                        });
                      }
                    }}
                    alt=""
                  />

                  {/* Left side info */}
                  <div className="absolute top-1/2 z-[300000] text-black -translate-y-1/2 -left-[100%] opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-in-out">
                    <p>Point: 10000</p>
                    <p>Carry: 1000</p>
                  </div>

                  {/* Right side info */}
                  <div className="absolute top-1/2 text-black -translate-y-1/2 -right-[100%] opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out">
                    <p>Point: 10000</p>
                    <p>Carry: 1000</p>
                  </div>
                </div>

                {/* Team name */}
                <p className="font-bold text-lg text-black">
                  {fullTeams?.name ? fullTeams?.name : ""}
                </p>
              </div>
            </td>
          </tr>
          {/* tree */}
          <tr className="">
            <td className=" flex justify-center items-center ">
              <img src="/images/tree.png" alt="" className="w-[48%] ml-10" />
            </td>
          </tr>
          {/* 2nd level */}
          <tr className=" flex gap-5 ">
            {/* secondLevelLeftPartner */}
            <td className=" flex justify-center items-center w-full  pl-32">
              <div className="flex flex-col items-center relative">
                <div className="group">
                  <img
                    onClick={() => {
                      if (secondLevelLeftPartner) {
                        setTreeModal({
                          open: true,
                          value: {
                            _id: secondLevelLeftPartner?._id || "",
                            reference_id:
                              secondLevelLeftPartner?.reference_id || "",
                            picture: secondLevelLeftPartner?.picture || "",
                            parent_placement_id:
                              secondLevelLeftPartner?.parent_placement_id || "",
                            name: secondLevelLeftPartner?.name || "",
                            email: secondLevelLeftPartner?.email || "",
                            left_side_partner:
                              secondLevelLeftPartner?.left_side_partner || null,
                            right_side_partner:
                              secondLevelLeftPartner?.right_side_partner ||
                              null,
                            wallet: {
                              purchase_wallet:
                                secondLevelLeftPartner?.wallet
                                  ?.purchase_wallet || 0,
                              income_wallet:
                                secondLevelLeftPartner?.wallet?.income_wallet ||
                                0,
                              reference_bonus:
                                secondLevelLeftPartner?.wallet
                                  ?.reference_bonus || 0,
                            },
                            accountable: {
                              total_point:
                                secondLevelLeftPartner?.accountable
                                  ?.total_point,
                              total_carry:
                                secondLevelLeftPartner?.accountable
                                  ?.total_carry,
                            },
                          },
                        });
                      }
                    }}
                    src={
                      secondLevelLeftPartner
                        ? "/images/profilePicIcon.png"
                        : "/images/profilePicIcon2.png"
                    }
                    className="w-16 h-16  cursor-pointer"
                    alt=""
                  />
                  {/* Left side info */}
                  <div className="absolute top-1/2 z-[300000] text-black -translate-y-1/2 -left-[100%] opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-in-out">
                    <p>Point: 10000</p>
                    <p>Carry: 1000</p>
                  </div>

                  {/* Right side info */}
                  <div className="absolute top-1/2 text-black -translate-y-1/2 -right-[100%] opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out">
                    <p>Point: 10000</p>
                    <p>Carry: 1000</p>
                  </div>
                </div>
                <p className="font-bold text-lg  text-black ">
                  {secondLevelLeftPartner?.name
                    ? secondLevelLeftPartner?.name
                    : ""}
                </p>
              </div>
            </td>
            {/* secondLevelRightPartner */}
            <td className=" flex justify-center items-center w-full  pr-32">
              <div className="flex flex-col items-center relative ">
                <div className="group">
                  <img
                    onClick={() => {
                      if (secondLevelRightPartner) {
                        setTreeModal({
                          open: true,
                          value: {
                            _id: secondLevelRightPartner?._id || "",
                            reference_id:
                              secondLevelRightPartner?.reference_id || "",
                            picture: secondLevelRightPartner?.picture || "",
                            parent_placement_id:
                              secondLevelRightPartner?.parent_placement_id ||
                              "",
                            name: secondLevelRightPartner?.name || "",
                            email: secondLevelRightPartner?.email || "",
                            left_side_partner:
                              secondLevelRightPartner?.left_side_partner ||
                              null,
                            right_side_partner:
                              secondLevelRightPartner?.right_side_partner ||
                              null,
                            wallet: {
                              purchase_wallet:
                                secondLevelRightPartner?.wallet
                                  ?.purchase_wallet || 0,
                              income_wallet:
                                secondLevelRightPartner?.wallet
                                  ?.income_wallet || 0,
                              reference_bonus:
                                secondLevelRightPartner?.wallet
                                  ?.reference_bonus || 0,
                            },
                            accountable: {
                              total_point:
                                secondLevelRightPartner?.accountable
                                  ?.total_point,
                              total_carry:
                                secondLevelRightPartner?.accountable
                                  ?.total_carry,
                            },
                          },
                        });
                      }
                    }}
                    src={
                      secondLevelRightPartner
                        ? "/images/profilePicIcon.png"
                        : "/images/profilePicIcon2.png"
                    }
                    className="w-16 h-16  cursor-pointer"
                    alt=""
                  />
                  {/* Left side info */}
                  <div className="absolute top-1/2 z-[300000] text-black -translate-y-1/2 -left-[100%] opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-in-out">
                    <p>Point: 10000</p>
                    <p>Carry: 1000</p>
                  </div>

                  {/* Right side info */}
                  <div className="absolute top-1/2 text-black -translate-y-1/2 -right-[100%] opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out">
                    <p>Point: 10000</p>
                    <p>Carry: 1000</p>
                  </div>
                </div>
                <p className="font-bold text-lg  text-black ">
                  {secondLevelRightPartner?.name
                    ? secondLevelRightPartner?.name
                    : "Empty"}
                </p>
              </div>
            </td>
          </tr>
          {/* tree */}
          <tr className="flex ">
            <td className=" flex justify-center items-center w-full  pl-32">
              <img src="/images/tree.png" className="w-[400px]" alt="" />
            </td>
            <td className=" flex justify-center items-center w-full  pr-24">
              <img src="/images/tree.png" className="w-[400px]" alt="" />
            </td>
          </tr>
          {/* 3rd level */}
          <tr className="flex ">
            {/* thirdLeveLeftLeftPartner and thirdLeveLeftRightPartner */}
            <td className=" flex  items-center w-full ">
              {/* thirdLeveLeftLeftPartner */}
              <div className="flex justify-center w-full ">
                <div className="flex flex-col items-center w-[150px] ml-16 relative">
                  <div className="group">
                    <img
                      onClick={() => {
                        if (thirdLeveLeftLeftPartner) {
                          setTreeModal({
                            open: true,
                            value: {
                              _id: thirdLeveLeftLeftPartner?._id || "",
                              reference_id:
                                thirdLeveLeftLeftPartner?.reference_id || "",
                              picture: thirdLeveLeftLeftPartner?.picture || "",
                              parent_placement_id:
                                thirdLeveLeftLeftPartner?.parent_placement_id ||
                                "",
                              name: thirdLeveLeftLeftPartner?.name || "",
                              email: thirdLeveLeftLeftPartner?.email || "",
                              left_side_partner:
                                thirdLeveLeftLeftPartner?.left_side_partner ||
                                null,
                              right_side_partner:
                                thirdLeveLeftLeftPartner?.right_side_partner ||
                                null,
                              wallet: {
                                purchase_wallet:
                                  thirdLeveLeftLeftPartner?.wallet
                                    ?.purchase_wallet || 0,
                                income_wallet:
                                  thirdLeveLeftLeftPartner?.wallet
                                    ?.income_wallet || 0,
                                reference_bonus:
                                  thirdLeveLeftLeftPartner?.wallet
                                    ?.reference_bonus || 0,
                              },
                              accountable: {
                                total_point:
                                  thirdLeveLeftLeftPartner?.accountable
                                    ?.total_point,
                                total_carry:
                                  thirdLeveLeftLeftPartner?.accountable
                                    ?.total_carry,
                              },
                            },
                          });
                        }
                      }}
                      src={
                        thirdLeveLeftLeftPartner
                          ? "/images/profilePicIcon.png"
                          : "/images/profilePicIcon2.png"
                      }
                      className="w-16 h-16  cursor-pointer"
                      alt=""
                    />{" "}
                    {/* Left side info */}
                    <div className="absolute top-1/2 z-[300000] text-black -translate-y-1/2 -left-[50%] opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out">
                      <p>Point: 10000</p>
                      <p>Carry: 1000</p>
                    </div>
                    {/* Right side info */}
                    <div className="absolute top-1/2 text-black -translate-y-1/2 -right-[50%] opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out">
                      <p>Point: 10000</p>
                      <p>Carry: 1000</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg  text-black ">
                    {thirdLeveLeftLeftPartner?.name
                      ? thirdLeveLeftLeftPartner?.name
                      : ""}
                  </p>
                </div>
              </div>

              {/* thirdLeveLeftRightPartner */}
              <div className="flex justify-center w-full ">
                <div className="flex flex-col items-center w-[150px] -mr-36 relative">
                  <div className="group">
                    <img
                      onClick={() => {
                        if (thirdLeveLeftRightPartner) {
                          setTreeModal({
                            open: true,
                            value: {
                              _id: thirdLeveLeftRightPartner?._id || "",
                              reference_id:
                                thirdLeveLeftRightPartner?.reference_id || "",
                              picture: thirdLeveLeftRightPartner?.picture || "",
                              parent_placement_id:
                                thirdLeveLeftRightPartner?.parent_placement_id ||
                                "",
                              name: thirdLeveLeftRightPartner?.name || "",
                              email: thirdLeveLeftRightPartner?.email || "",
                              left_side_partner:
                                thirdLeveLeftRightPartner?.left_side_partner ||
                                null,
                              right_side_partner:
                                thirdLeveLeftRightPartner?.right_side_partner ||
                                null,
                              wallet: {
                                purchase_wallet:
                                  thirdLeveLeftRightPartner?.wallet
                                    ?.purchase_wallet || 0,
                                income_wallet:
                                  thirdLeveLeftRightPartner?.wallet
                                    ?.income_wallet || 0,
                                reference_bonus:
                                  thirdLeveLeftRightPartner?.wallet
                                    ?.reference_bonus || 0,
                              },
                              accountable: {
                                total_point:
                                  thirdLeveLeftRightPartner?.accountable
                                    ?.total_point,
                                total_carry:
                                  thirdLeveLeftRightPartner?.accountable
                                    ?.total_carry,
                              },
                            },
                          });
                        }
                      }}
                      src={
                        thirdLeveLeftRightPartner
                          ? "/images/profilePicIcon.png"
                          : "/images/profilePicIcon2.png"
                      }
                      className="w-16 h-16  cursor-pointer"
                      alt=""
                    />{" "}
                    {/* Left side info */}
                    <div className="absolute top-1/2 z-[300000] text-black -translate-y-1/2 -left-[30%] opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out">
                      <p>Point: 10000</p>
                      <p>Carry: 1000</p>
                    </div>
                    {/* Right side info */}
                    <div className="absolute top-1/2 text-black -translate-y-1/2 -right-[30%] opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out">
                      <p>Point: 10000</p>
                      <p>Carry: 1000</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg  text-black ">
                    {thirdLeveLeftRightPartner?.name
                      ? thirdLeveLeftRightPartner?.name
                      : ""}
                  </p>
                </div>
              </div>
            </td>
            {/* thirdLeveRightLeftPartner thirdLeveRightRightPartner */}
            <td className=" flex  items-center w-full ">
              {/* thirdLeveRightLeftPartner */}
              <div className="flex justify-center w-full ">
                <div className="flex flex-col items-center w-[150px] -ml-36 relative">
                  <div className="group">
                    <img
                      onClick={() => {
                        if (thirdLeveRightLeftPartner) {
                          setTreeModal({
                            open: true,
                            value: {
                              _id: thirdLeveRightLeftPartner?._id || "",
                              reference_id:
                                thirdLeveRightLeftPartner?.reference_id || "",
                              picture: thirdLeveRightLeftPartner?.picture || "",
                              parent_placement_id:
                                thirdLeveRightLeftPartner?.parent_placement_id ||
                                "",
                              name: thirdLeveRightLeftPartner?.name || "",
                              email: thirdLeveRightLeftPartner?.email || "",
                              left_side_partner:
                                thirdLeveRightLeftPartner?.left_side_partner ||
                                null,
                              right_side_partner:
                                thirdLeveRightLeftPartner?.right_side_partner ||
                                null,
                              wallet: {
                                purchase_wallet:
                                  thirdLeveRightLeftPartner?.wallet
                                    ?.purchase_wallet || 0,
                                income_wallet:
                                  thirdLeveRightLeftPartner?.wallet
                                    ?.income_wallet || 0,
                                reference_bonus:
                                  thirdLeveRightLeftPartner?.wallet
                                    ?.reference_bonus || 0,
                              },
                              accountable: {
                                total_point:
                                  thirdLeveRightLeftPartner?.accountable
                                    ?.total_point,
                                total_carry:
                                  thirdLeveRightLeftPartner?.accountable
                                    ?.total_carry,
                              },
                            },
                          });
                        }
                      }}
                      src={
                        thirdLeveRightLeftPartner
                          ? "/images/profilePicIcon.png"
                          : "/images/profilePicIcon2.png"
                      }
                      className="w-16 h-16  cursor-pointer"
                      alt=""
                    />{" "}
                    {/* Left side info */}
                    <div className="absolute top-1/2 z-[300000] text-black -translate-y-1/2 -left-[25%] opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out">
                      <p>Point: 10000</p>
                      <p>Carry: 1000</p>
                    </div>
                    {/* Right side info */}
                    <div className="absolute top-1/2 text-black -translate-y-1/2 -right-[25%] opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out">
                      <p>Point: 10000</p>
                      <p>Carry: 1000</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg  text-black ">
                    {thirdLeveRightLeftPartner?.name
                      ? thirdLeveRightLeftPartner?.name
                      : ""}
                  </p>
                </div>
              </div>

              {/* thirdLeveRightRightPartner */}
              <div className="flex justify-center w-full ">
                <div className="flex flex-col items-center w-[150px] mr-20 relative">
                  <div className="group">
                    <img
                      onClick={() => {
                        if (thirdLeveRightRightPartner) {
                          setTreeModal({
                            open: true,
                            value: {
                              _id: thirdLeveRightRightPartner?._id || "",
                              reference_id:
                                thirdLeveRightRightPartner?.reference_id || "",
                              picture:
                                thirdLeveRightRightPartner?.picture || "",
                              parent_placement_id:
                                thirdLeveRightRightPartner?.parent_placement_id ||
                                "",
                              name: thirdLeveRightRightPartner?.name || "",
                              email: thirdLeveRightRightPartner?.email || "",
                              left_side_partner:
                                thirdLeveRightRightPartner?.left_side_partner ||
                                null,
                              right_side_partner:
                                thirdLeveRightRightPartner?.right_side_partner ||
                                null,
                              wallet: {
                                purchase_wallet:
                                  thirdLeveRightRightPartner?.wallet
                                    ?.purchase_wallet || 0,
                                income_wallet:
                                  thirdLeveRightRightPartner?.wallet
                                    ?.income_wallet || 0,
                                reference_bonus:
                                  thirdLeveRightRightPartner?.wallet
                                    ?.reference_bonus || 0,
                              },
                              accountable: {
                                total_point:
                                  thirdLeveRightRightPartner?.accountable
                                    ?.total_point,
                                total_carry:
                                  thirdLeveRightRightPartner?.accountable
                                    ?.total_carry,
                              },
                            },
                          });
                        }
                      }}
                      src={
                        thirdLeveRightRightPartner
                          ? "/images/profilePicIcon.png"
                          : "/images/profilePicIcon2.png"
                      }
                      className="w-16 h-16  cursor-pointer"
                      alt=""
                    />{" "}
                    {/* Left side info */}
                    <div className="absolute top-1/2 z-[300000] text-black -translate-y-1/2 -left-[30%] opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out">
                      <p>Point: 10000</p>
                      <p>Carry: 1000</p>
                    </div>
                    {/* Right side info */}
                    <div className="absolute top-1/2 text-black -translate-y-1/2 -right-[30%] opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out">
                      <p>Point: 10000</p>
                      <p>Carry: 1000</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg  text-black ">
                    {thirdLeveRightRightPartner?.name
                      ? thirdLeveRightRightPartner?.name
                      : ""}
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/*tree modal */}
      {treeModal.open && (
        <div>
          <TreeModal
            treeModal={treeModal}
            setTreeModal={setTreeModal}
            fetchTeamViews={fetchTeamViews}
          />
        </div>
      )}
    </div>
  );
};

export default page;

{
  /* <canvas
          ref={canvasRef}
          width={1000}
          height={110}
          // style={{ border: "1px solid #000" }}
        /> */
}
