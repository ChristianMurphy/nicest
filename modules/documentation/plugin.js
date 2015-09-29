'use strict';

const viewRoute = require('./view/route');

exports.register = function (server, options, next) {
    server.route(viewRoute);

    next();
};

exports.register.attributes = {
    name: 'documentation',
    version: '0.1.0'
};
