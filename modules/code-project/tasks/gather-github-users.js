/* eslint no-loop-func: 0, max-nested-callbacks: [2, 2], no-else-return: 0 */
/**
 * @module GatherGithubUsers
 */
'use strict';

const _ = require('lodash');
const User = require('../../../lib/server').server.plugins.user;
const Team = require('../../../lib/server').server.plugins.team;

/**
 * GithubRepository is meta data and collaborator information.
 * @typedef {Object} GithubRepository
 * @property {String} url - url of the repository
 * @property {String} name - name of the repository
 * @property {Array} collaborators - {Array} of {String} with Github usernames
 */

 /**
  * Takes in basic information and generates Github metadata
  * @function GatherGithubUsers
  * @param {String} seedRepository - name of seed repository
  * @param {String} githubUsername - username of logged in and hosting user
  * @param {String} studentType - Either 'individual' or 'team', defaults to 'individual'
  * @param {Array} students - an {Array} of {String} with names, either usernames or team names
  * @returns {Promise} resolves to {Array} of {GithubRepository}
  */
module.exports = function (seedRepository, githubUsername, studentType, students) {
    // create empty repos for each student on github
    const githubRepositories = [];
    const githubName = /[A-Za-z0-9\-]+$/.exec(seedRepository) + '-';
    const githubUrl = 'https://github.com/' + githubUsername + '/' + /[A-Za-z0-9\-]+$/.exec(seedRepository) + '-';

    if (studentType === 'team') {
        // lookup stored users and teams
        return Promise.all([
            Team.list('name members'),
            User.list('_id modules')
        ])
        .then(function (data) {
            const teams = data[0];
            const users = data[1];

            // for each team
            for (let teamIndex = 0; teamIndex < students.length; teamIndex++) {
                // find the current team
                const currentTeam = _.find(teams, function (team) {
                    return team._id.toString() === students[teamIndex];
                });

                // add team information to Github meta data
                const githubInformation = {
                    name: githubName + currentTeam.name.replace(' ', '-'),
                    url: githubUrl + currentTeam.name.replace(' ', '-'),
                    collaborators: []
                };

                // for each team member
                for (let userIndex = 0; userIndex < currentTeam.members.length; userIndex++) {
                    // find this team member
                    const currentUser = _.find(users, function (user) {
                        // mongoose id needs to be cased to string
                        return user._id.toString() === currentTeam.members[userIndex];
                    });

                    githubInformation.collaborators.push(
                        currentUser.modules.github.username
                    );
                }

                githubRepositories.push(githubInformation);
            }

            return githubRepositories;
        });
    } else {
        return User
            .list('_id modules')
            .then(function (users) {
                // for each student
                for (let index = 0; index < students.length; index++) {
                    // find the current user
                    const currentUser = _.find(users, function (user) {
                        return user._id.toString() === students[index];
                    });

                    const githubUsername = currentUser.modules.github.username;

                    // create the Respository meta data
                    githubRepositories.push({
                        name: githubName + githubUsername,
                        url: githubUrl + githubUsername,
                        collaborators: [githubUsername]
                    });
                }

                return githubRepositories;
            });
    }
};
