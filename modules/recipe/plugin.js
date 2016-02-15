'use strict';

/**
 * @module recipe
 */

const recipes = require('./model/recipe');
const apiRoute = require('./api/route');
const viewRoute = require('./route');

/**
 * Registers the Recipe plugin
 * @param {Object} server - Hapi Server object
 * @param {Object} options - Plugin specific options
 * @param {Function} next - Callback to confirm plugin registration
 * @returns {Null} nothing
 */
function recipe (server, options, next) {
    recipes.setServer(server);

    server.route(apiRoute);
    server.route(viewRoute);

    server.expose(recipes);

    next();
}

exports.register = recipe;

exports.register.attributes = {
    name: 'recipe',
    version: '0.1.0'
};
