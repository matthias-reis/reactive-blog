const config = require('woodward').config;
const server = require('woodward').server;

config.set('port', 4000);

server.run();
