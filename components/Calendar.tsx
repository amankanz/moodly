"use client";

import React, { useState } from "react";
import { gradients, demoData } from "@/libs/utilities";
import { GrNext, GrPrevious } from "react-icons/gr";
import { fugaz } from "@/app/fonts/fonts";

interface CalendarProps {
  demo?: boolean;
  completeData?: Record<number, Record<number, Record<number, number>>>;
  handleSetMood?: (mood: number) => Promise<void>;
  hideNavigation?: boolean;
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

const daysOfWeek: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({
  demo,
  completeData,
  handleSetMood,
  hideNavigation,
}: CalendarProps) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const monthNames = Object.keys(months); // ["January", "February", ...]
  const numericMonth = selectedMonth;

  // Use demo data only if `demo` is true; otherwise, use completeData
  const data = demo
    ? demoData
    : completeData?.[selectedYear]?.[numericMonth] || {};

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
      {/* Header with month/year and navigation */}
      <div className="flex justify-between items-center mb-4">
        {!hideNavigation && (
          <button
            onClick={() => handleIncrementMonth(-1)}
            className="group p-2 bg-[#ffdbdc] rounded hover:bg-[#ff9a9e] duration-200"
          >
            <GrPrevious className="group-hover:text-red-400" />
          </button>
        )}
        <h3 className={`text-lg font-bold textGradient ${fugaz.className}`}>
          {monthNames[selectedMonth]} {selectedYear}
        </h3>
        {!hideNavigation && (
          <button
            onClick={() => handleIncrementMonth(1)}
            className="group p-2 bg-[#ffdbdc] rounded hover:bg-[#ff9a9e] duration-200"
          >
            <GrNext className="group-hover:text-red-400" />
          </button>
        )}
      </div>

      {/* Days of the week header */}
      <div className="grid grid-cols-7 gap-1 mb-2 text-xs sm:text-sm font-semibold">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      {Array.from(Array(numRows)).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-7 gap-1">
          {daysOfWeek.map((_, dayOfWeekIndex) => {
            const dayIndex =
              rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
            const displayDay = dayIndex > 0 && dayIndex <= daysInMonth;

            const isToday =
              dayIndex === now.getDate() &&
              selectedMonth === now.getMonth() &&
              selectedYear === now.getFullYear();

            const color = displayDay
              ? data[dayIndex]
                ? gradients.red[data[dayIndex]] // Use gradient color if mood is set
                : "white" // White background if no mood is set
              : "white"; // White background for non-displayed days

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
