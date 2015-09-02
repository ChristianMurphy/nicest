'use strict';

const _ = require('lodash');

const Octokat = require('../../../lib/server').server.plugins.github.Octokat;
const User = require('../../../lib/server').server.plugins.user;
const createGithubRepositories = require('../tasks/create-github-repositories');
const seedGitRepositories = require('../tasks/seed-git-repositories');

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
        const seedRepository = request.session.get('github-individual-project-repo');
        const students = request.session.get('github-individual-project-students');
        const isPrivate = request.session.get('github-individual-project-is-private');
        const hasWiki = request.session.get('github-individual-project-has-wiki');
        const hasIssueTracker = request.session.get('github-individual-project-has-issue-tracker');

        // create empty repos for each student on github
        const names = [];
        const urls = [];
        const githubName = /[A-Za-z0-9\-]+$/.exec(seedRepository) + '-';
        const githubUrl = 'https://github.com/' + githubUsername + '/' + /[A-Za-z0-9\-]+$/.exec(seedRepository) + '-';
        const seedRepositoryURL = 'https://github.com/' + githubUsername + '/' + /[A-Za-z0-9\-]+$/.exec(seedRepository);

        // for each student create a repo name
        for (let index = 0; index < students.length; index++) {
            names.push(githubName + students[index]);
            urls.push(githubUrl + students[index]);
        }
        console.log(urls, seedRepository);

        createGithubRepositories(Github, names, {
            private: isPrivate,
            has_wiki: hasWiki,
            has_issues: hasIssueTracker
        })
            .then(function () {
                return seedGitRepositories(githubUsername, githubPassword, seedRepositoryURL, urls);
            })

            // Add student as collaborator
            .then(function () {
                const promises = [];

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
