/**
 * @module code-project/handler/confirm-view
 */

const User = require('../../user/model/user');
const Team = require('../../team/model/team');

function isUserValid({ modules }) {
    return modules.github && modules.github.username && modules.taiga && modules.taiga.email;
}

/**
 * View configuration before generating the project
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function confirmView(request, reply) {
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
            .find({ _id: { $in: objectIds } })
            .populate('members')
            .exec()
            .then((teams) => {
                for (const team of teams) {
                    for (const user of team.members) {
                        if (!isUserValid(user)) {
                            team.hasInvalidMember = true;
                        }
                    }
                }

                reply.view('modules/code-project/view/confirm', {
                    repoName: (/[a-z0-9-]+$/i).exec(repo),
                    repoUrl: `https://github.com/${repo}`,
                    studentType: 'team',
                    students: teams,
                });
            });
    } else {
        User
            .find({ _id: { $in: objectIds } })
            .select('_id name modules')
            .exec()
            .then((students) => {
                reply.view('modules/code-project/view/confirm', {
                    repoName: (/[a-z0-9-]+$/i).exec(repo),
                    repoUrl: `https://github.com/${repo}`,
                    studentType: 'user',
                    students,
                });
            });
    }
}

module.exports = confirmView;
