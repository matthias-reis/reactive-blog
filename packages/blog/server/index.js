const express = require('express');

const app = express();

let config = {
  port: 8080
};

app.get('/', (req, res) => res.send('OK'));

const configure = conf => config = Object.assign({}, config, conf);

const run = () =>
  app.listen(config.port, () =>
    console.log(`server listening. Run http://localhost:${config.port}`));

module.exports = {
  configure,
  run
};
