import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LockIcon from "@mui/icons-material/Lock";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Person2Icon from "@mui/icons-material/Person2";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../../Assets/BrandLogo.png";
import { useGlobalContext } from "../../Global/GlobalContext";
import { removeTokens } from "../../Utils/localStorage";

const TopAppBar = ({ drawerWidth }) => {
  const { currentUser } = useGlobalContext();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const queryClient = useQueryClient();

  const { data: notificationData = [], isLoading: notificationLoading } =
    useQuery(["/api/sales/service/notification/"]);

  const profileMenus = [
    {
      title: "আমার একাউন্ট",
      icon: Person2Icon,
      color: "primary.main",
      action: () => {
        navigate("/profile");
      },
    },
    {
      title: "সেটিংস",
      icon: SettingsIcon,
      color: "primary.main",
      action: () => {
        navigate("/settings");
      },
    },
    {
      title: "লগ আউট",
      icon: LockIcon,
      color: "#FF304F",
      action: () => {
        removeTokens();
        queryClient.resetQueries();
        navigate("/auth");
      },
    },
  ];

  return (
    <AppBar
      color="color3"
      position="fixed"
      sx={{
        // width: `calc(100% - ${drawerWidth}px)`,
        // ml: `${drawerWidth}px`,
        color: "textBlack",
        boxShadow: 2,
        // zIndex: 99999,
      }}
    >
      <Toolbar
        sx={{
          padding: "12px 24px !important",
          justifyContent: "space-between",
          // gap: "35px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Link to="/">
            <Box
              component="img"
              src={BrandLogo}
              sx={{ height: "55px", width: "90px" }}
            />
          </Link>
          <Typography sx={{ fontSize: "16px", color: "color1.main" }}>
            Corbel International Ltd.
          </Typography>
          {/* <SearchField /> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "35px",
            alignItems: "center",
          }}
        >
          {/* <Badge
            badgeContent={17}
            overlap="circular"
            color="primary"
            sx={{
              "& .MuiBadge-badge": {
                height: "20px",
                width: "20px",
              },
            }}
          >
            <IconButton
              // onClick={() => navigate("/notification")}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{ bgcolor: "color5.main", height: "45px", width: "45px" }}
            >
              <MdMessage sx={{ fontSize: "26px" }} />
            </IconButton>
          </Badge> */}
          <Badge
            badgeContent={notificationData.length}
            overlap="circular"
            color="primary"
            sx={{
              "& .MuiBadge-badge": {
                height: "20px",
                width: "20px",
              },
            }}
          >
            <IconButton
              onClick={() => navigate("/notification")}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{ bgcolor: "color5.main", height: "45px", width: "45px" }}
            >
              <NotificationsIcon sx={{ fontSize: "26px" }} />
            </IconButton>
          </Badge>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Box
              component={Link}
              to="/profile"
              sx={{
                height: "40px",
                width: "40px",
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: "50%",
              }}
            >
              <Avatar
                src={currentUser?.profile_pic}
                sx={{
                  height: 1,
                  width: 1,
                }}
              />
            </Box>
            <Button
              onClick={(event) => setAnchorEl(event.currentTarget)}
              sx={{
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "16px",
                  }}
                >
                  {currentUser?.full_name ?? "Admin"}
                </Typography>
                <ArrowDropDownIcon />
              </Box>
              <Typography sx={{ fontSize: "14px" }}>
                {currentUser?.email}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Toolbar>

      {/* profile menu */}
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {profileMenus.map(
          ({ title, icon: Icon, color, action = () => null }, idx) => {
            return (
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  action();
                }}
                key={`profile-menus-${idx}`}
              >
                <ListItemIcon>
                  <Icon sx={{ color }} />
                </ListItemIcon>
                <ListItemText sx={{ color }}>{title}</ListItemText>
              </MenuItem>
            );
          }
        )}
      </Menu>
    </AppBar>
  );
};

export default TopAppBar;
