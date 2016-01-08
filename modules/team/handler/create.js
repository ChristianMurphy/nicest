'use strict';

/**
 * @module team/handler/create
 */

const Team = require('../model/team');

/**
 * Creates a new Team
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with redirect to Team view
 */
function create (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    Team
        .create(request.payload)
        .then((team) => {
            reply().redirect(`${prefix}/recipe/manage-teams/edit/${team._id}?saved=true`);
        });
}

module.exports = create;
