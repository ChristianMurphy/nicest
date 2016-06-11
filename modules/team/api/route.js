'use strict';

const handler = require('./handler');
const Joi = require('joi');

const teamValidation = {
    name: Joi
        .string()
        .trim()
        .replace(/\s+/g, ' ')
        .regex(/^[a-z ]+$/i, 'latin characters or space')
        .description('Team name'),
    members: Joi
        .array()
        .single()
        .unique()
        .items(
            Joi
                .string()
                .hex()
        )
        .description('List of User ids, for Users who are a part of the team'),
    modules: Joi
        .object()
        .description('Assorted information for Nicest plugins')
};

module.exports = [
    {
        method: 'GET',
        path: '/api/teams',
        handler: handler.list,
        config: {
            description: 'List of all teams',
            notes: 'Returns {Array} of {String} with Team ids',
            tags: ['list']
        }
    },
    {
        method: 'POST',
        path: '/api/team',
        handler: handler.create,
        config: {
            validate: {payload: teamValidation},
            description: 'Create a new team',
            notes: 'Will respond with HTTP 201 for success and return the new team object',
            tags: ['create']
        }
    },
    {
        method: 'GET',
        path: '/api/team/{id}',
        handler: handler.read,
        config: {
            description: 'Get a single Team\'s information',
            notes: 'Returns {Object} with all team information',
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
        path: '/api/team/{id}',
        handler: handler.update,
        config: {
            description: 'Update a single Team\'s information',
            notes: 'Returns {Object} with all the updated team information',
            tags: ['update'],
            validate: {
                params: {
                    id: Joi
                        .string()
                        .hex()
                },
                payload: teamValidation
            }
        }
    },
    {
        method: 'DELETE',
        path: '/api/team/{id}',
        handler: handler.delete,
        config: {
            description: 'Delete a team',
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
