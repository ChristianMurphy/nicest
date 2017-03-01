'use strict';

/**
 * @module manage-code-project/handler/removeUser
 */

 /**
  * Allows user to remove a member from a code project
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {Null} responds with HTML page
  */
function chooseUserToRemove (request, reply) {
    reply.view('modules/manage-code-project/view/remove-user');
}

module.exports = chooseUserToRemove;
