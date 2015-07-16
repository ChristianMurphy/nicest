'use strict';

const handler = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/api/recipes',
        handler: handler.list,
        config: {
            description: 'List of all recipe routes',
            notes: 'Returns {Array} of {Route}',
            tags: ['list']
        }
    }
];
