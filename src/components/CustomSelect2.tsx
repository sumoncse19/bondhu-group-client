import React, { useState } from "react";

export const CustomSelect2 = ({
  allUser,
  setReferenceId,
  fetchChildUsersLevel2,
}: {
  allUser: [];
  setReferenceId: (id: string) => void;
  fetchChildUsersLevel2: (id: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ user_name: string; _id: string }>({
    user_name: "",
    _id: "",
  });

  const handleOptionSelect = (user: any) => {
    setReferenceId(user?._id);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full flex flex-col lg:flex-row gap-2">
      <label
        className="absolute -top-3 left-3 bg-[#F3F4F6] px-2 text-sm"
        htmlFor="placement_id"
      >
        Reference ID
        <p className="inline text-red-500 text-lg font-bold">*</p>
      </label>

      <div
        className="w-full cursor-pointer bg-transparent text-gray-7s00 px-5 py-3 rounded-md border-2 border-black"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {user?.user_name ? user?.user_name : <span>Select Reference ID</span>}
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
          {/* Search Field */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-2 border-b border-gray-200 outline-none bg-transparent"
            />
          </div>

          {/* Filtered Options */}
          {allUser
            .filter((user: { name: string; user_name: string; _id: string }) =>
              user?.user_name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user: { user_name: string; _id: string }, index) => (
              <div
                key={index}
                onClick={() => {
                  handleOptionSelect(user);
                  setUser(user);
                  fetchChildUsersLevel2(user?._id);
                }}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                {user?.user_name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
