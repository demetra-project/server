const { sequelize } = require('./db.config');
const { DataTypes } = require('sequelize');

const SensorData = sequelize.define('sensors_data', {
    temperature: DataTypes.DECIMAL(10, 2),
    humidity: DataTypes.DECIMAL(10, 2),
    gas: DataTypes.DECIMAL(10, 2),
    gps_lat: { type: DataTypes.DECIMAL(10, 7), primaryKey: true },
    gps_lon: { type: DataTypes.DECIMAL(10, 7), primaryKey: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, primaryKey: true }
  }, {
    timestamps: false,
    underscored: true
});

const Recognitions = sequelize.define('recognitions', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    object_name: DataTypes.TEXT(),
    object_quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    gps_lat: { type: DataTypes.DECIMAL(10, 7), allowNull: false },
    gps_lon: { type: DataTypes.DECIMAL(10, 7), allowNull: false },
    sensor_created_at: { type: DataTypes.DATE, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    timestamps: false,
    underscored: true
  }
);

module.exports = { SensorData, Recognitions };