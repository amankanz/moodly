"use client";

import React from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Logout() {
  const { logout, user } = useAuth();
  const pathname = usePathname();

  console.log("PATHNAME:", pathname);

  if (!user) {
    return null;
  }

  if (pathname === "/") {
    return (
      <Link href={"/dashboard"}>
        <Button text="Go to dashboard" />
      </Link>
    );
  }
  return <Button text="Logout" clickHandler={logout} />;
}

export default Logout;
