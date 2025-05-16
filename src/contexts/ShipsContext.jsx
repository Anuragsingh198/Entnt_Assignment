import React, { createContext, useContext, useReducer, useEffect } from "react";
import {data} from './data.js';
const initialState = {
  ships: JSON.parse(localStorage.getItem("ships")) || data.ships,
};

const shipReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SHIP":
      const newShips = [...state.ships, action.payload];
      localStorage.setItem("ships", JSON.stringify(newShips));
      return { ...state, ships: newShips };

    case "UPDATE_SHIP":
      const updatedShips = state.ships.map((ship) =>
        ship.id === action.payload.id ? action.payload : ship
      );
      localStorage.setItem("ships", JSON.stringify(updatedShips));
      return { ...state, ships: updatedShips };

    case "DELETE_SHIP":
      const filteredShips = state.ships.filter((ship) => ship.id !== action.payload);
      localStorage.setItem("ships", JSON.stringify(filteredShips));
      return { ...state, ships: filteredShips };

    default:
      return state;
  }
};

const ShipContext = createContext();

export const ShipProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shipReducer, initialState);

  useEffect(() => {
    localStorage.setItem("ships", JSON.stringify(state.ships));
  }, [state.ships]);

  return (
    <ShipContext.Provider value={{ state, dispatch }}>
      {children}
    </ShipContext.Provider>
  );
};

export const useShip = () => useContext(ShipContext);
