const { makeExecutableSchema, mergeSchemas } = require('graphql-tools');
let app;

module.exports = schemaFactories => {
  const express = require('express');
  const bodyParser = require('body-parser');
  const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

  return Promise.all(schemaFactories)
    .then(schemas => {
      const baseSchema = makeExecutableSchema({
        typeDefs: `
type Query {
  version: String
}

schema {
  query: Query
}
        `,
        resolvers: {
          Query: {
            version: () => '1.0.0'
          }
        }
      });

      app = express();
      const schema = mergeSchemas({
        schemas: [baseSchema, ...schemas]
      });

      const logFunction = msg => console.log('message', msg);
      app.use(
        '/graphql',
        bodyParser.json(),
        graphqlExpress({ schema, logFunction })
      );
      app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

      return;
    })
    .then(() => {
      return port => {
        app.listen(port);
      };
    })
    .catch(e => console.error(e));
};
