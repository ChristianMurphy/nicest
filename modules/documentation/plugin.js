'use strict';

/**
 * @module documentation
 */

const viewRoute = require('./route');

/**
 * Registers the Documentation plugin
 * @param {Object} server - Hapi Server object
 * @returns {Null} nothing
 */
function documentation (server) {
    server.route(viewRoute);
}

exports.plugin = {
    name: 'documentation',
    register: documentation,
    version: '0.1.0'
};
