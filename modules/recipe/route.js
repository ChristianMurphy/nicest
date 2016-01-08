'use strict';

const handleList = require('./handler/list');

module.exports = [
    {
        method: 'GET',
        path: '/recipes',
        handler: handleList,
        config: {
            plugins: {
                lout: false
            }
        }
    }
];
