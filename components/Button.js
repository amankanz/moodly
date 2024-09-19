import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Button({ text, dark }) {
  return (
    <button
      className={`rounded-full overflow-hidden border-2 duration-200 hover:opacity-60 border-solid border-[#ff9a9e] ${
        dark ? "text-white bg-[#ff9a9e] border-[#ff9a9e]" : "text-[#ff9a9e]"
      }`}
    >
      <p
        className={`px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ${fugaz.className}`}
      >
        {text}
      </p>
    </button>
  );
}
