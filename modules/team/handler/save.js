'use strict';

/**
 * @module team/handler/save
 */

const Team = require('../model/team');

/**
 * Store and updated Team
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with redirect to Team view
 */
function save (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    Team
        .findOneAndUpdate({_id: request.params.id}, request.payload)
        .exec()
        .then(() => {
            reply().redirect(`${prefix}/recipe/manage-teams/edit/${request.params.id}?saved=true`);
        });
}

module.exports = save;
