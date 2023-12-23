import React from "react";
import type { Theme } from "@mui/material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { BellIcon, UsersIcon } from "./icons";
import type { ReactElement } from "react";

type DashboardNavbarProps = {
  onSidebarOpen: () => void;
};
export const DashboardNavbar = ({
  onSidebarOpen,
}: DashboardNavbarProps): ReactElement => {
  return (
    <>
      <AppBar
        sx={{
          left: {
            lg: 220,
          },
          width: {
            lg: "calc(100% - 220px)",
          },
          backgroundColor: (theme: Theme) => theme.palette.background.paper,
          backgroundImage: "none",
          boxShadow: (theme: Theme) => theme.shadows[3],
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
            }}
            src={""}
          >
            U
          </Avatar>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default DashboardNavbar;
