'use strict';

const handler = require('./handler');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/github',
        handler: handler.redirect,
        config: {
            auth: 'github',
            description: 'Manage Github Users, Teams and Repos',
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/github/login',
        handler: handler.loginView,
        config: {
            auth: 'github',
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'POST',
        path: '/recipe/github/login',
        handler: handler.loginAction,
        config: {
            auth: 'github',
            plugins: {
                lout: false
            },
            validate: {
                payload: {
                    username: Joi.string().alphanum(),
                    password: Joi.string(),
                    redirect: Joi.string()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/github/list',
        handler: handler.list,
        config: {
            auth: 'github',
            plugins: {
                lout: false
            }
        }
    }
];
