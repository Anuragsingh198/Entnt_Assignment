import React from 'react'
import { Link } from 'react-router-dom';
export const SidebarItem = ({ title, active, onClick }) => {
  return (
    <li>
      <Link 
        to={`/${title.toLowerCase()}`}
        className={`block px-4 py-2 rounded transition-all duration-300 shadow-2xl  ${
          active 
            ? 'bg-gray-700 text-blue-400 font-medium' 
            : 'text-gray-300 hover:bg-gray-700'
        }`}
        onClick={onClick}
      >
        {/* thisis  for hte  siderbar   name  content */}
        {title}
      </Link>
    </li>
  );
};