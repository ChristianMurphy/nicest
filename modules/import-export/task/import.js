/* eslint no-sync: 0, max-nested-callbacks: [2, 2] */
'use strict';

const libxml = require('libxmljs');
const fs = require('fs');
const path = require('path');

const schema = fs.readFileSync(path.join(__dirname, 'schema.xsd'));
const parsedSchema = libxml.parseXml(schema);

module.exports = function (location) {
    return readFilePromise(location).then(function (dataset) {
        const parsedDateset = libxml.parseXml(dataset);
        const isValid = parsedDateset.validate(parsedSchema);

        return {
            valid: isValid,
            errors: parsedDateset.validationErrors
        };
    });
};

/**
 * Promise wrapper for fs.readFile
 * @private
 * @param {String} path - path to file
 * @returns {Promise} resolves with data or rejects with error
 */
function readFilePromise (path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, 'utf-8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
