import type { ReactElement } from "react";
import { Grid } from "@mui/material";
import { AccountProfile } from "./components/AccountProfile.component";
import { AccountProfileDetails } from "./components/AccountProfileDetails.component";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

const UserProfilePage = async (): Promise<ReactElement> => {
  const session = await auth();
  const prisma = new PrismaClient();
  const userProfile = await prisma.user.findUnique({
    where: {
      id: session?.user.id || "",
    },
  });

  if (!userProfile) {
    notFound();
  }

  return (
    <Grid gap={8}>
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <AccountProfile userProfile={userProfile} />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <AccountProfileDetails userProfile={userProfile} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfilePage;
