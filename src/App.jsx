import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { MainContent } from "./pages/MainContentroute";
import { Sidebar } from "./components/sidebar/Sidebar";
import {data} from './data.js'
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
useEffect(() => {
  if (!localStorage.getItem('appData')) {
    localStorage.setItem("appData", JSON.stringify(data));
  }
}, []);


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
