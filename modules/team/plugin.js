'use strict';

const team = require('./model/team');

module.exports.register = function (server, options, next) {
    const api = server.select('api');
    const view = server.select('view');

    api.route(
        require('./api/route')
    );

    view.route(
        require('./view/route')
    );

    server.expose('Team', team);

    next();
};

module.exports.register.attributes = {
    pkg: {
        name: 'team',
        version: '0.1.0'
    }
};
