'use strict';

const handler = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/manage-users',
        handler: handler.redirect,
        config: {
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-users/list',
        handler: handler.list,
        config: {
            plugins: {
                lout: false
            }
        }
    }
];
