import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdverts } from "../../context/adverts-context/AdvertsContext";
import { useAuth } from "../../context/auth-context/AuthContext";

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
import AssignmentIcon from "@mui/icons-material/Assignment";

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const UserProfile = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();
  const { adverts, favoriteAds } = useAdverts(); // Destructure adverts and favoriteAds from the context
  const { currentUser } = useAuth(); // Destructure currentUser from the context

  // Kullanıcı tarafından eklenen ilan sayısı
  const userAdCount = adverts.filter(
    (ad) => ad.userId === currentUser.id
  ).length;

  // Kullanıcının favoriye eklediği ilan sayısı
  const userFavoriteAdCount = favoriteAds.length;

  const handleListItemClick = (index) => {
    setActiveIndex(index);
  };

  const handleAddProductAdvert = () => {
    navigate("/add-product-advert");
  };

  const handleAddVehicleAdvert = () => {
    navigate("/add-vehicle-advert");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "0 10rem",
        backgroundColor: "#f6f6f6",
        pt: "50px",
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            position: "relative",
            height: "auto",
            borderRadius: 2,
          },
        }}
      >
        <List sx={{ padding: "0" }}>
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
              <ListItemText primary />
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Container maxWidth="md">
        <Main sx={{ paddingTop: 0 }}>
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  height: "100%",
                  padding: 2,
                  textAlign: "center",
                  borderRadius: 2,
                }}
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
                      {userAdCount}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  height: "100%",
                  padding: 2,
                  textAlign: "center",
                  borderRadius: 2,
                }}
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
                      {userFavoriteAdCount}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{ padding: 2, textAlign: "center", borderRadius: 2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <AssignmentIcon sx={{ fontSize: 80, color: "#6990ad" }} />
                <Typography variant="h5" gutterBottom>
                  Hemen İlan Ver
                </Typography>
                <Typography variant="body1" gutterBottom>
                  İlanınızın milyonlarca kullanıcı tarafından görüntülenmesini
                  sağlayarak kısa sürede sonuca ulaşın.
                </Typography>
              </Box>
              <Box textAlign="center" mt={2}>
                <Button
                  onClick={handleAddProductAdvert}
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                >
                  Eşya İlanı Ver
                </Button>
                <Button
                  onClick={handleAddVehicleAdvert}
                  variant="contained"
                  color="primary"
                >
                  Araç İlanı Ver
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Main>
      </Container>
    </Box>
  );
};

export default UserProfile;
