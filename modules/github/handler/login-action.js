'use strict';

/**
 * @module github/handler/login-action
 */

const Octokat = require('octokat');

/**
 * Store login credentials to encrypted cookie
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
function loginAction (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    const Github = new Octokat({
        password: request.payload.password,
        username: request.payload.username
    });

    Github.zen
        .read()
        .then(() => {
            request
                .yar
                .set({
                    'github-password': request.payload.password,
                    'github-username': request.payload.username
                });

            if (request.payload.redirect) {
                reply().redirect(request.payload.redirect);
            } else {
                reply().redirect(`${prefix}/recipe/github/list`);
            }
        })
        .catch(() => {
            if (request.payload.redirect) {
                reply().redirect(`${prefix}/recipe/github/login?next=${request.payload.redirect}&failed=true`);
            } else {
                reply().redirect(`${prefix}/recipe/github/login?failed=true`);
            }
        });
}

module.exports = loginAction;
