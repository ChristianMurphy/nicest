'use strict';

const user = require('./model/user');
const apiRoute = require('./api/route');
const viewRoute = require('./view/route');

module.exports.register = function (server, options, next) {
    const api = server.select('api');
    const view = server.select('view');

    api.route(apiRoute);

    view.route(viewRoute);

    server.expose(user);

    next();
};

module.exports.register.attributes = {
    name: 'user',
    version: '0.1.0'
};
