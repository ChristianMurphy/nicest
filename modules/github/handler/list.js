'use strict';

/**
 * @module github/handler/list
 */

const Octokat = require('octokat');

/**
 * List of Github repositories
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
function list (request, reply) {
    const Github = new Octokat({
        password: request
            .yar
            .get('github-password'),
        username: request
            .yar
            .get('github-username')
    });

    Github
        .me
        .repos
        .fetchAll()
        .then((repos) => {
            reply.view('modules/github/view/list', {repos});
        });
}
module.exports = list;
