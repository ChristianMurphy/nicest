'use strict';

/**
 * @module manage-code-project/handler/remove-user
 */

 /**
  * Allows user to remove a member from a code project
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {Null} responds with HTML page
  */
function chooseUserToRemove (request, reply) {
    const {prefix} = request.route.realm.modifiers.route;

    request
        .yar
        .set({action: 'Remove'});

    reply().redirect(`${prefix}/recipe/manage-code-project/remove-choose-course`);
}

module.exports = chooseUserToRemove;
