import React, { createContext, useContext, useState } from "react";
import { users } from "../data";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email, password) => {
    const new_user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (new_user) {
      localStorage.setItem("user", JSON.stringify(new_user));
      setUser(new_user);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
