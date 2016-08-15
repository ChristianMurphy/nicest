'use strict';

/**
 * @module github/handler/login-view
 */

/**
 * Github Login Page
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
function loginView (request, reply) {
    reply.view(
        'modules/github/view/login',
        {
            failed: request.query.failed,
            redirect: request.query.next
        }
    );
}

module.exports = loginView;
