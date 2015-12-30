'use strict';

const handler = require('./handler');
const Joi = require('joi');

const courseValidation = {
    name: Joi
        .string()
        .regex(/[A-Za-z ]+/)
        .description('Course name'),
    students: Joi
        .array()
        .single()
        .unique()
        .description('List of User ids who are participating in the course'),
    instructors: Joi
        .array()
        .single()
        .unique()
        .description('List of User ids who are teaching or grading the course'),
    teams: Joi
        .array()
        .single()
        .unique()
        .description('List of Team ids that are a part of the course'),
    modules: Joi
        .object()
        .description('Assorted information for Nicest plugins')
};

module.exports = [
    {
        method: 'GET',
        path: '/recipe/manage-courses',
        handler: handler.redirect,
        config: {
            description: 'Course Management'
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-courses/list',
        handler: handler.list
    },
    {
        method: 'GET',
        path: '/recipe/manage-courses/edit/{id}',
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
        path: '/recipe/manage-courses/edit/{id}',
        handler: handler.save,
        config: {
            validate: {
                params: {
                    id: Joi.string().hex()
                },
                payload: courseValidation
            }
        }
    },
    {
        method: 'GET',
        path: '/recipe/manage-courses/delete/{id}',
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
        path: '/recipe/manage-courses/create',
        handler: handler.viewEmpty
    },
    {
        method: 'POST',
        path: '/recipe/manage-courses/create',
        handler: handler.create,
        config: {
            validate: {
                payload: courseValidation
            }
        }
    }
];
