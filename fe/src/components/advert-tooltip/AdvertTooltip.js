import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const AdvertTooltip = () => {
  const longText = `
      Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
      Praesent non nunc mollis, fermentum neque at, semper arcu.
      Nullam eget est sed sem iaculis gravida eget vitae justo.
    `;
  return (
    <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
      <Tooltip title={longText}>
        <Button
          sx={{
            ml: "auto",
            alignSelf: "center",
            fontWeight: 600,
          }}
        >
          İlan Detayı
        </Button>
      </Tooltip>
    </div>
  );
};

export default AdvertTooltip;
