'use strict';

/**
 * @module manage-code-project/handler/transfer-user
 */

 /**
  * Allows user to remove a member from a code project
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {Null} responds with HTML page
  */
function chooseUserToTransfer (request, reply) {
    reply.view('modules/manage-code-project/view/transfer-user');
}

module.exports = chooseUserToTransfer;
