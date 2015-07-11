'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: {
            view: 'modules/welcome/view/welcome'
        },
        config: {
            plugins: {
                lout: false
            }
        }
    }
];
