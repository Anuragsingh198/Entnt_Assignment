import React, { useEffect, useState } from 'react';
import ShipDetail from '../components/Ships/ShipDetail';
import ShipList from '../components/Ships/ShipList';
import ShipForm from '../components/Ships/ShipForm';
import { data } from '../data.js';
import { useShip } from '../contexts/ShipsContext.jsx';

const ShipsPage = () => {
  const { state, dispatch } = useShip();
  const allShips = state.ships;

  const [showForm, setShowForm] = useState(false);
  const [shipFormTitle, setShipFormTitle] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('ships');
    if (savedData) {
      dispatch({ type: 'LOAD_SHIPS', payload: JSON.parse(savedData) });
    } else {
      localStorage.setItem('ships', JSON.stringify(data.ships));
      dispatch({ type: 'LOAD_SHIPS', payload: data.ships });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('ships', JSON.stringify(allShips));
  }, [allShips]);

  const handleAddShip = () => {
    setShipFormTitle('Add New Ship');
    setShowForm(true);
  };

  const handleFormSubmit = (newShip) => {
    newShip.id = Date.now();
    dispatch({ type: 'ADD_SHIP', payload: newShip });
    setShowForm(false);
  };

  const handleUpdateShips = (updatedShips) => {
    dispatch({ type: 'REPLACE_ALL_SHIPS', payload: updatedShips });
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
        <div className="w-full">
          <ShipList allShips={allShips} setAllShips={handleUpdateShips} />
        </div>
      </div>
    </div>
  );
};

export default ShipsPage;
