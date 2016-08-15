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
    modules: Joi
        .object()
        .description('Assorted information for Nicest plugins'),
    name: Joi
        .string()
        .trim()
        .replace(/\s+/g, ' ')
        .regex(/^[a-z ]+$/i, 'latin characters or space')
        .description('Real name of user'),
    role: Joi
        .string()
        .valid('student', 'instructor', 'admin')
        .description('Role user fulfills, and permissions for what user can view')
};

module.exports = [
    {
        config: {description: 'User Management'},
        handler: handleRedirect,
        method: 'GET',
        path: '/recipe/manage-users'
    },
    {
        handler: handleList,
        method: 'GET',
        path: '/recipe/manage-users/list'
    },
    {
        config: {
            validate: {
                params: {
                    id: Joi
                    .string()
                    .hex()
                }
            }
        },
        handler: handleView,
        method: 'GET',
        path: '/recipe/manage-users/edit/{id}'
    },
    {
        config: {
            validate: {
                params: {
                    id: Joi
                    .string()
                    .hex()
                },
                payload: userValidation
            }
        },
        handler: handleSave,
        method: 'POST',
        path: '/recipe/manage-users/edit/{id}'
    },
    {
        config: {
            validate: {
                params: {
                    id: Joi
                    .string()
                    .hex()
                }
            }
        },
        handler: handleRemove,
        method: 'GET',
        path: '/recipe/manage-users/delete/{id}'
    },
    {
        handler: handleViewEmpty,
        method: 'GET',
        path: '/recipe/manage-users/create'
    },
    {
        config: {validate: {payload: userValidation}},
        handler: handleCreate,
        method: 'POST',
        path: '/recipe/manage-users/create'
    },
    {
        handler: {directory: {path: 'modules/user/static'}},
        method: 'GET',
        path: '/recipe/manage-users/static/{param*}'
    }
];
