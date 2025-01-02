"use client";

import React, { useEffect, useState } from "react";
import baseUrl from "../../../../../config";
import Cookies from "js-cookie";
import { Circles } from "react-loader-spinner";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GiTakeMyMoney } from "react-icons/gi";

interface UserData {
  _id: string;
  name: string;
  user_name: string;
  role: string;
  phone: string;
  reference_id: {
    name: string;
  };
  parent_placement_id: {
    name: string;
  };
  left_side_partner: {
    name: string;
  };
  right_side_partner: {
    name: string;
  };
  is_approved: boolean;
}

const Page = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingForApprove, setIsLoadingForApprove] = useState<{
    state: boolean;
    id: string;
  }>({
    state: false,
    id: "",
  });
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [selectUser, setSelectuser] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [childUsers, setChildUsers] = useState<UserData[]>([]);
  const [totalInvesmentRequest, setTotalInvestmentRequest] =
    useState<number>(0);
  const token = Cookies.get("token");
  const [user, setUser] = useState<any>({});
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchedUsers, setSearchedUsers] = useState<any>({});
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageNo, setPageNo] = useState<number>(1);

  const userCookie = Cookies.get("user");

  const router = useRouter();

  // manage cookie
  useEffect(() => {
    if (userCookie) {
      try {
        let userParse: any = JSON.parse(userCookie); // Parse safely
        setUser(userParse);
      } catch (error) {
        console.error("Failed to parse user cookie:", error);
      }
    }
  }, [userCookie]);

  // fetch all users
  const fetchAllUsers = async (clear: boolean) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/user/get-all-users?page=${pageNo}&limit=10&search=${clear ? "" : searchValue}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data.success) {
        setUsers(data?.data?.usersWithPartners);
        setSearchedUsers(data?.data?.usersWithPartners);
        const adminUsers = data?.data?.usersWithPartners?.filter(
          (user: { role: string }) => user?.role === "admin"
        );
        setTotalPages(Math.ceil(data?.data?.total / data?.data?.limit));
        setChildUsers(adminUsers);
      } else {
        toast.error(data.message || "something went wrong");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllInvestmentRequests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/add-money/get-all-requested-add-money`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data?.success) {
        setTotalInvestmentRequest(data?.data?.requestedAddMoney.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // handle send wallet
  const handleSendWallet = async () => {
    const walletData = {
      userId: selectUser,
      purchase_amount: parseInt(amount),
      purchase_from: user?._id,
    };

    axios
      .post(`${baseUrl}/purchase`, walletData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.success) {
          setIsWalletOpen(false);
          toast.success("Send Wallet to Admin Succesfully");
        }
      });
  };

  useEffect(() => {
    fetchAllInvestmentRequests();
  }, [user]);

  useEffect(() => {
    fetchAllUsers(false);
  }, [user, pageNo]);

  // useEffect(() => {
  //   const matchedUser = users.filter((user) =>
  //     user?.user_name.includes(searchValue)
  //   );
  //   console.log("match", matchedUser);

  //   setSearchedUsers(matchedUser);
  // }, [searchValue]);

  const handleSearchUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${baseUrl}/user/get-all-users?page=${searchValue === "" ? pageNo : "1"}&limit=10&search=${searchValue}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setUsers(data?.data?.usersWithPartners);
        // setSearchedUsers(data?.data?.usersWithPartners);
        const adminUsers = data?.data?.usersWithPartners?.filter(
          (user: { role: string }) => user?.role === "admin"
        );
        setTotalPages(Math.ceil(data?.data?.total / data?.data?.limit));
        setChildUsers(adminUsers);
      } else {
        toast.error(data.message || "something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-full pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl text-rose-600 font-bold tracking-widest">
          Users List
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-6 px-4">
          {/* send wallet */}
          <div
            onClick={() => {
              setIsWalletOpen(true);
            }}
            className="flex items-center gap-x-3 bg-teal-200 px-4 py-2 rounded-full text-teal-700  cursor-pointer tracking-wider hover:scale-105 transition-all duration-500 ease-in-out hover:tracking-widest"
          >
            <FaMoneyBillTransfer className="text-2xl" />
            <p> Send Purchase Wallet</p>
          </div>
        </div>
      </div>
      {/* search box */}
      <div className="mt-8 lg:mt-3 flex flex-col md:flex-row md:items-center gap-5">
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchUser();
            }
          }}
          type="text"
          placeholder="Search user by username or serial no."
          className=" w-72 px-2 py-2 text-sm rounded italic bg-white outline-none border-b-2 border-black focus:border-teal-500 "
        />
        <div className="flex items-center gap-4">
          <button
            onClick={handleSearchUser}
            className="px-5 py-2 bg-teal-400 rounded"
          >
            Search
          </button>
          <button
            onClick={(e) => {
              setIsLoading(true);
              setSearchValue("");
              fetchAllUsers(true);
            }}
            className="px-5 py-2 bg-teal-400 rounded"
          >
            Clear
          </button>
        </div>
      </div>

      <div>
        {/* users table */}
        <div
          className={`relative overflow-x-auto ${isLoading ? "min-h-[600px]" : `h-[${searchedUsers.length * 61 + 41}px]`} max-h-[${searchedUsers.length * 61 + 41}px] overflow-y-auto mt-5`}
        >
          <table className="w-full text-sm text-left rtl:text-right text-white ">
            <thead className="sticky top-0 text-xs text-black uppercase bg-teal-200  border-2  border-black rounded-md">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Serial No
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Phone No
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Refer
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Placement
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Left
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Right
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="text-center">
                  <td colSpan={12} align="center">
                    <div className="my-5 flex flex-col justify-center items-center">
                      <Circles
                        height="50"
                        width="50"
                        color="#4fa94d"
                        ariaLabel="circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </div>
                  </td>
                </tr>
              ) : users && users?.length <= 0 ? (
                <tr className="text-center">
                  <td colSpan={12} align="center">
                    <div className="my-5 flex flex-col justify-center items-center">
                      <p className="text-lg text-rose-500">No Data to Show</p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user: any, i: number) => (
                  <tr
                    key={user._id}
                    className={`${i % 2 == 0 ? "bg-teal-50" : "bg-teal-200"} cursor-pointer transition-all duration-500 ease-in text-black border-2 border-slate-700`}
                  >
                    <td className="px-6 py-4 text-left">{user?.name}</td>
                    <td
                      onClick={() => {
                        router.push(
                          `/dashboard/man-management/userDetails/${user?._id}`
                        );
                      }}
                      className="px-6 py-4 text-left cursor-pointer hover:text-red-700 hover:underline"
                    >
                      {user?.user_name}
                    </td>
                    <td className="px-6 py-4 text-left">
                      {user?.serial_number}
                    </td>
                    <td className="px-6 py-4 text-left">{user?.role}</td>
                    <td className="px-6 py-4 text-left">{user?.phone}</td>
                    <td className="px-6 py-4 text-left">
                      {user?.reference_id?.user_name}
                    </td>
                    <td className="px-6 py-4 text-left">
                      {user?.parent_placement_id?.user_name}
                    </td>
                    <td className="px-6 py-4 text-left">
                      {user?.left_side_partner?.user_name ? (
                        user?.left_side_partner?.user_name
                      ) : (
                        <p className="text-red-500 font-bold">Empty</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-left">
                      {user?.right_side_partner?.user_name ? (
                        user?.right_side_partner?.user_name
                      ) : (
                        <p className="text-red-500 font-bold">Empty</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-left">
                      {user?.is_approved ? (
                        <p className="text-teal-700 font-bold">Active</p>
                      ) : (
                        <p className="text-rose-700 font-semibold">Inactive</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-left">
                      {user?.is_approved ? (
                        <p className="italic py-1 rounded-md text-teal-700 text-center">
                          Approved
                        </p>
                      ) : (
                        <div
                          onClick={async () => {
                            if (!isLoadingForApprove.state) {
                              setIsLoadingForApprove({
                                state: true,
                                id: user?._id,
                              });
                              try {
                                const response = await fetch(
                                  `${baseUrl}/user/auth/${user?._id}`,
                                  {
                                    method: "PUT",
                                    body: JSON.stringify({ is_approved: true }),
                                    headers: {
                                      "Content-Type": "application/json",
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                );

                                if (!response.ok) {
                                  toast.error(
                                    "This user approvation is not possible"
                                  );
                                }

                                const data = await response.json();

                                if (data.success) {
                                  toast.success("User Approved");
                                  fetchAllUsers(false);
                                }
                              } catch (error: any) {
                                toast.error(error.message);
                              } finally {
                                setIsLoadingForApprove({
                                  state: false,
                                  id: "",
                                });
                              }
                            }
                          }}
                          className={`${isLoadingForApprove.state ? "cursor-not-allowed" : "cursor-pointer"} rounded-md transition-all duration-300 ease-in`}
                        >
                          {isLoadingForApprove &&
                          isLoadingForApprove.id === user?._id ? (
                            "Loading.."
                          ) : (
                            <p className="bg-rose-300 text-rose-700 rounded-md px-3 py-1 text-center">
                              Approve
                            </p>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-5 flex flex-wrap items-center gap-3 justify-center self-center">
            {/* Previous button */}
            {pageNo > 1 && (
              <p
                onClick={() => setPageNo(pageNo - 1)}
                className={`border-2 px-2 rounded-md cursor-pointer border-black text-black`}
              >
                Prev
              </p>
            )}

            {/* Page numbers */}
            {(() => {
              // Determine the range of page numbers to display
              let startPage = Math.max(1, pageNo - 5);
              let endPage = Math.min(totalPages, pageNo + 4);

              // Adjust start and end pages to always show 10 pages when possible
              if (endPage - startPage < 9) {
                if (startPage === 1) {
                  endPage = Math.min(totalPages, startPage + 9);
                } else if (endPage === totalPages) {
                  startPage = Math.max(1, endPage - 9);
                }
              }

              return Array.from(
                { length: endPage - startPage + 1 },
                (_, index) => {
                  const page = startPage + index;
                  return (
                    <p
                      key={page}
                      onClick={() => setPageNo(page)}
                      className={`border-2 px-2 rounded-md cursor-pointer ${
                        pageNo === page
                          ? "bg-black text-white"
                          : "text-black border-black"
                      }`}
                    >
                      {page}
                    </p>
                  );
                }
              );
            })()}

            {/* Next button */}
            {pageNo < totalPages && (
              <p
                onClick={() => setPageNo(pageNo + 1)}
                className={`border-2 px-2 rounded-md cursor-pointer border-black text-black`}
              >
                Next
              </p>
            )}
          </div>
        )}
      </div>

      {/* wallet modal */}
      {isWalletOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsWalletOpen(false);
            }
          }}
          className="w-full min-h-[100vh] bg-black bg-opacity-80 fixed top-0 right-0 flex justify-center items-center cursor-pointer z-[1000]"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-[400px] h-[300px] bg-white rounded"
          >
            {/* head */}
            <div className="py-4 px-6 flex justify-between items-center rounded bg-gray-300 text-black">
              <p>Send Purchase Wallet</p>
              <p
                onClick={() => setIsWalletOpen(false)}
                className="bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in px-3 py-1 rounded-md cursor-pointer text-white"
              >
                Close
              </p>
            </div>

            {/* body */}
            <div className="mt-5 px-3 flex flex-col gap-y-10 ">
              <div className="flex items-center justify-between gap-10">
                <label
                  htmlFor="username"
                  className="text-black font-bold  tracking-wider"
                >
                  User
                </label>
                <select
                  onChange={(e) => setSelectuser(e.target.value)}
                  className="border border-gray-700 w-[200px] px-5 py-2  rounded-md bg-transparent"
                  name="username"
                  id="username"
                >
                  <option value="">Select User</option>
                  {childUsers?.map(
                    (
                      child: { _id: string; name: string; user_name: string },
                      i
                    ) => (
                      <option key={i} value={child?._id}>
                        {`${child?.name}--${child?.user_name}`}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="flex items-center justify-between gap-10">
                <label
                  htmlFor="amount"
                  className="text-black font-bold  tracking-wider"
                >
                  Amount
                </label>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  type="text"
                  className="border border-gray-700 w-[200px] px-5 py-2  rounded-md bg-transparent"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            {/* footer */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={handleSendWallet}
                className="bg-teal-500 px-6 py-2 rounded-md cursor-pointer text-white hover:scale-105 hover:tracking-widest transition-all duration-300 ease-in"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
