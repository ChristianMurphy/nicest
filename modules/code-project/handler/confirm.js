'use strict';

/**
 * @module code-project/handler/confirm
 */

const gatherGithubUsers = require('../task/gather-github-users');
const createGithubRepositories = require('../task/create-github-repositories');
const createTaigaBoards = require('../task/create-taiga-boards');
const gatherSlackMetadata = require('../task/gather-slack-metadata');
const createSlackChannels = require('../task/create-slack-channels');
const seedGitRepositories = require('../task/seed-git-repositories');
const configureCaDashboard = require('../task/configure-ca-dashboard');
const gatherProjectMetadata = require('../task/gather-project-metadata');

/**
 * Actually generates the project across all the services
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with a redirect
 */
async function confirm (request, reply) {
    const {prefix} = request.route.realm.modifiers.route;

    const githubUsername = request.auth.credentials.profile.username;
    const githubToken = request.auth.credentials.token;
    const seedRepository = request.yar.get('github-project-repo');
    const course = request.yar.get('code-project-course');
    const students = request.yar.get('code-project-students');
    const isPrivate = request.yar.get('github-project-is-private');
    const hasWiki = request.yar.get('github-project-has-wiki');
    const hasIssueTracker = request.yar.get('github-project-has-issue-tracker');
    const studentType = request.yar.get('code-project-student-type');
    const useTaiga = request.yar.get('taiga-project-use-taiga');
    const useSlack = request.yar.get('slack-project-use-slack');
    const slackToken = request.yar.get('slack-project-access-token');
    const useAssessment = request.yar.get('assessment-use-ca-dashboard');
    let githubRepositories = null;
    let slackChannels = null;
    let taigaToken = null;

    try {
        // Gather Github user information from Users/Teams
        const temporaryGithubRepositories = await gatherGithubUsers(
            seedRepository,
            githubUsername,
            studentType,
            students
        );
        // Create repostories

        githubRepositories = temporaryGithubRepositories;

        await createGithubRepositories(
            githubUsername,
            githubToken,
            githubRepositories,
            {
                has_issues: hasIssueTracker,
                has_wiki: hasWiki,
                private: isPrivate
            }
        );

        // Create Taiga boards

        if (useTaiga) {
            const taigaUsername = request.yar.get('taiga-username');
            const taigaPassword = request.yar.get('taiga-password');
            const taigaOptions = {
                description: request.yar.get('taiga-project-description'),
                isBacklogActived: request.yar.get('taiga-project-has-backlog'),
                isIssuesActived: request.yar.get('taiga-project-has-issues'),
                isKanbanActivated: request.yar.get('taiga-project-has-kanban'),
                isPrivate: request.yar.get('taiga-project-is-private'),
                isWikiActivated: request.yar.get('taiga-project-has-wiki')
            };

            taigaToken = await createTaigaBoards(
                taigaUsername,
                taigaPassword,
                githubRepositories,
                taigaOptions
            );
        }

        // Create Slack channels
        if (useSlack) {
            const accessToken = request.yar.get('slack-project-access-token');
            const courseChannelNames = request.yar.get('slack-project-course-channel-names');
            const teamChannelNames = request.yar.get('slack-project-team-channel-names');

            // Gather Slack user information from Users/Teams
            const slackMetadata = await gatherSlackMetadata(
                courseChannelNames,
                teamChannelNames,
                students
            );
            // Create the channels
            const {channels} = slackMetadata;
            const {users} = slackMetadata;

            const slackChannelMap = await createSlackChannels(
                accessToken,
                channels,
                users
            );
            slackChannels = slackChannelMap;
        }

        if (useAssessment) {
            // Gather CA Dashboard users
            const caConfiguration = await gatherProjectMetadata(
                seedRepository,
                githubUsername,
                githubToken,
                studentType,
                students,
                course,
                slackToken,
                slackChannels,
                taigaToken
            );

            const cassessUsername = request.yar.get('cassess-username');
            const cassessPassword = request.yar.get('cassess-password');
            const cassessUrl = request.yar.get('cassess-endpoint');

            // Setup CA Dashboard
            await configureCaDashboard(
                cassessUsername,
                cassessPassword,
                cassessUrl,
                caConfiguration
            );
        }

        // Add seed code to repositories
        const seedRepositoryURL = `https://github.com/${githubUsername}/${(/[a-z0-9-]+$/i).exec(seedRepository)}`;
        const githubUrls = githubRepositories.map((element) => element.url);

        await seedGitRepositories(
            githubUsername,
            githubToken,
            seedRepositoryURL,
            githubUrls
        );

        // Success redirect
        reply().redirect(`${prefix}/recipe/code-project/success`);
    } catch (err) {
        request.log('error', err.toString());
        reply().redirect(`${prefix}/recipe/code-project/error`);
    }
}

module.exports = confirm;
