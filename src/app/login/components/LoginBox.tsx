"use client";
import { FormInputText } from "@/components/Form/FormInputText";
import { GoogleIcon } from "@/components/Icons";
import Link from "@/components/Link";
import { Box, Button, Typography } from "@mui/material";
import type { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const LoginBox = (): ReactElement => {
  const loginMethod = useForm();

  return (
    <Box
      sx={{
        m: 4,
        my: 4,
        borderRadius: "20px",
        boxShadow: "0 0 10px 10px #0EE",
      }}
    >
      <Box
        bgcolor="#00eeeea3"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "50px",
          justifyContent: "center",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          borderBottomLeftRadius: "50%",
          borderBottomRightRadius: "50%",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            color: "white",
            justifyContent: "center",
          }}
        >
          Login
        </Typography>
      </Box>
      <FormProvider {...loginMethod}>
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
              mt: 2,
              mb: 2,
            }}
          >
            Sign In
          </Button>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              display: "flex",
              color: "white",
              justifyContent: "center",
            }}
          >
            OR
          </Typography>
          <Button
            color="error"
            fullWidth
            startIcon={<GoogleIcon />}
            // onClick={async () => signIn(providers.google.id)}
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
            }}
          >
            Sign In with Google
          </Button>

          <Link href="/" sx={{ color: "white", mb: 2 }}>
            Go back to Home
          </Link>
        </Box>
      </FormProvider>
    </Box>
  );
};
