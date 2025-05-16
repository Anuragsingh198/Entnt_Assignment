import React, { useEffect, useState } from 'react';

const ComponentForm = ({ component, onSubmit, setShow, title = "Create Component" }) => {
  const [formData, setFormData] = useState({
    id: "",
    shipId: "",
    name: "",
    serialNumber: "",
    installDate: "",
    lastMaintenanceDate: "",
    status: "",
    priority: "",
  });

  useEffect(() => {
    if (component) setFormData({ ...component });
  }, [component]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComponent = {
      ...formData,
      id: formData.id || `c${Date.now()}`,
    };
    onSubmit(newComponent);
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
          { key: "shipId", label: "Ship ID" },
          { key: "name", label: "Component Name" },
          { key: "serialNumber", label: "Serial Number" },
          { key: "installDate", label: "Install Date", type: "date" },
          { key: "lastMaintenanceDate", label: "Last Maintenance Date", type: "date" },
          { key: "status", label: "Status" },
          { key: "priority", label: "Priority" },
        ].map(({ key, label, type = "text" }) => (
          <div key={key}>
            <label className="block text-gray-700 font-medium mb-1" htmlFor={key}>
              {label}
            </label>
            <input
              type={type}
              name={key}
              value={formData[key] || ""}
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
            {component ? "Update Component" : "Create Component"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComponentForm;
