import {
  Card,
  CardContent,
  Box,
  Avatar,
  Typography,
  Divider,
  CardActions,
  Button,
} from "@mui/material";
import type { ReactElement } from "react";
import type { IUser } from "../../../types/user";

export const AccountProfile = ({
  userProfile,
}: {
  userProfile: IUser;
}): ReactElement => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={userProfile.image || ""}
          sx={{
            height: 64,
            mb: 2,
            width: 64,
          }}
        />
        <Typography color="textPrimary" gutterBottom variant="h5">
          {userProfile.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {/* {`${userProfile.city} ${userProfile.country}`} */}
          {userProfile.email}
        </Typography>
        {/* <Typography color="textSecondary" variant="body2">
          {userProfile.timezone}
        </Typography> */}
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button color="primary" fullWidth variant="text">
        Upload picture
      </Button>
    </CardActions>
  </Card>
);
