/**
 * @module code-project/handler/choose-assessment-system
 */

/**
 * Allows enabling the CA Assess System
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function chooseAssessmentSystem(request, reply) {
    reply.view('modules/code-project/view/choose-assessment-system');
}

module.exports = chooseAssessmentSystem;
