import React from 'react';
import { Grid } from '@mui/material';
import Adverts from '../adverts/Adverts';

const HomePageAdverts = () => {
  const adverts = [
    {
      id: 1,
      baslik: "İlan Başlığı 1",
      gorsel: "https://via.placeholder.com/150",
      price: "$2,900"
    },
    {
      id: 2,
      baslik: "İlan Başlığı 2",
      gorsel: "https://via.placeholder.com/150",
      price: "$3,200"
    },
    {
      id: 3,
      baslik: "İlan Başlığı 3",
      gorsel: "https://via.placeholder.com/150",
      price: "$1,800"
    }
  ];

  return (
    <Grid container spacing={2}>
      {adverts.map((advert) => (
        <Grid item xs={12} sm={6} md={4} key={advert.id}>
          <Adverts advert={advert} />
        </Grid>
      ))}
    </Grid>
  );
}

export default HomePageAdverts;
