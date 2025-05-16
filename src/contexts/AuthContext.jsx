import React, { createContext, useContext, useEffect, useState } from "react";
import { data } from "../data.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState(() =>
    data && data.users ? data.users : []
  );
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
 
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setAllUsers(JSON.parse(storedUsers));
    }
  }, []);

  const login = (email, password) => {
    const foundUser = allUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        allUsers,
        isAdmin: user?.role === "Admin",
        isInspector: user?.role === "Inspector",
        isEngineer: user?.role === "Engineer",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
