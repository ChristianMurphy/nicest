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
 * Takes in a seed repository and a list of repositories to replicate to.
 * @param {String} username - username for Git user
 * @param {String} password - password for Git user
 * @param {String} seedRepositoryURL - remote Git url to use as seed for other repos
 * @param {Array} destinationRepositoryURLs - {Array} of {String} with repository URLs
 * @returns {Promise} promise will resolve when all repos have been seeded
 */
function seedGitRepository (username, password, seedRepositoryURL, destinationRepositoryURLs) {
    // clear temporary folder
    return rmrf(temporaryFolder)
        // clone repository to temporary folder
        .then(() => {
            return NodeGit
            .Clone
            .clone(seedRepositoryURL, temporaryFolder, {
                callbacks: {
                    credentials () {
                        return NodeGit
                        .Cred
                        .userpassPlaintextNew(username, password);
                    }
                }
            });
        })
        // open the repository
        .then(() => {
            return NodeGit
            .Repository
            .open(temporaryFolder);
        })
        // push the seed repository to all destination repositories
        .then((seedRepository) => {
            let chain = Promise.resolve();

            // for each destination
            for (let index = 0; index < destinationRepositoryURLs.length; index += 1) {
                // create and open a remote for destination
                chain = chain
                .then(() => {
                    return NodeGit
                    .Remote
                    .create(seedRepository, index.toString(), destinationRepositoryURLs[index]);
                })
                // push to the remote
                .then((remote) => {
                    // push to destination remote
                    return remote.push([branchReference], {
                        callbacks: {
                            credentials () {
                                return NodeGit
                                .Cred
                                .userpassPlaintextNew(username, password);
                            }
                        }
                    });
                });
            }
            // wait for all pushes to complete
            return chain;
        });
}

module.exports = seedGitRepository;

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
