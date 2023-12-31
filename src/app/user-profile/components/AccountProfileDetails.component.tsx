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
} from "@mui/material";
import type { ReactElement } from "react";
import type { RefOption } from "@/common/constants";
import { GENDERS } from "@/common/constants";
import type { IUser } from "../../../types/user";

export const AccountProfileDetails = ({
  userProfile,
}: {
  userProfile: IUser;
}): ReactElement => {
  return (
    <form autoComplete="off">
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                // onChange={handleChange}
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
                  )
                )}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                // onChange={handleChange}
                required
                value={userProfile.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                // helperText="Please specify the first name"
                label="First name"
                name="firstName"
                // onChange={handleChange}
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
            {/* <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                  variant="outlined"
                >
                  {states.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid> */}
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
  );
};
