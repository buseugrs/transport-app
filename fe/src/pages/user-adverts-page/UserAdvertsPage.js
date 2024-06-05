import React from "react";
import { Grid } from "@mui/material";
import UserAdverts from "../../components/user-adverts/UserAdverts";

const UserAdvertsPage = () => {
  return (
    <Grid
    container
    spacing={2}
    border={"1px solid red"}
    marginTop={0}
    padding={"2rem"}
  >
  <UserAdverts />
  </Grid>
  );

};

export default UserAdvertsPage;
