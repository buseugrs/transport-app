import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [favoriteAds, setFavoriteAds] = useState([]);
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
      const userData = { email: response.data.email, password: response.data.password, username: response.data.username};
      setCurrentUser(userData);
      getFavoriteAds();
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

  const updateFavoriteAds = async (username, newFavoriteAds) => {
    console.log("update", username);
    try {
      const response = await axios.post(`http://localhost:3000/users/updateFavorites/${username}`, { favoriteAds: newFavoriteAds });
      console.log(response.data); // İşlem başarılıysa API yanıtını konsola yazdır
      getFavoriteAds(currentUser.username);
    } catch (error) {
      console.error("Favori ilanlar güncellenirken bir hata oluştu:", error);
    }
};


const getFavoriteAds = async (username) => {
  try {
    const response = await axios.get(`http://localhost:3000/users/getFavoriteAds/${username}`);
    console.log(response.data);
    const favoriteAds = response.data.favoriteAds;
    setFavoriteAds(favoriteAds);
  } catch (error) {
    console.error("Favori ilanlar alınırken bir hata oluştu:", error);
  }
};

useEffect(() => {
  if(currentUser){
    getFavoriteAds(currentUser.username);
  }
  
}, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        signup,
        favoriteAds,
        updateFavoriteAds,
        getFavoriteAds
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
