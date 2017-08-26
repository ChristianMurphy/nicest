const handler = require('./handler');

module.exports = [
    {
        config: {
            description: 'List of all recipe routes',
            notes: 'Returns {Array} of {Route}',
            tags: ['list'],
        },
        handler: handler.list,
        method: 'GET',
        path: '/api/recipes',
    },
];
