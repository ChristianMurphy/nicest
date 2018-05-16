'use strict';

/**
 * @module welcome
 */

const viewRoute = require('./route');

/**
 * Registers the User plugin
 * @param {Object} server - Hapi Server object
 * @returns {Null} nothing
 */
function welcome (server) {
    server.route(viewRoute);
}

exports.plugin = {
    name: 'welcome',
    register: welcome,
    version: '0.1.0'
};
