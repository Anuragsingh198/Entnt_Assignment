import React, { createContext, useContext, useReducer } from "react";
import { data } from "../data.js";

const initialState = {
  components:
    JSON.parse(localStorage.getItem("components")) || data.components || [],
};

const componentReducer = (state, action) => {
  switch (action.type) {
    case "ADD_COMPONENT":
      const newComponents = [...state.components, action.payload];
      localStorage.setItem("components", JSON.stringify(newComponents));
      return { ...state, components: newComponents };

    case "UPDATE_COMPONENT":
      const updatedComponents = state.components.map((component) =>
        component.id === action.payload.id ? action.payload : component
      );
      localStorage.setItem("components", JSON.stringify(updatedComponents));
      return { ...state, components: updatedComponents };

    case "DELETE_COMPONENT":
      const filteredComponents = state.components.filter(
        (component) => component.id !== action.payload
      );
      localStorage.setItem("components", JSON.stringify(filteredComponents));
      return { ...state, components: filteredComponents };

    default:
      return state;
  }
};

const ComponentContext = createContext();

export const ComponentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(componentReducer, initialState);

  return (
    <ComponentContext.Provider value={{ state, dispatch }}>
      {children}
    </ComponentContext.Provider>
  );
};

export const useComponent = () => useContext(ComponentContext);
