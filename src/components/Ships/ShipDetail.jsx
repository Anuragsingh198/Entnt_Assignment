import React, { useEffect, useState } from "react";
import { useShip } from "../../contexts/ShipsContext";
import { useComponent } from "../../contexts/ComponentsContext";
import { useJob } from "../../contexts/JobContext";

const ShipDetail = ({ shipId, setShowDetails }) => {
  const { state: shipState } = useShip();
  const { state: componentState } = useComponent();
  const { state: jobState } = useJob();

  const [shipData, setShipData] = useState({
    ship: null,
    components: [],
    maintenanceHistory: [],
    jobs: [],
  });

  useEffect(() => {
    const foundShip = shipState.ships.find((s) => s.id === shipId);
    if (!foundShip) return;

    const components = componentState.components.filter(
      (c) => c.shipId === shipId
    );
    const jobs = jobState.jobs.filter((j) => j.shipId === shipId);

    const maintenanceHistory = components.map((comp) => ({
      componentName: comp.name,
      serialNumber: comp.serialNumber,
      lastMaintenanceDate: comp.lastMaintenanceDate,
      installDate: comp.installDate,
      details: `Maintenance performed on ${comp.name} (${comp.serialNumber})`,
    }));

    setShipData({
      ship: foundShip,
      components,
      maintenanceHistory,
      jobs,
    });
  }, [shipId, shipState.ships, componentState.components, jobState.jobs]);

  if (!shipData.ship)
    return <div className="text-center py-10">Loading ship details...</div>;

  const { name, imo, flag, status } = shipData.ship;
  const { components, maintenanceHistory, jobs } = shipData;

  return (
   <div className="max-w-[50%] fixed inset-0 bg-opacity-50 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[70vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-800 text-white p-4 rounded-t-xl flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-gray-300">
              IMO: {imo} | Flag: {flag} | Status: {status}
            </p>
          </div>
          <button
            onClick={() => setShowDetails(false)}
            className="text-white hover:text-gray-300 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        <div className="p-6 space-y-8">

          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              General Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500">Ship ID</p>
                <p className="font-medium">{shipId}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500">IMO Number</p>
                <p className="font-medium">{imo}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500">Flag</p>
                <p className="font-medium">{flag}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500">Status</p>
                <p
                  className={`font-medium ${
                    status === "Active"
                      ? "text-green-600"
                      : status === "Under Maintenance"
                      ? "text-yellow-600"
                      : "text-gray-600"
                  }`}
                >
                  {status}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Installed Components ({components.length})
            </h2>
            {components.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Component
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Serial Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Installed Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Maintenance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {components.map((comp) => (
                      <tr key={comp.id}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {comp.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {comp.serialNumber}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {comp.installDate}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {comp.lastMaintenanceDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No components installed on this ship.
              </p>
            )}
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Maintenance History ({maintenanceHistory.length})
            </h2>
            {maintenanceHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Component
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Serial Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Maintenance Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {maintenanceHistory.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {item.componentName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {item.serialNumber}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {item.lastMaintenanceDate}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {item.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No maintenance records found.
              </p>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Active Jobs ({jobs.length})
            </h2>
            {jobs.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Scheduled Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {jobs.map((job) => (
                      <tr key={job.id}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {job.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {job.type}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              job.priority === "High"
                                ? "bg-red-100 text-red-800"
                                : job.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {job.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              job.status === "Open"
                                ? "bg-blue-100 text-blue-800"
                                : job.status === "In Progress"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {job.scheduledDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No active jobs for this ship.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShipDetail;
