'use strict';

const handler = require('./handler');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/recipe/manage-users',
        handler: handler.redirect,
        config: {
            description: 'User Management',
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-users/list',
        handler: handler.list,
        config: {
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-users/edit/{id}',
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
        path: '/recipe/manage-users/edit/{id}',
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
        path: '/recipe/manage-users/delete/{id}',
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
        path: '/recipe/manage-users/create',
        handler: handler.viewEmpty,
        config: {
            plugins: {
                lout: false
            }
        }
    },
    {
        method: 'POST',
        path: '/recipe/manage-users/create',
        handler: handler.create,
        config: {
            plugins: {
                lout: false
            },
            payload: {
                name: Joi.string().regex(/[A-Za-z ]+/),
                modules: Joi.object()
            }
        }
    }
];
