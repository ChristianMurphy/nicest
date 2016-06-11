'use strict';

/**
 * @module code-project/handler/select-students
 */

/**
 * Stores the students or teams that were selected
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
function selectStudents (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    request
        .yar
        .set({'code-project-students': request.payload.students});

    reply().redirect(`${prefix}/recipe/code-project/choose-repository`);
}

module.exports = selectStudents;
