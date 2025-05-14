import React, { createContext, useContext, useEffect, useState } from "react";
import { data } from "../data.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [allUsers , SetAllusers] =   useState(()=> (data && data.users) ? data.users : []);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  

  const login = (email, password) => {
    // console.log("email and password is : " , password , email)
    const new_user = allUsers.find(
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
