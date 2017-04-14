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
const handleChooseMessagingPlatform = require('./handler/choose-messaging-platform');
const handleSelectMessagingPlatform = require('./handler/select-messaging-platform');
const handleChooseAssessmentSystem = require('./handler/choose-assessment-system');
const handleSelectAssessmentSystem = require('./handler/select-assessment-system');
const handleCAssessLoginView = require('./handler/cassess-login-view');
const handleCAssessLoginAction = require('./handler/cassess-login-action');
const handleConfirmView = require('./handler/confirm-view');
const handleConfirm = require('./handler/confirm');
const handleSuccessView = require('./handler/success-view');
const handleErrorView = require('./handler/error-view');

module.exports = [
    {
        config: {description: 'Create a computer code project'},
        handler: handleRedirect,
        method: 'GET',
        path: '/recipe/code-project'
    },
    {
        handler: handleChooseCourse,
        method: 'GET',
        path: '/recipe/code-project/choose-course'
    },
    {
        config: {
            validate: {
                payload: {
                    course: Joi
                        .string()
                        .hex()
                }
            }
        },
        handler: handleSelectCourse,
        method: 'POST',
        path: '/recipe/code-project/choose-course'
    },
    {
        config: {
            validate: {
                query: {
                    type: Joi
                        .string()
                        .valid(['individual', 'team'])
                        .default('individual')
                }
            }
        },
        handler: handleChooseStudents,
        method: 'GET',
        path: '/recipe/code-project/choose-students'
    },
    {
        config: {
            validate: {
                payload: {
                    students: Joi
                    .array()
                    .single()
                    .unique()
                    .items(
                        Joi
                        .string()
                        .hex()
                    )
                }
            }
        },
        handler: handleSelectStudents,
        method: 'POST',
        path: '/recipe/code-project/choose-students'
    },
    {
        handler: handleChooseRepository,
        method: 'GET',
        path: '/recipe/code-project/choose-repository'
    },
    {
        config: {
            validate: {
                payload: {
                    hasIssueTracker: Joi
                        .boolean()
                        .truthy('on')
                        .default(false),
                    hasWiki: Joi
                        .boolean()
                        .truthy('on')
                        .default(false),
                    isPrivate: Joi
                        .boolean()
                        .truthy('on')
                        .default(false),
                    repo: Joi
                        .string()
                        .regex(/[a-z0-9-]+/i, 'repository name')
                }
            }
        },
        handler: handleSelectRepository,
        method: 'POST',
        path: '/recipe/code-project/choose-repository'
    },
    {
        handler: handleChooseIssueTracker,
        method: 'GET',
        path: '/recipe/code-project/choose-issue-tracker'
    },
    {
        config: {
            validate: {
                payload: {
                    description: Joi
                        .string()
                        .empty(''),
                    hasBacklog: Joi
                        .boolean()
                        .truthy('on')
                        .default(false),
                    hasIssues: Joi
                        .boolean()
                        .truthy('on')
                        .default(false),
                    hasKanban: Joi
                        .boolean()
                        .truthy('on')
                        .default(false),
                    hasWiki: Joi
                        .boolean()
                        .truthy('on')
                        .default(false),
                    isPrivate: Joi
                        .boolean()
                        .truthy('on')
                        .default(false),
                    useTaiga: Joi
                        .boolean()
                        .truthy('on')
                        .default(false)
                }
            }
        },
        handler: handleSelectIssueTracker,
        method: 'POST',
        path: '/recipe/code-project/choose-issue-tracker'
    },
    {
        handler: handleLoginView,
        method: 'GET',
        path: '/recipe/code-project/taiga-login'
    },
    {
        config: {
            validate: {
                payload: {
                    password: Joi.string(),
                    username: Joi
                        .string()
                        .alphanum()
                }
            }
        },
        handler: handleLoginAction,
        method: 'POST',
        path: '/recipe/code-project/taiga-login'
    },
    {
        handler: handleChooseMessagingPlatform,
        method: 'GET',
        path: '/recipe/code-project/choose-messaging-platform'
    },
    {
        config: {
            validate: {
                payload: {
                    accessToken: Joi
                        .string()
                        .regex(/xoxp-\d{11,12}-\d{11,12}-\d{12}-[0-9a-f]{32}/)
                        .empty(''),
                    courseChannelNames: Joi
                        .string()
                        .regex(/^([a-z0-9-]+,?\s*)+$/)
                        .allow(''),
                    teamChannelNames: Joi
                        .string()
                        .regex(/^([a-z0-9-]+,?\s*)+$/)
                        .allow(''),
                    useSlack: Joi
                        .boolean()
                        .truthy('on')
                        .default(false)
                }
            }
        },
        handler: handleSelectMessagingPlatform,
        method: 'POST',
        path: '/recipe/code-project/choose-messaging-platform'
    },
    {
        handler: handleChooseAssessmentSystem,
        method: 'GET',
        path: '/recipe/code-project/choose-assessment-system'
    },
    {
        config: {
            validate: {
                payload: {
                    cassessUrl: Joi
                        .string(),
                    githubToken: Joi
                        .string(),
                    useCADashboard: Joi
                        .boolean()
                        .truthy('on')
                        .default(false)
                }
            }
        },
        handler: handleSelectAssessmentSystem,
        method: 'POST',
        path: '/recipe/code-project/choose-assessment-system'
    },
    {
        handler: handleCAssessLoginView,
        method: 'GET',
        path: '/recipe/code-project/cassess-login'
    },
    {
        config: {
            validate: {
                payload: {
                    password: Joi.string(),
                    username: Joi
                        .string()
                }
            }
        },
        handler: handleCAssessLoginAction,
        method: 'POST',
        path: '/recipe/code-project/cassess-login'
    },
    {
        handler: handleConfirmView,
        method: 'GET',
        path: '/recipe/code-project/confirm'
    },
    {
        handler: handleConfirm,
        method: 'POST',
        path: '/recipe/code-project/confirm'
    },
    {
        handler: handleSuccessView,
        method: 'GET',
        path: '/recipe/code-project/success'
    },
    {
        handler: handleErrorView,
        method: 'GET',
        path: '/recipe/code-project/error'
    },
    {
        handler: {directory: {path: 'modules/code-project/static'}},
        method: 'GET',
        path: '/recipe/code-project/static/{param*}'
    }
];
