"use client";

import Link from "next/link";
import React from "react";

const Button = () => {
  return (
    <div className="flex">
      <div className="cursor-pointer hover:scale-90 hover:shadow-xl transition-all duration-300 ease-in bg-green-300 px-16 py-3 rounded-lg">
        <Link href="/login" className="  text-black ">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Button;
