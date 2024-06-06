import * as React from "react";
import { useAuth } from "../../context/auth-context/AuthContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import ConversationWindow from "../conversation-window/ConversationWindow";

const UserMessages = () => {
  const { conversationHistory, getConversation } = useAuth();
  return (
    <>
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {conversationHistory.map((conversationUser, index) => {
        return (
          <ListItem alignItems="center" key={index} sx={{cursor:"pointer"}}  onClick={() => getConversation(conversationUser)} >
            <ListItemAvatar>
              <Avatar>
                <LocalPostOfficeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary={conversationUser}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  ></Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        );
      })}
    </List>
    <ConversationWindow/>
    </>

  );
};

export default UserMessages;
