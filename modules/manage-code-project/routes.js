'use strict';

const handleList = require('./handler/list');
const handleRedirect = require('./handler/redirect');

const handlerAddUser = require('./handler/add');
const handlerAddUserCourse = require('./handler/add-choose-course');
const handlerAddUserTeam = require('./handler/add-choose-team');
const handlerAddUserInfo = require('./handler/add-choose-user');
const handlerAddUserAction = require('./handler/add-user');

const handlerRemoveUser = require('./handler/remove');
const handlerRemoveUserCourse = require('./handler/remove-choose-course');
const handlerRemoveUserTeam = require('./handler/remove-choose-team');
const handlerRemoveUserInfo = require('./handler/remove-choose-user');
const handlerRemoveUserAction = require('./handler/remove-user');

const handlerTransferUser = require('./handler/transfer');
const handlerTransferUserCourse = require('./handler/transfer-choose-course');
const handlerTransferUserOldTeam = require('./handler/transfer-choose-oldteam');
const handlerTransferUserInfo = require('./handler/transfer-choose-user');
const handlerTransferUserNewTeam = require('./handler/transfer-choose-newteam');
const handlerTransferUserAction = require('./handler/transfer-user');

const handlerGitHubLoginView = require('./handler/github-view');
const handlerTaigaLoginView = require('./handler/taiga-view');
const handlerTaigaLoginAction = require('./handler/taiga-action');
const handlerConfirmView = require('./handler/confirm-view');
const handlerConfirmAction = require('./handler/process');

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
        handler: handlerAddUserAction,
        method: 'GET',
        path: '/recipe/manage-code-project/add'
    },
    {
        handler: handlerAddUserCourse,
        method: 'GET',
        path: '/recipe/manage-code-project/add-choose-course'
    },
    {
        handler: handlerAddUserTeam,
        method: 'GET',
        path: '/recipe/manage-code-project/add-choose-team'
    },
    {
        handler: handlerAddUserInfo,
        method: 'GET',
        path: '/recipe/manage-code-project/add-choose-user'
    },
    {
        handler: handlerAddUser,
        method: 'GET',
        path: '/recipe/manage-code-project/processAdd'
    },
    {
        handler: handlerRemoveUserAction,
        method: 'GET',
        path: '/recipe/manage-code-project/remove'
    },
    {
        handler: handlerRemoveUserCourse,
        method: 'GET',
        path: '/recipe/manage-code-project/remove-choose-course'
    },
    {
        handler: handlerRemoveUserTeam,
        method: 'GET',
        path: '/recipe/manage-code-project/remove-choose-team'
    },
    {
        handler: handlerRemoveUserInfo,
        method: 'GET',
        path: '/recipe/manage-code-project/remove-choose-user'
    },
    {
        handler: handlerRemoveUser,
        method: 'GET',
        path: '/recipe/manage-code-project/processRemove'
    },
    {
        handler: handlerTransferUserAction,
        method: 'GET',
        path: '/recipe/manage-code-project/transfer'
    },
    {
        handler: handlerTransferUserCourse,
        method: 'GET',
        path: '/recipe/manage-code-project/transfer-choose-course'
    },
    {
        handler: handlerTransferUserOldTeam,
        method: 'GET',
        path: '/recipe/manage-code-project/transfer-choose-oldteam'
    },
    {
        handler: handlerTransferUserInfo,
        method: 'GET',
        path: '/recipe/manage-code-project/transfer-choose-user'
    },
    {
        handler: handlerTransferUserNewTeam,
        method: 'GET',
        path: '/recipe/manage-code-project/transfer-choose-newteam'
    },
    {
        handler: handlerTransferUser,
        method: 'GET',
        path: '/recipe/manage-code-project/processTransfer'
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
        method: 'GET',
        path: '/recipe/manage-code-project/confirmAction'
    }
];
