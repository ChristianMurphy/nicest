'use strict';

/**
 * @module documentation
 */

const viewRoute = require('./route');

/**
 * Registers the Documentation plugin
 * @param {Object} server - Hapi Server object
 * @param {Object} options - Plugin specific options
 * @param {Fuction} next - Callback to confirm plugin registration
 * @returns {Null} nothing
 */
function documentation (server, options, next) {
    server.route(viewRoute);

    next();
}

exports.register = documentation;

exports.register.attributes = {
    name: 'documentation',
    version: '0.1.0'
};
