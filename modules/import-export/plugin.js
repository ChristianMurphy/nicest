/**
 * @module import-export
 */

const viewRoute = require('./route');

/**
 * Registers the Import Export plugin
 * @param {Object} server - Hapi Server object
 * @param {Object} options - Plugin specific options
 * @param {Function} next - Callback to confirm plugin registration
 * @returns {Null} nothing
 */
function importExport(server, options, next) {
    server.route(viewRoute);

    next();
}

exports.register = importExport;

exports.register.attributes = {
    name: 'import-export',
    version: '0.1.0',
};
