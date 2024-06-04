import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FeedIcon from "@mui/icons-material/Feed";

const drawerWidth = 240;

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const UserProfile = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const handleListItemClick = (index) => {
    setActiveIndex(index);
  };

  const handleAddProductAdvert = (index) => {
    navigate("/add-product-advert");
  };

  const handleAddvehicleAdvert = (index) => {
    navigate("/add-vehicle-advert");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        border: "1px solid red",
        padding: "0 10rem",
        backgroundColor: "#f6f6f6",
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          height: "auto",
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            position: "relative",
            height: "auto",
          },
        }}
      >
        <List>
          {["Özet", "İlanlarım", "Favori İlanlar"].map((text, index) => (
            <ListItem
              key={text}
              onClick={() => handleListItemClick(index)}
              sx={{
                cursor: "pointer",
                color: index === activeIndex ? "#438ed8" : "initial",
                backgroundColor: index === activeIndex ? "#f0f8ff" : "initial",
                "&:hover": { backgroundColor: "#f0f8ff", color: "#438ed8" },
              }}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Container maxWidth="md">
        <Main>
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{ height: "100%", padding: 2, textAlign: "center" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FeedIcon sx={{ fontSize: 80, color: "#6990ad" }} />
                  <Box ml={1}>
                    <Typography variant="h6" color={"#6990ad"}>
                      Yayında Olan
                    </Typography>
                    <Typography variant="h6" color={"#6990ad"}>
                      İlan Adedi
                    </Typography>
                    <Typography variant="h4" color={"#6990ad"}>
                      10
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{ height: "100%", padding: 2, textAlign: "center" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <StarBorderIcon sx={{ fontSize: 80, color: "#6990ad" }} />
                  <Box ml={1}>
                    <Typography variant="h6" color={"#6990ad"}>
                      Favorilere Eklenen
                    </Typography>
                    <Typography variant="h6" color={"#6990ad"}>
                      İlan Adedi
                    </Typography>
                    <Typography variant="h4" color={"#6990ad"}>
                      5
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Box textAlign="center" mt={2}>
            <Button
              onClick={handleAddProductAdvert}
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
            >
              Eşya İlanı Ver
            </Button>
            <Button onClick={handleAddvehicleAdvert} variant="contained" color="primary">
              Araç İlanı Ver
            </Button>
          </Box>
        </Main>
      </Container>
    </Box>
  );
};

export default UserProfile;
