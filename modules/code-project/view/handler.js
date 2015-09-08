'use strict';

const _ = require('lodash');

const Octokat = require('../../../lib/server').server.plugins.github.Octokat;
const User = require('../../../lib/server').server.plugins.user;
const createGithubRepositories = require('../tasks/create-github-repositories');
const seedGitRepositories = require('../tasks/seed-git-repositories');

module.exports = {
    redirect: function (request, reply) {
        if (typeof request.session.get('github-username') === 'string' && typeof request.session.get('github-password') === 'string') {
            reply().redirect('/recipe/code-project/choose-repository');
        } else {
            reply().redirect('/recipe/github/login?next=/recipe/code-project/choose-repository');
        }
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
            'github-project-repo': request.payload.repo
        });
        request.session.set({
            'github-project-is-private': request.payload.isPrivate || false
        });
        request.session.set({
            'github-project-has-wiki': request.payload.hasWiki || false
        });
        request.session.set({
            'github-project-has-issue-tracker': request.payload.hasIssueTracker || false
        });

        reply().redirect('/recipe/code-project/choose-students');
    },
    chooseStudents: function (request, reply) {
        User
            .list('name modules')
            .then(function (users) {
                reply.view('modules/code-project/view/choose-students', {
                    students: filterGithubUsers(users)
                });
            });
    },
    selectStudents: function (request, reply) {
        request.session.set({
            'code-project-students': request.payload.students
        });

        reply().redirect('/recipe/code-project/confirm');
    },
    confirmView: function (request, reply) {
        User
            .list('name modules')
            .then(function (users) {
                let students = filterGithubUsers(users);
                const studentFilter = request.session.get('code-project-students').sort();
                const repo = request.session.get('github-project-repo');

                students = selectedStudents(students, studentFilter);
                reply.view('modules/code-project/view/confirm', {
                    repoUrl: 'https://github.com/' + repo,
                    repoName: /[A-Za-z0-9\-]+$/.exec(repo),
                    students: students
                });
            });
    },
    confirm: function (request, reply) {
        const githubUsername = request.session.get('github-username');
        const githubPassword = request.session.get('github-password');
        const seedRepository = request.session.get('github-project-repo');
        const students = request.session.get('code-project-students');
        const isPrivate = request.session.get('github-project-is-private');
        const hasWiki = request.session.get('github-project-has-wiki');
        const hasIssueTracker = request.session.get('github-project-has-issue-tracker');

        // create empty repos for each student on github
        const githubRepositories = [];
        const githubUrls = [];
        const githubName = /[A-Za-z0-9\-]+$/.exec(seedRepository) + '-';
        const githubUrl = 'https://github.com/' + githubUsername + '/' + /[A-Za-z0-9\-]+$/.exec(seedRepository) + '-';
        const seedRepositoryURL = 'https://github.com/' + githubUsername + '/' + /[A-Za-z0-9\-]+$/.exec(seedRepository);

        // for each student create a repo name
        for (let index = 0; index < students.length; index++) {
            githubRepositories.push({
                name: githubName + students[index],
                collaborators: [students[index]]
            });
            githubUrls.push(githubUrl + students[index]);
        }

        // create repostories
        createGithubRepositories(githubUsername, githubPassword, githubRepositories, {
            private: isPrivate,
            has_wiki: hasWiki,
            has_issues: hasIssueTracker
        })
            // add seed code to repositories
            .then(function () {
                return seedGitRepositories(githubUsername, githubPassword, seedRepositoryURL, githubUrls);
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
