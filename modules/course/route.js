'use strict';

const handleRedirect = require('./handler/redirect');
const handleList = require('./handler/list');
const handleView = require('./handler/view');
const handleSave = require('./handler/save');
const handleRemove = require('./handler/remove');
const handleViewEmpty = require('./handler/view-empty');
const handleCreate = require('./handler/create');
const Joi = require('joi');

const courseValidation = {
    name: Joi
        .string()
        .trim()
        .replace(/\s+/g, ' ')
        .regex(/^[a-z0-9 -]+$/i, 'latin characters, number, hyphen or space')
        .description('Course name'),
    students: Joi
        .array()
        .single()
        .unique()
        .items(
            Joi
                .string()
                .hex()
        )
        .description('List of User ids who are participating in the course'),
    instructors: Joi
        .array()
        .single()
        .unique()
        .items(
            Joi
                .string()
                .hex()
        )
        .description('List of User ids who are teaching or grading the course'),
    teams: Joi
        .array()
        .single()
        .unique()
        .items(
            Joi
                .string()
                .hex()
        )
        .description('List of Team ids that are a part of the course'),
    modules: Joi
        .object()
        .description('Assorted information for Nicest plugins')
};

module.exports = [
    {
        method: 'GET',
        path: '/recipe/manage-courses',
        handler: handleRedirect,
        config: {description: 'Course Management'}
    },
    {
        method: 'GET',
        path: '/recipe/manage-courses/list',
        handler: handleList
    },
    {
        method: 'GET',
        path: '/recipe/manage-courses/edit/{id}',
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
        path: '/recipe/manage-courses/edit/{id}',
        handler: handleSave,
        config: {
            validate: {
                params: {
                    id: Joi
                        .string()
                        .hex()
                },
                payload: courseValidation
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-courses/delete/{id}',
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
        path: '/recipe/manage-courses/create',
        handler: handleViewEmpty
    },
    {
        method: 'POST',
        path: '/recipe/manage-courses/create',
        handler: handleCreate,
        config: {validate: {payload: courseValidation}}
    },
    {
        method: 'GET',
        path: '/recipe/manage-courses/static/{param*}',
        handler: {directory: {path: 'modules/course/static'}}
    }
];
