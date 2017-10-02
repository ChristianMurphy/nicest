/**
 * @module core/tasks/helper/write-file-promise
 */

const fs = require('fs');

/**
 * Writes a file to disk
 * @param {String} filename - path and name for new file
 * @param {String} data - text to write to the file
 * @param {Object} options - additional options
 * @returns {Promise} resolves when file is written
 */
function writeFile(filename, data, options) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, options, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = writeFile;
