import React, { useMemo, useState } from "react";
import ComponentForm from "./ComponentForm";
import { useComponent } from "../../contexts/ComponentsContext";
import { useAuth } from "../../contexts/AuthContext";
import { Notification } from "../Notification/NotificationCenter";

const EditIcon = () => (
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
      d="M11 17h2m4-10l1.5 1.5M16 3l5 5-12 12H4v-5L16 3z"
    ></path>
  </svg>
);

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

const ComponentList = () => {
  const {
    state: { components },
    dispatch,
  } = useComponent();

  const { isAdmin } = useAuth();

  const [editingComponent, setEditingComponent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [filters, setFilters] = useState({
    shipId: "",
  });

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleEdit = (component) => {
    if (!isAdmin) {
      showNotification("Only Admins can edit components", "error");
      return;
    }
    setEditingComponent(component);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!isAdmin) {
      showNotification("Only Admins can delete components", "error");
      return;
    }
    dispatch({ type: "DELETE_COMPONENT", payload: id });
    showNotification("Component deleted successfully", "success");
  };

  const handleAddComponent = (component) => {
    if (!isAdmin) {
      showNotification("Only Admins can add components", "error");
      return;
    }

    if (editingComponent) {
      dispatch({ type: "EDIT_COMPONENT", payload: component });
      showNotification("Component updated successfully", "success");
    } else {
      dispatch({ type: "ADD_COMPONENT", payload: component });
      showNotification("Component added successfully", "success");
    }

    setShowForm(false);
  };

  const filteredComponents = useMemo(() => {
    return components.filter((c) =>
      filters.shipId ? c.shipId === filters.shipId : true
    );
  }, [components, filters]);

  const uniqueShipIds = [...new Set(components.map((c) => c.shipId))];

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
        <ComponentForm
          component={editingComponent}
          onSubmit={handleAddComponent}
          setShow={setShowForm}
          title={editingComponent ? "Edit Component" : "Create Component"}
        />
      )}

      <div className="flex justify-between items-center">
        {isAdmin && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditingComponent(null);
            }}
            className="px-2 py-1 border border-green-600 bg-green-100 text-green-700 rounded-xl hover:bg-green-700 hover:text-white flex items-center gap-1"
            aria-label="Create Component"
          >
            Add Component
          </button>
        )}

        <select
          value={filters.shipId}
          onChange={(e) => setFilters({ ...filters, shipId: e.target.value })}
          className="border px-2 py-1 rounded-xl"
          aria-label="Filter by Ship ID"
        >
          <option value="">All Ships</option>
          {uniqueShipIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>

      <div className="relative overflow-x-auto shadow rounded-xl">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-200 text-gray-900">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Ship ID</th>
              <th className="px-4 py-3">Serial Number</th>
              <th className="px-4 py-3">Install Date</th>
              <th className="px-4 py-3">Last Maintenance</th>
             {isAdmin && <th className="px-4 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredComponents.length > 0 ? (
              filteredComponents.map((c) => (
                <tr
                  key={c.id}
                  className="bg-white border-b hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                  <td className="px-4 py-3">{c.shipId}</td>
                  <td className="px-4 py-3">{c.serialNumber}</td>
                  <td className="px-4 py-3">{c.installDate}</td>
                  <td className="px-4 py-3">{c.lastMaintenanceDate}</td>
                  <td className="px-4 py-3 flex gap-2">
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => handleEdit(c)}
                          className="p-1 bg-blue-100 border border-blue-600 rounded-xl text-blue-700 hover:bg-blue-600 hover:text-white flex items-center justify-center"
                          aria-label={`Edit component ${c.name}`}
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-1 bg-red-100 border border-red-600 rounded-xl text-red-700 hover:bg-red-600 hover:text-white flex items-center justify-center"
                          aria-label={`Delete component ${c.name}`}
                        >
                          <DeleteIcon />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No components found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComponentList;
