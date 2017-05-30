'use strict';

/**
 * @module code-project/handler/confirm
 */

const gatherGithubUsers = require('../task/gather-github-users');
const createGithubRepositories = require('../task/create-github-repositories');
const createTaigaBoards = require('../task/create-taiga-boards');
const seedGitRepositories = require('../task/seed-git-repositories');
const gatherCaUsers = require('../task/gather-ca-users');
const configureCaDashboard = require('../task/configure-ca-dashboard');

/**
 * Actually generates the project across all the services
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
function confirm (request, reply) {
    const {prefix} = request.route.realm.modifiers.route;

    const githubUsername = request.auth.credentials.profile.username;
    const githubToken = request.auth.credentials.token;
    const seedRepository = request
        .yar
        .get('github-project-repo');
    const course = request
        .yar
        .get('code-project-course');
    const students = request
        .yar
        .get('code-project-students');
    const isPrivate = request
        .yar
        .get('github-project-is-private');
    const hasWiki = request
        .yar
        .get('github-project-has-wiki');
    const hasIssueTracker = request
        .yar
        .get('github-project-has-issue-tracker');
    const studentType = request
        .yar
        .get('code-project-student-type');
    const useTaiga = request
        .yar
        .get('taiga-project-use-taiga');
    const useAssessment = request
        .yar
        .get('assessment-use-ca-dashboard');
    let githubRepositories = null;

    // Gather Github user information from Users/Teams
    gatherGithubUsers(seedRepository, githubUsername, studentType, students)
        // Create repostories
        .then((temporaryGithubRepositories) => {
            githubRepositories = temporaryGithubRepositories;

            return createGithubRepositories(githubUsername, githubToken, githubRepositories, {
                has_issues: hasIssueTracker,
                has_wiki: hasWiki,
                private: isPrivate
            });
        })

        // Create Taiga boards
        .then(() => {
            if (useTaiga) {
                const taigaUsername = request
                    .yar
                    .get('taiga-username');
                const taigaPassword = request
                    .yar
                    .get('taiga-password');
                const taigaOptions = {
                    description: request
                        .yar
                        .get('taiga-project-description'),
                    isBacklogActived: request
                        .yar
                        .get('taiga-project-has-backlog'),
                    isIssuesActived: request
                        .yar
                        .get('taiga-project-has-issues'),
                    isKanbanActivated: request
                        .yar
                        .get('taiga-project-has-kanban'),
                    isPrivate: request
                        .yar
                        .get('taiga-project-is-private'),
                    isWikiActivated: request
                        .yar
                        .get('taiga-project-has-wiki')
                };

                createTaigaBoards(taigaUsername, taigaPassword, githubRepositories, taigaOptions);
            }
        })

        // Gather CA Dashboard users
        .then(() => {
            if (useAssessment) {
                return gatherCaUsers(seedRepository, githubUsername, studentType, students, course);
            }

            return null;
        })

        // Setup CA Dashboard
        .then((caConfiguration) => {
            if (useAssessment) {
                return configureCaDashboard(caConfiguration);
            }

            return null;
        })

        // Add seed code to repositories
        .then(() => {
            const seedRepositoryURL = `https://github.com/${githubUsername}/${(/[a-z0-9-]+$/i).exec(seedRepository)}`;
            const githubUrls = githubRepositories.map((element) => element.url);

            return seedGitRepositories(githubUsername, githubToken, seedRepositoryURL, githubUrls);
        })

        // Sucess redirect
        .then(() => {
            reply().redirect(`${prefix}/recipe/code-project/success`);
        })

        // Failure redirect
        .catch((err) => {
            request.log('error', err.toString());
            reply().redirect(`${prefix}/recipe/code-project/error`);
        });
}

module.exports = confirm;
