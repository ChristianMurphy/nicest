'use strict';

/**
 * @module manage-code-project/handler/taiga-action
 */

/**
 * Gets taiga login information
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function taigaLoginAction (request, reply) {
    const {prefix} = request.route.realm.modifiers.route;

    request
        .yar
        .set({
            'taiga-password': request.payload.password,
            'taiga-username': request.payload.username
        });

    reply().redirect(`${prefix}/recipe/manage-code-project/confirm`);
}

module.exports = taigaLoginAction;
