/* eslint no-loop-func: 0 */
/**
 * @module CreateGithubRepositories
 */
'use strict';

const Octokat = require('../../../lib/server').server.plugins.github.Octokat;

/**
 * GithubRepository is meta data and collaborator information.
 * @typedef {Object} GithubRepository
 * @property {String} name - name of the repository
 * @property {Array} collaborators - {Array} of {String} with Github usernames
 */

/**
 * GithubRepositoryOptions are the Github repository options.
 * @typedef {Object} GithubRepositoryOptions
 * @property {Boolean} private - whether the repository is visible publically or only to collaborators
 * @property {Boolean} has_issues - enables Github's issue tracker
 * @property {Boolean} has_wiki - enables Github's wiki pages
 */

/**
 * Takes in a list of names, and creates an empty repo for each name.
 * @function createRepositories
 * @param {String} githubUsername - Github username
 * @param {String} githubPassword - Github password
 * @param {Array} repositories - {Array} of {GithubRepository}
 * @param {GithubRepositoryOptions} options - options to be used with repository
 * @returns {Promise} promise will resolve when all repos have been created
 */
module.exports = (githubUsername, githubPassword, repositories, options) => {
    const promises = [];

    const Github = new Octokat({
        username: githubUsername,
        password: githubPassword
    });

    // for each student
    for (let index = 0; index < repositories.length; index++) {
        // gather the promises
        promises.push(
            // create a repository
            Github.me.repos.create({
                name: repositories[index].name,
                private: options.private,
                has_issues: options.has_issues,
                has_wiki: options.has_wiki
            })
            // Add student as collaborator
            .then(() => {
                const collaboratorPromises = [];

                // for each student
                for (let collaboratorIndex = 0; collaboratorIndex < repositories[index].collaborators.length; collaboratorIndex++) {
                    // gather the promises
                    collaboratorPromises.push(
                        // create a repository
                        Github
                            .repos(githubUsername, repositories[index].name)
                            .collaborators(repositories[index].collaborators[collaboratorIndex])
                            .add()
                    );
                }
                return Promise.all(collaboratorPromises);
            })
        );
    }
    return Promise.all(promises);
};