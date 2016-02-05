'use strict';

const handleList = require('./handler/list');
const handleLoginAction = require('./handler/login-action');
const handleLoginView = require('./handler/login-view');
const handleRedirect = require('./handler/redirect');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/github',
        handler: handleRedirect,
        config: {
            description: 'Manage Github Users, Teams and Repos'
        }
    },
    {
        method: 'GET',
        path: '/recipe/github/login',
        handler: handleLoginView
    },
    {
        method: 'POST',
        path: '/recipe/github/login',
        handler: handleLoginAction,
        config: {
            validate: {
                payload: {
                    username: Joi
                        .string()
                        .alphanum(),
                    password: Joi.string(),
                    redirect: Joi
                        .string()
                        .regex(/^\/[a-z0-9\/]$/i, 'internal url')
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/github/list',
        handler: handleList
    }
];
