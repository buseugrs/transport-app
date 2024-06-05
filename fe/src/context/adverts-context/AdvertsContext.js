import React, { createContext, useState, useContext, useEffect } from "react";

const AdvertsContext = createContext();

export const useAdverts = () => {
  return useContext(AdvertsContext);
};

export const AdvertsProvider = ({ children }) => {
  const [adverts, setAdverts] = useState([]);
  const [productAdverts, setProductAdverts] = useState([]);
  const [vehicleAdverts, setVehicleAdverts] = useState([]);
  const [allAdverts, setAllAdverts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/ads/");
      const data = await response.json();
      setAdverts(data);
      setAllAdverts(data);
      setProductAdverts(data.filter((advert) => advert.isProduct === true));
      setVehicleAdverts(data.filter((advert) => advert.isProduct === false));
    } catch (error) {
      console.error("Veri alınamadı:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdvertsContext.Provider
      value={{
        adverts,
        fetchData,
        productAdverts,
        vehicleAdverts,
        setAdverts,
        allAdverts,
      }}
    >
      {children}
    </AdvertsContext.Provider>
  );
};
