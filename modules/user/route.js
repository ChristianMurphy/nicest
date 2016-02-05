'use strict';

const handleCreate = require('./handler/create');
const handleList = require('./handler/list');
const handleRedirect = require('./handler/redirect');
const handleRemove = require('./handler/remove');
const handleSave = require('./handler/save');
const handleViewEmpty = require('./handler/view-empty');
const handleView = require('./handler/view');
const Joi = require('joi');

const userValidation = {
    name: Joi
        .string()
        .regex(/^[a-z ]+$/i, 'latin characters or space')
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
        handler: handleRedirect,
        config: {
            description: 'User Management'
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-users/list',
        handler: handleList
    },
    {
        method: 'GET',
        path: '/recipe/manage-users/edit/{id}',
        handler: handleView,
        config: {
            validate: {
                params: {
                    id: Joi
                        .string()
                        .hex()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/recipe/manage-users/edit/{id}',
        handler: handleSave,
        config: {
            validate: {
                params: {
                    id: Joi
                        .string()
                        .hex()
                },
                payload: userValidation
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-users/delete/{id}',
        handler: handleRemove,
        config: {
            validate: {
                params: {
                    id: Joi
                        .string()
                        .hex()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-users/create',
        handler: handleViewEmpty
    },
    {
        method: 'POST',
        path: '/recipe/manage-users/create',
        handler: handleCreate,
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
