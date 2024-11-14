import React from "react";
import { LuAlertTriangle } from "react-icons/lu";

const WarningMessage = () => {
  return (
    <div className="w-full h-12 flex justify-center items-center gap-x-3 uppercase text-red-700 bg-red-200">
      <LuAlertTriangle className="text-xl" />
      <p> This site is Under Construction</p>
      <LuAlertTriangle className="text-xl" />
    </div>
  );
};

export default WarningMessage;
