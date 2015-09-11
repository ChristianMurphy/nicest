'use strict';

const recipes = require('./model/recipe');
const apiRoute = require('./api/route');
const viewRoute = require('./view/route');

module.exports.register = function (server, options, next) {
    const api = server.select('api');
    const view = server.select('view');

    recipes.setServer(server);

    api.route(apiRoute);

    view.route(viewRoute);

    server.expose(recipes);

    next();
};

module.exports.register.attributes = {
    name: 'recipe',
    version: '0.1.0'
};
