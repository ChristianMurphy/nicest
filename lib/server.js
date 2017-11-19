'use strict';

/**
 * @module core/lib/server
 */

// Setup HAPI
const {Server} = require('hapi');
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

/*
 * Sets up the Hapi server
 * @param {Object} configuration - host name
 * @returns {Object} Hapi server instance
 */
module.exports = async function setup (configuration) {
    const server = new Server({
        host: configuration.server.hostname,
        port: configuration.server.port,
        routes: {files: {relativeTo: path.join(__dirname, '..')}}
    });

    module.exports.server = server;

    server.path(path.join(__dirname, '..'));

    server.realm.modifiers.route.prefix = configuration.server.prefix;

    await server.register(inert);
    await server.register(vision);
    await server.register(bell);
    await server.register(authCookie);
    await server.register(scooter);

    await server.register({
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
    });
    await server.register({
        options: {
            cookieOptions: {
                isHttpOnly: true,
                isSecure: configuration.authentication.https,
                password: configuration.authentication.token
            }
        },
        register: yar
    });
    await server.register({
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
                        args: ['error.log'],
                        module: 'good-file'
                    }
                ],
                response: [
                    {
                        args: [{response: '*'}],
                        module: 'good-squeeze',
                        name: 'Squeeze'
                    },
                    {
                        module: 'good-squeeze',
                        name: 'SafeJson'
                    },
                    {
                        args: ['request.log'],
                        module: 'good-file'
                    }
                ]
            }
        },
        register: good
    });

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
            provider: 'github',
            scope: [
                'user:email',
                'public_repo'
            ]
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
                        role: {
                            $in: [
                                'admin',
                                'instructor'
                            ]
                        }
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
        method: [
            'GET',
            'POST'
        ],
        path: '/login'
    });

    // Pug templating service
    server.views({
        context: {prefix: configuration.server.prefix},
        engines: {pug: {module: pug}}
    });

    // Load nicest plugins
    await server.register([
        {register: nicestWelcome},
        {register: nicestDocumentation},
        {register: nicestRecipe},
        {register: nicestUser},
        {register: nicestTeam},
        {register: nicestCourse},
        {register: nicestGithub},
        {register: nicestImportExport},
        {register: nicestErrorPage},
        {register: nicestCodeProject}
    ]);

    return server;
};
