"use client";
import React, { useEffect, useRef, useState } from "react";
import baseUrl from "../../../../../../config";
import Cookies from "js-cookie";
import TreeModal from "@/components/shared/Modal/TreeModal";
import toast from "react-hot-toast";
import { CirclesWithBar } from "react-loader-spinner";
import { GiShieldOpposition } from "react-icons/gi";
import { FaShieldAlt } from "react-icons/fa";
import axios from "axios";

interface WalletData {
  purchase_wallet: number;
  income_wallet: number;
  reference_bonus: number;
  matching_bonus: number;
}
interface AccountableData {
  directorship: number;
  fixed_deposit: number;
  project_share: number;
  share_holder: number;
  team_a_carry: number;
  team_a_member: number;
  team_a_point: number;
  team_b_carry: number;
  team_b_member: number;
  team_b_point: number;
  total_amount: number;
  total_carry: number;
  total_point: number;
}
interface TeamViewData {
  _id: string;
  reference_id: string;
  picture: string;
  parent_placement_id: string;
  name: string;
  email: string;
  designation: string;
  user_name: string; // Add this field
  phone: string; // Add this field
  registration_date: string; // Add this field
  left_side_partner: TeamViewData | null;
  right_side_partner: TeamViewData | null;
  wallet: WalletData;
  accountable: AccountableData;
}

interface TreeModalProps {
  open: boolean;
  value: any;
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
      user_name: "",
      registration_date: "",
      phone: "",
      email: "",
      designation: "",
      left_side_partner: null,
      right_side_partner: null,
      wallet: {
        purchase_wallet: 0,
        income_wallet: 0,
        reference_bonus: 0,
        matching_bonus: 0,
      },
      accountable: {
        directorship: 0,
        fixed_deposit: 0,
        project_share: 0,
        share_holder: 0,
        team_a_carry: 0,
        team_a_member: 0,
        team_a_point: 0,
        team_b_carry: 0,
        team_b_member: 0,
        team_b_point: 0,
        total_amount: 0,
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
  const role: string = Cookies.get("role") || "";

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

  const handleSearchUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${baseUrl}/team/${id}?search=${searchValue}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      setSearchValue("");
    }
  };

  useEffect(() => {
    fetchTeamViews(id);
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
      {/* {(role === "superAdmin" || role === "admin") && ( */}
      <div className="flex items-center gap-x-3">
        <input
          ref={searchInputRef}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleSearchUser();
            }
          }}
          defaultValue=""
          type="text"
          placeholder="search by username"
          className="px-4 py-1 rounded-md outline-none border-2 border-black bg-white focus:border-green-600"
        />
        <button
          onClick={() => {
            handleSearchUser();
          }}
          className="bg-teal-500 px-4 py-1 rounded-md text-white"
        >
          Search
        </button>
      </div>
      {/* )} */}

      <table className="w-full  text-sm text-left rtl:text-right text-white ">
        <tbody className="">
          {/* 1st level */}
          <tr className="">
            <td className="py-3 flex justify-center items-center ">
              {" "}
              <div className=" flex flex-col items-center relative">
                <div className="group flex items-center gap-6 ">
                  {/* Left side info */}
                  {fullTeams && (
                    <div className="z-[300000] text-black font-semibold bg-red-400 p-3 rounded-md invisible group-hover:visible transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in">
                      <div className="flex flex-col gap-2 items-center  w-[100px]">
                        <p> Team A</p>
                        <p className="text-xs">
                          {fullTeams
                            ? fullTeams?.accountable?.team_a_carry
                            : ""}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={"/images/profilePicIcon.png"}
                      className="w-20 h-20 cursor-pointer object-cover rounded-full border-4 border-red-500"
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
                              user_name: fullTeams?.user_name || "",
                              registration_date:
                                fullTeams?.registration_date || "",
                              phone: fullTeams?.phone || "",
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
                                matching_bonus:
                                  fullTeams?.wallet?.matching_bonus || 0,
                              },
                              accountable: {
                                directorship:
                                  fullTeams?.accountable?.directorship || 0,
                                fixed_deposit:
                                  fullTeams?.accountable?.fixed_deposit || 0,
                                project_share:
                                  fullTeams?.accountable?.project_share || 0,
                                share_holder:
                                  fullTeams?.accountable?.share_holder || 0,
                                team_a_carry:
                                  fullTeams?.accountable?.team_a_carry || 0,
                                team_a_member:
                                  fullTeams?.accountable?.team_a_member || 0,
                                team_a_point:
                                  fullTeams?.accountable?.team_a_point || 0,
                                team_b_carry:
                                  fullTeams?.accountable?.team_b_carry || 0,
                                team_b_member:
                                  fullTeams?.accountable?.team_b_member || 0,
                                team_b_point:
                                  fullTeams?.accountable?.team_b_point || 0,
                                total_amount:
                                  fullTeams?.accountable?.total_amount || 0,
                                total_carry:
                                  fullTeams?.accountable?.total_carry || 0,
                                total_point:
                                  fullTeams?.accountable?.total_point || 0,
                              },
                            },
                          });
                        }
                      }}
                      alt=""
                    />
                    {fullTeams?.designation && (
                      <div className="bg-green-600 px-3 py-0.5 rounded-full text-white mt-1">
                        <FaShieldAlt className="inline-block mr-1 font-bold" />
                        {fullTeams?.designation ? fullTeams?.designation : ""}
                      </div>
                    )}
                    {/* user name */}
                    <p className="font-bold text-lg text-black">
                      {fullTeams?.user_name ? fullTeams?.user_name : ""}
                    </p>
                  </div>

                  {/* Right side info */}
                  {fullTeams && (
                    <div className=" z-[300000] text-black font-semibold bg-red-400 p-3 rounded-md invisible group-hover:visible transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in">
                      {/* <p>
                        Points:{" "}
                        {fullTeams ? fullTeams?.accountable?.team_b_point : ""}
                      </p> */}
                      <div className="flex flex-col gap-2 items-center w-[100px]">
                        <p> Team B</p>
                        <p>
                          {fullTeams
                            ? fullTeams?.accountable?.team_b_carry
                            : ""}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </td>
          </tr>
          {/* tree */}
          {/* {(role === "superAdmin" || role === "admin") && ( */}
          <tr className="">
            <td className=" flex justify-center items-center ">
              <img src="/images/tree.png" alt="" className="w-[48%] ml-10" />
            </td>
          </tr>
          {/* )} */}
          {/* 2nd level */}
          {/* {(role === "superAdmin" || role === "admin") && ( */}
          <tr className=" flex gap-5 ">
            {/* secondLevelLeftPartner */}
            <td className=" flex justify-center items-center w-full  pl-32">
              <div className="flex flex-col items-center relative">
                <div className="group flex items-center gap-6">
                  {secondLevelLeftPartner && (
                    <div className="z-[300000] text-black font-semibold bg-red-400 p-3 rounded-md invisible group-hover:visible transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in">
                      {/* <p>
                        Points:{" "}
                        {secondLevelLeftPartner
                          ? secondLevelLeftPartner?.accountable?.team_a_point
                          : ""}
                      </p> */}
                      <div className="flex flex-col gap-2 items-center w-[100px]">
                        <p> Team A</p>
                        <p>
                          {" "}
                          {secondLevelLeftPartner
                            ? secondLevelLeftPartner?.accountable?.team_a_carry
                            : ""}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-2">
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
                                secondLevelLeftPartner?.parent_placement_id ||
                                "",
                              name: secondLevelLeftPartner?.name || "",
                              user_name:
                                secondLevelLeftPartner?.user_name || "",
                              registration_date:
                                secondLevelLeftPartner?.registration_date || "",
                              phone: secondLevelLeftPartner?.phone || "",
                              email: secondLevelLeftPartner?.email || "",
                              left_side_partner:
                                secondLevelLeftPartner?.left_side_partner ||
                                null,
                              right_side_partner:
                                secondLevelLeftPartner?.right_side_partner ||
                                null,
                              wallet: {
                                purchase_wallet:
                                  secondLevelLeftPartner?.wallet
                                    ?.purchase_wallet || 0,
                                income_wallet:
                                  secondLevelLeftPartner?.wallet
                                    ?.income_wallet || 0,
                                reference_bonus:
                                  secondLevelLeftPartner?.wallet
                                    ?.reference_bonus || 0,
                                matching_bonus:
                                  secondLevelLeftPartner?.wallet
                                    ?.matching_bonus || 0,
                              },
                              accountable: {
                                directorship:
                                  secondLevelLeftPartner?.accountable
                                    ?.directorship || 0,
                                fixed_deposit:
                                  secondLevelLeftPartner?.accountable
                                    ?.fixed_deposit || 0,
                                project_share:
                                  secondLevelLeftPartner?.accountable
                                    ?.project_share || 0,
                                share_holder:
                                  secondLevelLeftPartner?.accountable
                                    ?.share_holder || 0,
                                team_a_carry:
                                  secondLevelLeftPartner?.accountable
                                    ?.team_a_carry || 0,
                                team_a_member:
                                  secondLevelLeftPartner?.accountable
                                    ?.team_a_member || 0,
                                team_a_point:
                                  secondLevelLeftPartner?.accountable
                                    ?.team_a_point || 0,
                                team_b_carry:
                                  secondLevelLeftPartner?.accountable
                                    ?.team_b_carry || 0,
                                team_b_member:
                                  secondLevelLeftPartner?.accountable
                                    ?.team_b_member || 0,
                                team_b_point:
                                  secondLevelLeftPartner?.accountable
                                    ?.team_b_point || 0,
                                total_amount:
                                  secondLevelLeftPartner?.accountable
                                    ?.total_amount || 0,
                                total_carry:
                                  secondLevelLeftPartner?.accountable
                                    ?.total_carry || 0,
                                total_point:
                                  secondLevelLeftPartner?.accountable
                                    ?.total_point || 0,
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
                      className="w-20 h-20 cursor-pointer object-cover rounded-full border-4 border-red-500"
                      alt=""
                    />
                    {secondLevelLeftPartner?.designation && (
                      <div className="bg-green-600 px-3 py-0.5 rounded-full text-white mt-1">
                        <FaShieldAlt className="inline-block mr-1 font-bold" />
                        {secondLevelLeftPartner?.designation
                          ? secondLevelLeftPartner?.designation
                          : ""}
                      </div>
                    )}
                    {/* user name */}
                    <p className="font-bold text-lg  text-black ">
                      {secondLevelLeftPartner?.user_name
                        ? secondLevelLeftPartner?.user_name
                        : ""}
                    </p>
                  </div>
                  {/* Right side info */}
                  {secondLevelLeftPartner && (
                    <div className="z-[300000] text-black font-semibold bg-red-400 p-3 rounded-md invisible group-hover:visible transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in">
                      {/* <p>
                        Points:{" "}
                        {secondLevelLeftPartner
                          ? secondLevelLeftPartner?.accountable?.team_b_point
                          : ""}
                      </p> */}
                      <div className="flex flex-col gap-2 items-center w-[100px]">
                        <p>Team B</p>
                        <p>
                          {" "}
                          {secondLevelLeftPartner
                            ? secondLevelLeftPartner?.accountable?.team_b_carry
                            : ""}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </td>
            {/* secondLevelRightPartner */}
            <td className=" flex justify-center items-center w-full  pr-32">
              <div className="flex flex-col items-center relative ">
                <div className="group flex items-center gap-6">
                  {secondLevelRightPartner && (
                    <div className="z-[300000] text-black font-semibold bg-red-400 p-3 rounded-md invisible group-hover:visible transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in">
                      {/* <p>
                        Points:{" "}
                        {secondLevelRightPartner
                          ? secondLevelRightPartner?.accountable?.team_a_point
                          : ""}
                      </p> */}
                      <div className="flex flex-col gap-2 items-center w-[100px]">
                        <p>Team A</p>
                        <p>
                          {" "}
                          {secondLevelRightPartner
                            ? secondLevelRightPartner?.accountable?.team_a_carry
                            : ""}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-2">
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
                              user_name:
                                secondLevelRightPartner?.user_name || "",
                              registration_date:
                                secondLevelRightPartner?.registration_date ||
                                "",
                              phone: secondLevelRightPartner?.phone || "",
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
                                matching_bonus:
                                  secondLevelRightPartner?.wallet
                                    ?.matching_bonus || 0,
                              },
                              accountable: {
                                directorship:
                                  secondLevelRightPartner?.accountable
                                    ?.directorship || 0,
                                fixed_deposit:
                                  secondLevelRightPartner?.accountable
                                    ?.fixed_deposit || 0,
                                project_share:
                                  secondLevelRightPartner?.accountable
                                    ?.project_share || 0,
                                share_holder:
                                  secondLevelRightPartner?.accountable
                                    ?.share_holder || 0,
                                team_a_carry:
                                  secondLevelRightPartner?.accountable
                                    ?.team_a_carry || 0,
                                team_a_member:
                                  secondLevelRightPartner?.accountable
                                    ?.team_a_member || 0,
                                team_a_point:
                                  secondLevelRightPartner?.accountable
                                    ?.team_a_point || 0,
                                team_b_carry:
                                  secondLevelRightPartner?.accountable
                                    ?.team_b_carry || 0,
                                team_b_member:
                                  secondLevelRightPartner?.accountable
                                    ?.team_b_member || 0,
                                team_b_point:
                                  secondLevelRightPartner?.accountable
                                    ?.team_b_point || 0,
                                total_amount:
                                  secondLevelRightPartner?.accountable
                                    ?.total_amount || 0,
                                total_carry:
                                  secondLevelRightPartner?.accountable
                                    ?.total_carry || 0,
                                total_point:
                                  secondLevelRightPartner?.accountable
                                    ?.total_point || 0,
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
                      className="w-20 h-20 cursor-pointer object-cover rounded-full border-4 border-red-500"
                      alt=""
                    />
                    {secondLevelRightPartner?.designation && (
                      <div className="bg-green-600 px-3 py-0.5 rounded-full text-white mt-1">
                        <FaShieldAlt className="inline-block mr-1 font-bold" />
                        {secondLevelRightPartner?.designation
                          ? secondLevelRightPartner?.designation
                          : ""}
                      </div>
                    )}
                    {/* user name */}
                    <p className="font-bold text-lg  text-black ">
                      {secondLevelRightPartner?.user_name
                        ? secondLevelRightPartner?.user_name
                        : ""}
                    </p>
                  </div>

                  {/* Right side info */}
                  {secondLevelRightPartner && (
                    <div className="z-[300000] text-black font-semibold bg-red-400 p-3 rounded-md invisible group-hover:visible transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in">
                      {/* <p>
                        Points:{" "}
                        {secondLevelRightPartner
                          ? secondLevelRightPartner?.accountable?.team_b_point
                          : ""}
                      </p> */}
                      <div className="flex flex-col gap-2 items-center w-[100px]">
                        <p>Team B</p>
                        <p>
                          {secondLevelRightPartner
                            ? secondLevelRightPartner?.accountable?.team_b_carry
                            : ""}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </td>
          </tr>
          {/* )} */}
          {/* tree */}
          {/* {(role === "superAdmin" || role === "admin") && ( */}
          <tr className="flex ">
            <td className=" flex justify-center items-center w-full  pl-32">
              <img src="/images/tree.png" className="w-[400px]" alt="" />
            </td>
            <td className=" flex justify-center items-center w-full  pr-24">
              <img src="/images/tree.png" className="w-[400px]" alt="" />
            </td>
          </tr>
          {/* )} */}
          {/* 3rd level */}
          {/* {(role === "superAdmin" || role === "admin") && ( */}
          <tr className="flex ">
            {/* thirdLeveLeftLeftPartner and thirdLeveLeftRightPartner */}
            <td className="flex items-center w-full ">
              {/* thirdLeveLeftLeftPartner */}
              <div className="flex justify-center w-full">
                <div className="flex flex-col items-center justify-center relative w-full">
                  <div className="group w-full flex items-center justify-end -mr-5 gap-2">
                    {/* Left side info */}
                    <div className="z-[300000] text-black font-semibold w-[80px] invisible group-hover:visible transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in">
                      {thirdLeveLeftLeftPartner && (
                        <div className="flex flex-col gap-2 items-center w-full bg-red-400 p-3 rounded-md">
                          <p> Team A</p>
                          <p>
                            {" "}
                            {thirdLeveLeftLeftPartner
                              ? thirdLeveLeftLeftPartner?.accountable
                                  ?.team_a_carry
                              : ""}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <img
                        onClick={() => {
                          if (thirdLeveLeftLeftPartner) {
                            setTreeModal({
                              open: true,
                              value: {
                                _id: thirdLeveLeftLeftPartner?._id || "",
                                reference_id:
                                  thirdLeveLeftLeftPartner?.reference_id || "",
                                picture:
                                  thirdLeveLeftLeftPartner?.picture || "",
                                parent_placement_id:
                                  thirdLeveLeftLeftPartner?.parent_placement_id ||
                                  "",
                                name: thirdLeveLeftLeftPartner?.name || "",
                                user_name:
                                  thirdLeveLeftLeftPartner?.user_name || "",
                                registration_date:
                                  thirdLeveLeftLeftPartner?.registration_date ||
                                  "",
                                phone: thirdLeveLeftLeftPartner?.phone || "",
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
                                  matching_bonus:
                                    thirdLeveLeftLeftPartner?.wallet
                                      ?.matching_bonus || 0,
                                },
                                accountable: {
                                  directorship:
                                    thirdLeveLeftLeftPartner?.accountable
                                      ?.directorship || 0,
                                  fixed_deposit:
                                    thirdLeveLeftLeftPartner?.accountable
                                      ?.fixed_deposit || 0,
                                  project_share:
                                    thirdLeveLeftLeftPartner?.accountable
                                      ?.project_share || 0,
                                  share_holder:
                                    thirdLeveLeftLeftPartner?.accountable
                                      ?.share_holder || 0,
                                  team_a_carry:
                                    thirdLeveLeftLeftPartner?.accountable
                                      ?.team_a_carry || 0,
                                  team_a_member:
                                    thirdLeveLeftLeftPartner?.accountable
                                      ?.team_a_member || 0,
                                  team_a_point:
                                    thirdLeveLeftLeftPartner?.accountable
                                      ?.team_a_point || 0,
                                  team_b_carry:
                                    thirdLeveLeftLeftPartner?.accountable
                                      ?.team_b_carry || 0,
                                  team_b_member:
                                    thirdLeveLeftLeftPartner?.accountable
                                      ?.team_b_member || 0,
                                  team_b_point:
                                    thirdLeveLeftLeftPartner?.accountable
                                      ?.team_b_point || 0,
                                  total_amount:
                                    thirdLeveLeftLeftPartner?.accountable
                                      ?.total_amount || 0,
                                  total_carry:
                                    thirdLeveLeftLeftPartner?.accountable
                                      ?.total_carry || 0,
                                  total_point:
                                    thirdLeveLeftLeftPartner?.accountable
                                      ?.total_point || 0,
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
                        className="w-20 h-20 cursor-pointer object-cover rounded-full border-4 border-red-500"
                        alt=""
                      />
                      {thirdLeveLeftLeftPartner?.designation && (
                        <div className="bg-green-600 px-3 py-0.5 rounded-full text-white mt-1">
                          <FaShieldAlt className="inline-block mr-1 font-bold" />
                          {thirdLeveLeftLeftPartner?.designation
                            ? thirdLeveLeftLeftPartner?.designation
                            : ""}
                        </div>
                      )}
                      {/* user name */}
                      <p className="font-bold text-lg  text-black ">
                        {thirdLeveLeftLeftPartner?.user_name
                          ? thirdLeveLeftLeftPartner?.user_name
                          : ""}
                      </p>
                    </div>

                    {/* Right side info */}
                    <div className="z-[300000] text-black font-semibold w-[80px] invisible group-hover:visible transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in">
                      {thirdLeveLeftLeftPartner && (
                        <div className="flex flex-col gap-2 items-center bg-red-400 p-3 rounded-md">
                          <p>Team B</p>
                          <p>
                            {thirdLeveLeftLeftPartner
                              ? thirdLeveLeftLeftPartner?.accountable
                                  ?.team_b_carry
                              : ""}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* thirdLeveLeftRightPartner */}
              <div className="flex justify-center w-full ">
                <div className="flex flex-col items-center justify-center relative w-full">
                  <div className="group w-full flex items-center justify-end mr-5  gap-2">
                    {/* Left side info */}
                    <div className="z-[300000] text-black font-semibold w-[80px]  invisible group-hover:visible transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in">
                      {thirdLeveLeftRightPartner && (
                        <div className="flex flex-col gap-2 items-center bg-red-400 p-3 rounded-md">
                          <p>Team A</p>
                          <p>
                            {thirdLeveLeftRightPartner
                              ? thirdLeveLeftRightPartner?.accountable
                                  ?.team_a_carry
                              : ""}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <img
                        onClick={() => {
                          if (thirdLeveLeftRightPartner) {
                            setTreeModal({
                              open: true,
                              value: {
                                _id: thirdLeveLeftRightPartner?._id || "",
                                reference_id:
                                  thirdLeveLeftRightPartner?.reference_id || "",
                                picture:
                                  thirdLeveLeftRightPartner?.picture || "",
                                parent_placement_id:
                                  thirdLeveLeftRightPartner?.parent_placement_id ||
                                  "",
                                name: thirdLeveLeftRightPartner?.name || "",
                                user_name:
                                  thirdLeveLeftRightPartner?.user_name || "",
                                registration_date:
                                  thirdLeveLeftRightPartner?.registration_date ||
                                  "",
                                phone: thirdLeveLeftRightPartner?.phone || "",
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
                                  matching_bonus:
                                    thirdLeveLeftRightPartner?.wallet
                                      ?.matching_bonus || 0,
                                },
                                accountable: {
                                  directorship:
                                    thirdLeveLeftRightPartner?.accountable
                                      ?.directorship || 0,
                                  fixed_deposit:
                                    thirdLeveLeftRightPartner?.accountable
                                      ?.fixed_deposit || 0,
                                  project_share:
                                    thirdLeveLeftRightPartner?.accountable
                                      ?.project_share || 0,
                                  share_holder:
                                    thirdLeveLeftRightPartner?.accountable
                                      ?.share_holder || 0,
                                  team_a_carry:
                                    thirdLeveLeftRightPartner?.accountable
                                      ?.team_a_carry || 0,
                                  team_a_member:
                                    thirdLeveLeftRightPartner?.accountable
                                      ?.team_a_member || 0,
                                  team_a_point:
                                    thirdLeveLeftRightPartner?.accountable
                                      ?.team_a_point || 0,
                                  team_b_carry:
                                    thirdLeveLeftRightPartner?.accountable
                                      ?.team_b_carry || 0,
                                  team_b_member:
                                    thirdLeveLeftRightPartner?.accountable
                                      ?.team_b_member || 0,
                                  team_b_point:
                                    thirdLeveLeftRightPartner?.accountable
                                      ?.team_b_point || 0,
                                  total_amount:
                                    thirdLeveLeftRightPartner?.accountable
                                      ?.total_amount || 0,
                                  total_carry:
                                    thirdLeveLeftRightPartner?.accountable
                                      ?.total_carry || 0,
                                  total_point:
                                    thirdLeveLeftRightPartner?.accountable
                                      ?.total_point || 0,
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
                        className="w-20 h-20 cursor-pointer object-cover rounded-full border-4 border-red-500"
                        alt=""
                      />
                      {thirdLeveLeftRightPartner?.designation && (
                        <div className="bg-green-600 px-3 py-0.5 rounded-full text-white mt-1">
                          <FaShieldAlt className="inline-block mr-1 font-bold" />
                          {thirdLeveLeftRightPartner?.designation
                            ? thirdLeveLeftRightPartner?.designation
                            : ""}
                        </div>
                      )}
                      {/* user name */}
                      <p className="font-bold text-lg  text-black ">
                        {thirdLeveLeftRightPartner?.user_name
                          ? thirdLeveLeftRightPartner?.user_name
                          : ""}
                      </p>
                    </div>

                    {/* Right side info */}
                    <div className="z-[300000] text-black font-semibold w-[80px] invisible group-hover:visible transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in">
                      {thirdLeveLeftRightPartner && (
                        <div className="flex flex-col gap-2 items-center bg-red-400 p-3 rounded-md">
                          <p>Team B</p>
                          <p>
                            {thirdLeveLeftRightPartner
                              ? thirdLeveLeftRightPartner?.accountable
                                  ?.team_b_carry
                              : ""}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </td>
            {/* thirdLeveRightLeftPartner thirdLeveRightRightPartner */}
            <td className=" flex  items-center w-full">
              {/* thirdLeveRightLeftPartner */}
              <div className="flex justify-center w-full">
                <div className="flex flex-col items-center justify-center relative w-full">
                  <div className="group w-full flex items-center justify-center mr-10 gap-2">
                    {/* Left side info */}
                    <div className="z-[300000] text-black font-semibold w-[80px] invisible group-hover:visible transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in">
                      {thirdLeveRightLeftPartner && (
                        <div className="flex flex-col gap-2 items-center bg-red-400 p-3 rounded-md">
                          <p>Team A</p>
                          <p>
                            {thirdLeveRightLeftPartner
                              ? thirdLeveRightLeftPartner?.accountable
                                  ?.team_a_carry
                              : ""}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <img
                        onClick={() => {
                          if (thirdLeveRightLeftPartner) {
                            setTreeModal({
                              open: true,
                              value: {
                                _id: thirdLeveRightLeftPartner?._id || "",
                                reference_id:
                                  thirdLeveRightLeftPartner?.reference_id || "",
                                picture:
                                  thirdLeveRightLeftPartner?.picture || "",
                                parent_placement_id:
                                  thirdLeveRightLeftPartner?.parent_placement_id ||
                                  "",
                                name: thirdLeveRightLeftPartner?.name || "",
                                user_name:
                                  thirdLeveRightLeftPartner?.user_name || "",
                                registration_date:
                                  thirdLeveRightLeftPartner?.registration_date ||
                                  "",
                                phone: thirdLeveRightLeftPartner?.phone || "",
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
                                  matching_bonus:
                                    thirdLeveRightLeftPartner?.wallet
                                      ?.matching_bonus || 0,
                                },
                                accountable: {
                                  directorship:
                                    thirdLeveRightLeftPartner?.accountable
                                      ?.directorship || 0,
                                  fixed_deposit:
                                    thirdLeveRightLeftPartner?.accountable
                                      ?.fixed_deposit || 0,
                                  project_share:
                                    thirdLeveRightLeftPartner?.accountable
                                      ?.project_share || 0,
                                  share_holder:
                                    thirdLeveRightLeftPartner?.accountable
                                      ?.share_holder || 0,
                                  team_a_carry:
                                    thirdLeveRightLeftPartner?.accountable
                                      ?.team_a_carry || 0,
                                  team_a_member:
                                    thirdLeveRightLeftPartner?.accountable
                                      ?.team_a_member || 0,
                                  team_a_point:
                                    thirdLeveRightLeftPartner?.accountable
                                      ?.team_a_point || 0,
                                  team_b_carry:
                                    thirdLeveRightLeftPartner?.accountable
                                      ?.team_b_carry || 0,
                                  team_b_member:
                                    thirdLeveRightLeftPartner?.accountable
                                      ?.team_b_member || 0,
                                  team_b_point:
                                    thirdLeveRightLeftPartner?.accountable
                                      ?.team_b_point || 0,
                                  total_amount:
                                    thirdLeveRightLeftPartner?.accountable
                                      ?.total_amount || 0,
                                  total_carry:
                                    thirdLeveRightLeftPartner?.accountable
                                      ?.total_carry || 0,
                                  total_point:
                                    thirdLeveRightLeftPartner?.accountable
                                      ?.total_point || 0,
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
                        className="w-20 h-20 cursor-pointer object-cover rounded-full border-4 border-red-500"
                        alt=""
                      />
                      {thirdLeveRightLeftPartner?.designation && (
                        <div className="bg-green-600 px-3 py-0.5 rounded-full text-white mt-1">
                          <FaShieldAlt className="inline-block mr-1 font-bold" />
                          {thirdLeveRightLeftPartner?.designation
                            ? thirdLeveRightLeftPartner?.designation
                            : ""}
                        </div>
                      )}
                      {/* user name */}
                      <p className="font-bold text-lg  text-black ">
                        {thirdLeveRightLeftPartner?.user_name
                          ? thirdLeveRightLeftPartner?.user_name
                          : ""}
                      </p>
                    </div>

                    {/* Right side info */}
                    <div className="z-[300000] text-black font-semibold invisible w-[80px] group-hover:visible transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in">
                      {thirdLeveRightLeftPartner && (
                        <div className="flex flex-col gap-2 items-center w-full bg-red-400 p-3 rounded-md">
                          <p> Team B</p>
                          <p>
                            {thirdLeveRightLeftPartner
                              ? thirdLeveRightLeftPartner?.accountable
                                  ?.team_b_carry
                              : ""}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* thirdLeveRightRightPartner */}
              <div className="flex justify-center w-full ">
                <div className="flex flex-col items-center justify-center relative w-full">
                  <div className="group w-full flex items-center justify-start  gap-2">
                    {/* Left side info */}

                    <div className="z-[300000] text-black font-semibold invisible w-[80px] group-hover:visible transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in">
                      {thirdLeveRightRightPartner && (
                        <div className="flex flex-col gap-2 items-center w-full  p-3 rounded-md bg-red-400">
                          <p> Team A</p>
                          <p>
                            {" "}
                            {thirdLeveRightRightPartner
                              ? thirdLeveRightRightPartner?.accountable
                                  ?.team_a_carry
                              : ""}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <img
                        onClick={() => {
                          if (thirdLeveRightRightPartner) {
                            setTreeModal({
                              open: true,
                              value: {
                                _id: thirdLeveRightRightPartner?._id || "",
                                reference_id:
                                  thirdLeveRightRightPartner?.reference_id ||
                                  "",
                                picture:
                                  thirdLeveRightRightPartner?.picture || "",
                                parent_placement_id:
                                  thirdLeveRightRightPartner?.parent_placement_id ||
                                  "",
                                name: thirdLeveRightRightPartner?.name || "",
                                user_name:
                                  thirdLeveRightRightPartner?.user_name || "",
                                registration_date:
                                  thirdLeveRightRightPartner?.registration_date ||
                                  "",
                                phone: thirdLeveRightRightPartner?.phone || "",
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
                                  matching_bonus:
                                    thirdLeveRightRightPartner?.wallet
                                      ?.matching_bonus || 0,
                                },
                                accountable: {
                                  directorship:
                                    thirdLeveRightRightPartner?.accountable
                                      ?.directorship || 0,
                                  fixed_deposit:
                                    thirdLeveRightRightPartner?.accountable
                                      ?.fixed_deposit || 0,
                                  project_share:
                                    thirdLeveRightRightPartner?.accountable
                                      ?.project_share || 0,
                                  share_holder:
                                    thirdLeveRightRightPartner?.accountable
                                      ?.share_holder || 0,
                                  team_a_carry:
                                    thirdLeveRightRightPartner?.accountable
                                      ?.team_a_carry || 0,
                                  team_a_member:
                                    thirdLeveRightRightPartner?.accountable
                                      ?.team_a_member || 0,
                                  team_a_point:
                                    thirdLeveRightRightPartner?.accountable
                                      ?.team_a_point || 0,
                                  team_b_carry:
                                    thirdLeveRightRightPartner?.accountable
                                      ?.team_b_carry || 0,
                                  team_b_member:
                                    thirdLeveRightRightPartner?.accountable
                                      ?.team_b_member || 0,
                                  team_b_point:
                                    thirdLeveRightRightPartner?.accountable
                                      ?.team_b_point || 0,
                                  total_amount:
                                    thirdLeveRightRightPartner?.accountable
                                      ?.total_amount || 0,
                                  total_carry:
                                    thirdLeveRightRightPartner?.accountable
                                      ?.total_carry || 0,
                                  total_point:
                                    thirdLeveRightRightPartner?.accountable
                                      ?.total_point || 0,
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
                        className="w-20 h-20 cursor-pointer object-cover rounded-full border-4 border-red-500"
                        alt=""
                      />
                      {thirdLeveRightRightPartner?.designation && (
                        <div className="bg-green-600 px-3 py-0.5 rounded-full text-white mt-1">
                          <FaShieldAlt className="inline-block mr-1 font-bold" />
                          {thirdLeveRightRightPartner?.designation
                            ? thirdLeveRightRightPartner?.designation
                            : ""}
                        </div>
                      )}
                      {/* user name */}
                      <p className="font-bold text-lg  text-black ">
                        {thirdLeveRightRightPartner?.user_name
                          ? thirdLeveRightRightPartner?.user_name
                          : ""}
                      </p>
                    </div>

                    {/* Right side info */}

                    <div className="z-[300000] text-black font-semibold invisible w-[80px] group-hover:visible transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in">
                      {thirdLeveRightRightPartner && (
                        <div className="flex flex-col gap-2 items-center w-full p-3 rounded-md bg-red-400">
                          <p> Team B</p>
                          <p>
                            {thirdLeveRightRightPartner
                              ? thirdLeveRightRightPartner?.accountable
                                  ?.team_b_carry
                              : ""}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          {/* )} */}
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
