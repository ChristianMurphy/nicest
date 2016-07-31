'use strict';

/**
 * @module course/handler/remove
 */

const Course = require('../model/course');

/**
 * Deletes a course
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function remove (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    Course
        .remove({_id: request.params.id})
        .then(() => {
            reply().redirect(`${prefix}/recipe/manage-courses/list`);
        });
}

module.exports = remove;
