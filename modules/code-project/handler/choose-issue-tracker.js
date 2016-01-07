'use strict';

/**
 * @module code-project/handler/choose-issue-tracker
 */

/**
 * Allows instructor to configure Taiga issue tracker
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function chooseIssueTracker (request, reply) {
    reply.view('modules/code-project/view/choose-issue-tracker');
}

module.exports = chooseIssueTracker;
