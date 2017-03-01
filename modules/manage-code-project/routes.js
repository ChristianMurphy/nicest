'use strict';

const handleList = require('./handler/list');
const handleRedirect = require('./handler/redirect');
const handlerRemoveUserAction = require('./handler/removeUser');
const handlerAddUserAction = require('./handler/addUser');
const handlerTransferUserAction = require('./handler/transferUser');

module.exports = [
    {
        config: {description: 'Manage Users In An Exisiting Code Project'},
        handler: handleRedirect,
        method: 'GET',
        path: '/recipe/manage-code-project'
    },
    {
        handler: handleList,
        method: 'GET',
        path: '/recipe/manage-code-project/list'
    },
    {
        handler: handlerRemoveUserAction,
        method: 'GET',
        path: '/recipe/manage-code-project/remove'
    },
    {
        handler: handlerAddUserAction,
        method: 'GET',
        path: '/recipe/manage-code-project/add'
    },
    {
        handler: handlerTransferUserAction,
        method: 'GET',
        path: '/recipe/manage-code-project/transfer'
    }

];
