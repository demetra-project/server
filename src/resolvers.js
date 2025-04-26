const { SensorData, Recognitions } = require('./database.model');
const { Op } = require('sequelize');

const resolvers = {
  Query: {
    allSensorData: async () => { return await SensorData.findAll({ raw: true }); },
    sensorData: async (_, { gps_lat, gps_lon, created_at }) => {
      const where = {
        gps_lat: { [Op.between]: [gps_lat - 0.0001, gps_lat + 0.0001] },
        gps_lon: { [Op.between]: [gps_lon - 0.0001, gps_lon + 0.0001] }
      };

      if(created_at) where.created_at = { [Op.gte]: created_at };
      return await SensorData.findAll({ where, raw: true });
    },

    allRecognitions: async () => { return await Recognitions.findAll({ raw: true }); },
    recognition: async (_, { gps_lat, gps_lon, created_at }) => {
      const where = {
        gps_lat: { [Op.between]: [gps_lat - 0.0001, gps_lat + 0.0001] },
        gps_lon: { [Op.between]: [gps_lon - 0.0001, gps_lon + 0.0001] }
      };

      if(created_at) where.created_at = { [Op.gte]: created_at };
      return await Recognitions.findAll({ where, raw: true });
    }
  },

  Mutation: {
    addSensorData: async (_, { temperature, humidity, gas, gps_lat, gps_lon, created_at }) => {
      const finalCreatedAt = created_at || new Date().toISOString();
      const [sensorData, created] = await SensorData.findOrCreate({
        where: { gps_lat, gps_lon, created_at: finalCreatedAt },
        defaults: { temperature, humidity, gas }
      });

      if(!created) await sensorData.update({ temperature, humidity, gas });
      return sensorData;
    },

    addObject: async (_, { object_name, object_quantity, gps_lat, gps_lon, sensor_created_at, created_at }) => {
      const [recognition, created] = await Recognitions.findOrCreate({
        where: { gps_lat, gps_lon, sensor_created_at, object_name },
        defaults: { object_quantity, created_at: created_at || new Date().toISOString() }
      });

      if(!created) await recognition.update({ object_quantity });
      return recognition;
    },

  }
};

module.exports = resolvers;