'use strict';

const handler = require('./handler');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/users',
        handler: handler.list,
        config: {
            description: 'List of all users',
            notes: 'Returns {Array} of {String} with User\'s first and last name',
            tags: ['list']
        }
    },
    {
        method: 'POST',
        path: '/user',
        handler: handler.create,
        config: {
            description: 'Create a new user',
            notes: 'Will respond with HTTP 201 for success and return the new user object',
            tags: ['create']
        }
    },
    {
        method: 'GET',
        path: '/user/{id}',
        handler: handler.read,
        config: {
            description: 'Get a single User\'s information',
            notes: 'Returns {Object} with all user information',
            tags: ['read'],
            validate: {
                params: {
                    id: Joi.number().integer().positive()
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/user/{id}',
        handler: handler.update,
        config: {
            description: 'Update a single User\'s information',
            notes: 'Returns {Object} with all the updated user information',
            tags: ['update'],
            validate: {
                params: {
                    id: Joi.number().integer().positive()
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/user/{id}',
        handler: handler.delete,
        config: {
            description: 'Delete a user',
            notes: 'Return HTTP 204 for success',
            tags: ['delete'],
            validate: {
                params: {
                    id: Joi.number().integer().positive()
                }
            }
        }
    }
];
