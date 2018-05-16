'use strict';

/**
 * @module error-page
 */

const viewRoute = require('./route');

/**
 * Registers the Error Page plugin
 * @param {Object} server - Hapi Server object
 * @returns {Null} nothing
 */
function errorPage (server) {
    server.route(viewRoute);
}

exports.plugin = {
    name: 'error-page',
    register: errorPage,
    version: '0.1.0'
};
