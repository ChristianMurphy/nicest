/* eslint no-loop-func: 0, max-nested-callbacks: [2, 2], no-else-return: 0 */
/**
 * @module GatherCaUsers
 */
'use strict';

const _ = require('lodash');
const User = require('../../user/model/user');
const Team = require('../../team/model/team');

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
  * @function GatherCaUsers
  * @param {String} seedRepository - name of seed repository
  * @param {String} githubUsername - username of logged in and hosting user
  * @param {String} studentType - Either 'individual' or 'team', defaults to 'individual'
  * @param {Array} students - an {Array} of {String} with names, either usernames or team names
  * @returns {Promise} resolves to {Array} of {CaMeta}
  */
module.exports = function (seedRepository, githubUsername, studentType, students) {
    // create empty repos for each student on github
    const caDashboardProjects = [];
    const githubUrl = `${githubUsername}/${/[A-Za-z0-9\-]+$/.exec(seedRepository)}-`;

    if (studentType === 'team') {
        // lookup stored users and teams
        return Promise.all([
            Team.list('name members'),
            User.list('_id name modules')
        ])
        .then((data) => {
            const teams = data[0];
            const users = data[1];

            // for each team
            for (let teamIndex = 0; teamIndex < students.length; teamIndex++) {
                // find the current team
                const currentTeam = _.find(teams, (team) => {
                    return team._id.toString() === students[teamIndex];
                });

                // add team information to Github meta data
                const caInformation = {
                    name: currentTeam.name,
                    'github-url': githubUrl + currentTeam.name.replace(/[!@#$%^&*? ]+/g, '-'),
                    'taiga-slug': `${currentTeam.name.replace(/[!@#$%^&*? ]+/g, '-')}-${/[A-Za-z0-9\-]+$/.exec(seedRepository)}`,
                    members: []
                };

                // for each team member
                for (let userIndex = 0; userIndex < currentTeam.members.length; userIndex++) {
                    // find this team member
                    const currentUser = _.find(users, (user) => {
                        // mongoose id needs to be cased to string
                        return user._id.toString() === currentTeam.members[userIndex];
                    });

                    caInformation.members.push({
                        name: currentUser.name,
                        'github-username': currentUser.modules.github.username,
                        email: currentUser.modules.taiga.email
                    });
                }

                caDashboardProjects.push(caInformation);
            }

            return caDashboardProjects;
        });
    } else {
        return User
            .list('_id name modules')
            .then((users) => {
                // for each student
                for (let index = 0; index < students.length; index++) {
                    // find the current user
                    const currentUser = _.find(users, (user) => {
                        return user._id.toString() === students[index];
                    });

                    // create the Repository meta data
                    caDashboardProjects.push({
                        name: currentUser.name,
                        'github-url': githubUrl + currentUser.modules.github.username,
                        'tiaga-slug': (githubUrl + currentUser.modules.github.username).replace(/\//, '-').toLowerCase(),
                        members: [{
                            name: currentUser.name,
                            'github-username': currentUser.modules.github.username,
                            email: currentUser.modules.taiga.email
                        }]
                    });
                }

                return caDashboardProjects;
            });
    }
};
