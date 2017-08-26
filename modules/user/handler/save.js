/**
 * @module user/handler/save
 */

const User = require('../model/user');

/**
 * Stores updates to an existing user
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect to view User
 */
function save(request, reply) {
    const { prefix } = request.route.realm.modifiers.route;

    User
        .findOneAndUpdate({ _id: request.params.id }, request.payload)
        .exec()
        .then(() => {
            reply().redirect(`${prefix}/recipe/manage-users/edit/${request.params.id}?saved=true`);
        });
}

module.exports = save;
