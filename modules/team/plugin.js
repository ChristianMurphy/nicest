'use strict';

/**
 * @module team
 */

const apiRoute = require('./api/route');
const viewRoute = require('./route');

/**
 * Registers the Team plugin
 * @param {Object} server - Hapi Server object
 * @returns {Null} nothing
 */
function team (server) {
    server.route(apiRoute);
    server.route(viewRoute);
}

exports.plugin = {
    dependencies: ['user'],
    name: 'team',
    register: team,
    version: '0.1.0'
};
