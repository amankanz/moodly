import type { Metadata } from "next";
import Dashboard from "@/components/Dashboard";
import Main from "@/components/Main";
import Login from "@/components/Login";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";

export const metadata: Metadata = {
  title: "Moodly · Dashboard",
};

function DashboardPage() {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
}

export default DashboardPage;
