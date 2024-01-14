import type { ReactElement } from "react";
import NextLink from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import GridViewIcon from "@mui/icons-material/GridView";
import Person4Icon from "@mui/icons-material/Person4";
import SettingsIcon from "@mui/icons-material/Settings";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";

import type { Theme } from "@mui/material";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import NextImage from "next/image";
import type { NavItemProp } from "./NavItem";
import { NavItem } from "./NavItem";

const AdminMenuItems = [
  {
    href: "/dashboard",
    icon: <DashboardIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/forms",
    icon: <DynamicFormIcon fontSize="small" />,
    title: "Forms",
  },
  {
    href: "/rules",
    icon: <GridViewIcon fontSize="small" />,
    title: "Rules",
  },
  // {
  //   href: "/admin/customers",
  //   icon: <GroupIcon fontSize="small" />,
  //   title: "Customers",
  // },
  // {
  //   href: "/admin/products",
  //   icon: <ShoppingBasketIcon fontSize="small" />,
  //   title: "Products",
  // },
  // {
  //   href: "/admin/products-items",
  //   icon: <ShoppingBagIcon fontSize="small" />,
  //   title: "Products Items",
  // },
  // {
  //   href: '/settings',
  //   icon: (<CogIcon fontSize="small" />),
  //   title: 'Settings'
  // },
  // {
  //   href: '/login',
  //   icon: (<LockIcon fontSize="small" />),
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: (<UserAddIcon fontSize="small" />),
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: (<XCircleIcon fontSize="small" />),
  //   title: 'Error'
  // }
];

const UserMenuItems = [
  {
    href: "/user-profile",
    icon: <Person4Icon />,
    title: "Profile",
  },
  {
    href: "/settings",
    icon: <SettingsIcon />,
    title: "Settings",
  },
  {
    href: "/",
    icon: <TurnLeftIcon />,
    title: "Exit",
  },
];

type DashboardSidebarProp = {
  open: boolean;
  onClose?: () => void;
};

export const DashboardSidebar = ({
  open,
  onClose,
}: DashboardSidebarProp): ReactElement => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <NextImage
                alt="logo"
                src="/static/images/logo.png"
                height={45}
                width={160}
              ></NextImage>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  Erick Pham
                </Typography>
              </div>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {AdminMenuItems.map((item: NavItemProp) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
          <Divider sx={{ my: 3 }} />
          {UserMenuItems.map((item: NavItemProp) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "#0E1217",
            color: "#FFFFFF",
            width: 220,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "#0E1217",
          color: "#FFFFFF",
          width: 220,
        },
      }}
      sx={{ zIndex: (theme: Theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default DashboardSidebar;
