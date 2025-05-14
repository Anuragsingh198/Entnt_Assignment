import React, { useState, useEffect } from 'react';
import ShipDetail from '../components/Ships/ShipDetail';
import ShipList from '../components/Ships/ShipList';
import ShipForm from '../components/Ships/ShipForm';
import { data } from '../data.js';

const ShipsPage = () => {
  const [allShips, setAllShips] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [shipFormTitle, setShipFormTitle] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('ships');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setAllShips(parsed || []);
    } else {
      localStorage.setItem('ships', JSON.stringify(data.ships));
      setAllShips(data.ships);
    }
  }, []);

  useEffect(() => {
    if (allShips.length > 0) {
      localStorage.setItem('ships', JSON.stringify(allShips));
    }
  }, [allShips]);

  const handleAddShip = () => {
    setShipFormTitle('Add New Ship');
    setShowForm(true);
  };

  const handleFormSubmit = (newShip) => {
    // Assign unique id
    newShip.id = Date.now();
    setAllShips([...allShips, newShip]);
    setShowForm(false);
  };

  const handleUpdateShips = (updatedShips) => {
    setAllShips(updatedShips);
  };

  return (
    <div className="min-h-screen w-full px-4">
      {showForm && (
        <ShipForm setShow={setShowForm} onSubmit={handleFormSubmit} title={shipFormTitle} />
      )}
      <div className="w-full bg-gray-600 flex justify-center items-center text-center shadow-md rounded-xl p-4">
        <h1 className="text-white text-2xl font-semibold">Ships</h1>
      </div>
      <div className="w-full flex flex-col gap-3 mt-2">
        <button
          onClick={handleAddShip}
          className="self-start h-auto px-2 py-1 bg-blue-100 border-blue-600 border-1 font-semibold rounded-4xl shadow-md text-blue-700"
        >
          Add New Ship
        </button>
        <div className="w-full">
          <ShipList allShips={allShips} setAllShips={handleUpdateShips} />
        </div>
      </div>
    </div>
  );
};

export default ShipsPage;
