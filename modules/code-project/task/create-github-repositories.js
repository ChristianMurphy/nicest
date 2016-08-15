'use strict';

/**
 * @module code-project/task/create-github-repositories
 */

const Octokat = require('octokat');

/**
 * GithubRepository is meta data and collaborator information.
 * @typedef {Object} GithubRepository
 * @property {String} url - url of the repository
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
 * @function CreateRepositories
 * @param {String} githubUsername - Github username
 * @param {String} githubPassword - Github password
 * @param {Array} repositories - {Array} of {GithubRepository}
 * @param {GithubRepositoryOptions} options - options to be used with repository
 * @returns {Promise} promise will resolve when all repos have been created
 */
function createRepositories (githubUsername, githubPassword, repositories, options) {
    const promises = [];

    const Github = new Octokat({
        password: githubPassword,
        username: githubUsername
    });

    // for each student
    for (const index in repositories) {
        // gather the promises
        promises.push(
            // create a repository
            Github
                .me
                .repos
                .create({
                    has_issues: options.has_issues,
                    has_wiki: options.has_wiki,
                    name: repositories[index].name,
                    private: options.private
                })
                // Add student as collaborator
                .then(() => {
                    const collaboratorPromises = [];
                    const collaborators = repositories[index].collaborators;

                    // for each student
                    for (const collaboratorIndex in collaborators) {
                        // gather the promises
                        collaboratorPromises.push(
                            // create a repository
                            Github
                                .repos(githubUsername, repositories[index].name)
                                .collaborators(collaborators[collaboratorIndex])
                                .add()
                        );
                    }

                    return Promise.all(collaboratorPromises);
                })
        );
    }

    return Promise.all(promises);
}

module.exports = createRepositories;
