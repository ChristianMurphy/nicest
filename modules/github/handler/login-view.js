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
    reply.view('modules/github/view/login', {redirect: request.query.next || 'none'});
}

module.exports = loginView;
