"use client";
import type { INewUser, INewUserResponse } from "@/app/api/auth/signup/route";
import { FormInputText } from "@/components/Form/FormInputText";
import Link from "@/components/Link";
import { signUp } from "@/lib/auth.api";
import { Box, Button, Typography } from "@mui/material";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface SignUpProps {
  isSignInMode: boolean;
  setSignInMode: (value: boolean) => void;
}

export const SignUpForm = ({
  isSignInMode,
  setSignInMode,
}: SignUpProps): ReactElement => {
  const SignUpMethod = useForm();

  const handleSignUp = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    // setIsPending(true);
    signUp(SignUpMethod.getValues() as INewUser)
      .then((addUserRes: INewUserResponse) => {
        if (addUserRes.userExists) {
          toast.error(addUserRes.message);
        } else {
          // setEmailInvalid(false);
          // setName("");
          // setEmail("");
          // setPassword("");
          // props.setSignInMode(true);
          toast.success(addUserRes.message);
        }
      })
      .finally(() => {
        // setIsPending(false);
      });
  };

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
          onClick={handleSignUp}
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
