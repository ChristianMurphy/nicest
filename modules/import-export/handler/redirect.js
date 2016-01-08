'use strict';

/**
 * @module import-export/handler/redirect
 */

/**
 * Redirects to Import Page
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
function redirect (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    reply().redirect(`${prefix}/recipe/import-export/import-xml`);
}

module.exports = redirect;
