'use strict';

/**
 * @module code-project/handler/select-issue-tracker
 */

/**
 * Stores the issue tracker information
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
function selectIssueTracker (request, reply) {
    const {prefix} = request.route.realm.modifiers.route;

    request
        .yar
        .set({
            'taiga-project-description': request.payload.description,
            'taiga-project-has-backlog': request.payload.hasBacklog,
            'taiga-project-has-issues': request.payload.hasIssues,
            'taiga-project-has-kanban': request.payload.hasKanban,
            'taiga-project-has-wiki': request.payload.hasWiki,
            'taiga-project-is-private': request.payload.isPrivate,
            'taiga-project-use-taiga': request.payload.useTaiga
        });

    if (request.payload.useTaiga) {
        reply().redirect(`${prefix}/recipe/code-project/taiga-login`);
    } else {
        reply().redirect(`${prefix}/recipe/code-project/choose-messaging-platform`);
    }
}

module.exports = selectIssueTracker;
