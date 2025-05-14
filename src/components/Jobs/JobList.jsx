import React, { useState, useMemo } from 'react';
import { useJob } from '../../contexts/JobContext';
import JobForm from './JobForm';

const JobList = () => {
  const {
    state: { jobs },
    dispatch,
  } = useJob();

  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    shipId: '',
    status: '',
    priority: '',
  });

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_JOB', payload: id });
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedJob = jobs.find((job) => job.id === id);
    if (updatedJob) {
      dispatch({
        type: 'UPDATE_JOB',
        payload: { ...updatedJob, status: newStatus },
      });
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(
      (job) =>
        (filters.shipId ? job.shipId === filters.shipId : true) &&
        (filters.status ? job.status === filters.status : true) &&
        (filters.priority ? job.priority === filters.priority : true)
    );
  }, [jobs, filters]);

  const uniqueShipIds = [...new Set(jobs.map((job) => job.shipId))];
  const uniqueStatuses = [...new Set(jobs.map((job) => job.status))];
  const uniquePriorities = [...new Set(jobs.map((job) => job.priority))];

  return (
    <div className="grid h-full w-full gap-4 p-4">
      {showForm && (
        <JobForm
          job={editingJob}
          onSubmit={(job) => {
            if (editingJob) {
              dispatch({ type: 'UPDATE_JOB', payload: job });
            } else {
              dispatch({ type: 'CREATE_JOB', payload: job });
            }
            setShowForm(false);
            setEditingJob(null);
          }}
          setShow={setShowForm}
          title={editingJob ? 'Edit Job' : 'Create Job'}
        />
      )}

      {/* Top Bar: Create + Filters */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => {
            setShowForm(true);
            setEditingJob(null);
          }}
          className="px-2 py-1 border-1 border-green-600 bg-green-100 text-green-700 rounded-4xl hover:bg-green-700"
        >
          Create Job
        </button>

        <div className="flex gap-4">
          <select
            value={filters.shipId}
            onChange={(e) => setFilters({ ...filters, shipId: e.target.value })}
            className="border px-2 py-1 rounded-4xl"
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
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border px-2 py-1 rounded-4xl"
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
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="border px-2 py-1 rounded-4xl"
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

      {/* Job Table */}
      <div className="relative overflow-x-auto shadow rounded-xl">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="bg-gray-400 text-white">
              <th className="px-6 py-3">Job Type</th>
              <th className="px-6 py-3">Ship ID</th>
              <th className="px-6 py-3">Component ID</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Assigned Engineer</th>
              <th className="px-6 py-3">Scheduled Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job.id} className="bg-white border-b hover:bg-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-900">{job.type}</td>
                  <td className="px-6 py-4">{job.shipId}</td>
                  <td className="px-6 py-4">{job.componentId}</td>
                  <td className="px-6 py-4">{job.priority}</td>
                  <td className="px-6 py-4">
                    <select
                      value={job.status}
                      onChange={(e) => handleStatusChange(job.id, e.target.value)}
                      className="border px-2 py-1 rounded-4xl"
                    >
                      {uniqueStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">{job.assignedEngineerId}</td>
                  <td className="px-6 py-4">{job.scheduledDate}</td>
                  <td className="px-2 py-2 flex justify-center gap-2">
                    {/* <button
                      onClick={() => handleEdit(job)}
                      className="px-2 py-1 bg-blue-100 border border-blue-600 rounded-4xl text-blue-700"
                    >
                      Edit
                    </button> */}
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="px-2 py-1 bg-red-100 border border-red-600 rounded-4xl text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
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
