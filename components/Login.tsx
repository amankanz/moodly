"use client";

import React, { useState } from "react";
import { fugaz } from "@/app/fonts/fonts";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { signup, login } = useAuth(); // Assuming this doesn't manipulate isLoading directly.

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Prevent page reload
    setErrorMessage(null); // Reset error message

    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password.length < 5) {
      setErrorMessage("Password must be at least 5 characters long.");
      return;
    }

    setAuthenticating(true); // Local loading state
    try {
      if (isRegister) {
        await signup({ email, password });
      } else {
        await login({ email, password });
      }
    } catch (err) {
      setErrorMessage(
        isRegister
          ? "An error occurred during registration. Please try again."
          : "User not found or incorrect credentials."
      );
    } finally {
      setAuthenticating(false); // Reset local loading state
    }
  }

  return (
    <form
      className="flex flex-col flex-1 justify-center items-center gap-4"
      onSubmit={handleSubmit}
    >
      <h3 className={`text-xl sm:text-2xl md:text-3xl ${fugaz.className}`}>
        {isRegister ? "Register" : "Log In"}
      </h3>
      <p>You&#39;re one step away!</p>
      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}
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
        <Button
          type="submit"
          text={authenticating ? "Submitting..." : "Submit"}
          full
          disabled={authenticating}
        />
      </div>
      <p className="text-center">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsRegister(!isRegister);
          }}
          className="text-[#ff9a9e] cursor-pointer"
        >
          {isRegister ? "Sign in" : "Sign up"}
        </button>
      </p>
    </form>
  );
}

export default Login;
