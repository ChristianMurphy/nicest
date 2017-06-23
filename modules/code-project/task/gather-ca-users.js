'use strict';

/**
 * @module code-project/task/gather-ca-users
 */

const User = require('../../user/model/user');
const Team = require('../../team/model/team');
const Course = require('../../course/model/course');

/**
 * CaMeta is meta data and collaborator information for a project.
 * @typedef {Object} CaMeta
 * @property {String} name - name of the team
 * @property {String} github-url - Short hand link to the Github repos
 * @property {String} taiga-slug - Shorthand link to Taiga board
 * @property {Array} members - {Array} of {CaUser} with user meta data
 */

/**
 * CaUser is metadata for a single user
 * @typedef {Object} CaUser
 * @property {String} name - name of the user
 * @property {String} github-username - User's Github Username
 * @property {String} email - Email that Taiga invite will be sent to
 */

/**
  * Takes in basic information and generates Github metadata
  * @param {String} seedRepository - name of seed repository
  * @param {String} githubUsername - username of logged in and hosting user
  * @param {String} studentType - Either 'individual' or 'team', defaults to 'individual'
  * @param {Array<ObjectId>} students - either user ids or team ids
  * @param {String} courseId - Course that project is being generated for
  * @returns {Promise.<Array>} resolves to {Array} of {CaMeta}
  */
function gatherCaUsers (seedRepository, githubUsername, studentType, students, courseId) {
    // Create empty repos for each student on github
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
            .then(([
                teams,
                course
            ]) => {
                // For each team
                for (const team of teams) {
                    const githubIndividualUrl = githubUrl + team
                        .name
                        .replace(/[!@#$%^&*? ]+/g, '-');
                    const taigaSlug = githubIndividualUrl
                        .replace(/\//, '-')
                        .toLowerCase();

                    // Add team information to Github meta data
                    const caInformation = {
                        course: course.name,
                        'github-url': githubIndividualUrl,
                        instructors: [],
                        members: [],
                        name: team.name,
                        'taiga-slug': taigaSlug
                    };

                    // For each team member
                    for (const member of team.members) {
                        caInformation
                            .members
                            .push({
                                email: member.modules.taiga.email,
                                'github-username': member.modules.github.username,
                                name: member.name
                            });
                    }

                    for (const instructor of course.instructors) {
                        caInformation
                            .instructors
                            .push({
                                email: instructor.modules.taiga.email,
                                name: instructor.name
                            });
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
        .then(([
            users,
            course
        ]) => {
            // For each student
            for (const user of users) {
                const githubIndividualUrl = githubUrl + user.modules.github.username;
                const taigaSlug = githubIndividualUrl
                    .replace(/\//, '-')
                    .toLowerCase();

                const caInformation = {
                    course: course.name,
                    'github-url': githubIndividualUrl,
                    instructors: [],
                    members: [
                        {
                            email: user.modules.taiga.email,
                            'github-username': user.modules.github.username,
                            name: user.name
                        }
                    ],
                    name: user.name,
                    'tiaga-slug': taigaSlug
                };

                for (const instructor of course.instructors) {
                    caInformation
                        .instructors
                        .push({
                            email: instructor.modules.taiga.email,
                            name: instructor.name
                        });
                }

                // Create the Repository meta data
                caDashboardProjects.push(caInformation);
            }

            return caDashboardProjects;
        });
}

module.exports = gatherCaUsers;
