import React, { useState  , useEffect} from "react";

const ShipForm = ({ setShow,  ship, onSubmit  , title}) => {
  const [formData, setFormData] = useState({
    name: "",
    imo: "",
    flag: "",
    status: "",
  });


  useEffect(() => {
    setFormData({ ...ship });
  }, [ship]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
<div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 border border-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ">
  <div
    className="absolute top-2 right-2 cursor-pointer text-black font-bold bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-300"
    onClick={() => setShow(false)}
  >
    X
  </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Ship Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">IMO Number</label>
          <input
            type="text"
            name="imo"
            value={formData.imo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Flag</label>
          <input
            type="text"
            name="flag"
            value={formData.flag}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Status</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            required
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Add Ship
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShipForm;
