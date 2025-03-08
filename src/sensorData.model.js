const { sequelize, Sequelize } = require('./db.config');
const { DataTypes } = Sequelize;

const SensorData = sequelize.define('sensors_data', {
    temperature: DataTypes.DECIMAL(10, 2),
    humidity: DataTypes.DECIMAL(10, 2),
    gas: DataTypes.DECIMAL(10, 2),
    created_at: DataTypes.DATE
  }, {
    timestamps: false,
    underscored: true
  }
);

module.exports = SensorData;
