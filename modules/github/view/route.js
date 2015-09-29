'use strict';

const handler = require('./handler');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/github',
        handler: handler.redirect,
        config: {
            description: 'Manage Github Users, Teams and Repos'
        }
    },
    {
        method: 'GET',
        path: '/recipe/github/login',
        handler: handler.loginView
    },
    {
        method: 'POST',
        path: '/recipe/github/login',
        handler: handler.loginAction,
        config: {
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
        handler: handler.list
    }
];
