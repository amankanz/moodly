import React from "react";
import { fugaz } from "@/app/fonts/fonts";
import Button from "./Button";
import Calendar from "./Calendar";
import Link from "next/link";
import { demoData } from "@/libs/utilities";
import CTA from "./CTA";

function Hero() {
  return (
    <section className="py-10 sm:py-14 md:py-10 flex flex-col gap-4 sm:gap-8">
      <h1
        className={`text-xl sm:text-2xl md:text-3xl text-center ${fugaz.className}`}
      >
        <span className="textGradient">Moodly</span> helps you track your moods
        on a <span className="textGradient">daily</span> basis year-round,
        fostering <span className="textGradient">self-awareness</span> and{" "}
        <span className="textGradient">emotional growth</span>!
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[500px]">
        Record your moods and track how you feel{" "}
        <span className="font-semibold">everyday of every year</span>.
      </p>

      {/* Call To Action Buttons */}
      <CTA />

      {/* Pass demo data to the Calendar component */}
      <Calendar
        demo={true}
        completeData={{
          [new Date().getFullYear()]: { [new Date().getMonth()]: demoData },
        }}
        hideNavigation={true}
      />
    </section>
  );
}

export default Hero;
