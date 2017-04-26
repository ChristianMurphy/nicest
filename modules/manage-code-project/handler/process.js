'use strict';

/**
 * @module manage-code-project/handler/taiga-view
 */

/**
 * Allow user to enter in Taiga login information
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function processView (request, reply) {
    const {prefix} = request.route.realm.modifiers.route;

    const action = request
        .yar
        .get('action');

    if (action === 'Add') {
        reply().redirect(`${prefix}/recipe/manage-code-project/processAdd`);
    } else if (action === 'Remove') {
        reply().redirect(`${prefix}/recipe/manage-code-project/processRemove`);
    } else if (action === 'Transfer') {
        reply().redirect(`${prefix}/recipe/manage-code-project/processTransfer`);
    }
}

module.exports = processView;
