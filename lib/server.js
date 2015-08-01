'use strict';

module.exports = function (argv) {
    let defaults;

    if (argv === 'test') {
        defaults = {
            port: 3000,
            host: 'localhost'
        };
    } else {
        defaults = argv;
    }

    // Setup HAPI
    const Hapi = require('hapi');
    const server = new Hapi.Server();

    server.connection({
        port: defaults.port,
        host: defaults.host,
        labels: ['view', 'api']
    });

    // Jade templating service
    server.views({
        engines: {
            jade: {
                module: require('jade')
            }
        }
    });

    // attach api documentaion view
    server.register(
        {
            register: require('lout'),
            options: {
                endpoint: '/apis'
            }
        },
        {
            select: 'view'
        },
        function (err) {
            if (err) {
                console.log(err);
            }
        }
    );

    // Create a session object
    server.register(
        {
            register: require('yar'),
            options: {
                cookieOptions: {
                    password: 'password',
                    isHttpOnly: true
                }
            }
        },
        function (err) {
            if (err) {
                console.log(err);
            }
        }
    );

    // load nicest plugins
    server.register([
            {
                register: require('../modules/welcome/plugin')
            },
            {
                register: require('../modules/documentation/plugin')
            },
            {
                register: require('../modules/recipe/plugin')
            },
            {
                register: require('../modules/user/plugin')
            },
            {
                register: require('../modules/team/plugin')
            },
            {
                register: require('../modules/github/plugin')
            }
        ],
        function (err) {
            if (err) {
                console.log(err);
            }
        }
    );

    return server;
};
