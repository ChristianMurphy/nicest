'use strict';

const team = require('./model/team');
const apiRoute = require('./api/route');
const viewRoute = require('./view/route');

module.exports.register = function (server, options, next) {
    server.route(apiRoute);
    server.route(viewRoute);

    server.expose(team);

    next();
};

module.exports.register.attributes = {
    name: 'team',
    version: '0.1.0',
    dependencies: ['user']
};
