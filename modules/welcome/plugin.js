'use strict';

/**
 * @module welcome
 */

const viewRoute = require('./route');

/**
 * Registers the User plugin
 * @param {Object} server - Hapi Server object
 * @param {Object} options - Plugin specific options
 * @param {Fuction} next - Callback to confirm plugin registration
 * @returns {Null} nothing
 */
function welcome (server, options, next) {
    server.route(viewRoute);

    next();
}

exports.register = welcome;

exports.register.attributes = {
    name: 'welcome',
    version: '0.1.0'
};
