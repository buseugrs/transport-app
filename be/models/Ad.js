const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ad = sequelize.define('Ad', {
    adPhoto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehicleType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cities: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Ad;