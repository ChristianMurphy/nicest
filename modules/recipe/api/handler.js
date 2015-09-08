'use strict';

const Recipe = require('../model/recipe');
const _ = require('lodash');
const recipeMap = (recipe) => {
    return {
        path: recipe.path,
        description: recipe.settings.description
    };
};

module.exports = {
    list: (request, reply) => {
        reply(_.map(Recipe.list(), recipeMap));
    }
};
