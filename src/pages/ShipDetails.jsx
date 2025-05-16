import React from "react";
import ComponentList from "../components/Components2/ComponentList";


const ComponentsPage = () => {
  return (
    <div className="min-h-screen w-full px-4">
      <div className="w-full bg-gray-600 flex justify-center items-center text-center shadow-md rounded-xl p-4">
        <h1 className="text-white text-2xl font-semibold">Components</h1>
      </div>
      <div className="w-full flex flex-col gap-3 mt-2">
        <div className="w-full">
          <ComponentList />
        </div>
      </div>
    </div>
  );
};

export default ComponentsPage;
