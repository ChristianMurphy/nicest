'use strict';

/**
 * @module course/handler/create
 */

const Course = require('../model/course');

/**
 * Creates a new Course
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function create (request, reply) {
    const {prefix} = request.route.realm.modifiers.route;

    Course
        .create(request.payload)
        .then((team) => {
            reply().redirect(`${prefix}/recipe/manage-courses/edit/${team._id}?saved=true`);
        });
}

module.exports = create;
