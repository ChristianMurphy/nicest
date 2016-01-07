'use strict';

/**
 * @module core/lib
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
const goodFile = require('good-file');
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

const mongoose = require('mongoose');

// server has initial not been configured
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
            port: configuration.server.port,
            host: configuration.server.hostname,
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
                    register: authCookie
                },
                {
                    register: scooter
                },
                {
                    register: lout,
                    options: {
                        auth: {
                            mode: 'required',
                            strategy: 'session'
                        },
                        endpoint: '/apis',
                        filterRoutes (route) {
                            const search = new RegExp(`^${configuration.server.prefix}\/recipe\/`);

                            return !search.test(route.path);
                        }
                    }
                },
                {
                    register: yar,
                    options: {
                        cookieOptions: {
                            password: configuration.authentication.token,
                            isSecure: configuration.authentication.https,
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
            (registrationErr) => {
                if (registrationErr) {
                    console.log(registrationErr);
                }

                server.auth.strategy('session', 'cookie', true, {
                    password: configuration.authentication.token,
                    cookie: 'session-auth',
                    redirectTo: `${configuration.server.prefix}/login`,
                    isSecure: configuration.authentication.https
                });

                server.auth.strategy('github', 'bell', {
                    provider: 'github',
                    password: configuration.authentication.token,
                    clientId: configuration.authentication.github.client,
                    clientSecret: configuration.authentication.github.secret,
                    isSecure: configuration.authentication.https,
                    forceHttps: configuration.authentication.https
                });

                server.route({
                    method: ['GET', 'POST'],
                    path: '/login',
                    handler (request, reply) {
                        const User = mongoose.models.User;

                        if (request.auth.isAuthenticated) {
                            User.findOne(
                                {
                                    'modules.github.username': request.auth.credentials.profile.username,
                                    role: {
                                        $in: ['admin', 'instructor']
                                    }
                                },
                                (findErr, user) => {
                                    if (findErr || user === null) {
                                        reply(boom.unauthorized('You do not have permission to view this page'));
                                    } else {
                                        request.cookieAuth.set(request.auth.credentials);
                                        reply.redirect(configuration.server.prefix);
                                    }
                                }
                            );
                        } else {
                            reply(boom.unauthorized(`Authentication failed due to: ${request.auth.error.message}`));
                        }
                    },
                    config: {
                        auth: 'github',
                        plugins: {
                            lout: false
                        }
                    }
                });
            }
        );

        // Jade templating service
        server.views({
            engines: {
                jade: {
                    module: pug
                }
            },
            context: {
                prefix: configuration.server.prefix
            }
        });

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
                    register: nicestCourse
                },
                {
                    register: nicestGithub
                },
                {
                    register: nicestImportExport
                },
                {
                    register: nicestErrorPage
                },
                {
                    register: nicestCodeProject
                }
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
