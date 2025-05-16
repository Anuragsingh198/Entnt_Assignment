import React, { useState, useEffect } from "react";

const JobForm = ({ job, onSubmit, setShow, title = "Create Job" }) => {
  const [formData, setFormData] = useState({
    id: "",
    componentId: "",
    shipId: "",
    type: "",
    priority: "",
    status: "",
    assignedEngineerId: "",
    scheduledDate: "",
  });

  useEffect(() => {
    if (job) setFormData({ ...job });
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      ...formData,
      id: formData.id || `j${Date.now()}`,
    };
    onSubmit(newJob);
    setShow(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 border border-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[90%] md:w-auto">
      <div
        className="absolute top-2 right-2 cursor-pointer text-black font-bold bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-300"
        onClick={() => setShow(false)}
      >
        X
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: "componentId", label: "Component ID" },
          { key: "shipId", label: "Ship ID" },
          { key: "type", label: "Job Type" },
          { key: "priority", label: "Priority" },
          { key: "status", label: "Status" },
          { key: "assignedEngineerId", label: "Assigned Engineer ID" },
          { key: "scheduledDate", label: "Scheduled Date", type: "date" },
        ].map(({ key, label, type = "text" }) => (
          <div key={key}>
            <label className="block text-gray-700 font-medium mb-1" htmlFor={key}>
              {label}
            </label>
            <input
              type={type}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
        ))}

        <div className="md:col-span-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setShow(false)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-700 text-white font-semibold rounded hover:bg-blue-700"
          >


            {job ? "Update Job" : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
