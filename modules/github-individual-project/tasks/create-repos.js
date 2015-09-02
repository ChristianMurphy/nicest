'use strict';

/**
 * RepoOptions are the Github repository options.
 * @typedef {Object} RepoOptions
 * @property {Boolean} private
 * @property {Boolean} has_issues
 * @property {Boolean} has_wiki
 */

/**
 * @param {Object} Github - a logged in Octokat instance
 * @param {Array} names - an {Array} of {String} with repo names
 * @param {RepoOptions} options - options to be used with repo
 * @returns {Promise} promise will resolve when all repos have been created
 */
module.exports = function (Github, names, options) {
    const promises = [];

    // for each student
    for (let index = 0; index < names.length; index++) {
        // gather the promises
        promises.push(
            // create a repository
            Github.me.repos.create({
                name: names[index],
                private: options.private,
                has_issues: options.has_issues,
                has_wiki: options.has_wiki
            })
        );
    }
    return Promise.all(promises);
};
