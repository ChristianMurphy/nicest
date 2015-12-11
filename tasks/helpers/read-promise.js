'use strict';

const read = require('read');

/**
 * Reads a value from a REPL loop
 * @param {String} options - description of what to ask for
 * @returns {Promise.<String>} value entered by user
 */
function readPromise (options) {
    return new Promise((resolve, reject) => {
        read(options, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = readPromise;
