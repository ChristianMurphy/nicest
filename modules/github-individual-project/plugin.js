'use strict';

module.exports.register = function (server, options, next) {
    const view = server.select('view');

    // const Github = server.plugin.Github;

    view.route(
        require('./view/route')
    );

    next();
};

module.exports.register.attributes = {
    pkg: {
        name: 'recipe',
        version: '0.1.0'
    }
};
