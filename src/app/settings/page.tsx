import type { ReactElement } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { SettingsNotifications } from "./components/settings-notifications";
import { SettingsPassword } from "./components/settings-password";

const AdminSettings = async (): Promise<ReactElement> => {
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
        </Stack>
      </Container>
    </Box>
  );
};

export default AdminSettings;
