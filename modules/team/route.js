'use strict';

const handler = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/teams',
        handler: handler.list,
        config: {
            description: 'Lists all teams',
            notes: 'Returns {Array} of {String} with Team ids',
            tags: ['list']
        }
    }
];
