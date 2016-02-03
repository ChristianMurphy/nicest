'use strict';

/**
 * @module recipe/model
 */

let server;

/**
 * Route represents a view.
 * @typedef {Object} Route
 * @property {String} method - http verb.
 * @property {String} path - path or pattern for Route.
 * @property {Object} settings - all other attributes set on route.
 */

/**
 * Tests a route to see if it is the home page of a Recipe
 * @param {String} route - route path
 * @returns {Boolean} recipe home will return true
 */
function filterRecipes (route) {
    const search = new RegExp(`^${server.realm.modifiers.route.prefix}\/recipe\/[^/]+\/?$`);
    const isRecipe = route
        .path
        .match(search);

    return route.method === 'get' && isRecipe;
}

/**
 * Stores a reference to the Hapi Server
 * @function setServer
 * @param {Object} serve - Hapi JS server object
 * @returns {Undefined} undefined
 */
function setServer (serve) {
    server = serve;
}

/**
 * Finds all of the Recipe routes
 * @function list
 * @returns {Array} {Array} of {Route}
 */
function list () {
    return server
        .table()[0]
        .table
        .filter(filterRecipes);
}

module.exports = {setServer, list};
