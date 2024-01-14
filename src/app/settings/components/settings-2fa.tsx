"use client";
import { useState, type ReactElement } from "react";
import type { Theme } from "@mui/material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormGroup,
  Stack,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import toast from "react-hot-toast";
import Image from "next/image";
import { setup2FAAction } from "../actions";
import LoadingWrapper from "@/components/LoadingWrapper";
import { setup2FA } from "@/lib/auth.api";

const AntSwitch = styled(Switch)(({ theme }: { theme: Theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

enum SetupStep {
  Start = "Start",
  DisplayQrCode = "DisplayQrCode",
  EnterOtpCode = "EnterOtpCode",
}

export const Settings2FA = ({
  twoFactorEnabled,
}: {
  twoFactorEnabled: boolean;
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
      const twoFAEnableRes = await setup2FAAction({
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

  const handleCleanUp = (): void => {
    setStep(SetupStep.Start);
    setDataUri("");
    setOtpCode("");
  };

  return (
    <LoadingWrapper loading={isSubmitting}>
      <Dialog open={step === SetupStep.DisplayQrCode}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          OTP Verification
        </DialogTitle>
        <DialogContent>
          <DialogContent>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <Typography color="text.secondary">
                Scan the following QR code with your authenticator app then
                enter the OTP
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
            </Stack>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <DialogActions>
            <Button
              onClick={handleCleanUp}
              autoFocus
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
            <Button
              onClick={handleVerify}
              autoFocus
              variant="contained"
              color="info"
            >
              Verify
            </Button>
          </DialogActions>
        </DialogActions>
      </Dialog>
      <Card>
        <CardHeader
          title="2FA setup"
          subheader="By enable this feature allow you login with 2fa code instead of password"
        />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <FormGroup>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Off</Typography>
                <AntSwitch
                  defaultChecked={false}
                  onChange={handleSetup}
                  inputProps={{ "aria-label": "ant design" }}
                  checked={Boolean(twoFactorEnabled)}
                />
                <Typography>On</Typography>
              </Stack>
            </FormGroup>
          </Stack>
        </CardContent>
        <Divider />
      </Card>
    </LoadingWrapper>
  );
};
