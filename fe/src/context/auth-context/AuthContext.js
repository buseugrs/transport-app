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
  const [signUpError, setSignUpError] = useState("");
  const [loginError, setLoginError] = useState("");
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
      setLoginError("");
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Kullanıcı adı veya şifre hatalı!");
      throw error;
    }
  };

  const logout = () => {
    navigate("/"); // Navigate to home before setting user to null
    setCurrentUser(null);
    setCurrentConversation([]);
    localStorage.removeItem("currentUser");
  };

  const signup = async (username, email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/users/create", {
        email,
        password,
        username,
      });
      setSignUpError("");
    } catch (error) {
      console.error("Signup failed:", error);
      setSignUpError("Kullanıcı adı ve/veya E-Mail zaten var!");
      throw error;
    }
  };

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

      // İki listeyi birleştirip benzersiz kullanıcıları elde etme
      const combinedMessages = [
        ...incomingMessagesFrom,
        ...outgoingMessagesFrom,
      ];
      const uniqueUsers = Array.from(
        new Set(combinedMessages.map((message) => message))
      );

      // conversationHistory'i setleyelim
      setConversationHistory(uniqueUsers);
    } catch (error) {
      console.error("Mesajlar kontrol edilirken hata oluştu:", error);
    }
  };

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
      getConversation(receiver);
    } catch (error) {
      console.error("Mesajlar kontrol edilirken hata oluştu:", error);
    }
  };

  const updateMessagesReadTrue = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/messages/updateMessagesReadTrue/${currentUser.username}`
      );
      checkMessages();
    } catch (error) {
      console.error("Mesajlar kontrol edilirken hata oluştu:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        await checkMessages();
      }
    };

    fetchData();
  }, [currentUser, unreadMessages]);

  const updateFavoriteAds = async (username, newFavoriteAds) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/users/updateFavorites/${username}`,
        { favoriteAds: newFavoriteAds }
      );
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
        updateMessagesReadTrue,
        setCurrentConversationReceiver,
        signUpError,
        loginError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
