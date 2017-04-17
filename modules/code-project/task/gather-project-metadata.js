'use strict';

/**
 * @module code-project/task/gather-project-metadata
 */

const request = require('request');
const querystring = require('querystring');

const User = require('../../user/model/user');
const Team = require('../../team/model/team');
const Course = require('../../course/model/course');
const Project = require('../model/project');

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
 * CodeProjectMeta is meta data for a code project.
 * @typedef {Object} CodeProjectMeta
 * @property {String} name - team's name.
 * @property {String} github-url - Short hand link to the GitHub repos
 * @property {String} slack-team-id - Slack team id
 * @property {String} slack-token - Slack token for API access
 * @property {String} taiga-slug - Shorthand link to Taiga board
 * @property {Array<String>} slack-groups - {Array} of {String} with slack channel ids
 * @property {ObjectId} course - ID of the course that the code project was provisioned for
 * @property {ObjectId} team - ID of the team that the code project was provisioned for
 * @property {Array<ObjectId>} members - IDs of the the members of the team.
 * @property {Array<ObjectId>} instructors - IDs of the instructors teaching or grading code project.
 */

/**
 * Takes in information about provisioned code projects and generates metadata that can be persisted in MongoDB.
 * @param {String} seedRepository - name of seed repository
 * @param {String} githubUsername - username of logged in and hosting user
 * @param {String} githubToken - GitHub API access token
 * @param {String} studentType - Either 'individual' or 'team', defaults to 'individual'
 * @param {Array<ObjectId>} students - either user ids or team ids
 * @param {String} courseId - Course that project is being generated for
 * @param {String} slackToken - Slack API access token
 * @param {Object} slackChannels - String:String mapping of channel names to ids
 * @param {String} taigaToken - Taiga API access token
 * @returns {Promise.<Array>} resolves to {Array} of {CodeProjectMeta}
 */
function gatherProjectMetadata (seedRepository, githubUsername, githubToken, studentType,
        students, courseId, slackToken, slackChannels, taigaToken) {
    const githubUrl = `${githubUsername}/${(/[a-z0-9-]+$/i).exec(seedRepository)}-`;
    let projectMetadata = null;

    if (studentType === 'team') {
        // Get Slack Team Id for the course
        let slackTeamId = null;
        let getTeamInfo = 'https://slack.com/api/team.info';

        return requestPromise({
            json: true,
            method: 'POST',
            uri: `${getTeamInfo}?token=${slackToken}`
        })
        .then((data) => {
            // Store Slack Team Id for the course
            slackTeamId = data.team.domain;

            return Promise
                .all([
                    Team
                        .find({_id: {$in: students}})
                        .populate('members')
                        .exec(),
                    Course
                        .findOne({_id: courseId})
                        .populate('instructors')
                        .select('name instructors')
                        .exec()
                ])
                .then(([teams, course]) => {
                    // Collect promises for all Projects
                    const promises = [];

                    // For each team
                    for (const team of teams) {
                        const githubIndividualUrl = githubUrl + team
                            .name
                            .replace(/[!@#$%^&*? ]+/g, '-');
                        const taigaSlug = githubIndividualUrl
                            .replace(/\//, '-')
                            .toLowerCase();

                        // Get list of the IDs of the team's Slack channels
                        const slackGroups = [];

                        for (const channelName in slackChannels) {
                            if (channelName.startsWith(`${team.name.toLowerCase()}-`)) {
                                slackGroups.push(slackChannels[channelName]);
                            }
                        }

                        // Construct object to store metadata
                        projectMetadata = {
                            course: course._id,
                            'github-token': githubToken,
                            'github-url': githubIndividualUrl,
                            instructors: [],
                            members: [],
                            name: team.name,
                            'slack-team-id': slackTeamId,
                            'slack-groups': slackGroups,
                            'slack-token': slackToken,
                            'taiga-slug': taigaSlug,
                            'taiga-token': taigaToken,
                            team: team._id
                        };

                        // For each team member
                        for (const member of team.members) {
                            projectMetadata
                                .members
                                .push(member._id);
                        }

                        // For each instructor
                        for (const instructor of course.instructors) {
                            projectMetadata
                                .instructors
                                .push(instructor._id);
                        }

                        // Store the Project metadata in the database
                        promises.push(
                            Project.create(projectMetadata)
                        );
                    }

                    return Promise.all(promises);
                });
        });
    }

    return Promise
        .all([
            User
                .find({_id: {$in: students}})
                .exec(),
            Course
                .findOne({_id: courseId})
                .populate('instructors')
                .select('name instructors')
                .exec()
        ])
        .then(([users, course]) => {
            // Collect promises for all Projects
            const promises = [];

            // For each student
            for (const user of users) {
                const githubIndividualUrl = githubUrl + user.modules.github.username;
                const taigaSlug = githubIndividualUrl
                    .replace(/\//, '-')
                    .toLowerCase();

                projectMetadata = {
                    course: course._id,
                    'github-token': githubToken,
                    'github-url': githubIndividualUrl,
                    instructors: [],
                    members: user._id,
                    name: user.name,
                    'slack-team-id': null,
                    'slack-groups': null,
                    'slack-token': null,
                    'taiga-slug': taigaSlug,
                    'taiga-token': taigaToken,
                    team: null
                };

                // For each instructor
                for (const instructor of course.instructors) {
                    projectMetadata
                        .instructors
                        .push(instructor._id);
                }

                // Store the Project metadata in the database
                promises.push(
                    Project.create(projectMetadata)
                );
            }

            return Promise.all(promises)
                .then(() => projectMetadata);
        });
}

module.exports = gatherProjectMetadata;
