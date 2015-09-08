'use strict';

module.exports.register = (server, options, next) => {
    const view = server.select('view');

    view.route(
        require('./view/route')
    );

    next();
};

module.exports.register.attributes = {
    pkg: {
        name: 'code-project',
        version: '0.1.0'
    }
};
