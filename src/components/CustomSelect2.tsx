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
  const [user, setUser] = useState<{ name: string }>({ name: "" });

  const handleOptionSelect = (user: any) => {
    setReferenceId(user?._id);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full flex gap-y-2">
      <label className="px-2 text-sm" htmlFor="placement_id">
        Placement ID
        <p className="inline text-red-500 text-lg font-bold">*</p>
      </label>

      <div
        className="w-full cursor-pointer bg-[#EAE9E8] text-gray-7s00 px-5 py-3 rounded-md border-2 border-black"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {user?.name ? user?.name : <span>Select Placement ID</span>}
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
          {/* Search Field */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full px-3 py-2 border-b border-gray-200 outline-none"
          />

          {/* Filtered Options */}
          {allUser
            .filter((user: { name: string; _id: string }) =>
              user?.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user: { name: string; _id: string }, index) => (
              <div
                key={index}
                onClick={() => {
                  handleOptionSelect(user);
                  setUser(user);
                  fetchChildUsersLevel2(user?._id);
                }}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                {user?.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
