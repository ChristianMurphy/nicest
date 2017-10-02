/**
 * @module user
 */

const apiRoute = require('./api/route');
const viewRoute = require('./route');

/**
 * Registers the User plugin
 * @param {Object} server - Hapi Server object
 * @param {Object} options - Plugin specific options
 * @param {Function} next - Callback to confirm plugin registration
 * @returns {Null} nothing
 */
function user(server, options, next) {
    server.route(apiRoute);
    server.route(viewRoute);

    next();
}

exports.register = user;

exports.register.attributes = {
    name: 'user',
    version: '0.1.0',
};
