/**
 * @module Recipes
 */
'use strict';

const _ = require('lodash');

let server;

const filterRecipes = function (route) {
    const search = new RegExp(`^${server.realm.modifiers.route.prefix}\/recipe\/[^/]+\/?$`);

    return route.method === 'get' && route.path.match(search);
};

/**
 * Route represents a view.
 * @typedef {Object} Route
 * @property {String} method - http verb.
 * @property {String} path - path or pattern for Route.
 * @property {Object} settings - all other attributes set on route.
 */

module.exports = {
    /**
     * Stores a reference to the Hapi Server
     * @function setServer
     * @param {Object} serve - Hapi JS server object
     * @returns {Undefined} undefined
     */
    setServer: function (serve) {
        server = serve;
    },
    /**
     * Finds all of the Recipe routes
     * @function list
     * @returns {Array} {Array} of {Route}
     */
    list: function () {
        return _.filter(server.table()[0].table, filterRecipes);
    }
};
