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
    const prefix = request.route.realm.modifiers.route.prefix;

    request
        .yar
        .set({
            'taiga-username': request.payload.username,
            'taiga-password': request.payload.password
        });

    reply().redirect(`${prefix}/recipe/code-project/choose-assessment-system`);
}

module.exports = loginAction;
