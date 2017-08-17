'use strict';

/**
 * @module code-project/handler/cassess-login-action
 */

/**
 * Stores CAssess Login information
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function cassessLoginAction (request, reply) {
    const {prefix} = request.route.realm.modifiers.route;

    request
        .yar
        .set({
            'cassess-password': request.payload.password,
            'cassess-username': request.payload.username
        });

    reply().redirect(`${prefix}/recipe/code-project/confirm`);
}

module.exports = cassessLoginAction;
