import type { ReactNode } from "react";
import React from "react";
import { Backdrop, Box, CircularProgress } from "@mui/material";

type LoadingWrapperProp = React.PropsWithChildren & {
  loading?: boolean;
};

const LoadingWrapper: React.FC<LoadingWrapperProp> = ({
  loading,
  children,
}: LoadingWrapperProp): ReactNode => (
  <Box>
    <Backdrop sx={{ color: "#fff", zIndex: 999999 }} open={Boolean(loading)}>
      <CircularProgress color="secondary" />
    </Backdrop>
    {children}
  </Box>
);

export default LoadingWrapper;
