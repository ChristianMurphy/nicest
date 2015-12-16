'use strict';

const User = require('../model/user');

module.exports = {
    redirect (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        reply().redirect(`${prefix}/recipe/manage-users/list`);
    },
    list (request, reply) {
        User
            .find({})
            .select('_id name')
            .exec()
            .then((users) => {
                reply.view('modules/user/view/list', {users});
            });
    },
    view (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        User
            .findOne({
                _id: request.params.id
            })
            .exec()
            .then((user) => {
                reply.view('modules/user/view/view', {
                    url: `${prefix}/recipe/manage-users/edit/${user._id}`,
                    saved: request.query.saved,
                    user: {
                        name: user.name,
                        role: user.role,
                        modules: user.modules || {}
                    }
                });
            });
    },
    save (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        User
            .findOneAndUpdate({_id: request.params.id}, request.payload)
            .exec()
            .then(() => {
                reply().redirect(`${prefix}/recipe/manage-users/edit/${request.params.id}?saved=true`);
            });
    },
    viewEmpty (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        reply.view('modules/user/view/view', {
            url: `${prefix}/recipe/manage-users/create`,
            user: {
                name: '',
                role: 'student',
                modules: {}
            }
        });
    },
    create (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        User
            .create(request.payload)
            .then((user) => {
                reply().redirect(`${prefix}/recipe/manage-users/edit/${user._id}?saved=true`);
            });
    },
    delete (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        User
            .remove({
                _id: request.params.id
            })
            .then(() => {
                reply().redirect(`${prefix}/recipe/manage-users/list`);
            });
    }
};
