import React, { createContext, useState, useContext, useEffect } from "react";

const AdvertsContext = createContext();

export const useAdverts = () => {
  return useContext(AdvertsContext);
};

export const AdvertsProvider = ({ children }) => {
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteAds, setFavoriteAds] = useState([]); // Sadece ilan ID'lerini saklayacak state
  const [favoriteAdDetails, setFavoriteAdDetails] = useState([]); // Favori ilanların tam verilerini saklayacak state
  const [productAdverts, setProductAdverts] = useState([]);
  const [vehicleAdverts, setVehicleAdverts] = useState([]);
  const [allAdverts, setAllAdverts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/ads/");
      const data = await response.json();
      console.log(data);
      setAdverts(data);
      setAllAdverts(data);
      setProductAdverts(data.filter((advert) => advert.isProduct === true));
      setVehicleAdverts(data.filter((advert) => advert.isProduct === false));
      setLoading(false);
    } catch (error) {
      console.error("Veri alınamadı:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Favori ilanları localStorage'dan al
    const storedFavoriteAds =
      JSON.parse(localStorage.getItem("favoriteAds")) || [];
    setFavoriteAds(storedFavoriteAds);
  }, []);

  useEffect(() => {
    // Favori ilanların tam verilerini al
    const favoriteAdDetails = adverts.filter((ad) =>
      favoriteAds.includes(ad.id)
    );
    setFavoriteAdDetails(favoriteAdDetails);
  }, [adverts, favoriteAds]);

  // Favori ilan ekleme ve kaldırma işlemleri
  const handleToggleFavoriteAd = (advertId, isBookmarked) => {
    if (isBookmarked) {
      // Favori ilanları localStorage'da saklama
      const updatedFavoriteAds = [...favoriteAds, advertId];
      setFavoriteAds(updatedFavoriteAds);
      localStorage.setItem("favoriteAds", JSON.stringify(updatedFavoriteAds));
    } else {
      const updatedFavoriteAds = favoriteAds.filter((id) => id !== advertId);
      setFavoriteAds(updatedFavoriteAds);
      localStorage.setItem("favoriteAds", JSON.stringify(updatedFavoriteAds));
    }
  };

  console.log(favoriteAds);

  return (
    <AdvertsContext.Provider
      value={{
        adverts,
        loading,
        favoriteAds,
        favoriteAdDetails,
        handleToggleFavoriteAd,
        fetchData,
        productAdverts,
        vehicleAdverts,
        setAdverts,
        allAdverts
      }}
    >
      {!loading && children}
    </AdvertsContext.Provider>
  );
};
