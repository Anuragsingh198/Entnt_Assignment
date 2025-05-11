
import  React from 'react'

export const Notification = ({ message, type, onClose }) => {
  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500"
  }[type] || "bg-gray-500";

  return (
    <div className={`fixed top-4  left-1/2  z-50 px-4 py-2 text-white rounded shadow-lg ${bgColor} flex items-center justify-between min-w-[300px]`}>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-2 font-bold text-xl leading-none hover:opacity-80"
      >
        ×
      </button>
    </div>
  );
};