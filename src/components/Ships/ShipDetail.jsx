import React, { useEffect, useState } from "react";
import { data } from '../../data.js'
import { useParams } from "react-router-dom";
const ShipDetail = ({ shipId, setShowDetails }) => {
  console.log("this is  ship id:" , shipId);
  const [ship, setShip] = useState(null);
  const [shipData, setShipData] = useState({
    components: [],
    maintenanceHistory: [],
  });

  useEffect(() => {
  // Fetch appData from localStorage
  const savedData = JSON.parse(localStorage.getItem('appData') || '{}');
  
  if (savedData.ships) {
    const shipsFromStorage = savedData.ships;
    const foundShip = shipsFromStorage.find((s) => s.id === shipId);
    setShip(foundShip);

    if (foundShip) {
      // Extract components from appData
      const allComponents = savedData.components || [];  // Handle components from appData
      const components = allComponents.filter((c) => c.shipId === shipId);

      // Create maintenance history
      const maintenanceHistory = components.map((comp) => ({
        date: comp.lastMaintenanceDate,
        details: `Routine check completed for ${comp.name}.`,
      }));

      setShipData({
        ...foundShip,
        components,
        maintenanceHistory,
      });
    }
  }
}, [shipId]);

  if (!ship) return <div>Loading ship details...</div>;

  const { name, imo, flag, status, components, maintenanceHistory } = shipData;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 border border-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ">
      <div
        className="absolute top-2 right-2 cursor-pointer text-black font-bold bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-300"
        onClick={() => setShowDetails(false)}
      >
        X
      </div>
      <div className="p-6 max-w-8xl mx-auto">
        <div className="bg-gray-700 text-white text-center py-5 rounded-xl shadow-md mb-6">
          <h1 className="text-3xl font-bold">Ship Profile: {name}</h1>
          <p className="text-sm text-gray-200 mt-1">Detailed information and records</p>
        </div>
        <div className="bg-white rounded-xl shadow p-3 mb-3 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">General Information</h2>
          <div className="grid grid-cols-4 gap-x-8 gap-y-2 text-gray-700">
            <div><span className="font-semibold">IMO:</span> {imo}</div>
            <div><span className="font-semibold">Flag:</span> {flag}</div>
            <div><span className="font-semibold">Status:</span> {status}</div>
            <div><span className="font-semibold">Ship ID:</span> {shipId}</div>
          </div>
        </div>


        <div className="bg-white rounded-xl shadow p-3 mb-3 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Installed Components</h2>
          {components.length > 0 ? (
            <ul className="space-y-2 text-gray-700">
              {components.map((comp) => (
                <li key={comp.id} className="border p-3 rounded-md bg-gray-50 shadow-sm">
                  <span className="font-medium">{comp.name}</span> (Serial: {comp.serialNumber})<br />
                  Installed on: {comp.installDate}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No components available.</p>
          )}
        </div>

        {/* Maintenance History */}
        <div className="bg-white rounded-xl shadow p-3 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Maintenance History</h2>
          {maintenanceHistory.length > 0 ? (
            <ul className="space-y-3 text-gray-700">
              {maintenanceHistory.map((entry, index) => (
                <li key={index} className="border p-3 rounded-md bg-gray-100">
                  <div><span className="font-medium">Date:</span> {entry.date}</div>
                  <div><span className="font-medium">Details:</span> {entry.details}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No maintenance records found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShipDetail;
