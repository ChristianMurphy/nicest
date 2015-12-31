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
            Team
                .find({})
                .select('_id name')
                .exec(),
            User
                .find({})
                .select('_id name')
                .exec()
        ])
        .then((data) => {
            const courseIndex = 0;
            const teamIndex = 1;
            const userIndex = 2;
            const course = data[courseIndex];
            const teams = data[teamIndex];
            const users = data[userIndex];


            reply.view('modules/course/view/view', {
                url: `${prefix}/recipe/manage-courses/edit/${course._id}`,
                saved: request.query.saved,
                course: {
                    name: course.name,
                    students: course.students || [],
                    instructors: course.instructors || [],
                    teams: course.teams || [],
                    modules: course.modules || {}
                },
                users,
                teams
            });
        });
    },
    save (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        Course
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

        Course
            .create(request.payload)
            .then((team) => {
                reply().redirect(`${prefix}/recipe/manage-courses/edit/${team._id}?saved=true`);
            });
    },
    delete (request, reply) {
        const prefix = request.route.realm.modifiers.route.prefix;

        Course
            .remove({
                _id: request.params.id
            })
            .then(() => {
                reply().redirect(`${prefix}/recipe/manage-courses/list`);
            });
    }
};
