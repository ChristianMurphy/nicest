module.exports = [
    {
        config: {
            auth: false,
            plugins: { lout: false },
        },
        handler: { view: 'modules/welcome/view/welcome' },
        method: 'GET',
        path: '/',
    },
    {
        config: {
            auth: false,
            plugins: { lout: false },
        },
        handler: { directory: { path: 'modules/welcome/static' } },
        method: 'GET',
        path: '/welcome/static/{param*}',
    },
];
