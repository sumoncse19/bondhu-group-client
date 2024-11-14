"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Button = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const cookieUser = Cookies.get("user") || "";
    setUser(cookieUser); // Set the user state after the client has loaded
  }, []);

  const path = user === "" ? "/login" : "/dashboard";
  const text = user === "" ? "Log in" : "Go to Panel";

  return (
    <div className="flex">
      <div className="cursor-pointer hover:scale-90 hover:shadow-xl transition-all duration-300 ease-in bg-teal-500 font-medium px-5 lg:px-16 py-1 lg:py-3 rounded-lg">
        <Link href={path} className="text-white">
          {text}
        </Link>
      </div>
    </div>
  );
};

export default Button;
