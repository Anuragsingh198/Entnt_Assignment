import React from 'react';
import KPICards from '../components/Dashboard/KPICards';
import Charts from '../components/Dashboard/Charts';

export const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Maintenance Dashboard</h1>
        <p className="text-gray-600">Overview of ships, components, and maintenance jobs</p>
      </div>

      <div className="space-y-8">

        <section className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Performance Indicators</h2>
          <KPICards />
        </section>
        <section className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Visualizations</h2>
          <Charts />
        </section>
      </div>
    </div>
  );
};