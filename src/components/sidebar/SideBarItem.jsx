import { NavLink } from "react-router-dom";

export const SidebarItem = ({
  title,
  icon,
  active,
  path,
  isCollapsed,
  highlight = false
}) => {
  return (
    <li>
      <NavLink
        to={path}
        className={`flex items-center p-3 rounded-lg transition-colors ${
          active
            ? "bg-blue-600 text-white"
            : `hover:bg-gray-700 ${highlight ? "bg-gray-700" : ""}`
        }`}
      >
        <span className="text-xl mr-3" role="img" aria-label={title}>
          {icon}
        </span>
        {!isCollapsed && (
          <span className={`${highlight ? "font-bold" : ""}`}>{title}</span>
        )}
      </NavLink>
    </li>
  );
};