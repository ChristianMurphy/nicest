'use strict';

const Team = require('../model/team');
const User = require('../../user/model/user');

module.exports = {
    redirect (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        reply().redirect(`${prefix}/recipe/manage-teams/list`);
    },
    list (request, reply) {
        Team
            .find({})
            .select('_id name')
            .exec()
            .then((teams) => {
                reply.view('modules/team/view/list', {teams});
            });
    },
    view (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        Promise.all([
            Team
                .findOne({
                    _id: request.params.id
                })
                .exec(),
            User
                .find({})
                .select('_id name')
                .exec()
        ])
        .then((data) => {
            const teamDeconstructor = 0;
            const userDeconstructor = 1;
            const team = data[teamDeconstructor];
            const users = data[userDeconstructor];

            reply.view('modules/team/view/view', {
                url: `${prefix}/recipe/manage-teams/edit/${team._id}`,
                saved: request.query.saved,
                team: {
                    name: team.name,
                    members: team.members || [],
                    modules: team.modules || {}
                },
                users
            });
        });
    },
    save (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        Team
            .findOneAndUpdate({_id: request.params.id}, request.payload)
            .exec()
            .then(() => {
                reply().redirect(`${prefix}/recipe/manage-teams/edit/${request.params.id}?saved=true`);
            });
    },
    viewEmpty (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        User
            .find({})
            .select('_id name')
            .exec()
            .then((users) => {
                reply.view('modules/team/view/view', {
                    url: `${prefix}/recipe/manage-teams/create`,
                    team: {
                        name: '',
                        members: [],
                        modules: {}
                    },
                    users
                });
            });
    },
    create (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        Team
            .create(request.payload)
            .then((team) => {
                reply().redirect(`${prefix}/recipe/manage-teams/edit/${team._id}?saved=true`);
            });
    },
    delete (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        Team
            .remove({
                _id: request.params.id
            })
            .then(() => {
                reply().redirect(`${prefix}/recipe/manage-teams/list`);
            });
    }
};
