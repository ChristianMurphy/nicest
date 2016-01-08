'use strict';

/**
 * @module user/handler/view
 */

const User = require('../model/user');

/**
 * Shows information for existing User and allows for User to be edited
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function view (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    User
        .findOne({
            _id: request.params.id
        })
        .exec()
        .then((user) => {
            reply.view('modules/user/view/view', {
                url: `${prefix}/recipe/manage-users/edit/${user._id}`,
                saved: request.query.saved,
                user: {
                    name: user.name,
                    role: user.role,
                    modules: user.modules || {}
                }
            });
        });
}

module.exports = view;
