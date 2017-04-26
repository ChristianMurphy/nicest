'use strict';

/**
 * @module manage-code-project/task/add-taiga-user
 */

const request = require('request');

/**
 * Promise wrapper for request, abstracts the http api
 * @private
 * @param {Object} data - request object
 * @returns {Promise.<String>} promise will resolve to response body or reject with error code
 */
function requestPromise (data) {
    return new Promise((resolve, reject) => {
        request(data, (error, headers, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}

/**
 *
 * Takes in user meta data and removes user from Slack channels
 * @param {String} taigaUsername - Taiga admin username
 * @param {String} taigaPassword - Taiga admin password
 * @param {String} taigaSlug - Taiga slug
 * @param {String} useremail - Email of the user that is going to be removed
 * @returns  {Promise} - Resolved when user has been removed from channels
 */
function addTaigaUser (taigaUsername, taigaPassword, taigaSlug, useremail) {
    let authorizationToken = null;

    // Login to Taiga
    requestPromise({
        body: {
            password: taigaPassword,
            type: 'normal',
            username: taigaUsername
        },
        json: true,
        method: 'POST',
        uri: 'https://api.taiga.io/api/v1/auth'
    })
        .then((authorization) => {
            // Store authorization token for later
            authorizationToken = authorization.auth_token;

            // URL to get project information
            const projectURL = 'https://api.taiga.io/api/v1/projects/by_slug?slug=';

            // Request the project information
            requestPromise({
                headers: {Authorization: `Bearer ${authorizationToken}`},
                json: true,
                method: 'GET',
                uri: `${projectURL}${taigaSlug}`
            })
                .then((project) => {
                    // Array of promises
                    const promises = [];

                    const taigaRoles = project.roles;

                    const body = {
                        email: useremail,
                        project: project.id,
                        role: taigaRoles
                            .find((element) => element.name === 'Back')
                            .id
                    };

                    promises.push(
                        requestPromise({
                            body,
                            headers: {Authorization: `Bearer ${authorizationToken}`},
                            json: true,
                            method: 'POST',
                            uri: 'https://api.taiga.io/api/v1/memberships'
                        })
                    );

                    return Promise.all(promises);
                });
        });
}


module.exports = addTaigaUser;
