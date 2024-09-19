import { Fugaz_One } from "next/font/google";
import Button from "./Button";
import Calendar from "./Calendar";

const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Hero() {
  return (
    <div className="py-4  md:py-12 flex flex-col gap-4 sm:gap-8">
      <h1
        className={`text-3xl sm:text-4xl md:text-5xl text-center ${fugaz.className}`}
      >
        <span className="textGradient">Moodly</span> helps you track your
        Feelings, <span className="textGradient">know yourself.</span>
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[500px]">
        Record your moods and track how you feel on a
        <span className="font-semibold"> daily basis</span>.
      </p>

      <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
        <Button text="Signup" />
        <Button text="Login" dark />
      </div>

      <Calendar />
    </div>
  );
}
