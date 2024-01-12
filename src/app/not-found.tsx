import NextLink from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Grid, Typography, Container } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found",
};

const NotFoundPage: React.FC = async () => (
  <Container>
    <Grid
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
      }}
    >
      <Typography variant="h1">404: PAGE NOT FOUND</Typography>
      <Typography variant="h4">
        Oops! The page you are looking for isn’t here.
      </Typography>

      <NextLink href="/" passHref>
        <Button variant="contained" startIcon={<ArrowBackIcon />}>
          Go back to home
        </Button>
      </NextLink>
    </Grid>
  </Container>
);

export default NotFoundPage;
