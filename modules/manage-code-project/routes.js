'use strict';

const handleList = require('./handler/list');
const handleRedirect = require('./handler/redirect');
const handlerRemoveUserAction = require('./handler/remove-user');
const handlerAddUserAction = require('./handler/add-user');
const handlerTransferUserAction = require('./handler/transfer-user');
const handlerGitHubLoginView = require('./handler/github-view');
const handlerTaigaLoginView = require('./handler/taiga-view');
const handlerTaigaLoginAction = require('./handler/taiga-action');
const handlerConfirmView = require('./handler/confirm-view');
const handlerConfirmAction = require('./handler/confirm');

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
    },
    {
        handler: handlerGitHubLoginView,
        method: 'GET',
        path: '/recipe/manage-code-project/github-login'
    },
    {
        handler: handlerTaigaLoginView,
        method: 'GET',
        path: '/recipe/manage-code-project/taiga-login'
    },
    {
        handler: handlerTaigaLoginAction,
        method: 'POST',
        path: '/recipe/manage-code-project/taiga-login'
    },
    {
        handler: handlerConfirmView,
        method: 'GET',
        path: '/recipe/manage-code-project/confirm'
    },
    {
        handler: handlerConfirmAction,
        method: 'POST',
        path: '/recipe/manage-code-project/confirm'
    }
];
