'use strict';

/**
 * @module manage-code-project/handler/github-view
 */

 /**
  * Allows user to enter in github login information
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {Null} responds with HTML page
  */
function githubLogin (request, reply) {
    const {prefix} = request.route.realm.modifiers.route;

    const githubUsername = request
        .yar
        .get('github-username');

    const githubPassword = request
        .yar
        .get('github-password');

    if (typeof githubUsername === 'string' && typeof githubPassword === 'string') {
        reply().redirect(`${prefix}/recipe/manage-code-project/taiga-login`);
    } else {
        reply().redirect(`${prefix}/recipe/github/login?next=${prefix}/recipe/manage-code-project/taiga-login`);
    }
}

module.exports = githubLogin;
