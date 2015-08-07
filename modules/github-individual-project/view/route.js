'use strict';

const handler = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/github-individual-project',
        handler: handler.redirect,
        config: {
            description: 'Create a individual project from a seed repository',
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/github-individual-project/choose',
        handler: handler.login,
        config: {
            plugins: {
                lout: false
            }
        }
    }
];
