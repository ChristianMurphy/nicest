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
        .description('Assorted information for Nicest plugins'),
    name: Joi
        .string()
        .trim()
        .replace(/\s+/g, ' ')
        .regex(/^[a-z0-9 -]+$/i, 'latin characters, number, hyphen or space')
        .description('Team name')
};

module.exports = [
    {
        config: {description: 'Team Management'},
        handler: handleRedirect,
        method: 'GET',
        path: '/recipe/manage-teams'
    },
    {
        handler: handleList,
        method: 'GET',
        path: '/recipe/manage-teams/list'
    },
    {
        config: {
            validate: {
                params: {
                    id: Joi
                    .string()
                    .hex()
                }
            }
        },
        handler: handleView,
        method: 'GET',
        path: '/recipe/manage-teams/edit/{id}'
    },
    {
        config: {
            validate: {
                params: {
                    id: Joi
                    .string()
                    .hex()
                },
                payload: teamValidation
            }
        },
        handler: handleSave,
        method: 'POST',
        path: '/recipe/manage-teams/edit/{id}'
    },
    {
        config: {
            validate: {
                params: {
                    id: Joi
                    .string()
                    .hex()
                }
            }
        },
        handler: handleRemove,
        method: 'GET',
        path: '/recipe/manage-teams/delete/{id}'
    },
    {
        handler: handleViewEmpty,
        method: 'GET',
        path: '/recipe/manage-teams/create'
    },
    {
        config: {validate: {payload: teamValidation}},
        handler: handleCreate,
        method: 'POST',
        path: '/recipe/manage-teams/create'
    },
    {
        handler: {directory: {path: 'modules/team/static'}},
        method: 'GET',
        path: '/recipe/manage-teams/static/{param*}'
    }
];
