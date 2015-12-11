'use strict';

const viewRoute = require('./view/route');

/**
 * Registers the Code Project plugin
 * @param {Object} server - Hapi Server object
 * @param {Object} options - Plugin specific options
 * @param {Fuction} next - Callback to confirm plugin registration
 * @returns {Null} nothing
 */
function codeProject (server, options, next) {
    server.route(viewRoute);

    next();
}

module.exports.register = codeProject;

module.exports.register.attributes = {
    name: 'code-project',
    version: '0.1.0',
    dependencies: ['user', 'team', 'github']
};
