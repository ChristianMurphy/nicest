/**
 * @module github
 */

const viewRoute = require('./route');

/**
 * Registers the Github plugin
 * @param {Object} server - Hapi Server object
 * @param {Object} options - Plugin specific options
 * @param {Function} next - Callback to confirm plugin registration
 * @returns {Null} nothing
 */
function github(server, options, next) {
    server.route(viewRoute);

    next();
}

exports.register = github;

exports.register.attributes = {
    name: 'github',
    version: '0.1.0',
};
