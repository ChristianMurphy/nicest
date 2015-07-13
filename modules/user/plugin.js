'use strict';

module.exports.register = function (server, options, next) {
    const api = server.select('api');
    const recipe = server.select('recipe');

    api.route(
        require('./api/route')
    );

    recipe.route(
        require('./view/route')
    );

    next();
};

module.exports.register.attributes = {
    pkg: {
        name: 'user',
        version: '0.1.0'
    }
};
