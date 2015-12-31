'use strict';

const apiRoute = require('./api/route');
const viewRoute = require('./view/route');

/**
 * Registers the Course plugin
 * @param {Object} server - Hapi Server object
 * @param {Object} options - Plugin specific options
 * @param {Fuction} next - Callback to confirm plugin registration
 * @returns {Null} nothing
 */
function course (server, options, next) {
    server.route(apiRoute);
    server.route(viewRoute);

    next();
}

exports.register = course;

exports.register.attributes = {
    name: 'course',
    version: '0.1.0',
    dependencies: ['user', 'team']
};
