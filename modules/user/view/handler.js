'use strict';

const User = require('../model/user');

module.exports = {
    redirect: function (request, reply) {
        reply().redirect('/recipe/manage-users/list');
    },
    list: function (request, reply) {
        User
            .list()
            .then(function (userIds) {
                reply.view('modules/user/view/list', {userIds: userIds});
            });
    }
};
