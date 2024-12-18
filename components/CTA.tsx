"use client";

import Link from "next/link";
import React from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

function CTA() {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="w-full max-w-xl mx-auto">
        <Link href={"/dashboard"}>
          <Button dark full text="Go to dashboard" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
      <Link href={"/dashboard"}>
        <Button dark full text="Sign in" />
      </Link>
      <Link href={"/dashboard"}>
        <Button text="Login" dark />
      </Link>
    </div>
  );
}

export default CTA;
