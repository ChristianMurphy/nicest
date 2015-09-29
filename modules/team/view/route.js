'use strict';

const handler = require('./handler');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/manage-teams',
        handler: handler.redirect,
        config: {
            auth: 'github',
            description: 'Team Management',
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-teams/list',
        handler: handler.list,
        config: {
            auth: 'github',
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-teams/edit/{id}',
        handler: handler.view,
        config: {
            auth: 'github',
            plugins: {
                lout: false
            },
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
            auth: 'github',
            plugins: {
                lout: false
            },
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
            auth: 'github',
            plugins: {
                lout: false
            },
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
        handler: handler.viewEmpty,
        config: {
            auth: 'github',
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'POST',
        path: '/recipe/manage-teams/create',
        handler: handler.create,
        config: {
            auth: 'github',
            plugins: {
                lout: false
            },
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
