'use strict';

/**
 * @module code-project/handler
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
    const prefix = request.route.realm.modifiers.route.prefix;

    const githubUsername = request.yar.get('github-username');
    const githubPassword = request.yar.get('github-password');
    const seedRepository = request.yar.get('github-project-repo');
    const students = request.yar.get('code-project-students');
    const isPrivate = request.yar.get('github-project-is-private');
    const hasWiki = request.yar.get('github-project-has-wiki');
    const hasIssueTracker = request.yar.get('github-project-has-issue-tracker');
    const studentType = request.yar.get('code-project-student-type');
    const useTaiga = request.yar.get('taiga-project-use-taiga');
    const useAssessment = request.yar.get('assessment-use-ca-dashboard');
    let githubRepositories;

    // Gather Github user information from Users/Teams
    gatherGithubUsers(seedRepository, githubUsername, studentType, students)

        // create repostories
        .then((temporaryGithubRepositories) => {
            githubRepositories = temporaryGithubRepositories;

            return createGithubRepositories(githubUsername, githubPassword, githubRepositories, {
                private: isPrivate,
                has_wiki: hasWiki,
                has_issues: hasIssueTracker
            });
        })

        // create Taiga boards
        .then(() => {
            if (useTaiga) {
                const taigaUsername = request.yar.get('taiga-username');
                const taigaPassword = request.yar.get('taiga-password');
                const taigaOptions = {
                    description: request.yar.get('taiga-project-description'),
                    isPrivate: request.yar.get('taiga-project-is-private'),
                    isBacklogActived: request.yar.get('taiga-project-has-backlog'),
                    isIssuesActived: request.yar.get('taiga-project-has-issues'),
                    isKanbanActivated: request.yar.get('taiga-project-has-kanban'),
                    isWikiActivated: request.yar.get('taiga-project-has-wiki')
                };

                createTaigaBoards(taigaUsername, taigaPassword, githubRepositories, taigaOptions);
            }
        })

        // gather CA Dashboard users
        .then(() => {
            if (useAssessment) {
                return gatherCaUsers(seedRepository, githubUsername, studentType, students);
            }
            return null;
        })

        // setup CA Dashboard
        .then((caConfiguration) => {
            if (useAssessment) {
                return configureCaDashboard(caConfiguration);
            }
            return null;
        })

        // add seed code to repositories
        // FIXME this is last because it can sometimes trigger a core dump crash
        .then(() => {
            const seedRepositoryURL = `https://github.com/${githubUsername}/${(/[A-Za-z0-9\-]+$/).exec(seedRepository)}`;
            const githubUrls = githubRepositories.map((element) => {
                return element.url;
            });

            return seedGitRepositories(githubUsername, githubPassword, seedRepositoryURL, githubUrls);
        })

        // sucess redirect
        .then(() => {
            reply().redirect(`${prefix}/recipe/code-project/success`);
        })

        // failure redirect
        .catch((err) => {
            request.log('error', err.toString());
            reply().redirect(`${prefix}/recipe/code-project/error`);
        });
}

module.exports = confirm;
