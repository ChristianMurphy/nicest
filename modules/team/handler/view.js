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

    Promise
        .all([
            Team
                .findOne({_id: request.params.id})
                .exec(),
            User
                .find({})
                .select('_id name')
                .exec()
        ])
        .then(([team, users]) => {
            reply.view('modules/team/view/view', {
                saved: request.query.saved,
                team: {
                    members: team.members || [],
                    modules: team.modules || {},
                    name: team.name
                },
                url: `${prefix}/recipe/manage-teams/edit/${team._id}`,
                users
            });
        });
}

module.exports = view;
