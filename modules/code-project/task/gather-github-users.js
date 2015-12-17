'use strict';

/**
 * @module GatherGithubUsers
 */

const _ = require('lodash');
const User = require('../../user/model/user');
const Team = require('../../team/model/team');

/**
 * GithubRepository is meta data and collaborator information.
 * @typedef {Object} GithubRepository
 * @property {String} url - url of the repository
 * @property {String} name - name of the repository
 * @property {Array} collaborators - {Array} of {String} with Github usernames
 */

 /**
  * Takes in basic information and generates Github metadata
  * @param {String} seedRepository - name of seed repository
  * @param {String} githubUsername - username of logged in and hosting user
  * @param {String} studentType - Either 'individual' or 'team', defaults to 'individual'
  * @param {Array} students - an {Array} of {String} with names, either usernames or team names
  * @returns {Promise.<Array>} resolves to {Array} of {GithubRepository}
  */
function gatherGithubUsers (seedRepository, githubUsername, studentType, students) {
    // create empty repos for each student on github
    const githubRepositories = [];
    const githubName = `${(/[A-Za-z0-9\-]+$/).exec(seedRepository)}-`;
    const githubUrl = `https://github.com/${githubUsername}/${(/[A-Za-z0-9\-]+$/).exec(seedRepository)}-`;

    if (studentType === 'team') {
        // lookup stored users and teams
        return Promise.all([
            Team.find({}).select('name members').exec(),
            User.find({}).select('_id modules').exec()
        ])
        .then((data) => {
            const teamDeconstructor = 0;
            const userDeconstructor = 1;
            const teams = data[teamDeconstructor];
            const users = data[userDeconstructor];

            // for each team
            for (let teamIndex = 0; teamIndex < students.length; teamIndex += 1) {
                // find the current team
                const currentTeam = _.find(teams, (team) => {
                    return team._id.toString() === students[teamIndex];
                });

                // add team information to Github meta data
                const githubInformation = {
                    name: githubName + currentTeam.name.replace(/[!@#$%^&*? ]+/g, '-'),
                    url: githubUrl + currentTeam.name.replace(/[!@#$%^&*? ]+/g, '-'),
                    collaborators: [],
                    emails: []
                };

                // for each team member
                for (let userIndex = 0; userIndex < currentTeam.members.length; userIndex += 1) {
                    // find this team member
                    const currentUser = _.find(users, (user) => {
                        // mongoose id needs to be cased to string
                        return user._id.toString() === currentTeam.members[userIndex];
                    });

                    githubInformation.collaborators.push(
                        currentUser.modules.github.username
                    );
                    githubInformation.emails.push(
                        currentUser.modules.taiga.email
                    );
                }

                githubRepositories.push(githubInformation);
            }

            return githubRepositories;
        });
    }
    return User
        .find({})
        .select('_id modules')
        .exec()
        .then((users) => {
            // for each student
            for (let index = 0; index < students.length; index += 1) {
                // find the current user
                const currentUser = _.find(users, (user) => {
                    return user._id.toString() === students[index];
                });

                const currentGithubUsername = currentUser.modules.github.username;

                // create the Repository meta data
                githubRepositories.push({
                    name: githubName + currentGithubUsername,
                    url: githubUrl + currentGithubUsername,
                    collaborators: [currentGithubUsername],
                    emails: [currentUser.modules.taiga.email]
                });
            }

            return githubRepositories;
        });
}

module.exports = gatherGithubUsers;
