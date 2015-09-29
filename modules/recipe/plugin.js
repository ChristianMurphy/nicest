'use strict';

const recipes = require('./model/recipe');
const apiRoute = require('./api/route');
const viewRoute = require('./view/route');

module.exports.register = function (server, options, next) {
    recipes.setServer(server);

    server.route(apiRoute);
    server.route(viewRoute);

    server.expose(recipes);

    next();
};

module.exports.register.attributes = {
    name: 'recipe',
    version: '0.1.0'
};
