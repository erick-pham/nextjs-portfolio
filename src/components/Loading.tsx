import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const AppLoading: React.FC = () => (
  <Backdrop sx={{ color: "#fff", zIndex: 99999999 }} open={true}>
    <CircularProgress color="secondary" />
  </Backdrop>
);

export default AppLoading;
