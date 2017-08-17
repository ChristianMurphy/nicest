'use strict';

/**
 * @module code-project/task/gather-slack-metadata
 */

const Team = require('../../team/model/team');

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
 * SlackMetadata is meta data about channels and users.
 * @typedef {Object} SlackMetadata
 * @param {Array} slackChannels - {Array} of {SlackChannel}
 * @param {Array} slackUsers - {Array} of {SlackUser}
 */

/**
 * Takes in basic information and generates Slack metadata.
 * @param {String} courseChannelNames - comma-separated list of course channel names
 * @param {String} teamChannelNames - comma-separated list of team channel names
 * @param {Array<ObjectId>} teamNames - an {Array} of {ObjectId} with team names
 * @returns {Promise.<SlackMetadata>} resolves to {SlackMetadata}
 */
function gatherSlackMetadata (courseChannelNames, teamChannelNames, teamNames) {
    // Gather Slack metadata
    const slackMetadata = {
        channels: [],
        users: []
    };

    // Parse comma-delimited lists into arrays
    const courseChannelNamesArray = courseChannelNames.match(/(?=\S)[^,]+?(?=\s*(,|$))/g);
    const teamChannelNamesArray = teamChannelNames.match(/(?=\S)[^,]+?(?=\s*(,|$))/g);

    // Create meta data for public course channels
    if (courseChannelNamesArray !== null) {
        courseChannelNamesArray.forEach((channelName) => {
            slackMetadata.channels.push({
                isPrivate: false,
                name: channelName
            });
        });
    }

    return Team
        .find({_id: {$in: teamNames}})
        .populate('members')
        .exec()
        .then((teams) => {
            // For each team
            for (const team of teams) {
                const prefix = team
                    .name
                    .toLowerCase()
                    .replace(/[!@#$%^&*? ]+/g, '-')
                    .replace(/[^a-z0-9-]/g, '');

                // Get list of channels for each user to auto-join on invite
                const userChannels = [];

                // Create meta data for private team channels
                if (teamChannelNamesArray !== null) {
                    teamChannelNamesArray.forEach((channelName) => {
                        slackMetadata.channels.push({
                            isPrivate: true,
                            name: `${prefix}-${channelName}`
                        });

                        userChannels.push(`${prefix}-${channelName}`);
                    });
                }

                // For each team member
                for (const member of team.members) {
                    // Create meta data for member
                    slackMetadata.users.push({
                        channels: userChannels,
                        email: member.modules.slack.email
                    });
                }
            }

            return slackMetadata;
        });
}

module.exports = gatherSlackMetadata;
