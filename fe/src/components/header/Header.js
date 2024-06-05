import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context/AuthContext";
import RadioButtons from "../radio-buttons/RadioButtons";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import MoreIcon from "@mui/icons-material/MoreVert";
import logoIcon from "../../assets/images/logo-icon.png";
import logoText from "../../assets/images/image.png";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate("/profil");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#3f475f", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography
            onClick={handleLogoClick}
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Box mr={1} display={"flex"} alignItems={"baseline"}>
              <img src={logoIcon} alt="flexy" />
            </Box>
            <img src={logoText} alt="flexy" width={100} />
          </Typography>

     <RadioButtons/>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {currentUser ? (
              <>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  sx={{ color: "black" }}
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  sx={{ color: "black" }}
                >
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <>
                <MenuItem component={Link} to="/giris" sx={{ color: "white" }}>
                  Giriş Yap
                </MenuItem>
                <MenuItem component={Link} to="/kayit" sx={{ color: "white" }}>
                  Hesap Aç
                </MenuItem>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              sx={{ color: "black" }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default Header;
