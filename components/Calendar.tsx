import React from "react";

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
function Calendar() {
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
    <section className="flex flex-col overflow-hidden gap-1">
      {Array.from(Array(numRows)).map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="grid grid-cols-7 gap-1">
            {daysOfWeek.map((dayOfWeek, dayOfWeekIndex) => {
              let dayIndex =
                rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

              let displayDay =
                dayIndex > daysInMonth
                  ? false
                  : row === 0 && dayOfWeekIndex
                  ? false
                  : true;

              let isToday = dayIndex === now.getDate();

              if (!displayDay) {
                return <div className="bg-white" key={dayOfWeekIndex} />;
              }

              return (
                <div
                  key={dayOfWeekIndex}
                  className="text-xs sm:text-sm border border-solid p-2 flex items-center gap-2"
                >
                  Some data
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
