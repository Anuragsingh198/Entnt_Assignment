import { DashboardPage } from "./DashboardPage";
import JobsPage from "./JobsPage";
import LoginPage from "./LoginPage";
import ShipDetails from "./ShipDetails";
import ShipsPage from "./ShipsPage";
import { Routes , Route } from "react-router-dom";
export const MainContent = () => {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/ships" element={<ShipsPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/components" element={<ShipDetails />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};