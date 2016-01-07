'use strict';

/**
 * @module code-project/handler/redirect
 */

/**
 * Redirects from the recipe route to the first step in the recipe
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
function redirect (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    if (typeof request.yar.get('github-username') === 'string' && typeof request.yar.get('github-password') === 'string') {
        reply().redirect(`${prefix}/recipe/code-project/choose-students`);
    } else {
        reply().redirect(`${prefix}/recipe/github/login?next=${prefix}/recipe/code-project/choose-students`);
    }
}

module.exports = redirect;
