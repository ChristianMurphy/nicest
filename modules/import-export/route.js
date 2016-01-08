'use strict';

const path = require('path');
const handleDownloadXML = require('./handler/download-xml');
const handleImportXML = require('./handler/import-xml');
const handleRedirect = require('./handler/redirect');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/import-export',
        handler: handleRedirect,
        config: {
            description: 'Import and Export Teams and Users'
        }
    },
    {
        method: 'GET',
        path: '/recipe/import-export/import-xml',
        handler: handleImportXML
    },
    {
        method: 'POST',
        path: '/recipe/import-export/import-xml',
        handler: handleDownloadXML,
        config: {
            payload: {
                output: 'file',
                allow: ['multipart/form-data'],
                uploads: path.join(__dirname, 'temp')
            }
        }
    }
];
