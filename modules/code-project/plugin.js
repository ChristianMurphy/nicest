'use strict';

const viewRoute = require('./view/route');

module.exports.register = function (server, options, next) {
    server.route(viewRoute);

    next();
};

module.exports.register.attributes = {
    name: 'code-project',
    version: '0.1.0',
    dependencies: ['user', 'team', 'github']
};
