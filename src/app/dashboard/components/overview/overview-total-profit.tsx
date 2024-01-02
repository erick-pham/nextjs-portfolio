import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import type { SxProps } from "@mui/material";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import type { ReactElement } from "react";

export const OverviewTotalProfit = ({
  value,
  sx,
}: {
  sx: SxProps;
  value: string;
}): ReactElement => {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Total Profit
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};
