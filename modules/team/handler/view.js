'use strict';

/**
 * @module team/handler/view
 */

const Team = require('../model/team');
const User = require('../../user/model/user');

/**
 * View or edit an existing Team
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function view (request, reply) {
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
}

module.exports = view;
