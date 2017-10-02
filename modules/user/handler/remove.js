/**
 * @module user/handler/remove
 */

const User = require('../model/user');

/**
 * Deletes an existing user
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect to User list
 */
function remove(request, reply) {
    const { prefix } = request.route.realm.modifiers.route;

    User
        .remove({ _id: request.params.id })
        .then(() => {
            reply().redirect(`${prefix}/recipe/manage-users/list`);
        });
}

module.exports = remove;
