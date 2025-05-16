import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { MainContent } from "./pages/MainContentroute";
import { Sidebar } from "./components/sidebar/Sidebar";
import { data } from './data.js';
import Header from "./components/Header/Header.jsx";
import Login from "./components/Authentication/LoginForm.jsx";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  useEffect(() => {
    if (!localStorage.getItem('users')) {
      localStorage.setItem("users", JSON.stringify(data.users));
    }
    if (!localStorage.getItem('ships')) {
      localStorage.setItem("ships", JSON.stringify(data.ships));
    }
    if (!localStorage.getItem('components')) {
      localStorage.setItem("components", JSON.stringify(data.components));
    }
    if (!localStorage.getItem('jobs')) {
      localStorage.setItem("jobs", JSON.stringify(data.jobs));
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <PrivateRoute>
                    <MainContent />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;