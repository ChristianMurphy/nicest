'use strict';

/**
 * @module code-project
 */

const viewRoute = require('./route');

/**
 * Registers the Code Project plugin
 * @param {Object} server - Hapi Server object
 * @returns {Null} nothing
 */
function codeProject (server) {
    server.route(viewRoute);
}

exports.plugin = {
    dependencies: [
        'user',
        'team',
        'github'
    ],
    name: 'code-project',
    register: codeProject,
    version: '0.1.0'
};
