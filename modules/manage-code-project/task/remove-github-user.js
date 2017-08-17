'use strict';

/**
 * @module manage-code-project/task/remove-github-user
 */

const Octokat = require('octokat');

/**
 * .
 * @function CreateRepositories
 * @param {String} githubUsername - Github username
 * @param {String} githubPassword - Github password
 * @param {String} repository - repository that user belongs too
 * @param {String} removeGithubUsername - username of user that is to be removed
 * @returns {Promise} resolves when user has been removed
 */
function removeGithubUser (githubUsername, githubPassword, repository, removeGithubUsername) {
    const promises = [];

    const Github = new Octokat({
        password: githubPassword,
        username: githubUsername
    });

    promises.push(
        // Removes the user from choosen repository
        Github
            .repos(githubUsername, repository)
            .collaborators(removeGithubUsername)
            .remove()
    );

    return Promise.all(promises);
}

module.exports = removeGithubUser;
