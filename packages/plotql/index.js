exports.server = require('./server');
exports.simpleSchemaSource = require('./simple-schema-source');

const { astFromValue, GraphQLInt } = require('graphql');

console.log(astFromValue(1, GraphQLInt));
