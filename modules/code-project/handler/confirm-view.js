'use strict';

/**
 * @module code-project/handler/confirm-view
 */

const User = require('../../user/model/user');
const Team = require('../../team/model/team');

/**
 * Checks if a user has all needed attributes
 * @param {Object} user - User object to check
 * @returns {boolean} is valid
 */
function isValidStudent (user) {
    return user.modules.github && user.modules.github.username && user.modules.taiga && user.modules.taiga.email;
}

/**
 * View configuration before generating the project
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function confirmView (request, reply) {
    const studentType = request
        .yar
        .get('code-project-student-type');
    const repo = request
        .yar
        .get('github-project-repo');
    const objectIds = request
        .yar
        .get('code-project-students');
    let chain = null;

    if (studentType === 'team') {
        chain = Team
            .find({
                _id: {
                    $in: objectIds
                }
            })
            .populate('members')
            .exec()
            .then((teams) => {
                for (let teamIndex = 0; teamIndex < teams.length; teamIndex += 1) {
                    for (let userIndex = 0; userIndex < teams.members.length; userIndex += 1) {
                        const isValid = isValidStudent(teams[teamIndex].members[userIndex]);

                        teams[teamIndex].members[userIndex].isValid = isValid;
                        if (!isValid) {
                            teams[teamIndex].hasInvalidMember = true;
                        }
                    }
                }

                return teams;
            });
    } else {
        chain = User
            .find({
                _id: {
                    $in: objectIds
                }
            })
            .select('_id name modules')
            .exec()
            .then((students) => {
                for (let index = 0; index < students.length; index += 1) {
                    students[index].isValid = isValidStudent(students[index]);
                }

                return students;
            });
    }

    chain.then((students) => {
        return reply.view('modules/code-project/view/confirm', {
            repoUrl: `https://github.com/${repo}`,
            repoName: (/[a-z0-9\-]+$/i).exec(repo),
            studentType,
            students
        });
    });
}

module.exports = confirmView;
