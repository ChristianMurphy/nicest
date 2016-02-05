'use strict';

/**
 * @module code-project/handler/confirm-view
 */

const User = require('../../user/model/user');
const Team = require('../../team/model/team');

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

    if (studentType === 'team') {
        Team
            .find({
                _id: {
                    $in: objectIds
                }
            })
            .populate('members')
            .exec()
            .then((teams) => {
                for (let teamIndex = 0; teamIndex < teams.length; teamIndex += 1) {
                    // find any invalid users
                    for (let userIndex = 0; userIndex < teams[teamIndex].members.length; userIndex += 1) {
                        const currentUser = teams[teamIndex].members[userIndex];

                        if (!currentUser.modules.github || !currentUser.modules.github.username || !currentUser.modules.taiga || !currentUser.modules.taiga.email) {
                            teams[teamIndex].hasInvalidMember = true;
                        }
                    }
                }

                reply.view('modules/code-project/view/confirm', {
                    repoUrl: `https://github.com/${repo}`,
                    repoName: (/[a-z0-9\-]+$/i).exec(repo),
                    studentType: 'team',
                    students: teams
                });
            });
    } else {
        User
            .find({
                _id: {
                    $in: objectIds
                }
            })
            .select('_id name modules')
            .exec()
            .then((students) => {
                reply.view('modules/code-project/view/confirm', {
                    repoUrl: `https://github.com/${repo}`,
                    repoName: (/[a-z0-9\-]+$/i).exec(repo),
                    studentType: 'user',
                    students
                });
            });
    }
}

module.exports = confirmView;
