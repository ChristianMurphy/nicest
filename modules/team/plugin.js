

/**
 * @module team
 */

const apiRoute = require('./api/route');
const viewRoute = require('./route');

/**
 * Registers the Team plugin
 * @param {Object} server - Hapi Server object
 * @param {Object} options - Plugin specific options
 * @param {Function} next - Callback to confirm plugin registration
 * @returns {Null} nothing
 */
function team(server, options, next) {
    server.route(apiRoute);
    server.route(viewRoute);

    next();
}

exports.register = team;

exports.register.attributes = {
    dependencies: ['user'],
    name: 'team',
    version: '0.1.0',
};
