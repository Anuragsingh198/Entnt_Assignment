import React from "react";
import JobCalendar from "../components/Jobs/JobCalendar";

const CalendarPage = () => {
  return (
    <div className="min-h-screen w-full px-2 sm:px-4">
      <div className="w-full bg-gray-600 flex justify-center items-center text-center shadow-md rounded-xl p-3 sm:p-4">
        <h1 className="text-white text-xl sm:text-2xl font-semibold">Calendar</h1>
      </div>
      <div className="w-full flex flex-col gap-3 mt-2">
        <div className="w-full">
          <JobCalendar />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;