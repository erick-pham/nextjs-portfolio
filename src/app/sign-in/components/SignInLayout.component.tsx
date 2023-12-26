"use client";

import { Box, Typography } from "@mui/material";
import { useState, type ReactElement } from "react";
import { SignInForm } from "./SignIn.component";
import { SignUpForm } from "./SignUp.component";
import MyCopyright from "@/components/Copyright";

export const SignInLayout = (): ReactElement => {
  const [isSignInMode, setSignInMode] = useState<boolean>(true);

  return (
    <Box
      sx={{
        my: 4,
        borderRadius: "20px",
        boxShadow: "0 0 10px 10px #0EE",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        component="h5"
        variant="h5"
        sx={{
          p: 1,
          bgcolor: "#319795",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          borderBottomLeftRadius: "50%",
          borderBottomRightRadius: "50%",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isSignInMode ? "Sign In" : "Sign Up"}
      </Typography>
      {isSignInMode ? (
        <SignInForm
          isSignInMode={isSignInMode}
          setSignInMode={setSignInMode}
        ></SignInForm>
      ) : (
        <SignUpForm
          isSignInMode={isSignInMode}
          setSignInMode={setSignInMode}
        ></SignUpForm>
      )}

      <Box
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MyCopyright />
      </Box>
    </Box>
  );
};
