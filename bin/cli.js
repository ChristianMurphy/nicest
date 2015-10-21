#!/usr/bin/env node
'use strict';

const configuration = require('../nicest.json');

const database = require('../lib/database');
const server = require('../lib/server').setup(configuration);

database(configuration);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
