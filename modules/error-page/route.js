'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/401',
        handler: {view: 'modules/error-page/view/401'},
        config: {
            auth: false,
            plugins: {lout: false}
        }
    }
];
