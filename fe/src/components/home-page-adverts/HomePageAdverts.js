import React from "react";
import { Grid } from "@mui/material";
import Adverts from "../adverts/Adverts";
import { useAdverts } from "../../context/adverts-context/AdvertsContext";

const HomePageAdverts = () => {
  const { adverts } = useAdverts(); // Destructure the adverts array from the context

  if (adverts && adverts.length > 0) {
    // Check if adverts is not empty and is an array
    return (
      <Grid
        container
        spacing={2}
        marginTop={0}
        padding={"2rem"}
      >
        {adverts.map((advert) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={advert.id}
            container
            justifyContent="center"
            alignItems="center"
            paddingBottom={"16px"}
          >
            <Adverts advert={advert} />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return "Loading";
  }
};

export default HomePageAdverts;
