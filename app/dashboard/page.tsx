import type { Metadata } from "next";
import Dashboard from "@/components/Dashboard";
import Main from "@/components/Main";

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
