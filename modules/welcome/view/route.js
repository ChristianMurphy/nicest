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
                lout: false,
                blankie: {
                    fontSrc: ['self', 'oss.maxcdn.com'],
                    styleSrc: ['self', 'oss.maxcdn.com'],
                    scriptSrc: ['self', 'code.jquery.com', 'oss.maxcdn.com', 'unsafe-inline']
                }
            }
        }
    }
];
