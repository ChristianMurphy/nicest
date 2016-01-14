'use strict';

const Joi = require('joi');

const handleRedirect = require('./handler/redirect');
const handleChooseCourse = require('./handler/choose-course');
const handleSelectCourse = require('./handler/select-course');
const handleChooseStudents = require('./handler/choose-students');
const handleSelectStudents = require('./handler/select-students');
const handleChooseRepository = require('./handler/choose-repository');
const handleSelectRepository = require('./handler/select-repository');
const handleChooseIssueTracker = require('./handler/choose-issue-tracker');
const handleSelectIssueTracker = require('./handler/select-issue-tracker');
const handleLoginView = require('./handler/login-view');
const handleLoginAction = require('./handler/login-action');
const handleChooseAssessmentSystem = require('./handler/choose-assessment-system');
const handleSelectAssessmentSystem = require('./handler/select-assessment-system');
const handleConfirmView = require('./handler/confirm-view');
const handleConfirm = require('./handler/confirm');
const handleSuccessView = require('./handler/success-view');
const handleErrorView = require('./handler/error-view');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/code-project',
        handler: handleRedirect,
        config: {
            description: 'Create a computer code project'
        }
    },
    {
        method: 'GET',
        path: '/recipe/code-project/choose-course',
        handler: handleChooseCourse
    },
    {
        method: 'POST',
        path: '/recipe/code-project/choose-course',
        handler: handleSelectCourse,
        config: {
            validate: {
                payload: {
                    course: Joi.string().hex()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/code-project/choose-students',
        handler: handleChooseStudents,
        config: {
            validate: {
                query: {
                    type: Joi.string().valid(['individual', 'team']).default('individual'),
                    course: Joi.string().hex().default(null)
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/recipe/code-project/choose-students',
        handler: handleSelectStudents,
        config: {
            validate: {
                payload: {
                    course: Joi.string().hex(),
                    students: Joi.array().single().unique()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/code-project/choose-repository',
        handler: handleChooseRepository
    },
    {
        method: 'POST',
        path: '/recipe/code-project/choose-repository',
        handler: handleSelectRepository,
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
        handler: handleChooseIssueTracker
    },
    {
        method: 'POST',
        path: '/recipe/code-project/choose-issue-tracker',
        handler: handleSelectIssueTracker,
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
        handler: handleLoginView
    },
    {
        method: 'POST',
        path: '/recipe/code-project/taiga-login',
        handler: handleLoginAction,
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
        handler: handleChooseAssessmentSystem
    },
    {
        method: 'POST',
        path: '/recipe/code-project/choose-assessment-system',
        handler: handleSelectAssessmentSystem,
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
        handler: handleConfirmView
    },
    {
        method: 'POST',
        path: '/recipe/code-project/confirm',
        handler: handleConfirm
    },
    {
        method: 'GET',
        path: '/recipe/code-project/success',
        handler: handleSuccessView
    },
    {
        method: 'GET',
        path: '/recipe/code-project/error',
        handler: handleErrorView
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
