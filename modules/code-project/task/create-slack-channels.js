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
 * @returns {Promise.<Object>} resolves to map of Slack channel names to IDs
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
    return Promise.all(promises)
        .then((data) => {
            // Collect promises for all channels
            const promisesInvite = [];

            // Creates a key/value pair for channel name to channel id
            const channelMapping = {};

            // Creates a key/value pair for public channel id
            const publicMapping = {};

            data.forEach((dataItem) => {
                if ('channel' in dataItem) {
                    const {name} = dataItem.channel;
                    const {id} = dataItem.channel;

                    publicMapping[name] = id;
                } else if ('group' in dataItem) {
                    const {name} = dataItem.group;
                    const {id} = dataItem.group;

                    channelMapping[name] = id;
                }
            });

            // Uri for inviting slack users
            const inviteUserURI = 'https://slack.com/api/users.admin.invite';


            slackUsers.forEach((student) => {
                // Creates an array of channel ids for the user
                let studentChannelIDs = [];

                student.channels.forEach((channel) => {
                    studentChannelIDs.push(channelMapping[channel]);
                });

                studentChannelIDs = studentChannelIDs.concat(
                    Object.keys(publicMapping).map((key) => publicMapping[key])
                );

                // Pass API method parameters via query string
                const qs = querystring.stringify({
                    channels: studentChannelIDs.join(),
                    email: student.email,
                    token: accessToken
                });

                // Invites the user to team and respective channels
                promisesInvite.push(
                requestPromise({
                    json: true,
                    method: 'POST',
                    uri: `${inviteUserURI}?${qs}`
                })
            );
            });

            return Promise.all(promisesInvite)
                .then(() => channelMapping);
        });
}

module.exports = createSlackChannels;
