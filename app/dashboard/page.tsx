import React from "react";
import type { Metadata } from "next";
import Dashboard from "@/components/Dashboard";
import Main from "@/components/Main";
import Login from "@/components/Login";

export const metadata: Metadata = {
  title: "Moodly · Dashboard",
};

function DashboardPage() {
  const isAuthenticated = true;

  let children = <Login />;

  if (isAuthenticated) {
    children = <Dashboard />;
  }

  return <Main>{children}</Main>;
}

export default DashboardPage;
