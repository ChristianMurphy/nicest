'use strict';

const _ = require('lodash');

const Octokat = require('octokat');
const User = require('../../../lib/server').server.plugins.user;
const Team = require('../../../lib/server').server.plugins.team;
const gatherGithubUsers = require('../task/gather-github-users');
const createGithubRepositories = require('../task/create-github-repositories');
const createTaigaBoards = require('../task/create-taiga-boards');
const seedGitRepositories = require('../task/seed-git-repositories');

module.exports = {
    redirect: function (request, reply) {
        if (typeof request.session.get('github-username') === 'string' && typeof request.session.get('github-password') === 'string') {
            reply().redirect('/recipe/code-project/choose-students');
        } else {
            reply().redirect('/recipe/github/login?next=/recipe/code-project/choose-students');
        }
    },
    chooseStudents: function (request, reply) {
        if (request.query.type === 'team') {
            request.session.set({
                'code-project-student-type': 'team'
            });
            Team
                .list('_id name')
                .then(function (teams) {
                    reply.view('modules/code-project/view/choose-students', {
                        students: teams,
                        studentType: 'team'
                    });
                });
        } else {
            request.session.set({
                'code-project-student-type': 'indvidual'
            });
            User
                .list('_id name')
                .then(function (users) {
                    reply.view('modules/code-project/view/choose-students', {
                        students: users,
                        studentType: 'individual'
                    });
                });
        }
    },
    selectStudents: function (request, reply) {
        request.session.set({
            'code-project-students': request.payload.students
        });

        reply().redirect('/recipe/code-project/choose-repository');
    },
    chooseRepository: function (request, reply) {
        const Github = new Octokat({
            username: request.session.get('github-username'),
            password: request.session.get('github-password')
        });

        Github.me.repos.fetch().then(function (repos) {
            reply.view('modules/code-project/view/choose-repository', {repos: repos});
        });
    },
    selectRepository: function (request, reply) {
        request.session.set({
            'github-project-repo': request.payload.repo,
            'github-project-is-private': request.payload.isPrivate || false,
            'github-project-has-wiki': request.payload.hasWiki || false,
            'github-project-has-issue-tracker': request.payload.hasIssueTracker || false
        });

        reply().redirect('/recipe/code-project/choose-issue-tracker');
    },
    chooseIssueTracker: function (request, reply) {
        reply.view('modules/code-project/view/choose-issue-tracker');
    },
    selectIssueTracker: function (request, reply) {
        request.session.set({
            'taiga-project-use-taiga': request.payload.useTaiga || false,
            'taiga-project-description': request.payload.description,
            'taiga-project-is-private': request.payload.isPrivate || false,
            'taiga-project-has-issues': request.payload.hasIssues || false,
            'taiga-project-has-backlog': request.payload.hasBacklog || false,
            'taiga-project-has-kanban': request.payload.hasKanban || false,
            'taiga-project-has-wiki': request.payload.hasWiki || false
        });

        if (request.payload.useTaiga) {
            reply().redirect('/recipe/code-project/taiga-login');
        } else {
            reply().redirect('/recipe/code-project/confirm');
        }
    },
    loginView: function (request, reply) {
        reply.view('modules/code-project/view/taiga-login');
    },
    loginAction: function (request, reply) {
        request.session.set({
            'taiga-username': request.payload.username,
            'taiga-password': request.payload.password
        });

        reply().redirect('/recipe/code-project/confirm');
    },
    confirmView: function (request, reply) {
        const studentType = request.session.get('code-project-student-type');
        const repo = request.session.get('github-project-repo');
        const studentIds = request.session.get('code-project-students');

        if (studentType === 'team') {
            Promise.all([
                Team.list('_id name members'),
                User.list('_id name modules')
            ])
                .then(function (data) {
                    const teams = data[0];
                    const users = data[1];
                    const selectedTeams = selectedObjects(teams, studentIds);

                    for (let teamIndex = 0; teamIndex < selectedTeams.length; teamIndex++) {
                        // for the members of each team, replace the user id with the user data
                        selectedTeams[teamIndex].memberObjects = selectedObjects(users, selectedTeams[teamIndex].members);

                        // find any invalid users
                        for (let userIndex = 0; userIndex < selectedTeams[teamIndex].memberObjects.length; userIndex++) {
                            const currentUser = selectedTeams[teamIndex].memberObjects[userIndex];

                            if (!currentUser.modules.github || !currentUser.modules.github.username || !currentUser.modules.taiga || !currentUser.modules.taiga.email) {
                                selectedTeams[teamIndex].hasInvalidMember = true;
                            }
                        }
                    }

                    reply.view('modules/code-project/view/confirm', {
                        repoUrl: 'https://github.com/' + repo,
                        repoName: /[A-Za-z0-9\-]+$/.exec(repo),
                        studentType: 'team',
                        students: selectedTeams
                    });
                });
        } else {
            User
                .list('_id name modules')
                .then(function (users) {
                    const students = selectedObjects(users, studentIds);

                    reply.view('modules/code-project/view/confirm', {
                        repoUrl: 'https://github.com/' + repo,
                        repoName: /[A-Za-z0-9\-]+$/.exec(repo),
                        studentType: 'user',
                        students: students
                    });
                });
        }
    },
    confirm: function (request, reply) {
        const githubUsername = request.session.get('github-username');
        const githubPassword = request.session.get('github-password');
        const seedRepository = request.session.get('github-project-repo');
        const students = request.session.get('code-project-students');
        const isPrivate = request.session.get('github-project-is-private');
        const hasWiki = request.session.get('github-project-has-wiki');
        const hasIssueTracker = request.session.get('github-project-has-issue-tracker');
        const studentType = request.session.get('code-project-student-type');
        const useTaiga = request.session.get('taiga-project-use-taiga');
        let githubRepositories;

        // Gather Github user information from Users/Teams
        gatherGithubUsers(seedRepository, githubUsername, studentType, students)

            // create repostories
            .then(function (temporaryGithubRepositories) {
                githubRepositories = temporaryGithubRepositories;

                return createGithubRepositories(githubUsername, githubPassword, githubRepositories, {
                    private: isPrivate,
                    has_wiki: hasWiki,
                    has_issues: hasIssueTracker
                });
            })

            // add seed code to repositories
            .then(function () {
                const seedRepositoryURL = 'https://github.com/' + githubUsername + '/' + /[A-Za-z0-9\-]+$/.exec(seedRepository);
                const githubUrls = _.pluck(githubRepositories, 'url');

                return seedGitRepositories(githubUsername, githubPassword, seedRepositoryURL, githubUrls);
            })

            // create Taiga boards
            .then(function () {
                if (useTaiga) {
                    const taigaUsername = request.session.get('taiga-username');
                    const taigaPassword = request.session.get('taiga-password');
                    const taigaOptions = {
                        description: request.session.get('taiga-project-description'),
                        isPrivate: request.session.get('taiga-project-is-private'),
                        isBacklogActived: request.session.get('taiga-project-has-backlog'),
                        isIssuesActived: request.session.get('taiga-project-has-issues'),
                        isKanbanActivated: request.session.get('taiga-project-has-kanban'),
                        isWikiActivated: request.session.get('taiga-project-has-wiki')
                    };

                    createTaigaBoards(taigaUsername, taigaPassword, githubRepositories, taigaOptions);
                }
            })

            // redirect
            .then(
                function () {
                    reply().redirect('/recipes');
                },
                function (err) {
                    console.log(err);
                    reply().redirect('/recipes');
                }
            );
    }
};

/**
 * Finds complete database information from UUID
 * @private
 * @param {Array} databaseObjects - an {Array} of {Object}
 * @param {Array} UUIDs - an {Array} of {String} with UUIDs
 * @returns {Array} of {Object} that are selected
 */
function selectedObjects (databaseObjects, UUIDs) {
    return _.filter(databaseObjects, function (databaseObject) {
        return _.indexOf(UUIDs, databaseObject._id.toString()) > -1;
    });
}
