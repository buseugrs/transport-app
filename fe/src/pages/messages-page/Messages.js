import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// Örnek kullanıcılar
const users = [
  { id: 1, name: "Alice", avatar: "https://via.placeholder.com/150" },
  { id: 2, name: "Bob", avatar: "https://via.placeholder.com/150" },
];

// Örnek mesajlar
const initialMessages = [
  { id: 1, senderId: 1, receiverId: 2, text: "Merhaba, nasılsın?" },
  { id: 2, senderId: 2, receiverId: 1, text: "Merhaba, iyiyim sen?" },
];

const MessageComponent = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(initialMessages);
  const [messageText, setMessageText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");

  const handleMessageChange = (e) => {
    setMessageText(e.target.value);
  };

  const handleSendMessage = () => {
    if (messageText.trim() === "" || !selectedUserId) return;

    const newMessage = {
      id: messages.length + 1,
      senderId: 1, // Örnek olarak kullanıcı 1 tarafından gönderildiğini varsayalım
      receiverId: selectedUserId,
      text: messageText.trim(),
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
    setSnackbarOpen(true);
  };

  const handleUserClick = (userId, userName) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    navigate(`/messages/${userId}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box mt={4} mx={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Mesajlar</Typography>
              <Divider />
              <List>
                {users.map((user) => (
                  <ListItem key={user.id} button onClick={() => handleUserClick(user.id, user.name)}>
                    <ListItemAvatar>
                      <Avatar alt={user.name} src={user.avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Mesaj gönderildi"
      />
    </Box>
  );
};

export default MessageComponent;
