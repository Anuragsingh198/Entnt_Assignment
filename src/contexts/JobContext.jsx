import React, { createContext, useContext, useReducer, useEffect } from "react";
import { data } from "../data.js";

const initialState = {
    role:JSON.parse(localStorage.getItem('role'))||null,
   user: JSON.parse(localStorage.getItem("user")) || null,
  jobs: JSON.parse(localStorage.getItem("jobs")) || data.jobs || [],
};

const jobReducer = (state, action) => {
  switch (action.type) {
    case "ADD_JOB":
      const newJobs = [...state.jobs, action.payload];
      localStorage.setItem("jobs", JSON.stringify(newJobs));
      return { ...state, jobs: newJobs };

    case "UPDATE_JOB":
      const updatedJobs = state.jobs.map((job) =>
        job.id === action.payload.id ? action.payload : job
      );
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
      return { ...state, jobs: updatedJobs };

    case "DELETE_JOB":
      const filteredJobs = state.jobs.filter((job) => job.id !== action.payload);
      localStorage.setItem("jobs", JSON.stringify(filteredJobs));
      return { ...state, jobs: filteredJobs };

    default:
      return state;
  }
};

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState);

  return (
    <JobContext.Provider value={{ state, dispatch }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => useContext(JobContext);
