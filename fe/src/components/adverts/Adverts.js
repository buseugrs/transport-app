import React from "react";
import { useAuth } from "../../context/auth-context/AuthContext";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";

const Adverts = ({ advert }) => {
  const { currentUser } = useAuth();

  return (
    <Card sx={{ width: 320 }}>
      <div>
        <Typography level="title-lg">{advert.adTitle}</Typography>
        {currentUser && (
          <IconButton
            aria-label={`bookmark ${advert.adTitle}`}
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
          >
            <BookmarkAdd />
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
