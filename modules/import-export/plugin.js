'use strict';

/**
 * @module import-export
 */

const viewRoute = require('./route');

/**
 * Registers the Import Export plugin
 * @param {Object} server - Hapi Server object
 * @returns {Null} nothing
 */
function importExport (server) {
    server.route(viewRoute);
}

exports.plugin = {
    name: 'import-export',
    register: importExport,
    version: '0.1.0'
};
