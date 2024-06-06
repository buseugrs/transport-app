import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [favoriteAds, setFavoriteAds] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    // Sayfa yenilendiğinde localStorage'den oturum durumunu al
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [unreadMessages, setUnreadMessages] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [currentConversation, setCurrentConversation] = useState([]);
  const [currentConversationReceiver, setCurrentConversationReceiver] =
    useState("");
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      const userData = {
        email: response.data.email,
        password: response.data.password,
        username: response.data.username,
      };
      setCurrentUser(userData);
      await getFavoriteAds(userData.username);
      // Kullanıcı oturum bilgilerini localStorage'e kaydet
      localStorage.setItem("currentUser", JSON.stringify(userData));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    navigate("/"); // Navigate to home before setting user to null
    setCurrentUser(null);
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

  useEffect(() => {
    const checkMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/messages/check/${currentUser.username}`
        );
        console.log("checkMessages", response.data);
        setUnreadMessages(response.data.unreadMessages);
        const incomingMessagesFrom = response.data.incomingMessagesFrom.map(
          (message) => message.sender
        );
        const outgoingMessagesFrom = response.data.outgoingMessagesFrom.map(
          (message) => message.receiver
        );
        console.log(incomingMessagesFrom);
        console.log(outgoingMessagesFrom);

        // İki listeyi birleştirip benzersiz kullanıcıları elde etme
        const combinedMessages = [
          ...incomingMessagesFrom,
          ...outgoingMessagesFrom,
        ];
        console.log(combinedMessages);
        const uniqueUsers = Array.from(
          new Set(combinedMessages.map((message) => message))
        );
        console.log(uniqueUsers);

        // conversationHistory'i setleyelim
        setConversationHistory(uniqueUsers);
        console.log(conversationHistory);
      } catch (error) {
        console.error("Mesajlar kontrol edilirken hata oluştu:", error);
      }
    };
    if (currentUser) {
      checkMessages();
    }
  }, []);

  const getConversation = async (conversationUserWith) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/messages/${currentUser.username}/${conversationUserWith}`
      );
      setCurrentConversation(response.data);
      setCurrentConversationReceiver(conversationUserWith);
    } catch (error) {
      console.error("Mesajlar kontrol edilirken hata oluştu:", error);
    }
  };

  const sendMessage = async (receiver, message) => {
    try {
      const response = await axios.post("http://localhost:3000/messages/send", {
        sender: currentUser.username,
        receiver: receiver,
        message: message,
      });
      setCurrentConversation(response.data);
    } catch (error) {
      console.error("Mesajlar kontrol edilirken hata oluştu:", error);
    }
  };

  const updateFavoriteAds = async (username, newFavoriteAds) => {
    console.log("update", username);
    try {
      const response = await axios.post(
        `http://localhost:3000/users/updateFavorites/${username}`,
        { favoriteAds: newFavoriteAds }
      );
      console.log(response.data); // İşlem başarılıysa API yanıtını konsola yazdır
      getFavoriteAds(currentUser.username);
    } catch (error) {
      console.error("Favori ilanlar güncellenirken bir hata oluştu:", error);
    }
  };

  const getFavoriteAds = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/getFavoriteAds/${username}`
      );
      console.log(response.data);
      const favoriteAds = response.data.favoriteAds;
      setFavoriteAds(favoriteAds);
    } catch (error) {
      console.error("Favori ilanlar alınırken bir hata oluştu:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
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
        getFavoriteAds,
        unreadMessages,
        conversationHistory,
        getConversation,
        currentConversation,
        sendMessage,
        currentConversationReceiver,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
