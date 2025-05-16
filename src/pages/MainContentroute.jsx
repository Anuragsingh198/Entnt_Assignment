import ShipDetail from "../components/Ships/ShipDetail";
import CalendarPage from "./Calendar";
import { DashboardPage } from "./DashboardPage";
import JobsPage from "./JobsPage";
import LoginPage from "./LoginPage";
import ShipDetails from "./ShipDetails";
import ShipsPage from "./ShipsPage";
import { Routes, Route } from "react-router-dom";
export const MainContent = () => {
  return (
    <div className="flex-1 ">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/ships" element={<ShipsPage />} />
        <Route path="/ships/details/:id" element={<ShipDetail />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/components" element={<ShipDetails />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};
