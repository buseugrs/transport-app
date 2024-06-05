import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth-context/AuthContext";
import { useAdverts } from "../../context/adverts-context/AdvertsContext";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemove from "@mui/icons-material/BookmarkRemoveOutlined";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";

const Adverts = ({ advert }) => {
  const { currentUser, favoriteAds, getFavoriteAds, updateFavoriteAds } = useAuth();

  const handleFavoriteIconClick = () => {
    if (favoriteAds && favoriteAds.includes(advert.id)) {
      // Eğer ilan favorilerde ise, kaldır
      const updatedFavoriteAds = favoriteAds.filter((id) => id !== advert.id);
      updateFavoriteAds(currentUser.username, updatedFavoriteAds);
    } else {
      // Eğer ilan favorilerde değilse, ekle
      const updatedFavoriteAds = [...favoriteAds, advert.id];
      updateFavoriteAds(currentUser.username, updatedFavoriteAds);
    }
    getFavoriteAds(currentUser.username);
  };

  return (
    <Card sx={{ width: 320, marginTop: 0 ,height:400, position:"relative"}}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          level="title-lg"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            marginRight: "8px", // Sağ tarafta bir boşluk bırakmak için
          }}
        >
          {advert.adTitle}
        </Typography>
        {currentUser && (
          <IconButton
            aria-label={`bookmark ${advert.adTitle}`}
            onClick={handleFavoriteIconClick}
            variant="plain"
            color={favoriteAds && favoriteAds.includes(advert.id) ? "primary" : "neutral"} // Favoriye eklenmişse renk değiştir
            size="sm"
            sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
          >
            {favoriteAds && favoriteAds.includes(advert.id) ? <BookmarkRemove /> : <BookmarkAdd />}
          </IconButton>
        )}
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img src={advert.adPhoto} loading="lazy" alt={advert.adTitle} />
      </AspectRatio>
      <CardContent orientation="vertical">
        {advert.isProduct ? (
          <div>
            <Typography level="body-md" fontWeight={900}>
              Eşya İlanı
            </Typography>
            <Typography level="body-md" fontWeight={900}>
              {advert.budget} TL
            </Typography>
            <Typography level="body-md">
              Alınacak Şehir:{advert.productSpecialStartCity}
            </Typography>
            <Typography level="body-md">
              Bırakılacak Şehir:{advert.productSpecialStartCity}
            </Typography>
          </div>
        ) : (
          <div>
            <Typography level="body-md" fontWeight={900}>
              Araç İlanı
            </Typography>
            <Typography level="body-md" fontWeight={900}>
              {advert.budget} TL
            </Typography>
            <Typography level="body-md">
              Hizmet Verilen Şehirler: {advert.vehicleSpecialServiceCities}
            </Typography>
          </div>
        )}

        <Button
          variant="solid"
          size="md"
          color="primary"
          aria-label={`Explore ${advert.adTitle}`}
          sx={{ ml: "auto", alignSelf: "center", fontWeight: 600, position:"absolute", bottom:"1rem", right:"1rem"}}
        >
          İlanı İncele
        </Button>
      </CardContent>
    </Card>
  );
};

export default Adverts;
