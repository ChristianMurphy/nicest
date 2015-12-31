'use strict';

const database = require('../../lib/database');
const nicest = require('../../lib/server');
const configuration = require('../../nicest.json');


nicest.setup(configuration);

database(configuration);

nicest.server.start(() => {
    console.log('Server running at:', nicest.server.info.uri + nicest.server.realm.modifiers.route.prefix);
});

module.exports = nicest.server;
