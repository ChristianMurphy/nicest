const handleList = require('./handler/list');
const handleRedirect = require('./handler/redirect');

module.exports = [
    {
        config: { description: 'Manage Github Users, Teams and Repos' },
        handler: handleRedirect,
        method: 'GET',
        path: '/recipe/github',
    },
    {
        handler: handleList,
        method: 'GET',
        path: '/recipe/github/list',
    },
];
