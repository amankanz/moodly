import React from "react";
import { fugaz } from "@/app/fonts/fonts";

interface ButtonProps {
  text: string;
  dark?: boolean;
  full?: boolean;
  clickHandler?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset"; // Optional button type
  disabled?: boolean;
}

function Button({
  text,
  dark,
  full,
  clickHandler,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={clickHandler}
      type={type}
      disabled={disabled}
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
