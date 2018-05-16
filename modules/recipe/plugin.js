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
 * @returns {Null} nothing
 */
function recipe (server) {
    recipes.setServer(server);

    server.route(apiRoute);
    server.route(viewRoute);

    server.expose(recipes);
}

exports.plugin = {
    name: 'recipe',
    register: recipe,
    version: '0.1.0'
};
