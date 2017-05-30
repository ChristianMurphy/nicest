'use strict';

/**
 * @module code-project/handler/choose-repository
 */

const Octokat = require('octokat');

/**
 * Lists Github repositories that instructor could use as a seed for the project
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function chooseRepository (request, reply) {
    const Github = new Octokat({token: request.auth.credentials.token});

    Github
        .me
        .repos
        .fetchAll()
        .then((repos) => {
            reply.view('modules/code-project/view/choose-repository', {repos});
        });
}

module.exports = chooseRepository;
