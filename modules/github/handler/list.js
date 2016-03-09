'use strict';

/**
 * @module github/handler/list
 */

const Octokat = require('octokat');

/**
 * List of Github repositories
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
function list (request, reply) {
    const Github = new Octokat({
        username: request
            .yar
            .get('github-username'),
        password: request
            .yar
            .get('github-password')
    });

    fetchAll(Github.me.repos.fetch).then((repos) => {
        reply.view('modules/github/view/list', {repos});
    });
}

// TODO: remove this after next Octokat update that will include a native fetch all
/**
 * Octokat FetchAll Shim
 * @private
 * @author philschatz
 * @param {Function} fn - getter function
 * @param {Object} args - arguements to pass to getter function
 * @returns {Object[]} all resulting values
 */
function fetchAll (fn, args) {
    // Accumulated results
    let acc = [];
    const promise = new Promise((resolve, reject) => {
        fn(args).then((val) => {
            acc = acc.concat(val);
            if (val.nextPage) {
                return fetchAll(val.nextPage).then((valTwo) => {
                    acc = acc.concat(valTwo);
                    resolve(acc);
                }, reject);
            }

            return resolve(acc);
        }, reject);
    });

    return promise;
}

module.exports = list;
