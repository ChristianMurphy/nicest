const handleList = require('./handler/list');

module.exports = [
    {
        config: { plugins: { lout: false } },
        handler: handleList,
        method: 'GET',
        path: '/recipes',
    },
];
