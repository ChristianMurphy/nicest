const handleRedirect = require('./handler/redirect');
const handleList = require('./handler/list');
const handleView = require('./handler/view');
const handleSave = require('./handler/save');
const handleRemove = require('./handler/remove');
const handleViewEmpty = require('./handler/view-empty');
const handleCreate = require('./handler/create');
const Joi = require('joi');

const courseValidation = {
    instructors: Joi
        .array()
        .single()
        .unique()
        .items(
            Joi
                .string()
                .hex(),
        )
        .description('List of User ids who are teaching or grading the course'),
    modules: Joi
        .object()
        .description('Assorted information for Nicest plugins'),
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
                .hex(),
        )
        .description('List of User ids who are participating in the course'),
    teams: Joi
        .array()
        .single()
        .unique()
        .items(
            Joi
                .string()
                .hex(),
        )
        .description('List of Team ids that are a part of the course'),
};

module.exports = [
    {
        config: { description: 'Course Management' },
        handler: handleRedirect,
        method: 'GET',
        path: '/recipe/manage-courses',
    },
    {
        handler: handleList,
        method: 'GET',
        path: '/recipe/manage-courses/list',
    },
    {
        config: {
            validate: {
                params: {
                    id: Joi
                        .string()
                        .hex(),
                },
            },
        },
        handler: handleView,
        method: 'GET',
        path: '/recipe/manage-courses/edit/{id}',
    },
    {
        config: {
            validate: {
                params: {
                    id: Joi
                        .string()
                        .hex(),
                },
                payload: courseValidation,
            },
        },
        handler: handleSave,
        method: 'POST',
        path: '/recipe/manage-courses/edit/{id}',
    },
    {
        config: {
            validate: {
                params: {
                    id: Joi
                        .string()
                        .hex(),
                },
            },
        },
        handler: handleRemove,
        method: 'GET',
        path: '/recipe/manage-courses/delete/{id}',
    },
    {
        handler: handleViewEmpty,
        method: 'GET',
        path: '/recipe/manage-courses/create',
    },
    {
        config: { validate: { payload: courseValidation } },
        handler: handleCreate,
        method: 'POST',
        path: '/recipe/manage-courses/create',
    },
    {
        handler: { directory: { path: 'modules/course/static' } },
        method: 'GET',
        path: '/recipe/manage-courses/static/{param*}',
    },
];
