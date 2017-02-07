'use strict';

/**
 * @module code-project/handler/select-messaging-platform
 */

/**
 * Stores the messaging platform information
 * @param {Request} request - Hapi Request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
function selectMessagingPlatform (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    request
        .yar
        .set({
            'slack-team-access-token': request.payload.accessToken,
            'slack-team-course-channel-names': request.payload.courseChannelNames,
            'slack-team-team-channel-names': request.payload.teamChannelNames
        });

    reply().redirect(`${prefix}/recipe/code-project/choose-assessment-system`);
}

module.exports = selectMessagingPlatform;
