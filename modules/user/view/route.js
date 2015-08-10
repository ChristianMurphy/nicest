'use strict';

const handler = require('./handler');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/manage-users',
        handler: handler.redirect,
        config: {
            description: 'User Management',
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-users/list',
        handler: handler.list,
        config: {
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-users/edit/{id}',
        handler: handler.view,
        config: {
            plugins: {
                lout: false
            },
            validate: {
                params: {
                    id: Joi.string().hex()
                }
            }
        }
    }
];
