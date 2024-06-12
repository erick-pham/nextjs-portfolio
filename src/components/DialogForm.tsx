import type { DialogProps } from "@mui/material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from "@mui/material";
import type { ReactNode } from "react";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import CancelIcon from "@mui/icons-material/Cancel";

type DialogFormProps = DialogProps & {
  children: ReactNode;
  dialogFormTitle: string;
  handleClickCancel: () => void;
  handleClickSave: () => void;
  disabledSaveButton?: boolean;
  loading?: boolean;
};

const DialogForm = ({
  children,
  loading,
  handleClickSave,
  handleClickCancel,
  dialogFormTitle,
  disabledSaveButton,
  ...rest
}: DialogFormProps): ReactNode => {
  return (
    <Box>
      <Dialog
        {...rest}
        // sx={{
        //   // backgroundColor: "red",
        //   pointerEvents: "none",
        // }}
      >
        {loading ? <LinearProgress color="primary" /> : null}
        <DialogTitle>{dialogFormTitle}</DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
          <LoadingButton
            variant="contained"
            onClick={handleClickCancel}
            disabled={loading}
            startIcon={<CancelIcon />}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            color="success"
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            onClick={handleClickSave}
            disabled={disabledSaveButton}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DialogForm;
