'use strict';

/**
 * @module manage-code-project/handler/add
 */

 /**
  * Calls functions to transfer user
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {Null} responds with HTML page
  */
function transferUser (request, reply) {
    reply.view('modules/manage-code-project/view/success');
}

module.exports = transferUser;
