'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/docs/{param*}',
        handler: {directory: {path: 'docs'}},
        config: {plugins: {lout: false}}
    }
];
