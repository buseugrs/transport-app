import React, { createContext, useState, useContext, useEffect } from 'react';

const AdvertsContext = createContext();

export const useAdverts = () => {
  return useContext(AdvertsContext);
};

export const AdvertsProvider = ({ children }) => {

  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteAds, setFavoriteAds] = useState([]); // Favori ilanları saklayacak state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/ads/');
        const data = await response.json();
        console.log(data);
        setAdverts(data);
        setLoading(false); 
      } catch (error) {
        console.error('Veri alınamadı:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Favori ilanları localStorage'dan al
    const storedFavoriteAds = JSON.parse(localStorage.getItem("favoriteAds")) || [];
    setFavoriteAds(storedFavoriteAds);
  }, []);

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

  return (
    <AdvertsContext.Provider value={{ adverts, loading, favoriteAds, handleToggleFavoriteAd }}>
      {!loading && children}
    </AdvertsContext.Provider>
  );
};
