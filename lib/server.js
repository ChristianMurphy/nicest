'use strict';

module.exports = function (argv) {
    let defaults;

    if (argv === 'test') {
        defaults = {
            port: 3000,
            database: 'mongodb://localhost/test'
        };
    } else {
        defaults = argv;
    }

    // Setup mongoose
    const mongoose = require('mongoose');
    mongoose.connect(defaults.database);

    // Setup HAPI
    const Hapi = require('hapi');
    const server = new Hapi.Server();

    server.connection({
        port: defaults.port
    });

    // Api Documentation Service
    server.register({
            register: require('lout'),
            options: {
                endpoint: '/apis'
            }
        },
        function (err) {
            if (err) {
                console.log(err);
            }
        }
    );

    server.route({
        method: 'GET',
        path: '/docs/{param*}',
        handler: {
            directory: {
                path: 'docs'
            }
        },
        config: {
            plugins: {
                lout: false
            }
        }
    });

    // Jade templating service
    server.views({
        engines: {
            jade: {
                module: require('jade')
            }
        }
    });

    // Load modules
    server.route(require('../modules/welcome/view/route'));
    server.route(require('../modules/user/api/route'));
    server.route(require('../modules/user/view/route'));
    server.route(require('../modules/team/api/route'));

    return server;
};
