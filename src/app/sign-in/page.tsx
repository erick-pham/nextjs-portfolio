import { Grid } from "@mui/material";
import type { ReactElement } from "react";

// import { signIn } from "next-auth/react";

import { SignInLayout } from "./components/SignInLayout.component";
import { auth } from "../../auth";
import { redirect } from "next/navigation";

const LoginPage = async (): Promise<ReactElement> => {
  const session = await auth();

  if (session?.user) {
    // @ts-expect-error TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
    return redirect("/");
  }

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
