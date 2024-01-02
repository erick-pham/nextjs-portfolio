import type { PopoverProps } from "@mui/material";
import { useCallback, useRef, useState } from "react";

type UsePopoverPro = {
  anchorRef: PopoverProps["anchorEl"];
  handleClose: () => void;
  handleOpen: () => void;
  handleToggle: () => void;
  open: boolean;
};

export function usePopover(): UsePopoverPro {
  const anchorRef = useRef<PopoverProps["anchorEl"]>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setOpen((prevState: boolean) => !prevState);
  }, []);

  return {
    anchorRef: anchorRef.current,
    handleClose,
    handleOpen,
    handleToggle,
    open,
  };
}
