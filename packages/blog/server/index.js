const path = require('path');
const fs = require('fs');

const express = require('express');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const middlewareFactory = require('hops/middleware');

const log = require('../helpers/log')('woodward server');
const config = require('../config');

// access log rotation
const accessLogDir = config.get('accessLogDir');
console.log(accessLogDir);
fs.existsSync(accessLogDir) || fs.mkdirSync(accessLogDir);
const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: accessLogDir
});

const webpackConfig = config.webpack.server;
const app = express();

log.info('launching WOODWARD server ...');
log.info(`access logs saved under <${accessLogDir}>`);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/templates'));

// middleware stack
app.use(morgan(config.get('accessLogFormat'), { stream: accessLogStream }));
app.all('*', middlewareFactory(webpackConfig));

const run = () =>
  app.listen(config.get('port'), () =>
    log.info(`now listening. Run http://localhost:${config.get('port')}`));

module.exports = {
  run
};
