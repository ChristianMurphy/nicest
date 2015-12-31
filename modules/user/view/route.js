'use strict';

const handler = require('./handler');
const Joi = require('joi');

const userValidation = {
    name: Joi
        .string()
        .regex(/[A-Za-z ]+/)
        .description('Real name of user'),
    role: Joi
        .string()
        .valid('student', 'instructor', 'admin')
        .description('Role user fulfills, and permissions for what user can view'),
    modules: Joi
        .object()
        .description('Assorted information for Nicest plugins')
};

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
                payload: userValidation
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
                payload: userValidation
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-users/static/{param*}',
        handler: {
            directory: {
                path: 'modules/user/static'
            }
        }
    }
];
