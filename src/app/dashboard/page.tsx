"use server";
import NextLink from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Grid, Typography } from "@mui/material";

const DashboardPage: React.FC = () => (
  <>
    <Grid
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
      }}
    >
      <Typography variant="h1">Coming soon</Typography>

      <NextLink href="/" passHref>
        <Button variant="contained" startIcon={<ArrowBackIcon />}>
          Go back to home
        </Button>
      </NextLink>
    </Grid>
  </>
);

export default DashboardPage;
