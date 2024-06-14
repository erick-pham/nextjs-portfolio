"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

type ConfirmationDialogProps = {
  children: (showDialog: () => void) => ReactNode;
  description: string;
  handleClickOk: () => void;
  title: string;
};

const ConfirmationDialog = ({
  handleClickOk,
  children,
  title,
  description,
}: ConfirmationDialogProps): React.ReactElement => {
  const [openPopconfirm, setOpenPopconfirm] = useState(false);

  const showDialog = (): void => {
    setOpenPopconfirm(true);
  };

  const hideDialog = (): void => {
    setOpenPopconfirm(false);
  };

  const confirmRequest = (): void => {
    handleClickOk();
    hideDialog();
  };

  return (
    <>
      {children(showDialog)}
      {openPopconfirm && (
        <Dialog
          open={openPopconfirm}
          onClose={hideDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={confirmRequest}
              autoFocus
              variant="contained"
              color="error"
            >
              Yes
            </Button>
            <Button onClick={hideDialog} variant="contained" color="info">
              No
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ConfirmationDialog;
