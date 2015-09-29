'use strict';

const handler = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/recipes',
        handler: handler.list,
        config: {
            auth: 'github',
            plugins: {
                lout: false
            }
        }
    }
];
