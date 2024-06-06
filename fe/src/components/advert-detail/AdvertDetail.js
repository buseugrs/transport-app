import React from "react";
import { useAdverts } from "../../context/adverts-context/AdvertsContext";
import { useParams } from "react-router-dom";

import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";

const AdvertDetail = () => {
  const { adverts } = useAdverts();
  const { advertId } = useParams(); // useParams kullanarak URL'den ilan ID'sini alın
  const advert = adverts.find((ad) => ad.id === parseInt(advertId)); // ID'ye göre ilanı bulun

  return (
    <>
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          fontSize: "24px",
          fontWeight: 900,
          display: "flex",
          justifyContent: "center",
        }}
      >
        İlan Detayı
      </Typography>
      <Table aria-label="basic table">
        <tbody>
          <tr>
            <td>İlan Tarihi</td>
            <td>{advert.createdAt}</td>
          </tr>
          <tr>
            {advert.isProduct ? <td>Ürün Adı</td> : <td>Firma Adı</td>}
            <td>{advert.adTitle}</td>
          </tr>
          <tr>
            {advert.isProduct ? <td>Bütçe</td> : <td>Fiyat</td>}
            <td>{advert.budget} TL</td>
          </tr>

          {advert.isProduct ? (
            <tr>
              <td>Ürün Türü</td>
              <td>{advert.productSpecialType}</td>
            </tr>
          ) : (
            <tr>
              <td>Araç Türü</td>
              <td>{advert.vehicleSpecialType}</td>
            </tr>
          )}
          {!advert.isProduct ? (
            <tr>
              <td>Plaka</td>
              <td>{advert.vehicleSpecialLicensePlate}</td>
            </tr>
          ) : null}
          {advert.isProduct ? (
            <tr>
              <td>Eşyanın Alınacağı Tarih</td>
              <td>{advert.productSpecialDate}</td>
            </tr>
          ) : null}
          {advert.isProduct ? (
            <tr>
              <td>Alınacak Şehir</td>
              <td>{advert.productSpecialStartCity}</td>
            </tr>
          ) : (
            <tr>
              <td>Hizmet Verilen İller</td>
              <td>{advert.vehicleSpecialServiceCities}</td>
            </tr>
          )}
          {advert.isProduct ? (
            <tr>
              <td>Bırakılacak Şehir</td>
              <td>{advert.productSpecialEndCity}</td>
            </tr>
          ) : null}
          {advert.isProduct ? (
            <tr>
              <td>Asansör Gerekli mi ?</td>
              {advert.productSpecialIsElevatorNeeded === true ? (
                <td>Evet</td>
              ) : (
                <td>Hayır</td>
              )}
            </tr>
          ) : null}
          {advert.isProduct ? (
            <tr>
              <td>Alınacak Kat</td>
              <td>{advert.productSpecialStartFloor}</td>
            </tr>
          ) : null}
          {advert.isProduct ? (
            <tr>
              <td>Bırakılacak Kat</td>
              <td>{advert.productSpecialEndFloor}</td>
            </tr>
          ) : null}
          <tr>
            {<td>Açıklama</td>}
            <td>{advert.adDescription}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default AdvertDetail;
