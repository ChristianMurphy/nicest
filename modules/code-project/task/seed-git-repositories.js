/* eslint new-cap: 0, no-loop-func: 0, max-nested-callbacks: [2, 2] */
/**
 * @module SeedGitRepository
 */
'use strict';

const NodeGit = require('nodegit');
const rimraf = require('rimraf');
const path = require('path');

const temporaryFolder = path.join(__dirname, 'temp');
const branchReference = 'refs/heads/master:refs/heads/master';

/**
 * Takes in a seed repository and a list of repositories to replicate to.
 * @function SeedGitRepository
 * @param {String} username - username for Git user
 * @param {String} password - password for Git user
 * @param {String} seedRepositoryURL - remote Git url to use as seed for other repos
 * @param {Array} destinationRepositoryURLs - {Array} of {String} with repository URLs
 * @returns {Promise} promise will resolve when all repos have been seeded
 */
module.exports = function (username, password, seedRepositoryURL, destinationRepositoryURLs) {
    const credentials = NodeGit.Cred.userpassPlaintextNew(username, password);

    // clear temporary folder
    return rmrf(temporaryFolder)
        // clone repository to temporary folder
        .then(() => {
            return NodeGit.Clone(seedRepositoryURL, temporaryFolder, {
                callbacks: {
                    credentials: function () {
                        return credentials;
                    }
                }
            });
        })
        // open the repository
        .then(() => {
            return NodeGit.Repository.open(temporaryFolder);
        })
        // push the seed repository to all destination repositories
        .then((seedRepository) => {
            const promises = [];

            // for each student
            for (let index = 0; index < destinationRepositoryURLs.length; index++) {
                // create a remote for destination
                NodeGit.Remote.create(seedRepository, index.toString(), destinationRepositoryURLs[index]);
                // open remote for destination and collect resulting promise
                promises.push(
                    NodeGit.Remote.lookup(seedRepository, index.toString())
                        .then((remote) => {
                            // push to destination remote
                            return remote.push([branchReference], {
                                callbacks: {
                                    credentials: function () {
                                        return credentials;
                                    }
                                }
                            });
                        })
                );
            }
            // wait for all pushes to complete
            return Promise.all(promises);
        });
};

/**
 * Promise wrapper for rimraf, recursively deletes a folder
 * @function rmrf
 * @private
 * @param {String} folder - folder to recursively remove
 * @returns {Promise} promise will resolve when folder has been deleted
 */
function rmrf (folder) {
    return new Promise ((resolve, reject) => {
        rimraf(folder, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
