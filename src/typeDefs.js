const { gql } = require('graphql-tag');

const typeDefs = gql`
  type SensorData {
    id: ID!
    temperature: Float!
    humidity: Float!
    gas: Float!
    createdAt: String!
  }
  type Recognitions {
    id: ID!
    name: String!
    quantity: Int!
    createdAt: String!
  }
  type Query {
    allSensorData: [SensorData!]!
    sensorData(id: ID!): SensorData

    allRecognitions: [Recognitions!]!
    recognition(id: ID!): Recognitions
  }
  type Mutation {
    addSensorData(temperature: Float!, humidity: Float!, gas: Float!): SensorData!
    editSensorData(id: ID!, temperature: Float!, humidity: Float!, gas: Float!): SensorData!

    addObject(name: String!, quantity: Int!): Recognitions!
    editObject(id: ID!, name: String!, quantity: Int!): Recognitions!
  }
`;

module.exports = typeDefs;