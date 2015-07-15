'use strict';

module.exports.register = function (server, options, next) {
    const api = server.select('api');
    const recipe = server.select('recipe');
    const user = require('./model/user');

    api.route(
        require('./api/route')
    );

    recipe.route(
        require('./view/route')
    );

    server.method('User.create', user.create);
    server.method('User.read', user.read);
    server.method('User.update', user.update);
    server.method('User.delete', user.delete);
    server.method('User.list', user.list);

    next();
};

module.exports.register.attributes = {
    pkg: {
        name: 'user',
        version: '0.1.0'
    }
};
