'use strict';

const handler = require('./handler');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/code-project',
        handler: handler.redirect,
        config: {
            description: 'Create a computer code project',
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/code-project/choose-repository',
        handler: handler.chooseRepository,
        config: {
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'POST',
        path: '/recipe/code-project/choose-repository',
        handler: handler.selectRepository,
        config: {
            plugins: {
                lout: false
            },
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
        path: '/recipe/code-project/choose-students',
        handler: handler.chooseStudents,
        config: {
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'POST',
        path: '/recipe/code-project/choose-students',
        handler: handler.selectStudents,
        config: {
            plugins: {
                lout: false
            },
            validate: {
                payload: {
                    students: Joi.array().single().unique()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/code-project/confirm',
        handler: handler.confirmView,
        config: {
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'POST',
        path: '/recipe/code-project/confirm',
        handler: handler.confirm,
        config: {
            plugins: {
                lout: false
            }
        }
    }
];
