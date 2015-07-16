'use strict';

const handler = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/manage-teams',
        handler: handler.redirect,
        config: {
            description: 'Team Management',
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-teams/list',
        handler: handler.list,
        config: {
            plugins: {
                lout: false
            }
        }
    }
];
