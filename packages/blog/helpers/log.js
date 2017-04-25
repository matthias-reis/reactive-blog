const R = require('ramda');
const logger = require('npmlog');
const log = R.curry(logger.log);
const config = require('../config');

logger.level = config.get('logLevel');

module.exports = context => {
  const debug = log('verbose', context);
  const info = log('info', context);
  const warn = log('warn', context);
  const error = log('error', context);

  return { debug, info, warn, error };
};
