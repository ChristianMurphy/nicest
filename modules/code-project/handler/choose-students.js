'use strict';

/**
 * @module code-project/handler/choose-students
 */

const Course = require('../../course/model/course');

/**
 * View to allow instructor to select students or teams for a project
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
async function chooseStudents (request, reply) {
    if (request.query.type === 'team') {
        request.yar.set({'code-project-student-type': 'team'});
        const course = await Course.findOne({_id: request.yar.get('code-project-course')})
            .select('teams')
            .populate('teams')
            .exec();

        reply.view('modules/code-project/view/choose-students', {
            list: course.teams,
            listType: 'team'
        });
    } else {
        const course = await Course.findOne({_id: request.yar.get('code-project-course')})
            .select('students')
            .populate('students')
            .exec();

        reply.view('modules/code-project/view/choose-students', {
            list: course.students,
            listType: 'individual'
        });
    }
}

module.exports = chooseStudents;
