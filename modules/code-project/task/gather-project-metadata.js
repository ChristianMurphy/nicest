'use strict';

/**
 * @module code-project/task/gather-project-metadata
 */

const User = require('../../user/model/user');
const Team = require('../../team/model/team');
const Course = require('../../course/model/course');

/**
 * CodeProjectMeta is meta data for a code project.
 * @typedef {Object} CodeProjectMeta
 * @property {String} name - team's name.
 * @property {String} github-url - Short hand link to the GitHub repos
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
 * @param {String} studentType - Either 'individual' or 'team', defaults to 'individual'
 * @param {Array<ObjectId>} students - either user ids or team ids
 * @param {String} courseId - Course that project is being generated for
 * @param {String} slackToken - Slack API access token
 * @param {Object} slackChannels - String:String mapping of channel names to ids
 * @returns {Promise.<Array>} resolves to {Array} of {CodeProjectMeta}
 */
function gatherProjectMetadata (seedRepository, githubUsername, studentType, students,
        courseId, slackToken, slackChannels) {
    const caDashboardProjects = [];
    const githubUrl = `${githubUsername}/${(/[a-z0-9-]+$/i).exec(seedRepository)}-`;

    if (studentType === 'team') {
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
                    const caInformation = {
                        course: course._id,
                        'github-url': githubIndividualUrl,
                        instructors: [],
                        members: [],
                        name: team.name,
                        'slack-groups': slackGroups,
                        'slack-token': slackToken,
                        'taiga-slug': taigaSlug,
                        team: team._id
                    };

                    // For each team member
                    for (const member of team.members) {
                        caInformation
                            .members
                            .push(member._id);
                    }

                    // For each instructor
                    for (const instructor of course.instructors) {
                        caInformation
                            .instructors
                            .push(instructor._id);
                    }

                    caDashboardProjects.push(caInformation);
                }

                return caDashboardProjects;
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
            // For each student
            for (const user of users) {
                const githubIndividualUrl = githubUrl + user.modules.github.username;
                const taigaSlug = githubIndividualUrl
                    .replace(/\//, '-')
                    .toLowerCase();

                const caInformation = {
                    course: course._id,
                    'github-url': githubIndividualUrl,
                    instructors: [],
                    members: user._id,
                    name: user.name,
                    'taiga-slug': taigaSlug
                };

                // For each instructor
                for (const instructor of course.instructors) {
                    caInformation
                        .instructors
                        .push(instructor._id);
                }

                caDashboardProjects.push(caInformation);
            }

            return caDashboardProjects;
        });
}

module.exports = gatherProjectMetadata;
