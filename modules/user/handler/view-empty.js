'use strict';

/**
 * @module user/handler/view-empty
 */

/**
 * Shows information for existing User and allows for User to be edited
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function viewEmpty (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    reply.view('modules/user/view/view', {
        url: `${prefix}/recipe/manage-users/create`,
        user: {
            name: '',
            role: 'student',
            modules: {}
        }
    });
}

module.exports = viewEmpty;
