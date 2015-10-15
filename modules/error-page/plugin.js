'use strict';

const viewRoute = require('./view/route');

module.exports.register = function (server, options, next) {
    server.route(viewRoute);

    next();
};

module.exports.register.attributes = {
    name: 'error-page',
    version: '0.1.0'
};