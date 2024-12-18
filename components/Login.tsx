/*
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
*/

"use client";

import React, { useState } from "react";
import { fugaz } from "@/app/fonts/fonts";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [setAuthenticating, setAuthenticating] = useState<boolean>();

  const { signup, login } = useAuth;

  async function handleSubmit() {
    if (!email || !password || password.length < 5) {
      return;
    }

    setAuthenticating(true);
    try {
      if (isRegister) {
        console.log("Login an existing user!");
        await signup(email, password);
      } else {
        console.log("Signing up a new user.");
        await login(email, password);
      }
    } catch (err) {
      console.log("Error Message:", err);
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <section className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={`text-xl sm:text-2xl md:text-3xl ${fugaz.className}`}>
        {isRegister ? "Log In" : "Sign Up"}
      </h3>
      <p>You&#39;re one step away!</p>
      <input
        className="w-full max-w-[300px] mx-auto px-4 py-2 sm:py-3 border border-solid border-[#ff9a9e] rounded-full outline-none duration-200 hover:border-[#e65156] focus:border-[#e65156]"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full max-w-[300px] mx-auto px-4 py-2 sm:py-3 border border-solid border-[#ff9a9e] rounded-full outline-none duration-200 hover:border-[#e65156] focus:border-[#e65156]"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="w-full max-w-[300px] mx-auto">
        <Button text="Submit" full />
      </div>
      <p className="text-center">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-[#ff9a9e] cursor-pointer"
        >
          {isRegister ? "Sign in" : "Sign up"}
        </button>
      </p>
    </section>
  );
}

export default Login;
