import React, { createContext, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // 🔐 GOOGLE + JWT LOGIN
  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    setIsAuthenticated(true);
  };

  // 🔥 EMAIL + PASSWORD LOGIN (FIX ADDED)
  const loginWithEmail = async (email, password) => {
    const res = await API.post("/auth/login", {
      email,
      password
    });

    const token = res.data.token;

    localStorage.setItem("token", token);
    setToken(token);
    setIsAuthenticated(true);

    return res.data;
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        loginWithEmail,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};