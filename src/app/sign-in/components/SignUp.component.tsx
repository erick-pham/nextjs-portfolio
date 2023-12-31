"use client";
import { FormInputText } from "@/components/Form/FormInputText";
import Link from "@/components/Link";
import { Box, Button, Typography } from "@mui/material";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface SignUpProps {
  isSignInMode: boolean;
  setSignInMode: (value: boolean) => void;
}

export const SignUpForm = ({
  isSignInMode,
  setSignInMode,
}: SignUpProps): ReactElement => {
  const SignUpMethod = useForm();

  return (
    <FormProvider {...SignUpMethod}>
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
        <FormInputText fullWidth required label="Name" fieldName="name" />
        <FormInputText
          fullWidth
          required
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
          Sign Up
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
            Have an account? Sign In now!
          </Typography>
        </Box>

        <Link href="/" sx={{ color: "white", textDecoration: "underline" }}>
          Go back to Home
        </Link>
      </Box>
    </FormProvider>
  );
};
