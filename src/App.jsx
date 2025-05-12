import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { MainContent } from "./pages/MainContentroute";
import { Sidebar } from "./components/sidebar/Sidebar";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
     <div className="flex min-h-screen">
        <Sidebar />
        <MainContent />
      </div>
    </Router>
  );
}

export default App;
