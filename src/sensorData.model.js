const { sequelize } = require('./db.config');
const { DataTypes } = require('sequelize');

const SensorData = sequelize.define('sensors_data', {
    temperature: DataTypes.DECIMAL(10, 2),
    humidity: DataTypes.DECIMAL(10, 2),
    gas: DataTypes.DECIMAL(10, 2),
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    timestamps: false,
    underscored: true
  }
);

module.exports = SensorData;