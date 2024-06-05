import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Sayfa yenilendiğinde localStorage'den oturum durumunu al
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      const userData = { email: response.data.email };
      setCurrentUser(userData);
      // Kullanıcı oturum bilgilerini localStorage'e kaydet
      localStorage.setItem("currentUser", JSON.stringify(userData));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    // Kullanıcı oturum bilgilerini localStorage'den kaldır
    localStorage.removeItem("currentUser");
  };

  const signup = async (username, email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/users/create", {
        email,
        password,
        username,
      });
      setCurrentUser({
        email: response.data.email,
        password: response.data.password,
        username: response.data.username,
      });
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
