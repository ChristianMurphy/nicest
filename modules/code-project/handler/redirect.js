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
    const githubUsername = request
    .yar
    .get('github-username');
    const githubPassword = request
    .yar
    .get('github-password');

    if (typeof githubUsername === 'string' && typeof githubPassword === 'string') {
        reply().redirect(`${prefix}/recipe/code-project/choose-course`);
    } else {
        reply().redirect(`${prefix}/recipe/github/login?next=${prefix}/recipe/code-project/choose-course`);
    }
}

module.exports = redirect;
