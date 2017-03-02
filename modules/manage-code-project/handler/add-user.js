'use strict';

/**
 * @module manage-code-project/handler/add-user
 */

 /**
  * Allows user to remove a member from a code project
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {Null} responds with HTML page
  */
function chooseUserToAdd (request, reply) {
    reply.view('modules/manage-code-project/view/add-user');
}

module.exports = chooseUserToAdd;
