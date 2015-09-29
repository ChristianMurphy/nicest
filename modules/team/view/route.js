'use strict';

const handler = require('./handler');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/manage-teams',
        handler: handler.redirect,
        config: {
            description: 'Team Management'
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-teams/list',
        handler: handler.list
    },
    {
        method: 'GET',
        path: '/recipe/manage-teams/edit/{id}',
        handler: handler.view,
        config: {
            validate: {
                params: {
                    id: Joi.string().hex()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/recipe/manage-teams/edit/{id}',
        handler: handler.save,
        config: {
            validate: {
                params: {
                    id: Joi.string().hex()
                },
                payload: {
                    name: Joi.string().regex(/[A-Za-z ]+/),
                    members: Joi.array().single().unique(),
                    modules: Joi.object()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-teams/delete/{id}',
        handler: handler.delete,
        config: {
            validate: {
                params: {
                    id: Joi.string().hex()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-teams/create',
        handler: handler.viewEmpty
    },
    {
        method: 'POST',
        path: '/recipe/manage-teams/create',
        handler: handler.create,
        config: {
            validate: {
                payload: {
                    name: Joi.string().regex(/[A-Za-z ]+/),
                    members: Joi.array().single().unique(),
                    modules: Joi.object()
                }
            }
        }
    }
];
