'use strict';

/**
 * @module manage-code-project
 */

const viewRoute = require('./routes');

/**
 * Register the manage code project plugin
 * @param {Object} server - Hapi Server object
 * @param {Object} options - Plugin specific options
 * @param {Function} next - Callback to confirm plugin registration
 * @returns {Null} nothing
 */
function manageCodeProject (server, options, next) {
    server.route(viewRoute);

    next();
}

module.exports.register = manageCodeProject;

module.exports.register.attributes = {
    name: 'manage-code-project',
    version: '0.1.0'
};
