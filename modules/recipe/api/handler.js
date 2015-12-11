'use strict';

const Recipe = require('../model/recipe');
const _ = require('lodash');

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
        reply(_.map(Recipe.list(), recipeMap));
    }
};
