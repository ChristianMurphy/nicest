'use strict';

const team = require('./model/team');
const apiRoute = require('./api/route');
const viewRoute = require('./view/route');

module.exports.register = function (server, options, next) {
    const api = server.select('api');
    const view = server.select('view');

    api.route(apiRoute);

    view.route(viewRoute);

    server.expose(team);

    next();
};

module.exports.register.attributes = {
    name: 'team',
    version: '0.1.0',
    dependencies: ['user']
};
