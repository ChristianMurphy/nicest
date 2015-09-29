'use strict';

// Setup HAPI
const Hapi = require('hapi');
const path = require('path');
const bell = require('bell');
const inert = require('inert');
const vision = require('vision');
const scooter = require('scooter');
const yar = require('yar');
const good = require('good');
const goodFile = require('good-file');
const jade = require('jade');
const lout = require('lout');

// Setup server before loading plugins
const server = new Hapi.Server();

module.exports.server = server;

// Nicest plugins
const nicestWelcome = require('../modules/welcome/plugin');
const nicestDocumentation = require('../modules/documentation/plugin');
const nicestRecipe = require('../modules/recipe/plugin');
const nicestUser = require('../modules/user/plugin');
const nicestTeam = require('../modules/team/plugin');
const nicestGithub = require('../modules/github/plugin');
const nicestImportExport = require('../modules/import-export/plugin');

// server has initial not been configured
let isSetup = false;

module.exports.setup = function (argv) {
    if (!isSetup) {
        isSetup = true;
        let defaults;

        if (argv === 'test') {
            defaults = {
                port: 3000,
                host: 'localhost',
                token: 'password'
            };
        } else {
            defaults = argv;
        }

        server.path(path.join(__dirname, '..'));

        server.connection({
            port: defaults.port,
            host: defaults.host,
            labels: ['view', 'api'],
            routes: {
                files: {
                    relativeTo: path.join(__dirname, '..')
                }
            }
        });

        server.register(
            [
                {
                    register: inert
                },
                {
                    register: vision
                },
                {
                    register: bell
                },
                {
                    register: scooter
                },
                {
                    register: yar,
                    options: {
                        cookieOptions: {
                            password: defaults.token,
                            isSecure: false,
                            isHttpOnly: true
                        }
                    }
                },
                {
                    register: good,
                    options: {
                        reporters: [
                            {
                                reporter: goodFile,
                                events: {
                                    response: '*'
                                },
                                config: 'request.log'
                            },
                            {
                                reporter: goodFile,
                                events: {
                                    log: '*',
                                    error: '*'
                                },
                                config: 'error.log'
                            }
                        ]
                    }
                }
            ],
            function (err) {
                if (err) {
                    console.log(err);
                }

                server.auth.strategy('github', 'bell', {
                    provider: 'github',
                    password: defaults.token,
                    clientId: '8ec9d815a3a30b77f5db',
                    clientSecret: '4b70047839d7942480ce83d0aff52486452b660f',
                    isSecure: false
                });
                server.route({
                    method: ['GET', 'POST'],
                    path: '/login',
                    config: {
                        auth: 'github',
                        handler: function (request, reply) {
                            if (!request.auth.isAuthenticated) {
                                return reply('Authentication failed due to: ' + request.auth.error.message);
                            }

                            // Perform any account lookup or registration, setup local session,
                            // and redirect to the application. The third-party credentials are
                            // stored in request.auth.credentials. Any query parameters from
                            // the initial request are passed back via request.auth.credentials.query.
                            request.log('redirect', request.auth.credentials.query.redirect_uri);
                            return reply.redirect(request.auth.credentials.query.redirect_uri || '/');
                        }
                    }
                });
            }
        );

        // Jade templating service
        server.views({
            engines: {
                jade: {
                    module: jade
                }
            }
        });

        // attach api documentaion view
        server.register(
            {
                register: lout,
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

        // load nicest plugins
        server.register(
            [
                {
                    register: nicestWelcome
                },
                {
                    register: nicestDocumentation
                },
                {
                    register: nicestRecipe
                },
                {
                    register: nicestUser
                },
                {
                    register: nicestTeam
                },
                {
                    register: nicestGithub
                },
                {
                    register: nicestImportExport
                }
            ],
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );
    }

    // XXX lgib c error on Travis CI
    if (argv !== 'test') {
        server.register(
            [
                {
                    register: require('../modules/code-project/plugin') // eslint-disable-line global-require
                }
            ],
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );
    }

    return server;
};
