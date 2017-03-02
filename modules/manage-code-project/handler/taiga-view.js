'use strict';

/**
 * @module manage-code-project/handler/taiga-view
 */

/**
 * Allow user to enter in Taiga login information
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function taigaLoginView (request, reply) {
    reply.view('modules/manage-code-project/view/taiga-login');
}

module.exports = taigaLoginView;
