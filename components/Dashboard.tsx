/*
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

      <Calendar demo />
    </section>
  );
}

export default Dashboard;
*/

"use client";
import { fugaz } from "@/app/fonts/fonts";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { DB } from "@/firebase";
import Loading from "./Loading";
import Login from "./Login";

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
  const { user, userDataObj, setUserDataObj, isLoading } = useAuth();
  const [data, setData] = useState({});

  function countValues() {}

  async function handleSetMood(mood: number) {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      // Ensure `user` is defined
      if (!user) {
        console.error("User is not authenticated");
        return;
      }

      const newData = { ...userDataObj };
      if (!newData[year]) {
        newData[year] = {};
      }

      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }
      newData[year][month][day] = mood;

      // Update local state
      setData(newData);
      setUserDataObj(newData);

      // Update Firebase
      const docRef = doc(DB, "users", user.uid);
      await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Failed to set data:", err);
    }
  }

  // Fetch the user's data from Firebase
  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      const docRef = doc(DB, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserDataObj(data); // Update the global state with user data
        setData(data); // Set the local data for the calendar
      } else {
        console.warn("No user data found!");
      }
    };

    fetchUserData();
  }, [user]);

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

  // useEffect(() => {
  //   if (!user || !userDataObj) return;

  //   setData(userDataObj);
  // }, [user, userDataObj]);

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Login />;
  }

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
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              className={`py-4 px-5 rounded-2xl pinkShadow duration-200 bg-red-200 hover:bg-[#ff9a9e] flex-1 text-center flex flex-col items-center gap-2`}
              key={moodIndex}
              onClick={() => {
                const currMoodValue = moodIndex + 1;
                handleSetMood(currMoodValue);
              }}
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

      <Calendar demo completeData={data} handleSetMood={handleSetMood} />
    </section>
  );
}

export default Dashboard;
