import { Grid } from "@mui/material";
import type { ReactElement } from "react";

// import { signIn } from "next-auth/react";

import { SignInLayout } from "./components/SignInLayout.component";

const LoginPage = async (): Promise<ReactElement> => {
  return (
    <Grid
      container
      spacing={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid item sm={1} md={4} />
      <Grid item sm={10} md={4}>
        <SignInLayout />
      </Grid>
      <Grid item sm={1} md={4} />
    </Grid>
  );
};

export default LoginPage;
