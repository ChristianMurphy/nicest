/* eslint no-underscore-dangle: 0 */
'use strict';

const User = require('../model/user');

module.exports = {
    redirect: function (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        reply().redirect(`${prefix}/recipe/manage-users/list`);
    },
    list: function (request, reply) {
        User
            .list('_id name')
            .then((users) => {
                reply.view('modules/user/view/list', {users: users});
            });
    },
    view: function (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        User
            .read(request.params.id)
            .then((user) => {
                reply.view('modules/user/view/view', {
                    url: `${prefix}/recipe/manage-users/edit/${user._id}`,
                    saved: request.query.saved,
                    user: {
                        name: user.name,
                        admin: user.admin,
                        modules: user.modules || {}
                    }
                });
            });
    },
    save: function (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        User
            .update(request.params.id, request.payload)
            .then(() => {
                reply().redirect(`${prefix}/recipe/manage-users/edit/${request.params.id}?saved=true`);
            });
    },
    viewEmpty: function (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        reply.view('modules/user/view/view', {
            url: `${prefix}/recipe/manage-users/create`,
            user: {
                name: '',
                admin: false,
                modules: {}
            }
        });
    },
    create: function (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        User
            .create(request.payload)
            .then((user) => {
                reply().redirect(`${prefix}/recipe/manage-users/edit/${user._id}?saved=true`);
            });
    },
    delete: function (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        User
            .delete(request.params.id)
            .then(() => {
                reply().redirect(`${prefix}/recipe/manage-users/list`);
            });
    }
};
