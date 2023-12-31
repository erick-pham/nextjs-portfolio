"use client";

import type { ReactNode } from "react";
import { Typography, Grid, Button } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "500 - SERVER ERROR",
};

export default function Error({
  // error,
  reset,
}: {
  // error: Error & { digest?: string };
  reset: () => void;
}): ReactNode {
  return (
    <div>
      <Grid
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h1">500: SERVER ERROR</Typography>
        <Typography variant="h4">Sorry.. there was an error</Typography>

        <Button
          color="secondary"
          variant="contained"
          startIcon={<SyncIcon />}
          onClick={() => {
            reset();
          }}
        >
          Go back to home
        </Button>
      </Grid>
    </div>
  );
}
