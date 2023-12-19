"use client";
import type { ReactNode } from "react";
import React, { useState } from "react";
import { Box } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { DashboardNavbar } from "./DashboardNavbar";
import { DashboardSidebar } from "./DashboardSidebar";

const DashboardLayoutRoot = styled("div")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 220,
  },
}));

export const DashboardLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar
        onSidebarOpen={() => {
          setSidebarOpen(true);
        }}
      />
      <DashboardSidebar
        onClose={() => {
          setSidebarOpen(false);
        }}
        open={isSidebarOpen}
      />
    </>
  );
};

export default DashboardLayout;
