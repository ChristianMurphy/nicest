'use strict';

const Recipe = require('../model/recipe');
const _ = require('lodash');
const recipeMap = function (recipe) {
    return {
        path: recipe.path,
        description: recipe.settings.description
    };
};

module.exports = {
    list: function (request, reply) {
        reply(_.map(Recipe.list(), recipeMap));
    }
};
