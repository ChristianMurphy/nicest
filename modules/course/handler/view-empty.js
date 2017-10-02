/**
 * @module course/handler/view-empty
 */

const Team = require('../../team/model/team');
const User = require('../../user/model/user');

/**
 * View for creating a new Course
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function viewEmpty(request, reply) {
    const { prefix } = request.route.realm.modifiers.route;

    Promise
        .all([
            User
                .find({})
                .select('_id name')
                .exec(),
            Team
                .find({})
                .select('_id name')
                .exec(),
        ])
        .then(([
            users,
            teams,
        ]) => {
            reply.view('modules/course/view/view', {
                course: {
                    instructors: [],
                    modules: {},
                    name: '',
                    students: [],
                    teams: [],
                },
                teams,
                url: `${prefix}/recipe/manage-courses/create`,
                users,
            });
        });
}

module.exports = viewEmpty;
