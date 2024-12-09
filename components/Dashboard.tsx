import { fugaz } from "@/app/fonts/fonts";
import React from "react";
import Calendar from "./Calendar";

interface Statuses {
  num_days: number;
  time_remaining: string;
  date: string;
}

interface Moods {
  "&*@#$": string;
  Sad: string;
  Existing: string;
  Good: string;
  Elated: string;
}

function Dashboard() {
  const statuses: Statuses = {
    num_days: 14,
    time_remaining: "14:28:39",
    date: new Date().toDateString(),
  };

  const moods: Moods = {
    "&*@#$": "😭",
    Sad: "😢",
    Existing: "😶",
    Good: "🙂",
    Elated: "😍",
  };

  return (
    <section className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3 bg-[#ffdbdc] text-[#ff9a9e] rounded-lg p-4 gap-4">
        {Object.keys(statuses).map((status, index) => {
          return (
            <div key={index} className="flex flex-col gap-1 sm:gap-2">
              <p className="font-medium uppercase text-xs sm:text-sm truncate">
                {status.replaceAll("_", " ")}
              </p>
              <p className={`text-base sm:text-lg ${fugaz.className} truncate`}>
                {statuses[status as keyof typeof statuses]}
              </p>
            </div>
          );
        })}
      </div>

      <h4
        className={`text-3xl sm:text-4xl md:text-5xl text-center ${fugaz.className}`}
      >
        How are you <span className="textGradient">feeling</span> today?
      </h4>
      <div className="flex items-stretch flex-wrap gap-4">
        {Object.keys(moods).map((mood, index) => {
          return (
            <button
              className={`py-4 px-5 rounded-2xl pinkShadow duration-200 bg-red-200 hover:bg-[#ff9a9e] flex-1 text-center flex flex-col items-center gap-2`}
              key={index}
            >
              <p
                className={`text-2xl sm:text-3xl md:text-4xl ${fugaz.className}`}
              >
                {moods[mood as keyof typeof moods]}
              </p>
              <p
                className={`text-xs sm:text-sm md:text-lg ${fugaz.className} text-red-400`}
              >
                {mood}
              </p>
            </button>
          );
        })}
      </div>

      <Calendar />
    </section>
  );
}

export default Dashboard;
