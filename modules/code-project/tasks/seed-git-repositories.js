/* eslint new-cap: 0, no-loop-func: 0, max-nested-callbacks: [2, 2] */
/**
 * @module seedGitRepository
 */
'use strict';

const NodeGit = require('nodegit');
const rimraf = require('rimraf');
const path = require('path');

const temporaryFolder = path.join(__dirname, 'temp');
const branchReference = 'refs/heads/master:refs/heads/master';

/**
 * Promise wrapper for rimraf, recursively deletes a folder
 * @function rmrf
 * @private
 * @param {String} folder - folder to recursively remove
 * @returns {Promise} promise will resolve when folder has been deleted
 */
const rmrf = (folder) => {
    return new Promise ((resolve, reject) => {
        rimraf(folder, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

/**
 * Takes in a seed repository and a list of repositories to replicate to.
 * @function seedGitRepository
 * @param {String} username - username for Git user
 * @param {String} password - password for Git user
 * @param {String} seedRepositoryURL - remote Git url to use as seed for other repos
 * @param {Array} destinationRepositoryURLs - {Array} of {String} with repository URLs
 * @returns {Promise} promise will resolve when all repos have been seeded
 */
module.exports = (username, password, seedRepositoryURL, destinationRepositoryURLs) => {
    const credentials = NodeGit.Cred.userpassPlaintextNew(username, password);

    // clear temporary folder
    return rmrf(temporaryFolder)
        // clone repository to temporary folder
        .then(() => {
            return NodeGit.Clone(seedRepositoryURL, temporaryFolder);
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
                // open remote for destination
                NodeGit.Remote.lookup(seedRepository, index.toString()).then((remote) => {
                    // add Git authentication information
                    remote.setCallbacks({
                        credentials: () => {
                            return credentials;
                        }
                    });
                    // push to destination remote and collect resulting promise
                    promises.push(
                        remote.push([branchReference])
                    );
                });
            }
            // wait for all pushes to complete
            return Promise.all(promises);
        });
};
