import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

import user1 from "../../../assets/images/backgrounds/u2.jpg";
import user2 from "../../../assets/images/backgrounds/u3.jpg";
import user3 from "../../../assets/images/backgrounds/u4.jpg";

const blogs = [
  {
    img: user1,
    title: "Artık taşınmak gözümde büyümeyecek!",
    subtitle:
      "Tüm nakliye sürecim en iyi hizmet ve en uygun fiyatla istediğim şekilde yöntildi! Artık taşınmak gözümde büyümeyecek, teşekkürler!",
    btncolor: "error",
  },
  {
    img: user2,
    title: "Neden daha önce böyle bir siteden haberim olmamıştı? ",
    subtitle:
      "Eşyamı ilana koyar koymaz teklif geldi. İşlemlerin bu kadar kısa sürede gerçekleştiği için hala şaşkınım, işimi kolaylaştırdığınız için teşekkürler.",
    btncolor: "warning",
  },
  {
    img: user3,
    title: "Aracım paket taşımak için yaratılmış resmen!",
    subtitle:
      "Sürekli kullandığım aracımdan para kazanmak hiç bu kadar mutlu etmemişti. İlanlara tıklamak dahi sevinçlendiriyor artık buradan çıkmayacağım sanırım!  ",
    btncolor: "primary",
  },
];

const BlogCard = () => {
  return (
    <Grid container>
      {blogs.map((blog, index) => (
        <Grid
          key={index}
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              p: 0,
              width: "100%",
            }}
          >
            <img src={blog.img} alt="img" width="100%" />
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "h4.fontSize",
                  fontWeight: "500",
                }}
              >
                {blog.title}
              </Typography>
              <Typography
                color="textSecondary"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  mt: 1,
                }}
              >
                {blog.subtitle}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogCard;
