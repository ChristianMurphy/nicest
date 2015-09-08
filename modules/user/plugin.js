'use strict';

const user = require('./model/user');

module.exports.register = (server, options, next) => {
    const api = server.select('api');
    const view = server.select('view');

    api.route(
        require('./api/route')
    );

    view.route(
        require('./view/route')
    );

    server.expose(user);

    next();
};

module.exports.register.attributes = {
    pkg: {
        name: 'user',
        version: '0.1.0'
    }
};
