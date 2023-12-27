"use server";
import NextLink from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Grid, Typography } from "@mui/material";
import { auth } from "@/auth";

const DashboardPage: React.FC = async () => {
  const session = await auth();

  return (
    <Grid
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
      }}
    >
      <Typography variant="h6">Hi {session?.user.name}</Typography>
      <Typography variant="h1">Coming soon</Typography>

      <NextLink href="/" passHref>
        <Button variant="contained" startIcon={<ArrowBackIcon />}>
          Go back to home
        </Button>
      </NextLink>
    </Grid>
  );
};

export default DashboardPage;
