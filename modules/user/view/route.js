'use strict';

const handler = require('./handler');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/manage-users',
        handler: handler.redirect,
        config: {
            description: 'User Management'
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-users/list',
        handler: handler.list
    },
    {
        method: 'GET',
        path: '/recipe/manage-users/edit/{id}',
        handler: handler.view,
        config: {
            validate: {
                params: {
                    id: Joi.string().hex()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/recipe/manage-users/edit/{id}',
        handler: handler.save,
        config: {
            validate: {
                params: {
                    id: Joi.string().hex()
                },
                payload: {
                    name: Joi.string().regex(/[A-Za-z ]+/),
                    modules: Joi.object()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-users/delete/{id}',
        handler: handler.delete,
        config: {
            validate: {
                params: {
                    id: Joi.string().hex()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-users/create',
        handler: handler.viewEmpty
    },
    {
        method: 'POST',
        path: '/recipe/manage-users/create',
        handler: handler.create,
        config: {
            validate: {
                payload: {
                    name: Joi.string().regex(/[A-Za-z ]+/),
                    modules: Joi.object()
                }
            }
        }
    }
];
