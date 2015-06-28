'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/teams',
        handler: function (request, reply) {
            reply('[Team A]');
        },
        config: {
            description: 'Lists all teams',
            notes: 'Returns {Array} of {String} with team ids',
            tags: ['wip']
        }
    }
];
