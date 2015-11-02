'use strict';

const database = require('../../lib/database');
const server = require('../../lib/server');
const configuration = require('../../nicest.json');


server.setup(configuration);

database(configuration);

server.server.start(() => {
    console.log('Server running at:', server.server.info.uri);
});

module.exports = server.server;
