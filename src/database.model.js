const { sequelize } = require('./db.config');
const { DataTypes } = require('sequelize');

const SensorData = sequelize.define('sensors_data', {
    temperature: DataTypes.DECIMAL(10, 2),
    humidity: DataTypes.DECIMAL(10, 2),
    gas: DataTypes.DECIMAL(10, 2),
    gps_lat: DataTypes.DECIMAL(10, 7),
    gps_lon: DataTypes.DECIMAL(10, 7),
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    timestamps: false,
    underscored: true
});

const Recognitions = sequelize.define('recognitions', {
    name: DataTypes.TEXT(),
    quantity: DataTypes.INTEGER(),
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    timestamps: false,
    underscored: true
  }
);

module.exports = { SensorData, Recognitions };