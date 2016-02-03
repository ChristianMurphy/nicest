'use strict';

/**
 * @module course/handler/view
 */

const Team = require('../../team/model/team');
const User = require('../../user/model/user');
const Course = require('../model/course');

/**
 * Allows for viewing and editing an existing Course
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function view (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    Promise
    .all([
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
        const course = data[0];
        const teams = data[1];
        const users = data[2];


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
}

module.exports = view;
