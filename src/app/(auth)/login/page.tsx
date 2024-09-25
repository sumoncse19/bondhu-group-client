"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
interface IFormInput {
  email: string;
  password: string;
}
const page = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data); // Now logs the actual form data
  };
  return (
    <div className="flex items-center min-h-[100vh] loginbg bg-opacity-100  bg-no-repeat bg-cover  backdrop-blur-lg bg-white text-black">
      {/* left side */}
      <div className="min-h-[100vh] w-full lg:w-[50%] order-2">
        <div className="px-4 py-10 lg:p-28">
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
              <label className="font-bold" htmlFor="email">
                Email <p className="inline text-red-500">*</p>
              </label>
              <div className="flex">
                <input
                  className="border-b border-black w-full px-4 py-2 rounded focus:border-b-2 focus:border-blue-600 outline-none text-sm"
                  placeholder="Write your mail"
                  {...register("email", { required: true })}
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold" htmlFor="password">
                Password <p className="inline text-red-500">*</p>
              </label>
              <div className="flex">
                <input
                  className="border-b border-black w-full px-4 py-2 rounded focus:border-b-2 focus:border-blue-600 outline-none text-sm"
                  placeholder="Write your password"
                  type="password"
                  {...register("password", { required: true })}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
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
            </div>
            <div className="mt-6 bg-[#3B82F6] text-white flex justify-center py-4 rounded-full hover:shadow-2xl hover:scale-95 transition-all duration-300 ease-in-out cursor-pointer">
              <button type="submit" className="w-full text-xl">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* rigth side */}
      <div className="self-start  lg:items-center w-[50%] min-h-[100vh] hidden lg:flex px-6 order-1">
        <img
          className="w-full h-[600px] rounded"
          src="/images/loginPageImg2.png"
          alt=""
        />
      </div>
    </div>
  );
};
export default page;
