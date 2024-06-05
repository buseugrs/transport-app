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

  // Diğer fonksiyonlar burada

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        // Diğer fonksiyonlar burada
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

