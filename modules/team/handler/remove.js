/**
 * @module team/handler/remove
 */

const Team = require('../model/team');

/**
 * Delete an existing Team
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with redirect to Team list
 */
function remove(request, reply) {
    const { prefix } = request.route.realm.modifiers.route;

    Team
        .remove({ _id: request.params.id })
        .then(() => {
            reply().redirect(`${prefix}/recipe/manage-teams/list`);
        });
}

module.exports = remove;
