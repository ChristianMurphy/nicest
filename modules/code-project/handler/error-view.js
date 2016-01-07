'use strict';

/**
 * @module code-project/handler/error-view
 */

const httpInternalServerError = 500;

/**
 * Lets user know that this project could not be generated
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function errorView (request, reply) {
    reply.view('modules/code-project/view/error').code(httpInternalServerError);
}

module.exports = errorView;
