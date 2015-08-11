'use strict';

const handler = require('./handler');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/github-individual-project',
        handler: handler.redirect,
        config: {
            description: 'Create a individual project from a seed repository',
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/github-individual-project/choose-repository',
        handler: handler.chooseRepository,
        config: {
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'POST',
        path: '/recipe/github-individual-project/choose-repository',
        handler: handler.selectRepository,
        config: {
            plugins: {
                lout: false
            },
            validate: {
                payload: {
                    repo: Joi.string().alphanum()
                }
            }
        }
    }
];
