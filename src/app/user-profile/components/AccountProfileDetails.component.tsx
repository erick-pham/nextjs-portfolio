"use client";

import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Box,
  Button,
  FormControlLabel,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState, type ReactElement } from "react";
import type { RefOption } from "@/common/constants";
import { GENDERS } from "@/common/constants";
import type { IUser } from "../../../types/user";
import toast from "react-hot-toast";
import { MuiOtpInput } from "mui-one-time-password-input";
import LoadingWrapper from "@/components/LoadingWrapper";
import Image from "next/image";
import { setup2FA } from "@/lib/auth.api";

enum SetupStep {
  Start = "Start",
  DisplayQrCode = "DisplayQrCode",
  EnterOtpCode = "EnterOtpCode",
}

export const AccountProfileDetails = ({
  userProfile,
}: {
  userProfile: IUser;
}): ReactElement => {
  const [dataUri, setDataUri] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState(SetupStep.Start);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSetup = async (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ): Promise<void> => {
    setIsSubmitting(true);

    try {
      const twoFASetupRes = await setup2FA({
        type: checked ? "setup" : "disable",
        otpCode: otpCode,
      });

      if (twoFASetupRes.error) {
        toast.error(twoFASetupRes.message);
      } else {
        if (checked) {
          setDataUri(twoFASetupRes.dataUri);
          setStep(SetupStep.DisplayQrCode);
        } else {
          toast.success(twoFASetupRes.message);
        }
      }
    } catch (e) {
      toast.error("Sorry something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      const twoFAEnableRes = await setup2FA({
        type: "enable",
        otpCode: otpCode,
      });

      if (twoFAEnableRes.error) {
        toast.error(twoFAEnableRes.message);
      } else {
        setDataUri("");
        setOtpCode("");
        setStep(SetupStep.Start);
        toast.success(twoFAEnableRes.message);
      }
    } catch (e) {
      toast.error("Sorry something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoadingWrapper loading={isSubmitting}>
      <Dialog
        open={step === SetupStep.DisplayQrCode}
        onClose={() => {
          setStep(SetupStep.Start);
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyItems: "center",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          OTP Verification
        </DialogTitle>
        <DialogContent>
          <DialogContent dividers>
            <Typography>
              Scan the following QR code with your authenticator app then enter
              the OTP
            </Typography>
            <Image
              src={dataUri}
              alt="2fa-qr-code"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "auto", height: "auto", borderRadius: 8 }}
              loading="lazy"
            />
            <MuiOtpInput
              value={otpCode}
              onChange={setOtpCode}
              length={6}
              autoFocus
            />
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <DialogActions>
            <Button
              onClick={handleVerify}
              autoFocus
              variant="contained"
              color="success"
            >
              Verify
            </Button>
          </DialogActions>
        </DialogActions>
      </Dialog>

      <form autoComplete="off">
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  required
                  select
                  value={userProfile.gender}
                  variant="outlined"
                >
                  {GENDERS.map((option: RefOption) =>
                    !option.code ? (
                      <MenuItem key={option.code} value="">
                        <em>None</em>
                      </MenuItem>
                    ) : (
                      <MenuItem key={option.code} value={option.code}>
                        {option.label}
                      </MenuItem>
                    ),
                  )}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  required
                  value={userProfile.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  required
                  value={userProfile.firstName}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  // onChange={handleChange}
                  required
                  value={userProfile.lastName}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  required
                  // onChange={handleChange}
                  value={userProfile.phoneNumber}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  // onChange={handleChange}
                  required
                  value={userProfile.address}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControlLabel
                value={""}
                control={
                  <Switch
                    color="primary"
                    onChange={handleSetup}
                    value={""}
                    checked={Boolean(userProfile.twoFactorEnabled)}
                  />
                }
                label="Login with 2FA"
                labelPlacement="start"
              />
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button color="primary" variant="contained">
              Save
            </Button>
          </Box>
        </Card>
      </form>
    </LoadingWrapper>
  );
};
