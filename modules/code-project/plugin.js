'use strict';

/**
 * @module code-project
 */

const viewRoute = require('./route');

/**
 * Registers the Code Project plugin
 * @param {Object} server - Hapi Server object
 * @param {Object} options - Plugin specific options
 * @param {Function} next - Callback to confirm plugin registration
 * @returns {Null} nothing
 */
function codeProject (server, options, next) {
    server.route(viewRoute);

    next();
}

module.exports.register = codeProject;

module.exports.register.attributes = {
    dependencies: [
        'user',
        'team',
        'github'
    ],
    name: 'code-project',
    version: '0.1.0'
};
