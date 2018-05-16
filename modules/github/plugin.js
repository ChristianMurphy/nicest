'use strict';

/**
 * @module github
 */

const viewRoute = require('./route');

/**
 * Registers the Github plugin
 * @param {Object} server - Hapi Server object
 * @returns {Null} nothing
 */
function github (server) {
    server.route(viewRoute);
}

exports.plugin = {
    name: 'github',
    register: github,
    version: '0.1.0'
};
