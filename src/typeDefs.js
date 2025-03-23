const { gql } = require('graphql-tag');

const typeDefs = gql`
  type SensorData {
    id: Int!
    temperature: Float!
    humidity: Float!
    gas: Float!
    createdAt: String!
  }
  type Query {
    allSensorData: [SensorData!]!
    sensorData(id: Int!): SensorData
  }
  type Mutation {
    addSensorData(temperature: Float!, humidity: Float!, gas: Float!): SensorData!
  }
`;

module.exports = typeDefs;