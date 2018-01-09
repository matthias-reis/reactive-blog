// a plotql data source that accepts a type definition (array) and a resolver definition
// and returns a valid plotql object

const { makeExecutableSchema } = require('graphql-tools');

module.exports = (typeDefs, resolvers) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });
  return Promise.resolve(schema);
};
