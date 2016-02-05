'use strict';

const handler = require('./handler');
const Joi = require('joi');

const userValidation = {
    name: Joi
        .string()
        .trim()
        .replace(/\s+/g, ' ')
        .regex(/^[a-z ]+$/i, 'latin characters or space')
        .description('Full name of user'),
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
        path: '/api/users',
        handler: handler.list,
        config: {
            description: 'List of all users',
            notes: 'Returns {Array} of {String} with User ids',
            tags: ['list']
        }
    },
    {
        method: 'POST',
        path: '/api/user',
        handler: handler.create,
        config: {
            validate: {
                payload: userValidation
            },
            description: 'Create a new user',
            notes: 'Will respond with HTTP 201 for success and return the new user object',
            tags: ['create']
        }
    },
    {
        method: 'GET',
        path: '/api/user/{id}',
        handler: handler.read,
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
        }
    },
    {
        method: 'PUT',
        path: '/api/user/{id}',
        handler: handler.update,
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
        }
    },
    {
        method: 'DELETE',
        path: '/api/user/{id}',
        handler: handler.delete,
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
        }
    }
];
