'use strict';

/**
 * @module code-project/handler/select-repository
 */

/**
 * Stores the repository that was selected
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
function selectRepository (request, reply) {
    const prefix = request.route.realm.modifiers.route.prefix;

    request
    .yar
    .set({
        'github-project-repo': request.payload.repo,
        'github-project-is-private': request.payload.isPrivate,
        'github-project-has-wiki': request.payload.hasWiki,
        'github-project-has-issue-tracker': request.payload.hasIssueTracker
    });

    reply().redirect(`${prefix}/recipe/code-project/choose-issue-tracker`);
}

module.exports = selectRepository;
