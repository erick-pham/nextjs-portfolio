import React from "react";
import { AppBar, Box, Button, Toolbar, Container } from "@mui/material";
import type { ReactElement } from "react";

import Link from "next/link";

export const HomeNavBar = (): ReactElement => {
  return (
    <>
      <AppBar style={{ backgroundColor: "rgba(0, 0, 0, 0.40)" }}>
        <Container>
          <Toolbar
            disableGutters
            sx={{
              minHeight: 64,
              px: 2,
            }}
          >
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <Link href={`/`}>
                <Button sx={{ color: "#fff" }}>Home</Button>
              </Link>
              <Link href={`/dashboard`}>
                <Button sx={{ color: "#fff" }}>Dashboard</Button>
              </Link>
              <Link href={`/contact`}>
                <Button sx={{ color: "#fff" }}>Contact</Button>
              </Link>
              <Link href={`/about`}>
                <Button sx={{ color: "#fff" }}>About</Button>
              </Link>
              <Button
                size="small"
                sx={{
                  color: "black",
                  backgroundColor: "white",
                }}
              >
                Sign In
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default HomeNavBar;
