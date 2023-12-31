"use client";
import { FormInputText } from "@/components/Form/FormInputText";
import { GoogleIcon } from "@/components/Icons";
import Link from "@/components/Link";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useState, type ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { SignInResponse } from "next-auth/react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { ErrorCode } from "@/common/errorCode";
import type { Credential } from "@/types/auth";
import { useRouter } from "next/navigation";
import { MuiOtpInput } from "mui-one-time-password-input";
interface SignInProps {
  isSignInMode: boolean;
  setSignInMode: (value: boolean) => void;
}

export const SignInForm = ({
  isSignInMode,
  setSignInMode,
}: SignInProps): ReactElement => {
  const signInMethod = useForm();
  const router = useRouter();

  const [otp, setOtp] = useState<string>("");
  const [showOTP, setShowOTP] = useState<boolean>(false);

  const handleChangeOTP = (newValue: string): void => {
    setOtp(newValue);
  };

  const handleSignIn = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    const singInInput = signInMethod.getValues() as Credential;
    console.log("Email: ", singInInput.email);
    signIn("credentials", {
      redirect: false,
      ...singInInput,
    })
      .then((response: SignInResponse | undefined) => {
        console.log("response", response);
        if (response?.ok) {
          router.replace("/profile");
          return;
        }

        switch (response?.error) {
          case ErrorCode.IncorrectPassword:
            toast.error("Invalid credentials");
            return;
          case ErrorCode.SecondFactorRequired:
            setShowOTP(true);
            return;
          default:
            return;
        }
      })
      .catch(() => {
        toast.error("Sorry something went wrong");
      });
  };

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

        {showOTP && <MuiOtpInput value={otp} onChange={handleChangeOTP} />}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 1,
            mb: 1,
          }}
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <Divider>or</Divider>
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
