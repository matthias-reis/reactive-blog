const { join } = require('path');

const { server, simpleSchemaSource } = require('..');
const markdownSchemaSource = require('../../plotql-md');

const dus = require('./dummy-schema');
const sws = require('./starwars-schema');

server([
  simpleSchemaSource(dus.types, dus.resolvers),
  simpleSchemaSource(sws.types, sws.resolvers)
  // markdownSchemaSource('articles', join(__dirname, './articles'))
])
  .then(start => {
    start(4201);
  })
  .catch(e => console.error(e));
