'use strict';

const handler = require('./handler');
const Joi = require('Joi');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/github',
        handler: handler.redirect,
        config: {
            description: 'Manage Github Users, Teams and Repos',
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/github/choose',
        handler: handler.choose,
        config: {
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/github/list/{name}',
        handler: handler.list,
        config: {
            plugins: {
                lout: false
            },
            validate: {
                params: {
                    name: Joi.string().alphanum()
                }
            }
        }
    }
];