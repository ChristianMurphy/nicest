'use strict';

const Recipe = require('../model/recipe');

module.exports = {
    list: function (request, reply) {
        reply.view('modules/recipe/view/list', {recipes: Recipe.list()});
    }
};
