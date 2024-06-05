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
  const { currentUser } = useAuth();
  const { handleToggleFavoriteAd, favoriteAds } = useAdverts(); // Favori ilanları ve toggle fonksiyonunu kullanıyoruz
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // İlanın favorilere eklenip eklenmediğini kontrol et
    setIsBookmarked(favoriteAds.includes(advert.id));
  }, [favoriteAds, advert.id]);

  // İlanın favoriye eklenip çıkarılmasını yöneten fonksiyon
  const handleBookmarkToggle = () => {
    setIsBookmarked((prev) => {
      const newBookmarkState = !prev;
      // Kullanıcının favoriye eklemesi/kaldırması
      handleToggleFavoriteAd(advert.id, newBookmarkState);
      return newBookmarkState;
    });
  };

  return (
    <Card sx={{ width: 320, marginTop: 0}}>
      <div style={{ display: "flex", alignItems: "center"}}>
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
            variant="plain"
            color={isBookmarked ? "primary" : "neutral"} // Favoriye eklenmişse renk değiştir
            size="sm"
            onClick={handleBookmarkToggle} // Tıklama olayı
            sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
          >
            {isBookmarked ? <BookmarkRemove /> : <BookmarkAdd />}
          </IconButton>
        )}
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img src={advert.adPhoto} loading="lazy" alt={advert.adTitle} />
      </AspectRatio>
      <CardContent orientation="vertical">
      {advert.isProduct && (
            <Typography level="body-md" fontWeight={900}>
              {advert.productSpecialStartCity} - {advert.productSpecialEndCity}
            </Typography>
          )}
        <div>
          <Typography level="body-md" fontWeight={900}>{advert.budget} TL</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {advert.price}
          </Typography>
        </div>
        <Button
          variant="solid"
          size="md"
          color="primary"
          aria-label={`Explore ${advert.adTitle}`}
          sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
        >
          İlanı İncele
        </Button>
      </CardContent>
    </Card>
  );
};

export default Adverts;
