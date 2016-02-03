'use strict';

/**
 * @module recipe/api
 */

const Recipe = require('../model/recipe');

/**
 * Maps recipe objects from Hapi into a format UI can use
 * @param {Object} recipe - Hapi route
 * @returns {Object} sanitized route information
 */
function recipeMap (recipe) {
    return {
        path: recipe.path,
        description: recipe.settings.description
    };
}

module.exports = {
    list (request, reply) {
        reply(
            Recipe
                .list()
                .map(recipeMap)
        );
    }
};
