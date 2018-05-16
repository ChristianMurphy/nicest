'use strict';

/**
 * @module code-project/handler/choose-course
 */

const Course = require('../../course/model/course');

/**
 * View to allow instructor to select course for project
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
async function chooseCourse (request, reply) {
    const courses = await Course.find({});

    reply.view('modules/code-project/view/choose-course', {courses});
}

module.exports = chooseCourse;
