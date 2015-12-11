'use strict';

const userModel = require('./model/user');
const apiRoute = require('./api/route');
const viewRoute = require('./view/route');

/**
 * Registers the User plugin
 * @param {Object} server - Hapi Server object
 * @param {Object} options - Plugin specific options
 * @param {Fuction} next - Callback to confirm plugin registration
 * @returns {Null} nothing
 */
function user (server, options, next) {
    server.route(apiRoute);
    server.route(viewRoute);

    server.expose(userModel);

    next();
}

exports.register = user;

exports.register.attributes = {
    name: 'user',
    version: '0.1.0'
};
