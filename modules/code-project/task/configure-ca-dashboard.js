/**
 * @module ConfigureCaDashboard
 */
'use strict';

const request = require('request');

module.exports = function (serverUrl, metaData) {
    const promises = [];

    for (let index = 0; index < metaData.length; index++) {
        promises.push(
            requestPromise({
                method: 'POST',
                uri: serverUrl,
                json: true,
                body: metaData[index]
            })
        );
    }

    return Promise.all(promises);
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
