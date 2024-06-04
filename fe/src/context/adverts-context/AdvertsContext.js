import React, { createContext, useState, useContext, useEffect } from 'react';

const AdvertsContext = createContext();

export const useAdverts = () => {
  return useContext(AdvertsContext);
};

export const AdvertsProvider = ({ children }) => {

  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <AdvertsContext.Provider value={adverts}>
      {!loading && children}
    </AdvertsContext.Provider>
  );
};
