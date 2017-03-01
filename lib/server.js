'use strict';

/**
 * @module core/lib/server
 */

// Setup HAPI
const Hapi = require('hapi');
const path = require('path');
const bell = require('bell');
const authCookie = require('hapi-auth-cookie');
const inert = require('inert');
const vision = require('vision');
const scooter = require('scooter');
const yar = require('yar');
const good = require('good');
const pug = require('pug');
const lout = require('lout');
const boom = require('boom');

// Setup server before loading plugins
const server = new Hapi.Server();

module.exports.server = server;

// Nicest plugins
const nicestWelcome = require('../modules/welcome/plugin');
const nicestDocumentation = require('../modules/documentation/plugin');
const nicestRecipe = require('../modules/recipe/plugin');
const nicestUser = require('../modules/user/plugin');
const nicestTeam = require('../modules/team/plugin');
const nicestCourse = require('../modules/course/plugin');
const nicestGithub = require('../modules/github/plugin');
const nicestImportExport = require('../modules/import-export/plugin');
const nicestErrorPage = require('../modules/error-page/plugin');
const nicestCodeProject = require('../modules/code-project/plugin');
const nicestMangeCodeProject = require('../modules/manage-code-project/plugin');

const mongoose = require('mongoose');

// Server has initial not been configured
let isSetup = false;

/**
 * Sets up the Hapi server
 * @param {Object} configuration - host name
 * @returns {Object} Hapi server instance
 */
function setup (configuration) {
    if (!isSetup) {
        isSetup = true;

        server.path(path.join(__dirname, '..'));

        server.realm.modifiers.route.prefix = configuration.server.prefix;

        server.connection({
            host: configuration.server.hostname,
            port: configuration.server.port,
            routes: {files: {relativeTo: path.join(__dirname, '..')}}
        });

        server.register(
            [
                {register: inert},
                {register: vision},
                {register: bell},
                {register: authCookie},
                {register: scooter},
                {
                    options: {
                        auth: {
                            mode: 'required',
                            strategy: 'session'
                        },
                        endpoint: '/apis',
                        filterRoutes (route) {
                            const search = new RegExp(`^${configuration.server.prefix}/recipe/`);

                            return !search.test(route.path);
                        }
                    },
                    register: lout
                },
                {
                    options: {
                        cookieOptions: {
                            isHttpOnly: true,
                            isSecure: configuration.authentication.https,
                            password: configuration.authentication.token
                        }
                    },
                    register: yar
                },
                {
                    options: {
                        ops: {interval: 2147483647},
                        reporters: {
                            error: [
                                {
                                    args: [
                                        {
                                            error: '*',
                                            log: '*'
                                        }
                                    ],
                                    module: 'good-squeeze',
                                    name: 'Squeeze'
                                },
                                {
                                    module: 'good-squeeze',
                                    name: 'SafeJson'
                                },
                                {
                                    args: [
                                        'error.log'
                                    ],
                                    module: 'good-file'
                                }
                            ],
                            response: [
                                {
                                    args: [
                                        {response: '*'}
                                    ],
                                    module: 'good-squeeze',
                                    name: 'Squeeze'
                                },
                                {
                                    module: 'good-squeeze',
                                    name: 'SafeJson'
                                },
                                {
                                    args: [
                                        'request.log'
                                    ],
                                    module: 'good-file'
                                }
                            ]
                        }
                    },
                    register: good
                }
            ],
            (registrationErr) => {
                if (registrationErr) {
                    console.log(registrationErr);
                }

                server
                    .auth
                    .strategy('session', 'cookie', true, {
                        cookie: 'session-auth',
                        isSecure: configuration.authentication.https,
                        password: configuration.authentication.token,
                        redirectTo: `${configuration.server.prefix}/login`
                    });

                server
                    .auth
                    .strategy('github', 'bell', {
                        clientId: configuration.authentication.github.client,
                        clientSecret: configuration.authentication.github.secret,
                        forceHttps: configuration.authentication.https,
                        isSecure: configuration.authentication.https,
                        password: configuration.authentication.token,
                        provider: 'github'
                    });

                server.route({
                    config: {
                        auth: 'github',
                        plugins: {lout: false}
                    },
                    handler (request, reply) {
                        const {User} = mongoose.models;

                        if (request.auth.isAuthenticated) {
                            User.findOne(
                                {
                                    'modules.github.username': request.auth.credentials.profile.username,
                                    role: {$in: ['admin', 'instructor']}
                                },
                                (findErr, user) => {
                                    if (findErr || user === null) {
                                        reply(boom.unauthorized('You do not have permission to view this page'));
                                    } else {
                                        request
                                            .cookieAuth
                                            .set(request.auth.credentials);
                                        reply.redirect(configuration.server.prefix);
                                    }
                                }
                            );
                        } else {
                            reply(boom.unauthorized(`Authentication failed due to: ${request.auth.error.message}`));
                        }
                    },
                    method: ['GET', 'POST'],
                    path: '/login'
                });
            }
        );

        // Pug templating service
        server.views({
            context: {prefix: configuration.server.prefix},
            engines: {pug: {module: pug}}
        });

        // Load nicest plugins
        server.register(
            [
                {register: nicestWelcome},
                {register: nicestDocumentation},
                {register: nicestRecipe},
                {register: nicestUser},
                {register: nicestTeam},
                {register: nicestCourse},
                {register: nicestGithub},
                {register: nicestImportExport},
                {register: nicestErrorPage},
                {register: nicestCodeProject},
                {register: nicestMangeCodeProject}
            ],
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        );
    }

    return server;
}

module.exports.setup = setup;
