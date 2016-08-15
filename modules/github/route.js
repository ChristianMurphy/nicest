'use strict';

const handleList = require('./handler/list');
const handleLoginAction = require('./handler/login-action');
const handleLoginView = require('./handler/login-view');
const handleRedirect = require('./handler/redirect');
const Joi = require('joi');

module.exports = [
    {
        config: {description: 'Manage Github Users, Teams and Repos'},
        handler: handleRedirect,
        method: 'GET',
        path: '/recipe/github'
    },
    {
        config: {
            validate: {
                query: {
                    failed: Joi
                        .boolean()
                        .default(false),
                    next: Joi
                        .string()
                        .regex(/^\/[a-z0-9\/-]+$/i, 'internal url')
                        .empty(null)
                }
            }
        },
        handler: handleLoginView,
        method: 'GET',
        path: '/recipe/github/login'
    },
    {
        config: {
            validate: {
                payload: {
                    password: Joi.string(),
                    redirect: Joi
                        .string()
                        .regex(/^\/[a-z0-9\/-]+$/i, 'internal url')
                        .empty(null),
                    username: Joi
                        .string()
                        .alphanum()
                }
            }
        },
        handler: handleLoginAction,
        method: 'POST',
        path: '/recipe/github/login'
    },
    {
        handler: handleList,
        method: 'GET',
        path: '/recipe/github/list'
    }
];
