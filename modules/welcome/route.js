'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: {
            view: 'modules/welcome/view/welcome'
        },
        config: {
            auth: false,
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'GET',
        path: '/welcome/static/{param*}',
        handler: {
            directory: {
                path: 'modules/welcome/static'
            }
        },
        config: {
            auth: false,
            plugins: {
                lout: false
            }
        }
    }
];
