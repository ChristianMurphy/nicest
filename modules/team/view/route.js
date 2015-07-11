'use strict';

const handler = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/manage-teams',
        handler: handler.list,
        config: {
            plugins: {
                lout: false
            }
        }
    }
];
