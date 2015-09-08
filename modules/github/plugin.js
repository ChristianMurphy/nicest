'use strict';

const Github = require('octokat');

module.exports.register = (server, options, next) => {
    const view = server.select('view');

    view.route(
        require('./view/route')
    );

    server.expose('Octokat', Github);

    next();
};

module.exports.register.attributes = {
    pkg: {
        name: 'github',
        version: '0.1.0'
    }
};
