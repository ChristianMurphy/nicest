'use strict';

/**
 * @module code-project/handler/login-action
 */

/**
 * Stores Taiga Login information
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function loginAction (request, reply) {
    const {prefix} = request.route.realm.modifiers.route;

    request
        .yar
        .set({
            'taiga-password': request.payload.password,
            'taiga-username': request.payload.username
        });

    reply().redirect(`${prefix}/recipe/code-project/choose-messaging-platform`);
}

module.exports = loginAction;
