'use strict';

/**
 * @module github/handler/redirect
 */

/**
 * Redirects to Github Login
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
function redirect (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    reply().redirect(`${prefix}/recipe/github/login`);
}

module.exports = redirect;
