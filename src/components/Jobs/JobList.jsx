import React, { useState, useMemo } from "react";
import { useJob } from "../../contexts/JobContext";
import { useAuth } from "../../contexts/AuthContext";
import JobForm from "./JobForm";
import { Notification } from "../Notification/NotificationCenter";


const DeleteIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
);

const JobList = () => {
  const {
    state: { jobs },
    dispatch,
  } = useJob();

  const { user, isAdmin } = useAuth();

  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [filters, setFilters] = useState({
    shipId: "",
    status: "",
    priority: "",
  });

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!isAdmin) return;
    dispatch({ type: "DELETE_JOB", payload: id });
    setNotification({ message: "Job deleted successfully", type: "error" });
  };

  const handleAddJob = (job) => {
    if (!isAdmin) return;
    dispatch({ type: "ADD_JOB", payload: job });
    setNotification({ message: "Job added successfully", type: "success" });
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(
      (job) =>
        (!filters.shipId || job.shipId === filters.shipId) &&
        (!filters.status || job.status === filters.status) &&
        (!filters.priority || job.priority === filters.priority)
    );
  }, [jobs, filters]);

  const uniqueShipIds = [...new Set(jobs.map((job) => job.shipId))];
  const uniqueStatuses = [...new Set(jobs.map((job) => job.status))];
  const uniquePriorities = [...new Set(jobs.map((job) => job.priority))];

  return (
    <div className="grid h-full w-full gap-4 p-4">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {showForm && isAdmin && (
        <JobForm
          job={editingJob}
          onSubmit={handleAddJob}
          setShow={setShowForm}
          title={editingJob ? "Update Job" : "Create Job"}
        />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {isAdmin && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditingJob(null);
            }}
            className="px-4 py-2 border border-green-600 bg-green-100 text-green-700 rounded-xl hover:bg-green-700 hover:text-white"
          >
            Create Job
          </button>
        )}

        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <select
            value={filters.shipId}
            onChange={(e) =>
              setFilters({ ...filters, shipId: e.target.value })
            }
            className="border px-3 py-2 rounded-xl w-full md:w-auto"
          >
            <option value="">All Ships</option>
            {uniqueShipIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
            className="border px-3 py-2 rounded-xl w-full md:w-auto"
          >
            <option value="">All Statuses</option>
            {uniqueStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={filters.priority}
            onChange={(e) =>
              setFilters({ ...filters, priority: e.target.value })
            }
            className="border px-3 py-2 rounded-xl w-full md:w-auto"
          >
            <option value="">All Priorities</option>
            {uniquePriorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow rounded-xl">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-white uppercase bg-gray-400">
            <tr>
              <th className="px-4 py-3">Job Type</th>
              <th className="px-4 py-3">Ship ID</th>
              <th className="px-4 py-3">Component ID</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Engineer</th>
              <th className="px-4 py-3">Scheduled</th>
              {isAdmin && <th className="px-4 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr
                  key={job.id}
                  className="bg-white border-b hover:bg-gray-100"
                >
                  <td className="px-4 py-2 font-medium">{job.type}</td>
                  <td className="px-4 py-2">{job.shipId}</td>
                  <td className="px-4 py-2">{job.componentId}</td>
                  <td className="px-4 py-2">{job.priority}</td>
                  <td className="px-4 py-2">
                    <select
                      value={job.status}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_JOB_STATUS",
                          payload: { id: job.id, status: e.target.value },
                        })
                      }
                      className="border px-2 py-1 rounded-xl"
                    >
                      {uniqueStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2">{job.assignedEngineerId}</td>
                  <td className="px-4 py-2">{job.scheduledDate}</td>
                  <td className="px-2 py-2 flex justify-center gap-2">
                    {isAdmin && (
                       <button
                          onClick={() => handleDelete(job.id)}
                          className="p-1 bg-red-100 border border-red-600 rounded-xl text-red-700 hover:bg-red-600 hover:text-white flex items-center justify-center"
                          aria-label={`Delete component ${job.name}`}
                        >
                          <DeleteIcon />
                        </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList;
