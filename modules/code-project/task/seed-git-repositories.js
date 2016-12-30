'use strict';

/**
 * @module code-project/task/seed-git-repositories
 */

const NodeGit = require('nodegit');
const rimraf = require('rimraf');
const path = require('path');

NodeGit.enableThreadSafety();
const temporaryFolder = path.join(__dirname, 'temp');
const branchReference = 'refs/heads/master:refs/heads/master';


/**
 * Promise wrapper for rimraf, recursively deletes a folder
 * @function rmrf
 * @private
 * @param {String} folder - folder to recursively remove
 * @returns {Promise} promise will resolve when folder has been deleted
 */
function rmrf (folder) {
    return new Promise((resolve, reject) => {
        rimraf(folder, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Takes in a seed repository and a list of repositories to replicate to.
 * @param {String} username - username for Git user
 * @param {String} password - password for Git user
 * @param {String} seedRepositoryURL - remote Git url to use as seed for other repos
 * @param {Array} destinationRepositoryURLs - {Array} of {String} with repository URLs
 * @returns {Promise} promise will resolve when all repos have been seeded
 */
function seedGitRepository (username, password, seedRepositoryURL, destinationRepositoryURLs) {
    // Clear temporary folder
    return rmrf(temporaryFolder)
        // Clone repository to temporary folder
        .then(() => NodeGit
            .Clone
            .clone(seedRepositoryURL, temporaryFolder, {
                callbacks: {
                    credentials () {
                        return NodeGit
                            .Cred
                            .userpassPlaintextNew(username, password);
                    }
                }
            })
        )
        // Open the repository
        .then(() => NodeGit
            .Repository
            .open(temporaryFolder)
        )
        // Push the seed repository to all destination repositories
        .then((seedRepository) => {
            let chain = Promise.resolve();

            // For each destination
            for (const index in destinationRepositoryURLs) {
                // Create and open a remote for destination
                chain = chain
                    .then(() => NodeGit
                        .Remote
                        .create(seedRepository, index.toString(), destinationRepositoryURLs[index])
                    )
                    // Push to the remote
                    .then((remote) => remote.push([branchReference], {
                        callbacks: {
                            credentials () {
                                return NodeGit
                                    .Cred
                                    .userpassPlaintextNew(username, password);
                            }
                        }
                    }));
            }

            // Wait for all pushes to complete
            return chain;
        });
}

module.exports = seedGitRepository;
