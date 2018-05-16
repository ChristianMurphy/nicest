'use strict';

/**
 * @module user
 */

const apiRoute = require('./api/route');
const viewRoute = require('./route');

/**
 * Registers the User plugin
 * @param {Object} server - Hapi Server object
 * @returns {Null} nothing
 */
function user (server) {
    server.route(apiRoute);
    server.route(viewRoute);
}

exports.plugin = {
    name: 'user',
    register: user,
    version: '0.1.0'
};
