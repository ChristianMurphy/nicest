'use strict';

/**
 * @module manage-code-project/handler/add-user
 */

 /**
  * Allows user to add a member to a code project
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {Null} responds with HTML page
  */
function chooseUserToRemove (request, reply) {
    const {prefix} = request.route.realm.modifiers.route;

    request
        .yar
        .set({action: 'Add'});

    reply().redirect(`${prefix}/recipe/manage-code-project/add-choose-course`);
}

module.exports = chooseUserToRemove;
