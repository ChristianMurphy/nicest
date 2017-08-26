const path = require('path');
const handleDownloadXML = require('./handler/download-xml');
const handleImportXML = require('./handler/import-xml');
const handleRedirect = require('./handler/redirect');

module.exports = [
    {
        config: { description: 'Import and Export Teams and Users' },
        handler: handleRedirect,
        method: 'GET',
        path: '/recipe/import-export',
    },
    {
        handler: handleImportXML,
        method: 'GET',
        path: '/recipe/import-export/import-xml',
    },
    {
        config: {
            payload: {
                allow: ['multipart/form-data'],
                output: 'file',
                uploads: path.join(__dirname, 'temp'),
            },
        },
        handler: handleDownloadXML,
        method: 'POST',
        path: '/recipe/import-export/import-xml',
    },
];
