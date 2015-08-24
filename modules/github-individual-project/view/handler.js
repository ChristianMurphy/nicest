/* eslint new-cap: 0, max-nested-callbacks: [2, 2], no-loop-func: 0 */
'use strict';

const _ = require('lodash');
const NodeGit = require('nodegit');
const rimraf = require('rimraf');
const path = require('path');

const Octokat = require('../../../lib/server').server.plugins.github.Octokat;
const User = require('../../../lib/server').server.plugins.user;
const tempFolder = path.join(__dirname, 'temp');

module.exports = {
    redirect: function (request, reply) {
        if (typeof request.session.get('github-username') === 'string' && typeof request.session.get('github-password') === 'string') {
            reply().redirect('/recipe/github-individual-project/choose-repository');
        } else {
            reply().redirect('/recipe/github/login?next=/recipe/github-individual-project/choose-repository');
        }
    },
    chooseRepository: function (request, reply) {
        const Github = new Octokat({
            username: request.session.get('github-username'),
            password: request.session.get('github-password')
        });

        Github.me.repos.fetch().then(function (repos) {
            reply.view('modules/github-individual-project/view/choose-repository', {repos: repos});
        });
    },
    selectRepository: function (request, reply) {
        request.session.set({
            'github-individual-project-repo': request.payload.repo
        });
        request.session.set({
            'github-individual-project-is-private': request.payload.isPrivate || false
        });
        request.session.set({
            'github-individual-project-has-wiki': request.payload.hasWiki || false
        });
        request.session.set({
            'github-individual-project-has-issue-tracker': request.payload.hasIssueTracker || false
        });

        reply().redirect('/recipe/github-individual-project/choose-students');
    },
    chooseStudents: function (request, reply) {
        User
            .list('name modules')
            .then(function (users) {
                reply.view('modules/github-individual-project/view/choose-students', {
                    students: filterGithubUsers(users)
                });
            });
    },
    selectStudents: function (request, reply) {
        request.session.set({
            'github-individual-project-students': request.payload.students
        });

        reply().redirect('/recipe/github-individual-project/confirm');
    },
    confirmView: function (request, reply) {
        User
            .list('name modules')
            .then(function (users) {
                let students = filterGithubUsers(users);
                const studentFilter = request.session.get('github-individual-project-students').sort();
                const repo = request.session.get('github-individual-project-repo');

                students = selectedStudents(students, studentFilter);
                reply.view('modules/github-individual-project/view/confirm', {
                    repoUrl: 'https://github.com/' + repo,
                    repoName: /[A-Za-z0-9\-]+$/.exec(repo),
                    students: students
                });
            });
    },
    confirm: function (request, reply) {
        const githubUsername = request.session.get('github-username');
        const githubPassword = request.session.get('github-password');
        const Github = new Octokat({
            username: githubUsername,
            password: githubPassword
        });
        const repo = request.session.get('github-individual-project-repo');
        const students = request.session.get('github-individual-project-students');
        const isPrivate = request.session.get('github-individual-project-is-private');
        const hasWiki = request.session.get('github-individual-project-has-wiki');
        const hasIssueTracker = request.session.get('github-individual-project-has-issue-tracker');

        // clear current temp folder
        rmrf(tempFolder)
            // clone repo to temp folder
            .then(function () {
                return NodeGit.Clone('https://github.com/' + repo, tempFolder);
            })
            // create empty repos for each student on github
            .then(
                function () {
                    const promises = [];
                    const githubUrl = /[A-Za-z0-9\-]+$/.exec(repo) + '-';

                    // for each student
                    for (let index = 0; index < students.length; index++) {
                        // gather the promises
                        promises.push(
                            // create a repository
                            Github.me.repos.create({
                                name: githubUrl + students[index],
                                private: isPrivate,
                                has_issues: hasIssueTracker,
                                has_wiki: hasWiki
                            })
                        );
                    }
                    return Promise.all(promises);
                }
            )

            // open repo
            .then(function () {
                return NodeGit.Repository.open(tempFolder);
            })


            // Push seed files into the new repositories
            .then(
                function (gitRepo) {
                    const promises = [];
                    const githubUrl = 'https://github.com/' + githubUsername + '/' + /[A-Za-z0-9\-]+$/.exec(repo) + '-';
                    const credentials = NodeGit.Cred.userpassPlaintextNew(githubUsername, githubPassword);
                    const branchReference = 'refs/heads/master:refs/heads/master';

                    // for each student
                    for (let index = 0; index < students.length; index++) {
                        NodeGit.Remote.create(gitRepo, students[index], githubUrl + students[index]);
                        NodeGit.Remote.lookup(gitRepo, students[index]).then(function (remote) {
                            remote.setCallbacks({
                                credentials: function () {
                                    return credentials;
                                }
                            });
                            promises.push(
                                remote.push([branchReference])
                            );
                        });
                    }
                    return Promise.all(promises);
                }
            )

            // Add student as collaborator
            .then(
                function () {
                    const promises = [];
                    const githubUrl = /[A-Za-z0-9\-]+$/.exec(repo) + '-';

                    // for each student
                    for (let index = 0; index < students.length; index++) {
                        // gather the promises
                        promises.push(
                            // create a repository
                            Github
                                .repos(githubUsername, githubUrl + students[index])
                                .collaborators(students[index])
                                .add()
                        );
                    }
                    return Promise.all(promises);
                }
            )

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

function filterGithubUsers (users) {
    return _.filter(users, function (user) {
        return _.has(user, 'modules.github.username');
    });
}

function selectedStudents (students, filterArray) {
    return _.filter(students, function (student) {
        return _.indexOf(filterArray, student.modules.github.username, true) > -1;
    });
}

function rmrf (folder) {
    return new Promise (function (resolve, reject) {
        rimraf(folder, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
