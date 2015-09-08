/* eslint no-underscore-dangle: 0 */
'use strict';

const User = require('../model/user');

module.exports = {
    redirect: (request, reply) => {
        reply().redirect('/recipe/manage-users/list');
    },
    list: (request, reply) => {
        User
            .list('_id name')
            .then((users) => {
                reply.view('modules/user/view/list', {users: users});
            });
    },
    view: (request, reply) => {
        User
            .read(request.params.id)
            .then((user) => {
                reply.view('modules/user/view/view', {
                    url: '/recipe/manage-users/edit/' + user._id,
                    saved: request.query.saved,
                    user: {
                        name: user.name,
                        modules: user.modules || {}
                    }
                });
            });
    },
    save: (request, reply) => {
        User
            .update(request.params.id, request.payload)
            .then(() => {
                reply().redirect('/recipe/manage-users/edit/' + request.params.id + '?saved=true');
            });
    },
    viewEmpty: (request, reply) => {
        reply.view('modules/user/view/view', {
            url: '/recipe/manage-users/create',
            user: {
                name: '',
                modules: {}
            }
        });
    },
    create: (request, reply) => {
        User
            .create(request.payload)
            .then((user) => {
                reply().redirect('/recipe/manage-users/edit/' + user._id + '?saved=true');
            });
    },
    delete: (request, reply) => {
        User
            .delete(request.params.id)
            .then(() => {
                reply().redirect('/recipe/manage-users/list');
            });
    }
};
