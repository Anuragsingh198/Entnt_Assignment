import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/Notification";

const Header = () => {
  const { user, logout, isAdmin, isInspector, isEngineer } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showNotification({ message: "Logged out successfully", type: "success" });
    navigate("/login");
  };

  const getRoleBadge = () => {
    if (isAdmin) return "bg-red-500 text-white";
    if (isInspector) return "bg-purple-500 text-white";
    if (isEngineer) return "bg-blue-500 text-white";
    return "bg-gray-500 text-white";
  };

  return (
    <header className="bg-gray-800 shadow-sm text-white mb-2.5">
      <div className="mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-lg font-bold sm:text-xl">
              <span className="hidden sm:inline">Ship Maintenance System</span>
              <span className="sm:hidden">SMS</span>
            </h1>
          </div>

          {/* User info - Hidden on small screens if not authenticated */}
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge()}`}>
                  {user.role}
                </span>
                <span className="text-sm font-medium">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md transition text-sm"
              >
                Logout
              </button>
            </div>
          )}

          <div className="md:hidden flex items-center">
            {user && (
              <>
                <div className="mr-3 flex items-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getRoleBadge()}`}>
                    {user.role.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1 rounded-md text-gray-400 hover:text-white focus:outline-none"
                  aria-label="Logout"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {user && (
          <div className="md:hidden pt-2 pb-3 border-t border-gray-700">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs mr-2 ${getRoleBadge()}`}>
                  {user.role}
                </span>
                <span className="text-sm font-medium">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;