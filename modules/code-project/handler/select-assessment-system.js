'use strict';

/**
 * @module code-project/handler/select-assessment-system
 */

/**
 * Stores CA Assess settings
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function selectAssessmentSystem (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    request.yar.set({
        'assessment-use-ca-dashboard': request.payload.useCADashboard
    });

    reply().redirect(`${prefix}/recipe/code-project/confirm`);
}

module.exports = selectAssessmentSystem;
