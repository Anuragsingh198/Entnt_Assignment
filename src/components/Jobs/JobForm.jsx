import React, { useState, useEffect } from 'react';

const JobForm = ({ job, onSubmit, setShow, title = "Create Job" }) => {
  const [formData, setFormData] = useState({
    id: '',
    componentId: '',
    shipId: '',
    type: '',
    priority: '',
    status: '',
    assignedEngineerId: '',
    scheduledDate: '',
  });

  useEffect(() => {
    if (job) {
      setFormData(job);
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      ...formData,
      id: formData.id || `j${Date.now()}`, // generate new ID if creating
    };

    onSubmit(newJob);
    setShow(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 border border-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <form onSubmit={handleSubmit} className=" gap-3 flex flex-wrap w-2/3">
        {Object.entries({
          componentId: 'Component ID',
          shipId: 'Ship ID',
          type: 'Job Type',
          priority: 'Priority',
          status: 'Status',
          assignedEngineerId: 'Assigned Engineer ID',
          scheduledDate: 'Scheduled Date',
        }).map(([key, label]) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="text-sm font-medium">{label}</label>
            <input
              type={key === 'scheduledDate' ? 'date' : 'text'}
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded"
            />
          </div>
        ))}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setShow(false)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {job ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
