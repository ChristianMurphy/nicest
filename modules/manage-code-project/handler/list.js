'use strict';

/**
 * @module manage-code-project/handler/list
 */

/**
 * Allows user to select code project manage tool
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function chooseManagmentTool (request, reply) {
    reply.view('modules/manage-code-project/view/options');
}

module.exports = chooseManagmentTool;
