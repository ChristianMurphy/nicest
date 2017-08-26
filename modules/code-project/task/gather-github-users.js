/**
 * @module code-project/task/gather-github-users
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
  * @param {Array<ObjectId>} students - an {Array} of {ObjectId} with names, either usernames or team names
  * @returns {Promise.<Array>} resolves to {Array} of {GithubRepository}
  */
function gatherGithubUsers(seedRepository, githubUsername, studentType, students) {
    // Create empty repos for each student on github
    const githubRepositories = [];
    const githubName = `${(/[a-z0-9-]+$/i).exec(seedRepository)}-`;
    const githubUrl = `https://github.com/${githubUsername}/${(/[a-z0-9-]+$/i).exec(seedRepository)}-`;

    if (studentType === 'team') {
        return Team
            .find({ _id: { $in: students } })
            .populate('members')
            .exec()
            .then((teams) => {
                // For each team
                for (const team of teams) {
                    // Add team information to Github meta data
                    const githubInformation = {
                        collaborators: [],
                        emails: [],
                        name: githubName + team
                            .name
                            .replace(/[!@#$%^&*? ]+/g, '-'),
                        url: githubUrl + team
                            .name
                            .replace(/[!@#$%^&*? ]+/g, '-'),
                    };

                    // For each team member
                    for (const member of team.members) {
                        githubInformation
                            .collaborators
                            .push(
                                member.modules.github.username,
                            );
                        githubInformation
                            .emails
                            .push(
                                member.modules.taiga.email,
                            );
                    }

                    githubRepositories.push(githubInformation);
                }

                return githubRepositories;
            });
    }

    return User
        .find({ _id: { $in: students } })
        .exec()
        .then((users) => {
            // For each student
            for (const user of users) {
                const currentGithubUsername = user.modules.github.username;

                // Create the Repository meta data
                githubRepositories.push({
                    collaborators: [currentGithubUsername],
                    emails: [user.modules.taiga.email],
                    name: githubName + currentGithubUsername,
                    url: githubUrl + currentGithubUsername,
                });
            }

            return githubRepositories;
        });
}

module.exports = gatherGithubUsers;
