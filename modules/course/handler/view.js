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
                .findOne({_id: request.params.id})
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
        .then(([course, teams, users]) => {
            reply.view('modules/course/view/view', {
                course: {
                    instructors: course.instructors || [],
                    modules: course.modules || {},
                    name: course.name,
                    students: course.students || [],
                    teams: course.teams || []
                },
                saved: request.query.saved,
                teams,
                url: `${prefix}/recipe/manage-courses/edit/${course._id}`,
                users
            });
        });
}

module.exports = view;
