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
 * @param {String} githubToken - Github auth token
 * @param {Array} repositories - {Array} of {GithubRepository}
 * @param {GithubRepositoryOptions} options - options to be used with repository
 * @returns {Promise} promise will resolve when all repos have been created
 */
function createRepositories(githubUsername, githubToken, repositories, options) {
    const promises = [];

    const Github = new Octokat({ token: githubToken });

    // For each student
    for (const repo of repositories) {
        // Gather the promises
        promises.push(
            // Create a repository
            Github
                .me
                .repos
                .create({
                    has_issues: options.has_issues,
                    has_wiki: options.has_wiki,
                    name: repo.name,
                    private: options.private,
                })
                // Add student as collaborator
                .then(() => {
                    const collaboratorPromises = [];
                    const { collaborators } = repo;

                    // For each student
                    for (const collaborator of collaborators) {
                        // Gather the promises
                        collaboratorPromises.push(
                            // Create a repository
                            Github
                                .repos(githubUsername, repo.name)
                                .collaborators(collaborator)
                                .add(),
                        );
                    }

                    return Promise.all(collaboratorPromises);
                }),
        );
    }

    return Promise.all(promises);
}

module.exports = createRepositories;
