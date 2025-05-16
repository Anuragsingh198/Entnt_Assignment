import React from 'react';
import { 
  PieChart, 
  Pie, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell 
} from 'recharts';
import { useJob } from '../../contexts/JobContext';
import { useComponent } from '../../contexts/ComponentsContext';
import { useShip } from '../../contexts/ShipsContext';

const Charts = () => {
  const {state:{jobs}} = useJob();
  const {state:{components}} = useComponent();
  const {state:{ships}} = useShip();
  
  const shipStatusData = ships.reduce((acc, ship) => {
    const existing = acc.find(item => item.name === ship.status);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: ship.status, value: 1 });
    }
    return acc;
  }, []);

  const jobStatusData = jobs.reduce((acc, job) => {
    const existing = acc.find(item => item.name === job.status);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: job.status, value: 1 });
    }
    return acc;
  }, []);

  const jobTypeData = jobs.reduce((acc, job) => {
    const existing = acc.find(item => item.name === job.type);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: job.type, value: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Ship Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={shipStatusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {shipStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Job Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={jobStatusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {jobStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Job Types</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={jobTypeData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Job Count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;