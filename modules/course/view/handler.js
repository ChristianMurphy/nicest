'use strict';

const Team = require('../../team/model/team');
const User = require('../../user/model/user');
const Course = require('../model/course');

module.exports = {
    redirect (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        reply().redirect(`${prefix}/recipe/manage-courses/list`);
    },
    list (request, reply) {
        Course
            .find({})
            .select('_id name')
            .exec()
            .then((courses) => {
                reply.view('modules/course/view/list', {courses});
            });
    },
    view (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        Promise.all([
            Course
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
                url: `${prefix}/recipe/manage-courses/edit/${team._id}`,
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
                reply().redirect(`${prefix}/recipe/manage-courses/edit/${request.params.id}?saved=true`);
            });
    },
    viewEmpty (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        Promise.all([
            User
                .find({})
                .select('_id name')
                .exec(),
            Team
                .find({})
                .select('_id name')
                .exec()
        ])
        .then((data) => {
            const userIndex = 0;
            const teamIndex = 1;
            const users = data[userIndex];
            const teams = data[teamIndex];

            reply.view('modules/course/view/view', {
                url: `${prefix}/recipe/manage-courses/create`,
                course: {
                    name: '',
                    students: [],
                    instructors: [],
                    teams: [],
                    modules: {}
                },
                users,
                teams
            });
        });
    },
    create (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        Team
            .create(request.payload)
            .then((team) => {
                reply().redirect(`${prefix}/recipe/manage-courses/edit/${team._id}?saved=true`);
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
