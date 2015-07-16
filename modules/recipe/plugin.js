'use strict';

module.exports.register = function (server, options, next) {
    const api = server.select('api');
    const view = server.select('view');
    const recipes = require('./model/recipe');

    recipes.setServer(server);

    api.route(
        require('./api/route')
    );

    view.route(
        require('./view/route')
    );

    server.expose(recipes);

    next();
};

module.exports.register.attributes = {
    pkg: {
        name: 'recipe',
        version: '0.1.0'
    }
};
