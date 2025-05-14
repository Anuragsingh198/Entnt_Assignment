import { useState, useEffect } from "react";
import ShipDetail from "./ShipDetail";
import ShipForm from "./ShipForm";

const ShipList = ({ allShips, setAllShips }) => {
  console.log("the data from shipList is:", allShips);
  const [editingShip, setEditingShip] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [displayShipId, setDisplayShipId] = useState();
  const [shipFormTitle, setShipFormTitle] = useState('');

  // Sync the ships data to localStorage whenever allShips changes
  useEffect(() => {
    if (allShips.length > 0) {
      localStorage.setItem('ships', JSON.stringify(allShips)); // Saving ships to localStorage
    }
  }, [allShips]);

  const handleClick = (id) => {
    setShowDetails(true);
    setDisplayShipId(id);
  };

  const handleDelete = (id) => {
    const updatedShips = allShips.filter((ship) => ship.id !== id);
    setAllShips(updatedShips); // Update state
    localStorage.setItem('ships' , updatedShips);
  };

  const handleEdit = (ship) => {
    setShipFormTitle('Edit Ship Details');
    setEditingShip(ship);
    setShowForm(true);
  };

  const handleFormSubmit = (updatedShip) => {
    const updatedShips = allShips.map((ship) =>
      ship.id === updatedShip.id ? updatedShip : ship
    );
    setAllShips(updatedShips);
    setShowForm(false);
    setEditingShip(null);
    localStorage.setItem("ships" ,  updatedShip)
  };

  return (
    <div className="grid h-full w-full grid-rows-1 gap-1.5">
      {showForm && editingShip && (
        <ShipForm
          setShow={setShowForm}
          ship={editingShip}
          onSubmit={handleFormSubmit}
          title={shipFormTitle}
        />
      )}
      {showDetails && (
        <ShipDetail shipId={displayShipId} setShowDetails={setShowDetails} />
      )}
      <div className="relative overflow-x-auto shadow rounded-xl">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="bg-gray-400 text-white">
              <th className="px-6 py-3">Ship Name</th>
              <th className="px-6 py-3">IMO Number</th>
              <th className="px-6 py-3">Flag</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-10 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allShips.length > 0 ? (
              allShips.map((ship) => (
                <tr key={ship.id} className="bg-white border-b hover:bg-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-900">{ship.name}</td>
                  <td className="px-6 py-4">{ship.imo}</td>
                  <td className="px-6 py-4">{ship.flag}</td>
                  <td className="px-6 py-4">{ship.status}</td>
                  <td className="px-6 py-4 flex justify-around max-w-[65%]">
                    <button
                      onClick={() => handleClick(ship.id)}
                      className="px-1 py-1 bg-green-100 border-green-600 min-w-[80px] border-1 font-semibold rounded-4xl shadow-md text-green-700"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleEdit(ship)}
                      className="px-1 py-1 bg-blue-100 border-blue-600 border-1 min-w-[80px] font-semibold rounded-4xl shadow-md text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ship.id)}
                      className="px-1 py-1 bg-red-100 border-red-600 border-1 min-w-[80px] font-semibold rounded-4xl shadow-md text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No ships found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipList;
