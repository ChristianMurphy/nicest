'use strict';

/**
 * @module manage-code-project/task/remove-slack-user
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
                console.log(error);
                reject(error);
            } else {
                console.log(body);
                resolve(body);
            }
        });
    });
}

/**
 *
 * Takes in user meta data and removes user from Slack channels
 * @param {String} accessToken - Slack API access token
 * @param {String} userid - User's Slack id
 * @param {Array} groups - {Array} of {String} group id's
 * @returns  {Promise} - Resolved when user has been removed from channels
 */
function removeSlackUser (accessToken, userid, groups) {
    // Collect promises for all channels
    const promises = [];

    // API URL for removing from channels and groups
    const slackChannelURL = 'https://slack.com/api/channels.kick';
    const slackGroupURL = 'https://slack.com/api/groups.kick';

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

            // Loops through all the public channels the user needs to be removed from
            channels.forEach((channelID) => {
                // Pass API method parameters via query string
                const channelQS = querystring.stringify({
                    channel: channelID,
                    token: accessToken,
                    user: userid
                });

                // Removes user from channel
                promises.push(
                requestPromise({
                    json: true,
                    method: 'POST',
                    uri: `${slackChannelURL}?${channelQS}`
                })

            );
            });

            groups.forEach((groupID) => {
                const groupQS = querystring.stringify({
                    channel: groupID,
                    token: accessToken,
                    user: userid
                });

                promises.push(
                requestPromise({
                    json: true,
                    method: 'POST',
                    uri: `${slackGroupURL}?${groupQS}`
                })
            );
            });

            return Promise.all(promises);
        });
}

module.exports = removeSlackUser;
