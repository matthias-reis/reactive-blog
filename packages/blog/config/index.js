const path = require('path');

let config = {
  port: 8080,
  logLevel: 'info',
  accessLogFormat: ':status -> [:remote-addr :remote-user] [:date[clf]] [:method :url HTTP/:http-version" @ :response-time ms] [cl :res[content-length]] [ref :referrer] [ua: :user-agent]',
  accessLogDir: path.join(process.cwd(), 'log')
};

const set = (key, value) => config[key] = value;
const assign = newConfig => config = Object.assign({}, config, newConfig);
const get = (key, elseVal = null) => config[key] || elseVal;

module.exports = {
  set,
  assign,
  get,
  webpack: { server: require('./webpackServer') }
};
