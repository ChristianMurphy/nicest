module.exports = [
    {
        config: {
            auth: false,
            plugins: { lout: false },
        },
        handler: { view: 'modules/error-page/view/401' },
        method: 'GET',
        path: '/401',
    },
];
