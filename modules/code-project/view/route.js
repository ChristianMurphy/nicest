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
                    isPrivate: Joi.boolean().default(false),
                    hasIssueTracker: Joi.boolean().default(false),
                    hasWiki: Joi.boolean().default(false)
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
                    useTaiga: Joi.boolean().default(false),
                    description: Joi.string().empty(''),
                    isPrivate: Joi.boolean().default(false),
                    hasIssues: Joi.boolean().default(false),
                    hasBacklog: Joi.boolean().default(false),
                    hasKanban: Joi.boolean().default(false),
                    hasWiki: Joi.boolean().default(false)
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
                    useCADashboard: Joi.boolean().default(false)
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
    },
    {
        method: 'GET',
        path: '/recipe/code-project/static/{param*}',
        handler: {
            directory: {
                path: 'modules/code-project/static'
            }
        }
    }
];
