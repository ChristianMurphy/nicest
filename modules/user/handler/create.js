'use strict';

/**
 * @module user/handler/create
 */

const User = require('../model/user');

/**
 * Creates a new user
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect to view User
 */
function create (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    User
        .create(request.payload)
        .then((user) => {
            reply().redirect(`${prefix}/recipe/manage-users/edit/${user._id}?saved=true`);
        });
}

module.exports = create;
