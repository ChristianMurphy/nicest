'use strict';

/**
 * @module course/handler/save
 */

const Course = require('../model/course');

/**
 * Stores an updated Course
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
function save (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    Course
    .findOneAndUpdate({_id: request.params.id}, request.payload)
    .exec()
    .then(() => {
        reply().redirect(`${prefix}/recipe/manage-courses/edit/${request.params.id}?saved=true`);
    });
}

module.exports = save;
