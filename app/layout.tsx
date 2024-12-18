import type { Metadata } from "next";
import "./globals.css";
import { fugaz, openSans } from "@/app/fonts/fonts";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Logout from "@/components/Logout";
// import Head from "./head";

export const metadata: Metadata = {
  title: "Moodly",
  description:
    "Track your moods year-round, fostering self-awareness and emotional growth!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={"/"}>
        <h1 className={`text-base sm:text-lg textGradient ${fugaz.className}`}>
          Moodly
        </h1>
      </Link>

      <Logout />
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={`text-[#ff9a9e] ${fugaz.className}`}>
        &copy;{" "}
        <a
          href="https://kanezaio.netlify.app/"
          target="_blank"
          className="underline hover:no-underline"
          rel="noreferrer"
        >
          Kaneza.io
        </a>{" "}
        {new Date().getFullYear()} | Created with 💗
      </p>
    </footer>
  );

  return (
    <html lang="en">
      {/* <Head /> */}
      <AuthProvider>
        <body
          className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-700 ${openSans.className}`}
        >
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
