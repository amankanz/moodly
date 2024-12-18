import React from "react";
import { fugaz } from "@/app/fonts/fonts";

interface ButtonProps {
  text: string;
  dark?: boolean;
  full?: boolean;
  clickHandler: () => void;
}

function Button({ text, dark, full, clickHandler }: ButtonProps) {
  return (
    <button
      onClick={clickHandler}
      className={`rounded-full overflow-hidden border-2 duration-200 hover:opacity-60 border-solid border-[#ff9a9e] ${
        dark ? "text-white bg-[#ff9a9e] border-[#ff9a9e]" : "text-[#ff9a9e]"
      } ${full ? "grid place-items-center w-full" : ""}`}
    >
      <p
        className={`px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ${fugaz.className}`}
      >
        {text}
      </p>
    </button>
  );
}

export default Button;
