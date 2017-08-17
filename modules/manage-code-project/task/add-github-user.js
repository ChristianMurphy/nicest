'use strict';

/**
 * @module manage-code-project/task/add-github-user
 */

const Octokat = require('octokat');

/**
 * Adds a user to a Github repository
 * @param {String} githubUsername - Github username
 * @param {String} githubPassword - Github password
 * @param {String} repository - repository that user belongs too
 * @param {String} addGithubUsername - username of user that is to be removed
 * @returns {Promise} resolves when user has been removed
 */
function addGithubUser (githubUsername, githubPassword, repository, addGithubUsername) {
    const promises = [];

    const Github = new Octokat({
        password: githubPassword,
        username: githubUsername
    });

    promises.push(
        // Adds the user from choosen repository
        Github
            .repos(githubUsername, repository)
            .collaborators(addGithubUsername)
            .add()
    );

    return Promise.all(promises);
}

module.exports = addGithubUser;
