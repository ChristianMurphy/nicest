'use strict';

const handler = require('./handler');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/manage-teams',
        handler: handler.redirect,
        config: {
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
            plugins: {
                lout: false
            },
            validate: {
                params: {
                    id: Joi.string().hex()
                },
                payload: {
                    name: Joi.string().regex(/[A-Za-z ]+/),
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
            plugins: {
                lout: false
            },
            validate: {
                payload: {
                    name: Joi.string().regex(/[A-Za-z ]+/),
                    modules: Joi.object()
                }
            }
        }
    }
];
