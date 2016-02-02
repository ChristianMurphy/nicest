'use strict';

/**
 * @module code-project/handler/select-course
 */

/**
 * Stores the Course that was selected
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
function selectCourse (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    request
    .yar
    .set({
        'code-project-course': request.payload.course
    });

    reply().redirect(`${prefix}/recipe/code-project/choose-students`);
}

module.exports = selectCourse;
