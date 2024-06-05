import React, { useState } from "react";
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
  const { handleToggleFavoriteAd } = useAdverts(); // Favori ilanı ekleme/kaldırma işlemini sağlayan fonksiyon
  const [isBookmarked, setIsBookmarked] = useState(false);

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
    <Card sx={{ width: 320 }}>
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
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Total price:</Typography>
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
          Explore
        </Button>
      </CardContent>
    </Card>
  );
};

export default Adverts;
