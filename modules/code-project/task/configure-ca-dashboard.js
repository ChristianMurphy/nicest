/**
 * @module ConfigureCaDashboard
 */
'use strict';

const request = require('request');

module.exports = function (serverUrl, metaData) {
    return requestPromise({
        method: 'POST',
        uri: serverUrl,
        json: true,
        body: metaData
    });
};

/**
 * Promise wrapper for request, abstracts the http api
 * @function requestPromise
 * @private
 * @param {object} data - request object
 * @returns {Promise} promise will resolve to response body or reject with error code
 */
function requestPromise (data) {
    return new Promise(function (resolve, reject) {
        request(data, function (error, request, body) {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}
