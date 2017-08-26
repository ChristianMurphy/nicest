/**
 * @module import-export/task/validate
 */

const libxml = require('libxmljs');
const fs = require('fs');
const path = require('path');

const schema = fs.readFileSync(path.join(__dirname, '..', 'xml', 'schema.xsd'));
const parsedSchema = libxml.parseXmlString(schema);

/**
 * Promise wrapper for fs.readFile
 * @private
 * @param {String} location - path to file
 * @returns {Promise.<String>} resolves with data or rejects with error
 */
function readFilePromise(location) {
    return new Promise((resolve, reject) => {
        fs.readFile(location, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

/**
 * Check that the XML document is valid
 * @param {String} location - path to file to load
 * @returns {Promise.<Object, String[]>} processed XML document
 */
function validate(location) {
    return readFilePromise(location).then((dataset) => {
        // Parse the new file
        const parsedDateset = libxml.parseXmlString(dataset);
        // Validate the file
        const isValid = parsedDateset.validate(parsedSchema);

        return new Promise((resolve, reject) => {
            if (isValid) {
                resolve({
                    document: parsedDateset,
                    mapping: [],
                });
            } else {
                reject(parsedDateset.validationErrors);
            }
        });
    });
}

module.exports = validate;
