'use strict';

// Setup HAPI
const Hapi = require('hapi');
const server = new Hapi.Server();
let isSetup = false;

module.exports.server = server;

module.exports.setup = function (argv) {
    if (!isSetup) {
        isSetup = true;
        let defaults;

        if (argv === 'test') {
            defaults = {
                port: 3000,
                host: 'localhost'
            };
        } else {
            defaults = argv;
        }

        server.connection({
            port: defaults.port,
            host: defaults.host,
            labels: ['view', 'api']
        });

        server.register(
            [
                {
                    register: require('inert')
                },
                {
                    register: require('vision')
                }
            ],
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );

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
                        isSecure: false,
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
        server.register(
            [
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

        // Modules that can only be manually tested
        // XXX this is a stop gap until Travis CI can run NodeGit
        if (argv !== 'test') {
            server.register(
                [
                    {
                        register: require('../modules/github-individual-project/plugin')
                    }
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                    }
                }
            );
        }
    }

    return server;
};
