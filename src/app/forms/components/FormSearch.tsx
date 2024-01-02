import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import type { ReactElement } from "react";

export const FormSearch = (): ReactElement => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search form"
      startAdornment={
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      }
      sx={{ maxWidth: 500 }}
    />
  </Card>
);
