'use strict';

/**
 * @module user/handler/redirect
 */

/**
 * Redirects to list of Users
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect to User list
 */
function redirect (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    reply().redirect(`${prefix}/recipe/manage-users/list`);
}

module.exports = redirect;
