import React from 'react'
import { useJob } from '../../contexts/JobContext';
import { useComponent } from '../../contexts/ComponentsContext';
import { useShip } from '../../contexts/ShipsContext';

const KPICards = () => {
 const {state:{jobs}} =  useJob()
 const {state:{components} } = useComponent()
 const {state:{ships}} =  useShip()
  
  // Calculate KPIs
  const totalShips = ships.length;
  const activeShips = ships.filter(ship => ship.status === 'Active').length;
  const totalJobs = jobs.length;
  const highPriorityJobs = jobs.filter(job => job.priority === 'High').length;
  const openJobs = jobs.filter(job => job.status === 'Open').length;
  const inProgressJobs =jobs.filter(job => job.status === 'In Progress').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
      {/* Ship KPIs */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm font-medium">Total Ships</h3>
        <p className="text-2xl font-bold text-blue-600">{totalShips}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm font-medium">Active Ships</h3>
        <p className="text-2xl font-bold text-green-600">{activeShips}</p>
        <p className="text-sm text-gray-500">{Math.round((activeShips / totalShips) * 100)}% of fleet</p>
      </div>
      
      {/* Job KPIs */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm font-medium">Total Jobs</h3>
        <p className="text-2xl font-bold text-indigo-600">{totalJobs}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm font-medium">High Priority Jobs</h3>
        <p className="text-2xl font-bold text-red-600">{highPriorityJobs}</p>
        <p className="text-sm text-gray-500">{Math.round((highPriorityJobs / totalJobs) * 100)}% of jobs</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm font-medium">Jobs In Progress</h3>
        <p className="text-2xl font-bold text-yellow-600">{inProgressJobs}</p>
        <p className="text-sm text-gray-500">{Math.round((inProgressJobs / totalJobs) * 100)}% of jobs</p>
      </div>
    </div>
  );
};

export default KPICards