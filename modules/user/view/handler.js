/* eslint no-underscore-dangle: 0 */
'use strict';

const User = require('../model/user');

module.exports = {
    redirect: function (request, reply) {
        reply().redirect('/recipe/manage-users/list');
    },
    list: function (request, reply) {
        User
            .list('_id name')
            .then(function (users) {
                reply.view('modules/user/view/list', {users: users});
            });
    },
    view: function (request, reply) {
        User
            .read(request.params.id)
            .then(function (user) {
                reply.view('modules/user/view/view', {
                    url: '/recipe/manage-users/edit/' + user._id,
                    user: user
                });
            });
    },
    save: function (request, reply) {
        User
            .update(request.params.id, request.payload)
            .then(function () {
                reply().redirect('/recipe/manage-users/edit/' + request.params.id);
            });
    },
    viewEmpty: function (request, reply) {
        reply.view('modules/user/view/view', {
            url: '/recipe/manage-users/create',
            user: {
                name: '',
                modules: {}
            }
        });
    },
    create: function (request, reply) {
        User
            .create(request.payload)
            .then(function (user) {
                reply().redirect('/recipe/manage-users/edit/' + user._id);
            });
    },
    delete: function (request, reply) {
        User
            .delete(request.params.id)
            .then(function () {
                reply().redirect('/recipe/manage-users/list');
            });
    }
};
