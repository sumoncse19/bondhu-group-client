import React, { useState } from "react";

export const CustomSelect = ({
  childUsers,
  setParentPlacementId,
  setCurrentOptions,
}: {
  childUsers: [];
  setParentPlacementId: (id: string) => void;
  setCurrentOptions: (options: object) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ name: string }>({ name: "" });

  const handleOptionSelect = (user: any) => {
    setParentPlacementId(user?._id);
    setIsDropdownOpen(false);

    const currentAvailableSides = [];

    if (user.left_side_partner === null) {
      currentAvailableSides.push({
        value: "a",
        label: "A",
      });
    }
    if (user.right_side_partner === null) {
      currentAvailableSides.push({
        value: "b",
        label: "B",
      });
    }
    if (user.left_side_partner !== null && user.right_side_partner !== null) {
      currentAvailableSides.push({
        value: "",
        label: "Both Sides are fillup",
      });
    }
    setCurrentOptions(currentAvailableSides);
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
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
          {/* Search Field */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full px-3 py-2 border-b border-gray-200 outline-none"
          />

          {/* Filtered Options */}
          {childUsers
            .filter((user: { name: string }) =>
              user?.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user: { name: string }, index) => (
              <div
                key={index}
                onClick={() => {
                  handleOptionSelect(user);
                  setUser(user);
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
