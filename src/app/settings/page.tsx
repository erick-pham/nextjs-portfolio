import type { ReactElement } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { SettingsNotifications } from "./components/settings-notifications";
import { SettingsPassword } from "./components/settings-password";
import { Settings2FA } from "./components/settings-2fa";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

const AdminSettings = async (): Promise<ReactElement> => {
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
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">Settings</Typography>
          <SettingsNotifications />
          <SettingsPassword />
          <Settings2FA
            twoFactorEnabled={Boolean(userProfile.twoFactorEnabled)}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default AdminSettings;
