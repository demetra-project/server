const { gql } = require('graphql-tag');

const typeDefs = gql`
  type SensorData {
    temperature: Float!
    humidity: Float!
    gas: Float!
    gps_lat: Float!
    gps_lon: Float!
    created_at: String!
  }
  type Recognitions {
    id: ID!
    object_name: String!
    object_quantity: Int!
    gps_lat: Float!
    gps_lon: Float!
    sensor_created_at: String!
    created_at: String!
  }

  type Query {
    allSensorData: [SensorData!]!
    sensorData(gps_lat: Float!, gps_lon: Float!, created_at: String): [SensorData!]!

    allRecognitions: [Recognitions!]!
    recognition(gps_lat: Float!, gps_lon: Float!, created_at: String): [Recognitions!]!
  }

  type Mutation {
    addSensorData(
      temperature: Float!,
      humidity: Float!,
      gas: Float!,
      gps_lat: Float!,
      gps_lon: Float!,
      created_at: String!
    ): SensorData!

    addObject(
      object_name: String!,
      object_quantity: Int!,
      gps_lat: Float!,
      gps_lon: Float!,
      sensor_created_at: String!,
      created_at: String
    ): Recognitions!
  }
`;

module.exports = typeDefs;