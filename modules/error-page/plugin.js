'use strict';

/**
 * @module error-page
 */

const viewRoute = require('./route');

/**
 * Registers the Error Page plugin
 * @param {Object} server - Hapi Server object
 * @param {Object} options - Plugin specific options
 * @param {Function} next - Callback to confirm plugin registration
 * @returns {Null} nothing
 */
function errorPage (server, options, next) {
    server.route(viewRoute);

    next();
}

exports.register = errorPage;

exports.register.attributes = {
    name: 'error-page',
    version: '0.1.0'
};
