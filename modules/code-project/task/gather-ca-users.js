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
  * @param {Array} students - an {Array} of {String} with names, either usernames or team names
  * @param {String} courseId - Course that project is being generated for
  * @returns {Promise.<Array>} resolves to {Array} of {CaMeta}
  */
function gatherCaUsers (seedRepository, githubUsername, studentType, students, courseId) {
    // create empty repos for each student on github
    const caDashboardProjects = [];
    const githubUrl = `${githubUsername}/${(/[A-Za-z0-9\-]+$/).exec(seedRepository)}-`;

    if (studentType === 'team') {
        return Promise.all([
            Team
                .find({
                    _id: {
                        $in: students
                    }
                })
                .populate('members')
                .exec(),
            Course
                .findOne({
                    _id: courseId
                })
                .select('name')
                .exec()
        ])
            .then((data) => {
                const teams = data[0];
                const course = data[1];

                // for each team
                for (const team of teams) {
                    const githubIndividualUrl = githubUrl + team.name.replace(/[!@#$%^&*? ]+/g, '-');
                    const taigaSlug = githubIndividualUrl.replace(/\//, '-').toLowerCase();

                    // add team information to Github meta data
                    const caInformation = {
                        name: team.name,
                        course: course.name,
                        'github-url': githubIndividualUrl,
                        'taiga-slug': taigaSlug,
                        members: []
                    };

                    // for each team member
                    for (const member of team.members) {
                        caInformation.members.push({
                            name: member.name,
                            'github-username': member.modules.github.username,
                            email: member.modules.taiga.email
                        });
                    }

                    caDashboardProjects.push(caInformation);
                }

                return caDashboardProjects;
            });
    }

    return Promise.all([
        User
            .find({
                _id: {
                    $in: students
                }
            })
            .exec(),
        Course
            .findOne({
                _id: courseId
            })
            .select('name')
            .exec()
    ])
        .then((data) => {
            const users = data[0];
            const course = data[1];

            // for each student
            for (const user of users) {
                const githubIndividualUrl = githubUrl + user.modules.github.username;
                const taigaSlug = githubIndividualUrl.replace(/\//, '-').toLowerCase();

                // create the Repository meta data
                caDashboardProjects.push({
                    name: user.name,
                    course: course.name,
                    'github-url': githubIndividualUrl,
                    'tiaga-slug': taigaSlug,
                    members: [{
                        name: user.name,
                        'github-username': user.modules.github.username,
                        email: user.modules.taiga.email
                    }]
                });
            }

            return caDashboardProjects;
        });
}

module.exports = gatherCaUsers;
