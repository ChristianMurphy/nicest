'use strict';

exports.register = (server, options, next) => {
    const view = server.select('view');

    view.route(
        require('./view/route')
    );

    next();
};

exports.register.attributes = {
    pkg: {
        name: 'documentation',
        version: '0.1.0'
    }
};
