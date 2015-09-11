'use strict';

const viewRoute = require('./view/route');

exports.register = function (server, options, next) {
    const view = server.select('view');

    view.route(viewRoute);

    next();
};

exports.register.attributes = {
    name: 'documentation',
    version: '0.1.0'
};
