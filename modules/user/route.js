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
        method: 'GET',
        path: '/user/{userid}',
        handler: handler.read,
        config: {
            description: 'Get a single User\'s information',
            notes: 'Returns {Object} with all user information',
            tags: ['read']
        }
    }
];
