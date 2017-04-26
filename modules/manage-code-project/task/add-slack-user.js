'use strict';

/**
 * @module manage-code-project/task/add-slack-user
 */

const request = require('request');
const querystring = require('querystring');

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
 * Takes in user meta data and adds user to the appropriate Slack channels
 * @param {String} accessToken - Slack API access token
 * @param {String} userEmail - User's Slack id
 * @param {Array} groups - {Array} of {String} group id's
 * @returns  {Promise} - Resolved when user has been removed from channels
 */
function addSlackUser (accessToken, userEmail, groups) {
    // Collect promises for all channels
    const promises = [];

    // Uri for inviting slack users
    const inviteUserURI = 'https://slack.com/api/users.admin.invite';

    // API URL for retrieving public channel information
    const slackChannelListURL = 'https://slack.com/api/channels.list';

    // Retrieves public channels
    const qs = querystring.stringify({
        exclude_archived: true,
        token: accessToken
    });

    requestPromise({
        json: true,
        method: 'POST',
        uri: `${slackChannelListURL}?${qs}`
    })
        .then((data) => {
            // Array to store channels
            const channels = [];

            // Adds channels to channels array
            data.channels.forEach((channel) => {
                channels.push(channel.id);
            });

            const addQS = querystring.stringify({
                channel: groups.concat(channels),
                email: userEmail,
                token: accessToken
            });

            promises.push(
                requestPromise({
                    json: true,
                    method: 'POST',
                    uri: `${inviteUserURI}?${addQS}`
                })
            );

            return Promise.all(promises);
        });
}

module.exports = addSlackUser;
