const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { sequelize } = require('./src/db.config');
const typeDefs = require('./src/typeDefs');
const resolvers = require('./src/resolvers');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

async function startServer() {
  const app = express();
  app.use(express.json());

  // create Apollo Server instance
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== 'production',
    includeStacktraceInErrorResponses: process.env.NODE_ENV !== 'production',
  });

  await apolloServer.start(); // apply middleware after starting server

  // configure CORS and body parser
  app.use('/',
    cors({
      origin: process.env.CLIENT_ORIGIN || 'http://127.0.0.1:8080',
      credentials: true
    }),
    bodyParser.json(),
    expressMiddleware(apolloServer, { context: async ({ req }) => ({ req }) })
  );

  // database connection
  try{
    await sequelize.authenticate();
    await sequelize.sync({ force: process.env.NODE_ENV !== 'production' }); // if development, drop and recreate tables
    console.log('Database connected successfully');
  }
  catch(error){ console.error('Database connection error:', error); }

  // start server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/`);
  });
}

startServer();