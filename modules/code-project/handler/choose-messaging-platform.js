'use strict';

/**
 * @module code-project/handler/choose-messaging
 */

/**
 * Allows instructor to configure Slack team messaging platform
 * @param {Request} request - Hapi Request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function chooseMessagingPlatform (request, reply) {
    reply.view('modules/code-project/view/choose-messaging-platform');
}

module.exports = chooseMessagingPlatform;
