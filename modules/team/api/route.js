'use strict';

const handler = require('./handler');
const Joi = require('joi');

const teamValidation = {
    members: Joi
        .array()
        .single()
        .unique()
        .items(Joi
            .string()
            .hex())
        .description('List of User ids, for Users who are a part of the team'),
    modules: Joi
        .object()
        .description('Assorted information for Nicest plugins'),
    name: Joi
        .string()
        .trim()
        .replace(/\s+/g, ' ')
        .regex(/^[a-z ]+$/i, 'latin characters or space')
        .description('Team name')
};

module.exports = [
    {
        config: {
            description: 'List of all teams',
            notes: 'Returns {Array} of {String} with Team ids',
            tags: ['list']
        },
        handler: handler.list,
        method: 'GET',
        path: '/api/teams'
    },
    {
        config: {
            description: 'Create a new team',
            notes: 'Will respond with HTTP 201 for success and return the new team object',
            tags: ['create'],
            validate: {payload: teamValidation}
        },
        handler: handler.create,
        method: 'POST',
        path: '/api/team'
    },
    {
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
        },
        handler: handler.read,
        method: 'GET',
        path: '/api/team/{id}'
    },
    {
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
        },
        handler: handler.update,
        method: 'PUT',
        path: '/api/team/{id}'
    },
    {
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
        },
        handler: handler.delete,
        method: 'DELETE',
        path: '/api/team/{id}'
    }
];
