'use strict';

const handler = require('./handler');
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
        .description('Full name of user'),
    role: Joi
        .string()
        .valid('student', 'instructor', 'admin')
        .description('Role user fulfills, and permissions for what user can view')
};

module.exports = [
    {
        config: {
            description: 'List of all users',
            notes: 'Returns {Array} of {String} with User ids',
            tags: ['list']
        },
        handler: handler.list,
        method: 'GET',
        path: '/api/users'
    },
    {
        config: {
            description: 'Create a new user',
            notes: 'Will respond with HTTP 201 for success and return the new user object',
            tags: ['create'],
            validate: {payload: userValidation}
        },
        handler: handler.create,
        method: 'POST',
        path: '/api/user'
    },
    {
        config: {
            description: 'Get a single User\'s information',
            notes: 'Returns {Object} with all user information',
            tags: ['read'],
            validate: {
                params: {
                    id: Joi
                        .string()
                        .hex()
                }
            }
        },
        handler: handler.read,
        method: 'GET',
        path: '/api/user/{id}'
    },
    {
        config: {
            description: 'Update a single User\'s information',
            notes: 'Returns {Object} with all the updated user information',
            tags: ['update'],
            validate: {
                params: {
                    id: Joi
                        .string()
                        .hex()
                },
                payload: userValidation
            }
        },
        handler: handler.update,
        method: 'PUT',
        path: '/api/user/{id}'
    },
    {
        config: {
            description: 'Delete a user',
            notes: 'Return HTTP 204 for success',
            tags: ['delete'],
            validate: {
                params: {
                    id: Joi
                    .string()
                    .hex()
                }
            }
        },
        handler: handler.delete,
        method: 'DELETE',
        path: '/api/user/{id}'
    }
];
