import React from "react";
import { fugaz } from "@/app/fonts/fonts";
import Button from "./Button";

function Login() {
  return (
    <section className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={`text-xl sm:text-2xl md:text-3xl ${fugaz.className}`}>
        Log In | Sign Up
      </h3>
      <p>You&#39;re one step away!</p>
      <input
        className="w-full max-w-[300px] mx-auto px-4 py-2 sm:py-3 border border-solid border-[#ff9a9e] rounded-full outline-none duration-200 hover:border-[#e65156] focus:border-[#e65156]"
        placeholder="Email"
        type="email"
      />
      <input
        className="w-full max-w-[300px] mx-auto px-4 py-2 sm:py-3 border border-solid border-[#ff9a9e] rounded-full outline-none duration-200 hover:border-[#e65156] focus:border-[#e65156]"
        placeholder="Password"
        type="password"
      />
      <div className="w-full max-w-[300px] mx-auto">
        <Button text="Submit" full />
      </div>
      <p className="text-center">
        Don&#39;t have an account?{" "}
        <span className="text-[#ff9a9e] cursor-pointer">Sign up</span>
      </p>
    </section>
  );
}

export default Login;
