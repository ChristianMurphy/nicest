'use strict';

/**
 * Lets instructor know that project has been generated
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function successView (request, reply) {
    reply.view('modules/code-project/view/success');
}

module.exports = successView;
