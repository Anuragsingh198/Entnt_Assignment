import React, { useState } from "react";
import { SidebarItem } from "./SideBarItem";
import { useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { 
      title: "Dashboard", 
      icon: "📊", 
      id: "dashboard", 
      path: "/",
    },
    { title: "Ships", icon: "🚢", id: "ships", path: "/ships" },
    { title: "Jobs", icon: "💼", id: "jobs", path: "/jobs" },
    { title: "Components", icon: "⚙️", id: "components", path: "/components" },
    { title: "Calendar", icon: "📅", id: "calendar", path: "/calendar" },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`bg-gray-800 text-white p-5 shadow-lg rounded-xl transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex justify-between items-center mb-8 pb-2 border-b border-gray-700">
        {!isCollapsed && <h2 className="text-xl font-semibold">Navigation</h2>}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded hover:bg-gray-700 focus:outline-none"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? "»" : "«"}
        </button>
      </div>

      <nav>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              title={item.title}
              icon={item.icon}
              active={location.pathname.startsWith(item.path)}
              path={item.path}
              isCollapsed={isCollapsed}
              highlight={item.highlight} 
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};