'use strict';

/**
 * @module course/handler
 */

/**
 * Redirects to course list
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
function redirect (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    reply().redirect(`${prefix}/recipe/manage-courses/list`);
}

module.exports = redirect;
