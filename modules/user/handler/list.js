'use strict';

/**
 * @module user/handler/list
 */

const User = require('../model/user');

/**
 * Displays a list of Users
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function list (request, reply) {
    User
        .find({})
        .select('_id name')
        .exec()
        .then((users) => {
            reply.view('modules/user/view/list', {users});
        });
}

module.exports = list;
