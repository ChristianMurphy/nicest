module.exports = [
    {
        config: { plugins: { lout: false } },
        handler: { directory: { path: 'docs' } },
        method: 'GET',
        path: '/docs/{param*}',
    },
];
