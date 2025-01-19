"use client";
import Password from "antd/es/input/Password";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import baseUrl from "../../../../config";
import { error, log } from "console";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ThreeCircles } from "react-loader-spinner";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Cookies from "js-cookie";
import useStore from "../../../Zustand/Store/userStore";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
interface IFormInput {
  username: string;
  password: string;
}
const page = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);

    const userData = {
      user_name: data.username,
      password: data.password,
    };

    try {
      const response = await fetch(`${baseUrl}/user/auth/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        if (data?.data?.is_approved) {
          Cookies.set("user", JSON.stringify(data?.data));
          Cookies.set("token", data?.token);
          Cookies.set("id", data?.data?._id);
          Cookies.set("role", data?.data?.role);
          Cookies.set("username", data?.data?.name);
          Cookies.set(
            "have_purchase_wallet",
            data?.data?.wallet?.purchase_wallet > 0 ? "yes" : "no"
          );

          router.push("/dashboard");
          toast.success("Successfully Login");
        } else {
          toast.error("This User is not Approved by Admin Yet");
        }
        reset();
      } else {
        alert(data.errors[0]);
      }
    } catch (error: any) {
      // toast.error(error.message);
      toast.error("Access Denied. Please, Contact with Developers.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center min-h-[100vh] loginbg bg-opacity-100  bg-no-repeat bg-cover  backdrop-blur-lg bg-white text-black">
        {/* left side */}
        <div className="min-h-[100vh] w-full lg:w-[50%] flex items-center justify-center order-2 ">
          <div className="px-4 py-10  ">
            <div className="flex flex-col items-center">
              <h1 className="text-base lg:text-4xl font-bold">Welcome Back!</h1>
              <p className="py-2 text-gray-500 text-sm">
                Enter to get unlimited access of data & information.
              </p>
            </div>
            {/* login form  */}
            <form
              className="flex flex-col gap-y-3 pt-16"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-1">
                <label className="font-bold" htmlFor="username">
                  Username <p className="inline text-red-500">*</p>
                </label>
                <div className="flex">
                  <input
                    className="border-b border-black bg-white w-full px-4 py-2 rounded focus:border-b-2 focus:border-blue-600 outline-none text-sm"
                    placeholder="Write your username"
                    {...register("username", { required: true })}
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold" htmlFor="password">
                  Password <p className="inline text-red-500">*</p>
                </label>
                <div className="flex relative">
                  <input
                    className="border-b border-black bg-white w-full px-4 py-2 rounded focus:border-b-2 focus:border-blue-600 outline-none text-sm"
                    placeholder="Write your password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                  />
                  {showPassword ? (
                    <IoEye
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-5 bottom-2 cursor-pointer text-lg"
                    />
                  ) : (
                    <IoEyeOff
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-5 bottom-2 cursor-pointer text-lg"
                    />
                  )}
                </div>
              </div>
              {/* <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  className=" h-4 w-4 border border-gray-300 rounded-md outline-none checked:bg-blue-600 checked:border-transparent checked:outline-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                  type="checkbox"
                  name=""
                  id=""
                />
                <p>Remember me</p>
              </div>
              <div className="text-gray-600 text-sm">Forgot your password?</div>
            </div> */}
              <div className="mt-16 bg-[#3B82F6] text-white flex justify-center  rounded-full hover:shadow-2xl hover:scale-95 transition-all duration-300 ease-in-out cursor-pointer">
                <button
                  type="submit"
                  className="w-full h-full py-4 flex justify-center items-center text-xl"
                >
                  {isLoading ? (
                    <ThreeCircles
                      visible={true}
                      height="40"
                      width="40"
                      color="#fff"
                      ariaLabel="three-circles-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <p>Login</p>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* rigth side */}
        <div className="lg:items-center w-[50%] min-h-[100vh] hidden lg:flex px-6 order-1">
          <img
            className="w-full h-[600px] rounded object-contain"
            src="/images/loginPageImg4.png"
            alt=""
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default page;
