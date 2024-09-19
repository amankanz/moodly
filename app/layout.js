// import local Font from "next/font/local";
import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: "400",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Moodly",
  description: "Track Your Feelings, Know Yourself.",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <h1 className={`text-base sm:text-lg textGradient ${fugaz.className}`}>
        Moodly
      </h1>
      <div className="flex items-center justify-between">
        PLACEHOLDER Cur Page
      </div>
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={`text-[#ff9a9e] ${fugaz.className}`}>
        Created with 💗 | &copy;{" "}
        <a
          href="https://kanezaio.netlify.app/"
          target="_blank"
          className="underline hover:no-underline"
        >
          Kaneza.io
        </a>
      </p>
    </footer>
  );

  return (
    <html lang="en">
      <body
        className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-700 ${openSans.className} `}
      >
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
