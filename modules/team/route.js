'use strict';

const handleCreate = require('./handler/create');
const handleList = require('./handler/list');
const handleRedirect = require('./handler/redirect');
const handleRemove = require('./handler/remove');
const handleSave = require('./handler/save');
const handleViewEmpty = require('./handler/view-empty');
const handleView = require('./handler/view');
const Joi = require('joi');

const teamValidation = {
    name: Joi
        .string()
        .trim()
        .replace(/\s+/g, ' ')
        .regex(/^[a-z0-9 -]+$/i, 'latin characters, number, hyphen or space')
        .description('Team name'),
    members: Joi
        .array()
        .single()
        .unique()
        .items(
            Joi
                .string()
                .hex()
        )
        .description('List of User ids who are a part of the team'),
    modules: Joi
        .object()
        .description('Assorted information for Nicest plugins')
};

module.exports = [
    {
        method: 'GET',
        path: '/recipe/manage-teams',
        handler: handleRedirect,
        config: {
            description: 'Team Management'
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-teams/list',
        handler: handleList
    },
    {
        method: 'GET',
        path: '/recipe/manage-teams/edit/{id}',
        handler: handleView,
        config: {
            validate: {
                params: {
                    id: Joi
                        .string()
                        .hex()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/recipe/manage-teams/edit/{id}',
        handler: handleSave,
        config: {
            validate: {
                params: {
                    id: Joi
                        .string()
                        .hex()
                },
                payload: teamValidation
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-teams/delete/{id}',
        handler: handleRemove,
        config: {
            validate: {
                params: {
                    id: Joi
                        .string()
                        .hex()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-teams/create',
        handler: handleViewEmpty
    },
    {
        method: 'POST',
        path: '/recipe/manage-teams/create',
        handler: handleCreate,
        config: {
            validate: {
                payload: teamValidation
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-teams/static/{param*}',
        handler: {
            directory: {
                path: 'modules/team/static'
            }
        }
    }
];
