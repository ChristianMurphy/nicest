'use strict';

/**
 * @module manage-code-project/handler/confirm
 */

const removeGithubUser = require('../task/remove-github-user');

/**
 * Actually removes users from tools
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
function confirm (request, reply) {
    const {prefix} = request.route.realm.modifiers.route;

    const githubUsername = request
        .yar
        .get('github-username');
    const githubPassword = request
        .yar
        .get('github-password');

    removeGithubUser(githubUsername, githubPassword, 'lab1git-CAP-19', 'nicesttest')
        .then(() => {
            reply().redirect(`${prefix}/recipe/code-project/success`);
        });
}

module.exports = confirm;
