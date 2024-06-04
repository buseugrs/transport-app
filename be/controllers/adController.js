const Ad = require('../models/Ad');

const getAds = async (req, res) => {
    try {
        const ads = await Ad.findAll();
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addAd = async (req, res) => {
    const { adPhoto, adTitle, adDescription, budget, isProduct, productSpecialType, productSpecialDate, productSpecialStartCity, productSpecialEndCity, productSpecialIsElevatorNeeded, productSpecialStartFloor, productSpecialEndFloor, vehicleSpecialLicensePlate, vehicleSpecialType, vehicleSpecialServiceCities } = req.body;
    try {
        const ad = await Ad.create({ adPhoto, adTitle, adDescription, budget, isProduct, productSpecialType, productSpecialDate, productSpecialStartCity, productSpecialEndCity, productSpecialIsElevatorNeeded, productSpecialStartFloor, productSpecialEndFloor, vehicleSpecialLicensePlate, vehicleSpecialType, vehicleSpecialServiceCities });
        res.status(201).json(ad);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getAds, addAd };
