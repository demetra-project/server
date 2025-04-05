const { SensorData, Recognitions } = require('./database.model')

const resolvers = {
  SensorData: { createdAt: (parent) => parent.created_at },
  Recognitions: { createdAt: (parent) => parent.created_at },
  Query: {
    allSensorData: async () => await SensorData.findAll({ raw: true }),
    allRecognitions: async () => await Recognitions.findAll({ raw: true }),
    sensorData: async (_, { id }) => await SensorData.findByPk(id, { raw: true }),
    recognition: async (_, { id }) => await Recognitions.findByPk(id, { raw: true })
  },
  Mutation: {
    addSensorData: async (_, { temperature, humidity, gas }) => {
      return await SensorData.create({ temperature, humidity, gas });
    },
    addObject: async (_, { name, quantity }) => {
      return await Recognitions.create({ name, quantity });
    },
    editSensorData: async (_, { id, temperature, humidity, gas }) => {
      const sensorData = await SensorData.findByPk(id);
      if(!sensorData) throw new Error('Sensor data not found');
      await sensorData.update({ temperature, humidity, gas });
      return sensorData;
    },
    editObject: async (_, { id, name, quantity }) => {
      if (!id || name === undefined || quantity === undefined) {
        throw new Error("Missing required parameters: id, name, or quantity.");
      }

      const recognition = await Recognitions.findByPk(id);
      if (!recognition) throw new Error("Object not found");

      return await recognition.update({ name, quantity });
    }
  }
};

module.exports = resolvers;