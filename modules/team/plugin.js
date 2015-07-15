'use strict';

module.exports.register = function (server, options, next) {
    const api = server.select('api');
    const recipe = server.select('recipe');
    const team = require('./model/team');

    api.route(
        require('./api/route')
    );

    recipe.route(
        require('./view/route')
    );

    server.method('Team.create', team.create);
    server.method('Team.read', team.read);
    server.method('Team.update', team.update);
    server.method('Team.delete', team.delete);
    server.method('Team.list', team.list);

    next();
};

module.exports.register.attributes = {
    pkg: {
        name: 'team',
        version: '0.1.0'
    }
};
