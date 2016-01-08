'use strict';

/**
 * @module team/handler/view-empty
 */

const User = require('../../user/model/user');

/**
 * view to create a new Team
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function viewEmpty (request, reply) {
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
}

module.exports = viewEmpty;
