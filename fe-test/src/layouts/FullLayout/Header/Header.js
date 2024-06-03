import React, { useState } from "react";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
  TextField,
  useScrollTrigger,
  Slide,
} from "@mui/material";
import userimg from "../../../assets/images/users/user.jpg";

// HideOnScroll Component to handle hiding the AppBar on scroll
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const [anchorEl5, setAnchorEl5] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const handleClick5 = (event) => {
    setAnchorEl5(event.currentTarget);
  };

  const handleClose5 = () => {
    setAnchorEl5(null);
  };

  return (
    <HideOnScroll>
      <AppBar sx={props.sx} elevation={0} className={props.customClass}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={props.toggleMobileSidebar}
            sx={{
              display: {
                lg: "none",
                xs: "inline",
              },
            }}
          >
            <MenuOutlinedIcon width="20" height="20" />
          </IconButton>
          <IconButton
            aria-label="menu"
            color="inherit"
            aria-controls="dd-menu"
            aria-haspopup="true"
            onClick={handleClick5}
          >
            <AddToPhotosOutlinedIcon />
          </IconButton>
          <Menu
            id="dd-menu"
            anchorEl={anchorEl5}
            keepMounted
            open={Boolean(anchorEl5)}
            onClose={handleClose5}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
            sx={{
              "& .MuiMenu-paper": {
                width: "250px",
                right: 0,
                top: "70px !important",
              },
            }}
          >
            <MenuItem onClick={handleClose5}>
              <Avatar
                sx={{
                  width: "35px",
                  height: "35px",
                }}
              />
              <Box
                sx={{
                  ml: 2,
                }}
              >
                New account
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose5}>
              <Avatar
                sx={{
                  width: "35px",
                  height: "35px",
                }}
              />
              <Box
                sx={{
                  ml: 2,
                }}
              >
                New Page
              </Box>
            </MenuItem>
            <MenuItem onClick={handleClose5}>
              <Avatar
                sx={{
                  width: "35px",
                  height: "35px",
                }}
              />
              <Box
                sx={{
                  ml: 2,
                }}
              >
                New Component
              </Box>
            </MenuItem>
          </Menu>

          <Box flexGrow={1} />

          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: "white",
                borderRadius: 1,
                width: '100%',
                maxWidth: '400px'
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Arama..."
                size="small"
                sx={{ flex: 1 }}
              />
            </Box>
          </Box>

          <Box flexGrow={1} />

          <IconButton
            aria-label="menu"
            color="inherit"
            aria-controls="notification-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <NotificationsNoneOutlinedIcon width="20" height="20" />
          </IconButton>
          <Menu
            id="notification-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            sx={{
              "& .MuiMenu-paper": {
                width: "200px",
                right: 0,
                top: "70px !important",
              },
            }}
          >
            <MenuItem onClick={handleClose}>Action</MenuItem>
            <MenuItem onClick={handleClose}>Action Else</MenuItem>
            <MenuItem onClick={handleClose}>Another Action</MenuItem>
          </Menu>
          <Box
            sx={{
              width: "1px",
              backgroundColor: "rgba(0,0,0,0.1)",
              height: "25px",
              ml: 1,
            }}
          ></Box>
          <Button
            aria-label="menu"
            color="inherit"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleClick4}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                src={userimg}
                alt={userimg}
                sx={{
                  width: "30px",
                  height: "30px",
                }}
              />
            </Box>
          </Button>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl4}
            keepMounted
            open={Boolean(anchorEl4)}
            onClose={handleClose4}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            sx={{
              "& .MuiMenu-paper": {
                width: "250px",
                right: 0,
                top: "70px !important",
              },
            }}
          >
            <MenuItem onClick={handleClose4}>
              <Avatar
                sx={{
                  width: "35px",
                  height: "35px",
                }}
              />
              <Box
                sx={{
                  ml: 2,
                }}
              >
                Hesabım
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose4}>
              <ListItemIcon>
                <PersonAddOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Giriş Yap
            </MenuItem>
            <MenuItem onClick={handleClose4}>
              <ListItemIcon>
                <SettingsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Ayarlar
            </MenuItem>
            <MenuItem onClick={handleClose4}>
              <ListItemIcon>
                <LogoutOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Çıkış yap
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
