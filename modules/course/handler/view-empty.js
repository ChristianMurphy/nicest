'use strict';

/**
 * @module course/handler
 */

const Team = require('../../team/model/team');
const User = require('../../user/model/user');

/**
 * View for creating a new Course
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function viewEmpty (request, reply) {
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
}

module.exports = viewEmpty;
