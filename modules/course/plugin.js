'use strict';

/**
 * @module course
 */

const apiRoute = require('./api/route');
const viewRoute = require('./route');

/**
 * Registers the Course plugin
 * @param {Object} server - Hapi Server object
 * @returns {Null} nothing
 */
function course (server) {
    server.route(apiRoute);
    server.route(viewRoute);
}

exports.plugin = {
    dependencies: [
        'user',
        'team'
    ],
    name: 'course',
    register: course,
    version: '0.1.0'
};
