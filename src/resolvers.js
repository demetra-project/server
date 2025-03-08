const SensorData = require('./sensorData.model');

const resolvers = {
  SensorData: {
    createdAt: (parent) => parent.created_at
  },
  Query: {
    allSensorData: async () => await SensorData.findAll({ raw: true }),
    sensorData: async (_, { id }) => await SensorData.findByPk(id, { raw: true })
  },
  Mutation: {
    addSensorData: async (_, { temperature, humidity, gas }) => {
      return await SensorData.create({
        temperature,
        humidity,
        gas
      }, { raw: true });
    }
  }
};

module.exports = resolvers;
