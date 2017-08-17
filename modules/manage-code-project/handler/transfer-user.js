'use strict';

/**
 * @module manage-code-project/handler/transfer-user
 */

 /**
  * Allows user to transfer a member from a code project into another team
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {Null} responds with HTML page
  */
function chooseUserToTransfer (request, reply) {
    const {prefix} = request.route.realm.modifiers.route;

    request
        .yar
        .set({action: 'Transfer'});

    reply().redirect(`${prefix}/recipe/manage-code-project/transfer-choose-course`);
}

module.exports = chooseUserToTransfer;
