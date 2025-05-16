import React from "react";
import JobForm from "../components/Jobs/JobForm";
import JobCalendar from "../components/Jobs/JobCalendar";
import JobList from "../components/Jobs/JobList";

const JobsPage = () => {
  return (
    <div className="min-h-screen w-full px-4">
      <div className="w-full bg-gray-600 flex justify-center items-center text-center shadow-md rounded-xl p-4">
        <h1 className="text-white text-2xl font-semibold">Jobs</h1>
      </div>
      <div className="w-full flex flex-col gap-3 mt-2">
        <div className="w-full">
          <JobList />
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
