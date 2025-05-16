
import { useState } from "react";
import ShipDetail from "./ShipDetail";
import ShipForm from "./ShipForm";
import { useAuth } from "../../contexts/AuthContext";
import { Notification } from "../Notification/NotificationCenter";
import { useShip } from "../../contexts/ShipsContext";



const ShipList = () => {
  const { isAdmin } = useAuth();
  const { state, dispatch } = useShip();
  const { ships } = state;

  const [editingShip, setEditingShip] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [displayShipId, setDisplayShipId] = useState();
  const [shipFormTitle, setShipFormTitle] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    type: "info",
    visible: false,
  });

  const showNotification = (message, type = "success") => {
    setNotification({ message, type, visible: true });
    setTimeout(() => setNotification({ message: "", type: "info", visible: false }), 3000);
  };

  const handleClick = (id) => {
    setShowDetails(true);
    setDisplayShipId(id);
  };

  const handleDelete = (id) => {
    if (!isAdmin) return;
    dispatch({ type: "DELETE_SHIP", payload: id });
    showNotification("Ship deleted successfully");
  };

  const handleEdit = (ship) => {
    if (!isAdmin) return;
    setShipFormTitle("Edit Ship Details");
    setEditingShip(ship);
    setShowForm(true);
  };

  const handleAdd = () => {
    if (!isAdmin) return;
    setShipFormTitle("Add New Ship");
    setEditingShip(null);
    setShowForm(true);
  };

  const handleFormSubmit = (ship) => {
    if (!isAdmin) return;

    if (editingShip) {
      dispatch({ type: "UPDATE_SHIP", payload: ship });
      showNotification("Ship updated successfully");
    } else {
      dispatch({ type: "ADD_SHIP", payload: ship });
      showNotification("Ship added successfully");
    }

    setShowForm(false);
    setEditingShip(null);
  };

  return (
    <div className="grid h-full w-full grid-rows-1 gap-2">
      {notification.visible && (
        <Notification {...notification} onClose={() => setNotification({ ...notification, visible: false })} />
      )}

      {showForm && (
        <ShipForm
          setShow={setShowForm}
          ship={editingShip}
          onSubmit={handleFormSubmit}
          title={shipFormTitle}
        />
      )}

      {showDetails && <ShipDetail shipId={displayShipId} setShowDetails={setShowDetails} />}

      {isAdmin && (
        <div className="flex justify-end mb-2">
          <button
            onClick={handleAdd}
            className="flex items-center gap-1 bg-green-100 text-green-700 border border-green-600 px-3 py-1 rounded-xl hover:bg-green-600 hover:text-white transition"
          >
            Add Ship
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="bg-gray-400 text-white">
              <th className="px-4 py-3">Ship Name</th>
              <th className="px-4 py-3">IMO Number</th>
              <th className="px-4 py-3">Flag</th>
              <th className="px-4 py-3">Status</th>
        {isAdmin && <th className="px-4 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {ships.length > 0 ? (
              ships.map((ship) => (
                <tr key={ship.id} className="bg-white border-b hover:bg-gray-100 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">{ship.name}</td>
                  <td className="px-4 py-3">{ship.imo}</td>
                  <td className="px-4 py-3">{ship.flag}</td>
                  <td className="px-4 py-3">{ship.status}</td>
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    <button onClick={() => handleClick(ship.id)} className="p-1 hover:bg-green-100">View</button>
                    {isAdmin && (
                      <>
                        <button onClick={() => handleEdit(ship)} className="p-1 hover:bg-blue-100">Edit</button>
                        <button onClick={() => handleDelete(ship.id)} className="p-1 hover:bg-red-100">Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">No ships found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipList;