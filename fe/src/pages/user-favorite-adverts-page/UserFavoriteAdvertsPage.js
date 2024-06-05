import React from "react";
import UserFavoriteAdverts from "../../components/user-favorite-adverts/UserFavoriteAdverts";

import { Grid } from "@mui/material";

const UserFavoriteAdvertsPage = () => {
  return (
    <Grid
      container
      spacing={2}
      border={"1px solid green"} // Sadece test amaçlı sınırlar ekledim, gerçek uygulamada kaldırabilirsiniz
      marginTop={0}
      padding={"2rem"}
    >
      <UserFavoriteAdverts />
    </Grid>
  );
};

export default UserFavoriteAdvertsPage;
