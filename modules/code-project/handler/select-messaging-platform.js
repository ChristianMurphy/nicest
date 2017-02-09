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
    const {prefix} = request.route.realm.modifiers.route;

    request
        .yar
        .set({
            'slack-project-access-token': request.payload.accessToken,
            'slack-project-course-channel-names': request.payload.courseChannelNames,
            'slack-project-team-channel-names': request.payload.teamChannelNames,
            'slack-project-use-slack': request.payload.useSlack
        });

    reply().redirect(`${prefix}/recipe/code-project/choose-assessment-system`);
}

module.exports = selectMessagingPlatform;
