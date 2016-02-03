'use strict';

/**
 * @module github/handler/login-action
 */

/**
 * Store login credentials to encrypted cookie
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
function loginAction (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    request
        .yar
        .set({
            'github-username': request.payload.username,
            'github-password': request.payload.password
        });

    if (request.payload.redirect === 'none') {
        reply().redirect(`${prefix}/recipe/github/list`);
    } else {
        reply().redirect(request.payload.redirect);
    }
}

module.exports = loginAction;
