"use client";
import { FormInputText } from "@/components/Form/FormInputText";
import { GoogleIcon } from "@/components/Icons";
import Link from "@/components/Link";
import { Box, Button, Typography } from "@mui/material";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

interface SignInProps {
  isSignInMode: boolean;
  setSignInMode: (value: boolean) => void;
}

export const SignInForm = ({
  isSignInMode,
  setSignInMode,
}: SignInProps): ReactElement => {
  const signInMethod = useForm();

  return (
    <FormProvider {...signInMethod}>
      <Box
        component="form"
        sx={{
          mt: 1,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FormInputText
          fullWidth
          required
          id="email"
          label="Email Address"
          fieldName="email"
        />
        <FormInputText
          fullWidth
          required
          fieldName="password"
          label="Password"
          type="password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 1,
            mb: 1,
          }}
        >
          Sign In
        </Button>

        <Button
          color="error"
          fullWidth
          startIcon={<GoogleIcon />}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => signIn("google")}
          variant="contained"
          sx={{
            mt: 1,
            mb: 1,
          }}
        >
          Sign In with Google
        </Button>

        <Box
          sx={{
            mt: 1,
            mb: 3,
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Typography
            onClick={() => {
              setSignInMode(!isSignInMode);
            }}
          >
            New user? Create an account
          </Typography>
        </Box>

        <Link href="/" sx={{ color: "white", textDecoration: "underline" }}>
          Go back to Home
        </Link>
      </Box>
    </FormProvider>
  );
};
