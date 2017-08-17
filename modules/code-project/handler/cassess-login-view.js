'use strict';

/**
 * @module code-project/handler/cassess-login-view
 */

/**
 * Allow user to login to CAssess
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function cassessLoginView (request, reply) {
    reply.view('modules/code-project/view/cassess-login');
}

module.exports = cassessLoginView;
