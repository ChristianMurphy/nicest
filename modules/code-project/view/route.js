'use strict';

const handler = require('./handler');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/code-project',
        handler: handler.redirect,
        config: {
            description: 'Create a computer code project'
        }
    },
    {
        method: 'GET',
        path: '/recipe/code-project/choose-students',
        handler: handler.chooseStudents
    },
    {
        method: 'POST',
        path: '/recipe/code-project/choose-students',
        handler: handler.selectStudents,
        config: {
            validate: {
                payload: {
                    students: Joi.array().single().unique()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/code-project/choose-repository',
        handler: handler.chooseRepository
    },
    {
        method: 'POST',
        path: '/recipe/code-project/choose-repository',
        handler: handler.selectRepository,
        config: {
            validate: {
                payload: {
                    repo: Joi.string().regex(/[A-Za-z0-9\-]+/),
                    isPrivate: Joi.boolean(),
                    hasIssueTracker: Joi.boolean(),
                    hasWiki: Joi.boolean()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/code-project/choose-issue-tracker',
        handler: handler.chooseIssueTracker
    },
    {
        method: 'POST',
        path: '/recipe/code-project/choose-issue-tracker',
        handler: handler.selectIssueTracker,
        config: {
            validate: {
                payload: {
                    useTaiga: Joi.boolean(),
                    description: Joi.string().empty(''),
                    isPrivate: Joi.boolean(),
                    hasIssues: Joi.boolean(),
                    hasBacklog: Joi.boolean(),
                    hasKanban: Joi.boolean(),
                    hasWiki: Joi.boolean()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/code-project/taiga-login',
        handler: handler.loginView
    },
    {
        method: 'POST',
        path: '/recipe/code-project/taiga-login',
        handler: handler.loginAction,
        config: {
            validate: {
                payload: {
                    username: Joi.string().alphanum(),
                    password: Joi.string()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/code-project/choose-assessment-system',
        handler: handler.chooseAssessmentSystem
    },
    {
        method: 'POST',
        path: '/recipe/code-project/choose-assessment-system',
        handler: handler.selectAssessmentSystem,
        config: {
            validate: {
                payload: {
                    useCADashboard: Joi.boolean()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/code-project/confirm',
        handler: handler.confirmView
    },
    {
        method: 'POST',
        path: '/recipe/code-project/confirm',
        handler: handler.confirm
    },
    {
        method: 'GET',
        path: '/recipe/code-project/success',
        handler: handler.successView
    },
    {
        method: 'GET',
        path: '/recipe/code-project/error',
        handler: handler.errorView
    }
];
