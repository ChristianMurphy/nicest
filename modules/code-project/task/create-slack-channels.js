'use strict';

/**
 * @module code-project/task/create-slack-channels
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
 * SlackChannel is meta data for creating a single channel.
 * @typedef {Object} SlackChannel
 * @property {String} name - name of the channel
 * @property {Boolean} isPrivate - choose whether channel is public or private
 */

/**
 * SlackUser is meta data for inviting a user to a Slack team.
 * @typedef {Object} SlackUser
 * @property {String} email - email address of the user
 * @property {Array} channels - {Array} of {String} channel names
 */

/**
 * Takes in Slack meta data and creates channels.
 * @param {String} accessToken - Slack API access token
 * @param {Array} slackChannels - {Array} of {SlackChannel}
 * @param {Array} slackUsers - {Array} of {SlackUser}
 * @returns {Promise} resolves when channels have been created
 */
function createSlackChannels (accessToken, slackChannels, slackUsers) {
    // Collect promises for all channels
    const promises = [];

    // Create all channels
    slackChannels.forEach((channel) => {
        // The Slack API defines different endpoints for creating a
        // Slack channel depending on whether it is public or private.
        let createChannelURI = 'https://slack.com/api/channels.create';

        if (channel.isPrivate) {
            createChannelURI = 'https://slack.com/api/groups.create';
        }

        // Pass API method parameters via query string
        const qs = querystring.stringify({
            name: channel.name,
            token: accessToken
        });

        // Create channel
        promises.push(
        requestPromise({
            json: true,
            method: 'POST',
            uri: `${createChannelURI}?${qs}`
        })
    );
    });

    // Wait for all channels to be created
    Promise.all(promises)
        .then((data) => {
            // TODO Invite users to the Slack team
        });
}

module.exports = createSlackChannels;
