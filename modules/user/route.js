'use strict';

const handler = require('./handler');

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
        path: '/user/{userid}',
        handler: handler.create,
        config: {
            description: 'Create a new user',
            notes: 'Will respond with HTTP 201 for success',
            tags: ['create']
        }
    },
    {
        method: 'GET',
        path: '/user/{userid}',
        handler: handler.read,
        config: {
            description: 'Get a single User\'s information',
            notes: 'Returns {Object} with all user information',
            tags: ['read']
        }
    },
    {
        method: 'PUT',
        path: '/user/{userid}',
        handler: handler.update,
        config: {
            description: 'Update a single User\'s information',
            notes: 'Returns {Object} with all the updated user information',
            tags: ['update']
        }
    },
    {
        method: 'DELETE',
        path: '/user/{userid}',
        handler: handler.delete,
        config: {
            description: 'Delete a user',
            notes: 'Return HTTP 204 for success',
            tags: ['delete']
        }
    }
];
