/*
import React from "react";
import { gradients, baseRating, demoData } from "@/libs/utilities";

interface CalendarProps {
  demo?: boolean;
}

const months: Record<string, string> = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

const now = new Date();

const daysOfWeek: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function Calendar({ demo }: CalendarProps) {
  const year = 2024;
  const month = "December";
  const monthNow = new Date(year, Object.keys(months).indexOf(month), 1);
  const firstDayOfMonth = monthNow.getDay(); // Day index of the first day of the month

  const daysInMonth = new Date(
    year,
    Object.keys(months).indexOf(month) + 1,
    0
  ).getDate(); // Total days in the month
  const daysToDisplay = firstDayOfMonth + daysInMonth;

  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <section className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
      {Array.from(Array(numRows)).map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="grid grid-cols-7 gap-1">
            {daysOfWeek.map((dayOfWeek, dayOfWeekIndex) => {
              const dayIndex =
                rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

              const displayDay =
                dayIndex > daysInMonth
                  ? false
                  : row === 0 && dayOfWeekIndex
                  ? false
                  : true;

              const isToday = dayIndex === now.getDate();

              if (!displayDay) {
                return <div className="bg-white" key={dayOfWeekIndex} />;
              }

              const color = demo
                ? gradients.red[baseRating[dayIndex]]
                : dayIndex in demoData
                ? gradients.red[demoData[dayIndex]]
                : "white";

              return (
                <div
                  style={{ background: color }}
                  key={dayOfWeekIndex}
                  className={`text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ${
                    isToday ? "border-red-400" : "border-red-100"
                  } ${color === "white" ? "text-red-400" : "text-white"}`}
                >
                  {dayIndex}
                </div>
              );
            })}
          </div>
        );
      })}
    </section>
  );
}

export default Calendar;
*/

/*
"use client";
import React, { useState } from "react";
import { gradients, baseRating, demoData } from "@/libs/utilities";

interface CalendarProps {
  demo?: boolean;
  completeData?: Record<string, any>;
  handleSetMood?: (mood: number) => Promise<void>; // Updated to match the actual function
}

const months: Record<string, string> = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

// const now = new Date();

const daysOfWeek: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function Calendar({ demo, completeData, handleSetMood }: CalendarProps) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const monthNames = Object.keys(months); // ["January", "February", ...]
  const [selectedMonth, setSelectedMonth] = useState(monthNames[currentMonth]); // Correct mapping
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const numericMonth = Object.keys(months).indexOf(selectedMonth);

  const data = completeData?.[selectedYear]?.[numericMonth] || {};

  function handleIncrementMonth(value: number) {
    // value +1 -1
    // If we hit bounds of the months. then we can adjust the year that is displayed instead
  }

  console.log("Selected Month:", selectedMonth);

  const monthNow = new Date(
    selectedYear,
    Object.keys(months).indexOf(selectedMonth),
    1
  );
  const firstDayOfMonth = monthNow.getDay(); // Day index of the first day of the month

  const daysInMonth = new Date(
    selectedYear,
    Object.keys(months).indexOf(selectedMonth) + 1,
    0
  ).getDate(); // Total days in the month

  const daysToDisplay = firstDayOfMonth + daysInMonth;

  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <section className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
      {Array.from(Array(numRows)).map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="grid grid-cols-7 gap-1">
            {daysOfWeek.map((dayOfWeek, dayOfWeekIndex) => {
              const dayIndex =
                rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

              const displayDay = dayIndex > 0 && dayIndex <= daysInMonth;

              const isToday = dayIndex === now.getDate();

              if (!displayDay) {
                return <div className="bg-white" key={dayOfWeekIndex} />;
              }

              // const color = demo
              //   ? gradients.red[baseRating[dayIndex] ?? 0] // Fallback to a default value
              //   : dayIndex in demoData
              //   ? gradients.red[demoData[dayIndex] ?? 0]
              //   : "white";
              const color = completeData?.[selectedYear]?.[numericMonth]?.[
                dayIndex
              ]
                ? gradients.red[
                    completeData[selectedYear][numericMonth][dayIndex]
                  ]
                : "white";

              return (
                <div
                  style={{ background: color }}
                  key={dayOfWeekIndex}
                  className={`text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ${
                    isToday ? "border-slate-700" : "border-red-100"
                  } ${color === "white" ? "text-red-400" : "text-white"}`}
                >
                  {dayIndex}
                </div>
              );
            })}
          </div>
        );
      })}
    </section>
  );
}

export default Calendar;
*/

"use client";
import React, { useState } from "react";
import { gradients } from "@/libs/utilities";

interface CalendarProps {
  demo?: boolean;
  completeData?: Record<string, any>;
  handleSetMood?: (mood: number) => Promise<void>;
}

const months: Record<string, string> = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

const daysOfWeek: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function Calendar({ demo, completeData, handleSetMood }: CalendarProps) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthNames = Object.keys(months); // ["January", "February", ...]
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // const numericMonth = Object.keys(months).indexOf(selectedMonth);
  const numericMonth = Object.keys(months).indexOf(monthNames[selectedMonth]);

  const data = completeData?.[selectedYear]?.[numericMonth] || {};
  if (process.env.NODE_ENV === "development") {
    console.log(
      "THIS MONTH DATA:",
      completeData?.[selectedYear]?.[selectedMonth]
    );
  }

  // Handles month increment and decrement
  function handleIncrementMonth(value: number) {
    let newMonth = selectedMonth + value;
    let newYear = selectedYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  }

  const monthNow = new Date(selectedYear, selectedMonth, 1);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.ceil(daysToDisplay / 7);

  return (
    <section className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleIncrementMonth(-1)}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          &lt; Previous
        </button>
        <h3 className="text-lg font-bold">
          {monthNames[selectedMonth]} {selectedYear}
        </h3>
        <button
          onClick={() => handleIncrementMonth(1)}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next &gt;
        </button>
      </div>

      {Array.from(Array(numRows)).map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-7 gap-1">
          {daysOfWeek.map((dayOfWeek, dayOfWeekIndex) => {
            const dayIndex =
              rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
            const displayDay = dayIndex > 0 && dayIndex <= daysInMonth;

            const isToday =
              dayIndex === now.getDate() &&
              selectedMonth === now.getMonth() &&
              selectedYear === now.getFullYear();

            // const color = completeData?.[selectedYear]?.[selectedMonth]?.[
            //   dayIndex
            // ]
            //   ? gradients.red[
            //       completeData[selectedYear][selectedMonth][dayIndex]
            //     ]
            //   : "white";
            const color = data[dayIndex]
              ? gradients.red[data[dayIndex]]
              : "white";

            return (
              <div
                key={dayOfWeekIndex}
                style={{ background: color }}
                className={`text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-center rounded-lg ${
                  isToday ? "border-slate-700" : "border-red-100"
                } ${color === "white" ? "text-red-400" : "text-white"}`}
              >
                {displayDay ? dayIndex : ""}
              </div>
            );
          })}
        </div>
      ))}
    </section>
  );
}

export default Calendar;
