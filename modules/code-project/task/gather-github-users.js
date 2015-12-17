'use strict';

/**
 * @module GatherGithubUsers
 */

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
        return Team
            .find({
                _id: {
                    $in: students
                }
            })
            .populate('members')
            .exec()
            .then((teams) => {
                // for each team
                for (const team of teams) {
                    // add team information to Github meta data
                    const githubInformation = {
                        name: githubName + team.name.replace(/[!@#$%^&*? ]+/g, '-'),
                        url: githubUrl + team.name.replace(/[!@#$%^&*? ]+/g, '-'),
                        collaborators: [],
                        emails: []
                    };

                    // for each team member
                    for (const member of team.members) {
                        githubInformation.collaborators.push(
                            member.modules.github.username
                        );
                        githubInformation.emails.push(
                            member.modules.taiga.email
                        );
                    }

                    githubRepositories.push(githubInformation);
                }

                return githubRepositories;
            });
    }
    return User
        .find({
            _id: {
                $in: students
            }
        })
        .exec()
        .then((users) => {
            // for each student
            for (const user of users) {
                const currentGithubUsername = user.modules.github.username;

                // create the Repository meta data
                githubRepositories.push({
                    name: githubName + currentGithubUsername,
                    url: githubUrl + currentGithubUsername,
                    collaborators: [currentGithubUsername],
                    emails: [user.modules.taiga.email]
                });
            }

            return githubRepositories;
        });
}

module.exports = gatherGithubUsers;
