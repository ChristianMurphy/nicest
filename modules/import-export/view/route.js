'use strict';

const handler = require('./handler');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/import-export',
        handler: handler.redirect,
        config: {
            description: 'Import and Export Teams and Users',
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/import-export/import-xml',
        handler: handler.importXML,
        config: {
            plugins: {
                lout: false
            }
        }
    }
];
