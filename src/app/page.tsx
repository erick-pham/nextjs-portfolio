"use server";
import HomeNavBar from "@/components/HomeNavBar";
import { Box, Container, Grid, Typography } from "@mui/material";
import type { ReactNode } from "react";
import Image from "next/image";
import { HomePortfolio } from "@/components/HomePortfolio";
import MyCopyright from "@/components/Copyright";

const HomePage = (): ReactNode => (
  <Box
    sx={{
      display: "flex",
      flex: "1 1 auto",
      flexDirection: "column",
      maxWidth: "100%",
    }}
  >
    <HomeNavBar />
    <Container
      sx={{
        mt: 20,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {/* <Box
            sx={{
              position: "relative",
              width: "100%",
              textAlign: "center",
              borderRadius: "0.6rem",
              overflow: "hidden",
            }}
          >
            <Image
              layout="responsive"
              width={200}
              height={200}
              objectFit="contain"
              src={""}
            />
          </Box> */}

          <Box
            sx={{
              textAlign: "center",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            {/* <Avatar
              // src="/static/images/my-avatar2.jpg"
              sx={{
                height: 400,
                width: 400,
              }}
            >
             
            </Avatar> */}
            <Image
              alt="avatar"
              src="/static/images/my-avatar2.jpg"
              // layout="responsive"
              width={300}
              height={300}
              objectFit="contain"
              style={{
                // borderRadius: "40px",
                borderRadius: "50%",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="h5">Hello!</Typography>
            <Typography variant="h4">Erick Pham!</Typography>
            <Typography variant="h4">
              And I&#39;m a Full-stack developer
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
    <Container
      sx={{
        mt: 20,
        mb: 20,
      }}
    >
      <HomePortfolio />
    </Container>
    <MyCopyright />
  </Box>
);

export default HomePage;
