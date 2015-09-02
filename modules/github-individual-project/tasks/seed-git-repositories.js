/* eslint new-cap: 0, no-loop-func: 0, max-nested-callbacks: [2, 2] */
/**
 * @module seedGitRepository
 */
'use strict';

const NodeGit = require('nodegit');
const rimraf = require('rimraf');
const path = require('path');

const tempFolder = path.join(__dirname, 'temp');
const branchReference = 'refs/heads/master:refs/heads/master';

/**
 * Takes in a seed repository and a list of repositories to replicate to.
 * @function seedGitRepository
 * @param {String} username - username for Git user
 * @param {String} password - password for Git user
 * @param {String} seedRepositoryURL - remote Git url to use as seed for other repos
 * @param {Array} destinationRepositoryURLs - {Array} of {String} with repository URLs
 * @returns {Promise} promise will resolve when all repos have been seeded
 */
module.exports = function (username, password, seedRepositoryURL, destinationRepositoryURLs) {
    const credentials = NodeGit.Cred.userpassPlaintextNew(username, password);

    return rmrf(tempFolder)
        // clone repo to temp folder
        .then(function () {
            return NodeGit.Clone(seedRepositoryURL, tempFolder);
        })
        .then(function () {
            return NodeGit.Repository.open(tempFolder);
        })
        .then(
            function (seedRepository) {
                const promises = [];

                // for each student
                for (let index = 0; index < destinationRepositoryURLs.length; index++) {
                    NodeGit.Remote.create(seedRepository, index.toString(), destinationRepositoryURLs[index]);
                    NodeGit.Remote.lookup(seedRepository, index.toString()).then(function (remote) {
                        remote.setCallbacks({
                            credentials: function () {
                                return credentials;
                            }
                        });
                        promises.push(
                            remote.push([branchReference])
                        );
                    });
                }
                return Promise.all(promises);
            }
        );
};

/**
 * Promise wrapper for rimraf, recursively deletes a folder
 * @function rmrf
 * @private
 * @param {String} folder - folder to recursively remove
 * @returns {Promise} promise will resolve when folder has been deleted
 */
function rmrf (folder) {
    return new Promise (function (resolve, reject) {
        rimraf(folder, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
