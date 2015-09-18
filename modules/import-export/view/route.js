'use strict';

const path = require('path');
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
    },
    {
        method: 'POST',
        path: '/recipe/import-export/import-xml',
        handler: handler.downloadXML,
        config: {
            payload: {
                output: 'file',
                allow: ['multipart/form-data'],
                uploads: path.join(__dirname, 'temp')
            },
            plugins: {
                lout: false
            }
        }
    }
];
