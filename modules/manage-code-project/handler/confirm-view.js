'use strict';

/**
 * @module manage-code-project/handler/confirm-view
 */

/**
 * Presents user with confirm view
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function confirmView (request, reply) {
    const action = request
        .yar
        .get('action');

    const displayInfo = {action};

    reply.view('modules/manage-code-project/view/confirm', displayInfo);
}

module.exports = confirmView;
