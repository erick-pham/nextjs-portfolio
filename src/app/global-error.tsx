"use client";

import Head from "next/head";
import type { ReactNode } from "react";
import { Typography, Grid, Button } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";

export default function Error({
  // error,
  reset,
}: {
  // error: Error & { digest?: string };
  reset: () => void;
}): ReactNode {
  return (
    <div>
      <Head>
        <title>404 - Page not found</title>
      </Head>
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
