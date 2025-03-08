const { ApolloServer } = require('apollo-server-express');
const { sequelize } = require('./src/db.config');
const typeDefs = require('./src/typeDefs');
const resolvers = require('./src/resolvers');
const express = require('express');

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    introspection: true,
    playground: true
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected successfully');
  }
  catch(error){ console.error('Database connection error:', error); }

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
  });
}

startServer();
